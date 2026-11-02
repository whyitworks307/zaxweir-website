"""Dependency-free, offline integrity checks for the static ZAXWEIR website."""
import re
import unittest
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://zaxweir.com"
PAGES = {"index.html", "products.html", "about.html", "contact.html", "privacy.html"}


class Inspect(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.links, self.desc, self.viewports, self.canonicals = [], [], [], [], []
        self.lang, self.titles, self.external_scripts = "", 0, []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang", "")
        if tag == "title":
            self.titles += 1
        if a.get("id"):
            self.ids.append(a["id"])
        if tag == "meta" and a.get("name", "").lower() == "description":
            self.desc.append(a.get("content", ""))
        if tag == "meta" and a.get("name", "").lower() == "viewport":
            self.viewports.append(a.get("content", ""))
        if tag == "link" and "canonical" in a.get("rel", "").lower().split():
            self.canonicals.append(a.get("href", ""))
        key = {"a": "href", "link": "href", "script": "src",
               "img": "src", "source": "src", "video": "poster",
               "iframe": "src"}.get(tag)
        if key and a.get(key):
            uri = a[key]
            self.links.append((tag, uri))
            executable = tag in {"script", "iframe"} or (
                tag == "link" and any(x in a.get("rel", "").lower().split()
                                   for x in ("stylesheet", "preload", "modulepreload")))
            host = urlsplit(uri)
            if executable and host.scheme in ("http", "https") and host.netloc.lower() != "zaxweir.com":
                self.external_scripts.append(uri)


def resolve(owner, uri):
    if uri.startswith(("#", "data:", "mailto:", "tel:", "blob:")):
        return None
    u = urlsplit(uri)
    if u.scheme not in ("", "https", "http"):
        raise AssertionError("Unexpected URL scheme in %s: %r" % (owner, uri))
    if u.netloc and u.netloc.lower() not in ("zaxweir.com", "www.zaxweir.com"):
        return None
    if not u.path:
        path = ROOT / ("index.html" if u.netloc else owner.relative_to(ROOT))
    elif u.path.startswith("/") or u.netloc:
        path = ROOT / (unquote(u.path).lstrip("/") or "index.html")
    else:
        path = owner.parent / unquote(u.path)
    if path.is_dir():
        path = path / "index.html"
    path = path.resolve()
    if not path.is_relative_to(ROOT.resolve()):
        raise AssertionError("Path escapes website root: %r" % uri)
    return path


class StaticSiteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.paths = {p.name: p for p in ROOT.glob("*.html")}
        cls.pages = {}
        for name, path in cls.paths.items():
            parser = Inspect()
            parser.feed(path.read_text(encoding="utf-8"))
            cls.pages[name] = parser

    def test_expected_pages_and_domain(self):
        self.assertTrue(PAGES <= self.paths.keys())
        self.assertEqual((ROOT / "CNAME").read_text(encoding="utf-8").strip(), "zaxweir.com")

    def test_metadata_and_unique_ids(self):
        for name in PAGES:
            with self.subTest(page=name):
                p = self.pages[name]
                self.assertEqual(p.lang.lower(), "en")
                self.assertEqual(p.titles, 1)
                self.assertEqual(len(p.desc), 1)
                self.assertGreater(len(p.desc[0].strip()), 20)
                self.assertEqual(len(p.viewports), 1)
                self.assertEqual(len(p.canonicals), 1)
                expected = ORIGIN + ("/" if name == "index.html" else "/" + name)
                self.assertEqual(p.canonicals[0], expected)
                self.assertEqual(len(p.ids), len(set(p.ids)))

    def test_internal_links_and_assets(self):
        for name, p in self.pages.items():
            for tag, uri in p.links:
                with self.subTest(page=name, url=uri):
                    target = resolve(self.paths[name], uri)
                    if target is not None:
                        self.assertTrue(target.is_file(), "Missing link or asset: %s in %s" % (uri, name))
                        frag = urlsplit(uri).fragment
                        if tag == "a" and frag and target.suffix == ".html":
                            self.assertIn(unquote(frag), self.pages[target.name].ids)

    def test_no_external_executable_assets(self):
        for name, p in self.pages.items():
            self.assertEqual(p.external_scripts, [], "External executable asset in " + name)
        for css in ROOT.rglob("*.css"):
            text = css.read_text(encoding="utf-8")
            self.assertNotRegex(text, r"(?i)@import\s+(?:url\()?\s*['\"]?https?://")
            for m in re.finditer(r"url\(\s*['\"]?([^)'\"]+)", text, flags=re.I):
                uri = m.group(1).strip()
                if uri.startswith("data:"):
                    continue
                with self.subTest(css=str(css), url=uri):
                    target = resolve(css, uri)
                    self.assertIsNotNone(target, "Remote CSS asset: %s" % uri)
                    self.assertTrue(target.is_file(), "Missing CSS asset %s" % uri)

    def test_sitemap_robots(self):
        root = ET.parse(ROOT / "sitemap.xml").getroot()
        locs = {el.text for el in root.iter() if el.tag.split("}")[-1] == "loc"}
        expected = {ORIGIN + ("/" if name == "index.html" else "/" + name) for name in PAGES}
        self.assertEqual(locs, expected)
        self.assertIn("Sitemap: " + ORIGIN + "/sitemap.xml",
                      (ROOT / "robots.txt").read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
