# Dedicated service pages (answer-first, for search + AI answer engines). Run via gen.py.
import json as _json

ORIGIN = "https://techpartner.openidea.co.in"

SP = [
 dict(slug="website-development", name="Website Development", svc="Website Development",
  title="Website Development Company in Greater Noida &amp; Noida | Open Idea",
  desc="Fast, mobile-first business websites with WhatsApp, booking and SEO built in. Live in 2–5 days. Open Idea, Greater Noida West, serving all of India.",
  h1="Business websites that <em>bring enquiries.</em>",
  answer="Open Idea builds fast, mobile-first websites for small businesses and startups in Greater Noida, Noida, Delhi NCR and across India. Most business websites go live in 2–5 days, with WhatsApp chat, enquiry forms, Google Maps and search setup included.",
  get=[("Mobile-first design","Built for phones first, where most of your customers will see it."),
       ("WhatsApp &amp; enquiry forms","Every enquiry reaches your WhatsApp with the customer's details."),
       ("Google-ready SEO","Titles, schema, sitemap and Search Console set up from day one."),
       ("Booking &amp; payments","Online booking, Razorpay or Stripe, when you need them."),
       ("Fast loading","Optimised images, fonts and hosting so pages open in seconds."),
       ("You own everything","Domain, content and code stay with your business.")],
  who=["Shops, clinics, restaurants, salons and service businesses","Manufacturers and B2B suppliers who need a catalogue","Startups that need a launch or waitlist page","Businesses with an old site that looks dated or loads slowly"],
  steps=[("Share your details","Tell us about your business on WhatsApp or the form.","Day 0"),
         ("First draft","See your homepage design and content.","24–48 hrs"),
         ("Build &amp; review","All pages, forms and integrations, with your edits.","2–4 days"),
         ("Go live","Domain connected, Google set up and handover.","Day 5")],
  faq=[("How long does it take to build a business website?","Most business websites go live in 2–5 days. You see a first draft within 24–48 hours of sharing your details."),
       ("Will my website show up on Google?","Yes. Every site includes page titles, descriptions, schema, a sitemap and Google Search Console setup. Ongoing SEO is available if you want more traffic."),
       ("Can I update the website myself?","Yes. We can set up an easy editor for text and images, or handle updates for you."),
       ("Do you build e-commerce websites?","Yes. We set up Shopify or WooCommerce stores, usually in 3–7 days, with payments, shipping and WhatsApp order alerts.")]),
 dict(slug="whatsapp-ai-chatbot", name="WhatsApp AI Chatbot", svc="WhatsApp AI Assistant",
  title="WhatsApp AI Chatbot for Business in India | Open Idea",
  desc="A WhatsApp AI chatbot that answers customers 24×7, captures leads and books appointments on your official number. Setup in 3–7 days.",
  h1="A WhatsApp assistant that <em>never sleeps.</em>",
  answer="A WhatsApp AI chatbot answers your customers on your official WhatsApp Business number 24×7. It replies in English or Hindi, captures leads, shares your catalogue and books appointments, and hands the chat to your team when a person is needed. Open Idea sets it up in 3–7 days.",
  get=[("Instant replies 24×7","Customers get answers in seconds, even at midnight."),
       ("Trained on your business","Answers from your products, prices, policies and FAQs."),
       ("Lead capture","Name, number and need saved to Google Sheets or your CRM."),
       ("Bookings &amp; reminders","Appointments booked in chat with automatic reminders."),
       ("Human handover","Your team takes over the chat whenever needed."),
       ("Official WhatsApp API","Runs on the verified WhatsApp Business API, not a personal number.")],
  who=["Clinics, salons and coaching centres that take bookings","Retailers and D2C brands answering product questions","Real estate and education teams handling lots of leads","Any business missing WhatsApp messages after hours"],
  steps=[("Share your FAQs","Send us your common questions, catalogue and rules.","Day 0"),
         ("Set up WhatsApp API","Your number connected to the official API.","1–2 days"),
         ("Train &amp; test","The assistant learns your business; you test it.","2–4 days"),
         ("Go live","Switch on, with a dashboard to watch every chat.","Day 7")],
  faq=[("What is a WhatsApp AI chatbot?","It is an AI assistant on your WhatsApp Business number that replies to customers automatically, captures leads and books appointments, using information about your business."),
       ("Can it reply in Hindi?","Yes. It can reply in English, Hindi or Hinglish, matching the customer."),
       ("Will I lose control of my WhatsApp?","No. You can see every chat and take over any conversation at any time."),
       ("How long does setup take?","Usually 3–7 days, including WhatsApp Business API approval, training and testing.")]),
 dict(slug="ai-automation", name="AI Automation", svc="AI Automation",
  title="AI Automation &amp; AI Agents for Small Businesses in India | Open Idea",
  desc="AI agents, voice agents and n8n / Make / Zapier workflows that follow up leads, process documents and save hours every week. Live in 2–14 days.",
  h1="Let AI do the <em>repetitive work.</em>",
  answer="AI automation connects your tools and uses AI to handle repetitive work: replying to enquiries, following up leads, reading invoices and PDFs into sheets or your ERP, and answering calls. Open Idea builds custom AI agents and n8n, Make or Zapier workflows for Indian SMEs, usually live in 2–14 days.",
  get=[("Custom AI agents","Support or sales bots trained on your own documents and data."),
       ("Workflow automation","n8n, Make or Zapier flows between WhatsApp, Sheets, CRM and email."),
       ("AI voice agents","Answer or make calls, qualify leads and confirm appointments."),
       ("Document processing","Invoices and PDFs read into Google Sheets or your ERP."),
       ("AI lead generation","Find, enrich and reach out to leads automatically."),
       ("Maintenance","Monthly monitoring so automations keep working.")],
  who=["Teams copying data between tools by hand","Businesses with more leads than people to follow up","Finance and ops teams buried in invoices and PDFs","Founders who want an AI audit and a clear roadmap"],
  steps=[("AI audit","We map where your team loses time.","2–3 days"),
         ("Pick quick wins","Choose the automations with the biggest payoff.","Day 3"),
         ("Build &amp; test","Workflows and agents built and tested on real data.","2–10 days"),
         ("Launch &amp; monitor","Go live with monitoring and a monthly check-in.","Ongoing")],
  faq=[("What can AI automation do for a small business?","It can reply to enquiries, follow up leads, send reminders, read invoices and documents, and move data between your tools, so your team spends less time on repetitive work."),
       ("What is the difference between n8n, Make and Zapier?","All three connect apps into workflows. Zapier is simplest, Make is more visual and flexible, and n8n can be self-hosted and suits complex or high-volume flows. We pick the right one for your needs."),
       ("What is a RAG chatbot?","A RAG chatbot answers questions using your own documents, such as manuals, policies or product sheets, so its answers stay accurate to your business. It usually takes about a week to set up."),
       ("Is my data safe?","Yes. We use official APIs, limit access to what each workflow needs, and can run automations on infrastructure you control.")]),
 dict(slug="mvp-development", name="Startup MVP Development", svc="Startup MVP / App",
  title="Startup MVP Development in India: AI SaaS, Apps &amp; No-code | Open Idea",
  desc="Launch your startup MVP fast: AI-wrapper SaaS in 1–3 weeks, no-code MVPs in 1–2 weeks, prototypes in 3–5 days. DPIIT-recognised, AIC-GBU incubated team.",
  h1="From idea to MVP <em>in weeks, not months.</em>",
  answer="Open Idea builds MVPs for early-stage founders in India: AI-wrapper SaaS products (GPT or Claude with UI, login and payments) in 1–3 weeks, no-code or low-code MVPs in 1–2 weeks, and clickable prototypes in 3–5 days. We are a DPIIT-recognised startup incubated at AIC-GBU, so we build the way founders think.",
  get=[("AI-wrapper SaaS MVP","GPT or Claude, clean UI, auth and payments."),
       ("No-code / low-code MVP","Bubble, FlutterFlow or Lovable when speed matters most."),
       ("Clickable prototype","Figma to a live demo for investors and early users."),
       ("Landing page + waitlist","Validate demand with Stripe or Razorpay pre-orders."),
       ("MVP rescue","Fix bugs, deploy properly and get ready to scale."),
       ("Product roadmap","A teardown and clear plan for what to build next.")],
  who=["First-time founders validating an idea","Startups preparing for an investor or incubator demo","Teams whose MVP is stuck, broken or not deployed","SMEs launching a new digital product"],
  steps=[("Scope call","We cut your idea to the smallest useful version.","Day 0–1"),
         ("Design","Screens and flows you can click through.","3–5 days"),
         ("Build","Weekly demos while we build the MVP.","1–3 weeks"),
         ("Launch","Deployed, tracked and ready for real users.","Launch day")],
  faq=[("How long does it take to build an MVP?","A focused AI-wrapper SaaS MVP usually takes 1–3 weeks, a no-code MVP 1–2 weeks, and a clickable prototype 3–5 days. Exact timing depends on scope, which we agree before starting."),
       ("Should I build my MVP with code or no-code?","No-code is fastest for testing an idea. Code is better when you need custom AI, scale or full control. We recommend the right path on the scope call."),
       ("Do you sign an NDA?","Yes. We are happy to sign an NDA before you share your idea, and the code belongs to you."),
       ("Can you help after launch?","Yes. We help with fixes, new features, analytics and scaling as you grow.")]),
 dict(slug="crm-software", name="CRM Software for Small Business", svc="Business Software / CRM",
  title="CRM Setup &amp; Custom CRM Software for Small Businesses | Open Idea",
  desc="Never miss a follow-up. HubSpot or Zoho CRM setup, or a simple custom CRM, with WhatsApp and website leads flowing in automatically. Setup in 3–5 days.",
  h1="Every lead in one place, <em>every follow-up on time.</em>",
  answer="A CRM keeps every lead from WhatsApp, calls, your website and ads in one place and reminds your team to follow up. Open Idea sets up HubSpot or Zoho CRM, or builds a simple custom CRM, for Indian small businesses, usually in 3–5 days, with leads flowing in automatically.",
  get=[("HubSpot or Zoho setup","Pipeline, stages and fields that match how you sell."),
       ("Custom mini CRM","A simple CRM built just for your team, when off-the-shelf is too much."),
       ("Leads flow in automatically","From WhatsApp, website forms, Meta and Google ads."),
       ("Follow-up reminders","Automatic tasks so no lead goes cold."),
       ("Sales dashboard","See leads, conversions and team performance at a glance."),
       ("Team training","A short session so everyone actually uses it.")],
  who=["Businesses tracking leads in Excel or WhatsApp","Sales teams that miss follow-ups","Owners who want to see which ads bring real customers","Growing teams of 2 to 50 people"],
  steps=[("Map your sales","How leads come in and how you close them.","Day 0"),
         ("Set up CRM","Pipeline, fields, users and permissions.","1–2 days"),
         ("Connect sources","WhatsApp, website and ads flowing in.","1–2 days"),
         ("Train &amp; launch","Team session and go live.","Day 5")],
  faq=[("Do I need a CRM?","If your leads come from more than one place and follow-ups get missed, yes. A CRM keeps every lead in one place and reminds your team to act."),
       ("HubSpot or Zoho, which is better?","HubSpot is easiest to start with and strong for marketing. Zoho is very affordable and flexible for Indian businesses. We recommend one after understanding your team."),
       ("Can WhatsApp leads go into the CRM automatically?","Yes. We connect WhatsApp, website forms and Meta and Google ads so every new lead is created in the CRM automatically."),
       ("How long does CRM setup take?","Usually 3–5 days, including connecting your lead sources and training your team.")]),
]


