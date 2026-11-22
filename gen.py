"""Generate sub pages (services.html, products.html) from index.html's shared shell."""
import re

idx = open("index.html").read()
head = idx[: idx.index("</head>")]
icons = re.search(r'<svg width="0".*?</svg>', idx, re.S).group(0)
header = re.search(r"<header.*?</header>", idx, re.S).group(0)
footer = re.search(r"<footer>.*?</footer>", idx, re.S).group(0)
appbar = re.search(r'<nav class="appbar".*?</nav>', idx, re.S).group(0)
wafab = re.search(r'<a class="wa-fab".*?</a>', idx, re.S).group(0)


def rel(html):
    """In-page anchors (#x) point back to the home page from sub pages."""
    return re.sub(r'href="#(\w*)"', lambda m: f'href="index.html#{m.group(1)}"' if m.group(1) else 'href="index.html"', html)


def page(title, desc, body):
    h = re.sub(r"<title>.*?</title>", f"<title>{title}</title>", head)
    h = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{desc}">', h)
    h = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{title}">', h)
    h = h.replace('<link rel="preload" as="image" href="media/hero-1-poster.webp" fetchpriority="high">\n', "")
    return (f"{h}</head>\n<body>\n{icons}\n"
            '<div class="progress" id="progress" aria-hidden="true"></div>\n'
            '<div class="pt" aria-hidden="true"><img src="img/logo.webp" alt=""></div>\n'
            f"{rel(header)}\n<main>\n{body}\n</main>\n{rel(footer)}\n{wafab}\n{rel(appbar)}\n"
            '<script src="js/site.js" defer></script>\n</body>\n</html>\n')


def hero(crumb, h1, p, chips):
    ch = "".join(f'<a href="#{i}">{t}</a>' for i, t in chips)
    return f'''<section class="page-hero">
 <div class="hero-glow" aria-hidden="true"></div><div class="hero-grid" aria-hidden="true"></div>
 <div class="wrap">
  <nav class="crumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><span>{crumb}</span></nav>
  <h1>{h1}</h1>
  <p class="fx-sub">{p}</p>
  <div class="chips">{ch}</div>
 </div>
</section>'''


CTA = '''<section style="padding-top:0">
 <div class="wrap"><div class="cta-band rv" data-rv="scale">
  <h2>Not sure what you need? <em>Let's talk it through.</em></h2>
  <a href="index.html#contact" class="btn btn-p">Get a Free Consultation <svg class="i"><use href="#arrow"/></svg></a>
 </div></div>
</section>'''

# ---------------------------------------------------------------- services
SERVICES = [
    ("web", "A", "Website &amp; <em>Digital</em> Solutions", "s1", "Fast, mobile-first websites and web apps that look sharp and rank on Google.",
     ["Business Website Development", "E-commerce Website Development", "Custom Web Application Development", "Landing Page Development",
      "Website Redesign &amp; Maintenance", "CMS Development", "Domain, Hosting &amp; Deployment"]),
    ("software", "B", "AI Products &amp; <em>Business</em> Software", "s2", "Ready-to-use and custom software that runs your daily operations.",
     ["AI Website Builder", "CRM &amp; Lead Management Software", "Inventory Management System", "Billing &amp; Invoice Management",
      "Appointment &amp; Booking Software", "B2B Order Management", "Custom Business Software"]),
    ("ai", "C", "AI &amp; Intelligent <em>Automation</em>", "s3", "AI agents and automations that answer, follow up and process work 24×7.",
     ["AI Chatbot Development", "WhatsApp Business Automation", "AI Voice Calling Agents", "AI Customer Support",
      "AI Lead Qualification", "Workflow &amp; Process Automation", "Document Processing Automation", "AI-powered Business Assistants"]),
    ("marketing", "D", "Digital Marketing &amp; <em>Growth</em>", "s4", "Marketing that brings real enquiries, not just likes.",
     ["Search Engine Optimization (SEO)", "Social Media Marketing", "Google Ads Management", "Meta Ads Management",
      "LinkedIn Marketing", "Content Marketing", "Lead Generation", "Marketing Automation"]),
    ("integration", "E", "Business Process &amp; <em>Integration</em>", "s5", "Connect your tools so data flows without copy-paste.",
     ["API Development &amp; Integration", "Third-party Software Integration", "ERP &amp; CRM Integration", "ONDC Integration",
      "Payment Gateway Integration", "Data Migration", "Cloud Infrastructure &amp; Deployment", "Business Workflow Consulting"]),
    ("branding", "F", "Branding &amp; <em>Creative</em> Solutions", "s6", "A brand people remember and creatives that sell.",
     ["Logo &amp; Brand Identity", "Graphic Design", "Social Media Creatives", "Product Catalogue Design",
      "Business Presentations", "Marketing Collateral", "UI/UX Design"]),
]
blocks = []
for sid, k, title, img, lead, items in SERVICES:
    lis = "".join(f'<li class="rv"><span>{k}{i+1}</span>{it}</li>' for i, it in enumerate(items))
    plain = re.sub(r"<.*?>", "", title)
    blocks.append(f'''<div class="svc" id="{sid}">
  <div class="svc-side">
   <div class="thumb rv" data-rv="wipe"><img src="img/{img}.webp" alt="{plain}" loading="lazy" width="640" height="400"></div>
   <span class="svc-k">{k} · {len(items)} services</span>
   <h2>{title}</h2>
   <p>{lead}</p>
   <a href="index.html#contact" class="btn btn-p">Enquire now <svg class="i"><use href="#arrow"/></svg></a>
  </div>
  <ul class="svc-list">{lis}</ul>
 </div>''')
