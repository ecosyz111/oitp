"""Build a copy of the site that lives under a sub-path (e.g. openidea.co.in/techpartner).

The source keeps simple relative paths so it also works on its own domain. This script copies
it to OUT and rewrites every relative asset/page reference to an absolute one under BASE, so the
pages work at both /techpartner and /techpartner/ when another site proxies (rewrites) to them.

Usage: python3 tools/basepath.py SRC_DIR OUT_DIR /techpartner/ https://openidea.co.in
"""
import os
import re
import shutil
import sys

src, out, base, origin = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4].rstrip("/")
if not base.endswith("/"):
    base += "/"

SKIP = {".git", "tools", "node_modules"}
shutil.rmtree(out, ignore_errors=True)
shutil.copytree(src, out, ignore=lambda d, names: [n for n in names if n in SKIP])

PAGES = {n: ("" if n == "index.html" else n) for n in sorted(os.listdir(out))
         if n.endswith(".html") and not n.startswith("google")}
ATTR = re.compile(r'\b(src|href|poster|data-src|data-src-m|data-poster)="([^"]*)"')


def fix(url):
    if not url or url.startswith(("#", "/", "http:", "https:", "mailto:", "tel:", "data:", "javascript:")):
        return url
    if url == "index.html":
        return base
    if url.startswith("index.html#"):
        return base + url[len("index.html"):]
    return base + url


for page, slug in PAGES.items():
    p = os.path.join(out, page)
    if not os.path.exists(p):
        continue
    s = open(p, encoding="utf-8").read()
    s = ATTR.sub(lambda m: f'{m.group(1)}="{fix(m.group(2))}"', s)
    s = s.replace('"i":"img/', f'"i":"{base}img/')                       # demo carousel data
    s = re.sub(r'(<meta property="og:image" content=")([^"]+)"', lambda m: m.group(1) + (origin + fix(m.group(2)) if fix(m.group(2)).startswith('/') else m.group(2)) + '"', s)
    s = re.sub(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{origin}{base}{slug}">', s)
    canon = f'<link rel="canonical" href="{origin}{base}{slug}">'
    s = re.sub(r'<link rel="canonical"[^>]*>\n?', "", s).replace("</title>", "</title>\n" + canon, 1)
    open(p, "w", encoding="utf-8").write(s)

for js in ["js/site.js", "js/site.min.js"]:
    p = os.path.join(out, js)
    if os.path.exists(p):
        s = open(p, encoding="utf-8").read().replace("'js/vendor/", f"'{base}js/vendor/").replace('"js/vendor/', f'"{base}js/vendor/')
        open(p, "w", encoding="utf-8").write(s)
print("built", out, "for", origin + base)