def _sp_page(d):
    slug = d["slug"]
    url = f"{ORIGIN}/{slug}.html"
    plain = html.unescape(re.sub(r"<.*?>", "", d["h1"]))
    wa = "https://wa.me/918130296940?text=" + quote(f"Hi Open Idea! I'm interested in {html.unescape(d['name'])}.")
    gets = "".join(f'<li class="rv"><b>{t}</b><span>{x}</span></li>' for t, x in d["get"])
    who = "".join(f'<li class="rv">{w}</li>' for w in d["who"])
    steps = "".join(f'<li class="step rv" data-rv="left"><span class="n">{i:02d}</span><div><h3>{t} <small class="sp-when">{w}</small></h3><p>{x}</p></div></li>'
                    for i, (t, x, w) in enumerate(d["steps"], 1))
    faqs = "".join(f'<details class="rv"><summary>{q}</summary><p>{a}</p></details>' for q, a in d["faq"])
    others = "".join(f'<a href="{o["slug"]}.html">{o["name"]}</a>' for o in SP if o is not d)
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "Service", "@id": url + "#service", "name": html.unescape(d["name"]), "serviceType": html.unescape(d["name"]),
         "description": d["answer"], "url": url, "provider": {"@id": ORIGIN + "/#org"},
         "areaServed": [{"@type": "Country", "name": "India"}, {"@type": "City", "name": "Greater Noida"}, {"@type": "City", "name": "Noida"}]},
        {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in d["faq"]]},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": ORIGIN + "/"},
            {"@type": "ListItem", "position": 2, "name": "Services", "item": ORIGIN + "/services.html"},
            {"@type": "ListItem", "position": 3, "name": html.unescape(d["name"]), "item": url}]}]}
    body = f'''<section class="page-hero sp-hero">
 <div class="hero-glow" aria-hidden="true"></div><div class="hero-grid" aria-hidden="true"></div>
 <div class="wrap">
  <nav class="crumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="services.html">Services</a><span>/</span><span>{d["name"]}</span></nav>
  <h1>{d["h1"]}</h1>
  <p class="fx-sub sp-answer">{d["answer"]}</p>
  <div class="sp-cta"><a href="index.html#contact" class="btn btn-p" data-service="{d["svc"]}">Start your project <svg class="i"><use href="#arrow"/></svg></a><a href="{wa}" class="btn btn-o btn-wa" target="_blank" rel="noopener" data-lead="whatsapp"><svg class="i" viewBox="0 0 32 32" aria-hidden="true" style="fill:currentColor;stroke:none"><path d="M16.04 3C9 3 3.3 8.7 3.3 15.73c0 2.25.6 4.45 1.72 6.38L3.2 28.8l6.86-1.8a12.7 12.7 0 0 0 5.98 1.52c7.03 0 12.74-5.7 12.74-12.74 0-3.4-1.33-6.6-3.73-9A12.66 12.66 0 0 0 16.04 3Zm5.8 15.42c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.5-2.55-1.58a9.57 9.57 0 0 1-1.77-2.2c-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.8 2.66 1.15 3.2.92 3.81.86.61-.06 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z"/></svg>WhatsApp us</a></div>
 </div>
</section>
<section class="sp-sec"><div class="wrap">
 <div class="sec-head rv" style="text-align:left;margin:0 0 24px"><span class="eyebrow">What you get</span><h2>Everything included, <em>nothing extra to chase.</em></h2></div>
 <ul class="sp-get">{gets}</ul>
</div></section>
<section class="sp-sec alt"><div class="wrap sp-two">
 <div><div class="sec-head rv" style="text-align:left;margin:0 0 20px"><span class="eyebrow">Who it's for</span><h2>Built for <em>businesses like yours.</em></h2></div>
  <ul class="sp-who">{who}</ul></div>
 <div><div class="sec-head rv" style="text-align:left;margin:0 0 20px"><span class="eyebrow">How it works</span><h2>Clear steps, <em>clear timelines.</em></h2></div>
  <ol class="steps">{steps}</ol></div>
</div></section>
<section class="sp-sec"><div class="wrap faq-wrap">
 <div class="sec-head rv" style="text-align:left;margin:0"><span class="eyebrow">FAQ</span><h2>{d["name"]}, <em>answered.</em></h2><p>More questions? <a href="{wa}" target="_blank" rel="noopener" data-lead="whatsapp" class="faq-wa">Ask us on WhatsApp</a>.</p></div>
 <div class="faq">{faqs}</div>
</div></section>
<section class="sp-sec" style="padding-top:0"><div class="wrap"><div class="sp-more rv"><span>Also from Open Idea</span>{others}<a href="services.html">All 75+ services</a></div></div></section>
{CTA}
<script type="application/ld+json">{_json.dumps(ld, ensure_ascii=False)}</script>'''
    out = page(d["title"], d["desc"], body)
    open(f"{slug}.html", "w").write(out)


for _d in SP:
    _sp_page(_d)
print("ok", len(SP), "service pages")