total = sum(len(s[5]) for s in SERVICES)
svc_body = hero("Services", f"Every service your business needs, <em>under one roof.</em>",
                f"{total} services across websites, software, AI, marketing, integrations and branding, built for Indian SMEs.",
                [(s[0], re.sub(r"<.*?>", "", s[2]).replace("&amp;", "&")) for s in SERVICES])
svc_body += '\n<section><div class="wrap">' + "\n".join(blocks) + "</div></section>\n" + CTA
open("services.html", "w").write(page("Services | Open Idea: Websites, Software, AI Automation &amp; Marketing",
                                      "Explore Open Idea's services: website development, business software, AI automation, digital marketing, integrations and branding for SMEs in India.",
                                      svc_body))

# ---------------------------------------------------------------- products
PRODUCTS = [
    ("chat", "WhatsApp AI Business Assistant", ["Answers customer queries automatically", "Product catalogue and enquiry handling", "Lead capture and follow-ups"],
     "₹5,000–₹20,000", "setup + ₹999–₹4,999/month", "5–7 days", True),
    ("web", "AI Website Builder for SMEs", ["Industry-specific templates", "AI-written website content", "Enquiry forms and WhatsApp integration"],
     "₹1,999–₹9,999", "per website", "7–10 days", False),
    ("users", "Mini CRM for Small Businesses", ["Lead tracking", "Sales pipeline", "Automatic follow-up reminders"],
     "₹499–₹2,999", "per month", "7–10 days", False),
    ("inv", "Smart Billing &amp; Invoice Generator", ["Invoice generation", "Payment reminders", "Customer and invoice records"],
     "₹299–₹999", "per month", "5–7 days", False),
    ("cal", "Appointment &amp; Booking System", ["Online booking", "Automated reminders", "Staff availability management"],
     "₹499–₹1,999", "per month", "5–7 days", False),
    ("mega", "AI Social Media Marketing Tool", ["Instagram and Facebook post generation", "Captions and creatives", "Content calendar"],
     "₹499–₹1,999", "per month", "5–7 days", False),
    ("box", "Inventory &amp; Stock Management", ["Stock tracking", "Low-stock alerts", "Purchase and sales records"],
     "₹499–₹2,499", "per month", "7–10 days", False),
    ("phone", "AI Voice Calling Assistant", ["Automated enquiry calls", "Appointment confirmations", "Lead qualification"],
     "₹5,000–₹25,000", "setup + usage", "7–14 days", False),
    ("star", "Customer Feedback &amp; Review Manager", ["Review collection", "Feedback forms", "Customer satisfaction analytics"],
     "₹499–₹1,999", "per month", "3–5 days", False),
    ("truck", "B2B Order &amp; Distributor Management", ["Digital product catalogue", "Bulk ordering", "Distributor order tracking"],
     "₹5,000–₹25,000", "setup", "10–15 days", False),
]
cards = []
for n, (ico, name, feats, price, unit, live, hot) in enumerate(PRODUCTS, 1):
    li = "".join(f"<li>{f}</li>" for f in feats)
    cards.append(f'''<article class="prod{' hot' if hot else ''} rv"{' data-rv="scale"' if hot else ''}>{'<span class="ribbon">MOST POPULAR</span>' if hot else ''}
   <div class="prod-top"><span class="ico"><svg class="i"><use href="#{ico}"/></svg></span><span class="no">{n:02d}</span></div>
   <h3>{name}</h3><ul>{li}</ul>
   <div class="prod-meta"><div class="price"><small>Starting at</small><b>{price}</b> <i>{unit}</i></div><span class="live">Live in {live}</span></div>
  </article>''')
prod_body = hero("Products", "Ready-to-use software, <em>live in days.</em>",
                 "Affordable products that solve everyday problems for Indian SMEs. Simple setup, small monthly fee, and support included.",
                 [("all", "All 10 products"), ("all", "Setup in 3–15 days"), ("all", "Monthly plans from ₹299")])
prod_body += '\n<section id="all"><div class="wrap"><div class="pgrid">' + "\n".join(cards) + "</div></div></section>\n" + CTA
open("products.html", "w").write(page("Products | Open Idea: WhatsApp AI, CRM, Billing &amp; More for SMEs",
                                      "Ready-to-deploy business products for Indian SMEs: WhatsApp AI assistant, AI website builder, CRM, billing, booking, inventory and more.",
                                      prod_body))
print("ok", total, "services,", len(PRODUCTS), "products")
