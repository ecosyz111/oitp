"""Prepare the site for production.

1. python3 gen.py               -> rebuild services.html / products.html from index.html
2. minify css/site.css, js/site.js -> css/site.min.css, js/site.min.js (esbuild)
3. point every page at the minified files with a ?v=<hash> so browsers can cache them for a year
   and still pick up each new release.

Usage: python3 release.py [path/to/esbuild]
"""
import os
import hashlib
import re
import subprocess
import sys

ESBUILD = sys.argv[1] if len(sys.argv) > 1 else "esbuild"
PAGES = sorted(f for f in os.listdir(".") if f.endswith(".html") and f not in ("index.orig.html", "template.html", "partials_icons.html") and not f.startswith("google"))

subprocess.run([sys.executable, "gen.py"], check=True)
subprocess.run([ESBUILD, "css/site.css", "--minify", "--outfile=css/site.min.css", "--log-level=warning"], check=True)
subprocess.run([ESBUILD, "js/site.js", "--minify", "--target=es2019", "--outfile=js/site.min.js", "--log-level=warning"], check=True)


def ver(path):
    return hashlib.sha1(open(path, "rb").read()).hexdigest()[:8]


v_css, v_js = ver("css/site.min.css"), ver("js/site.min.js")
for p in PAGES:
    s = open(p).read()
    s = re.sub(r'href="css/site(\.min)?\.css(\?v=\w+)?"', f'href="css/site.min.css?v={v_css}"', s)
    s = re.sub(r'src="js/site(\.min)?\.js(\?v=\w+)?"', f'src="js/site.min.js?v={v_js}"', s)
    open(p, "w").write(s)
print("release ready  css", v_css, " js", v_js)
