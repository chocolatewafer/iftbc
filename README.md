# Innova Food Tech Business Consultancy (IFTBC)

**Global Food Technology Solutions Consulting from Nepal**

[iftbc.com](https://iftbc.com) is the public website for Innova Food Tech Business Consultancy (IFTBC): a Kathmandu-based consultancy that helps food manufacturers and food-tech businesses improve operations, quality, products, and market position.

This repository is the source of that site. It is a static, dependency-free GitHub Pages project.

---

## About the business

IFTBC works with food manufacturing and food-technology clients in Nepal and internationally. The practice is positioned around local knowledge with global standards: **from Kathmandu to the world**.

### What we do

- **Process optimization & efficiency** — production systems, throughput, and waste reduction
- **Quality control & compliance** — food safety, quality systems, and regulatory readiness
- **Product development & innovation** — new products, reformulation, and scale-up
- **Market entry & growth strategies** — market access, positioning, and expansion
- **Technology integration & digital transformation** — plant systems, data, and digital tools

### Contact

| Channel | Value |
| --- | --- |
| Website | [https://iftbc.com](https://iftbc.com) |
| Phone | [+977 9841689111](tel:+9779841689111) |
| WhatsApp | [+977 9841689111](https://wa.me/9779841689111) |
| Facebook | [sanjay.nidhi.9](https://www.facebook.com/sanjay.nidhi.9/) |

A Nepal `.com.np` domain (`iftbc.com.np`) is planned as an additional address for the same site.

---

## About the website

The site is a short, full-viewport scroll: six slides taken from the original brand film, rebuilt as HTML so they stay sharp on phones and desktops.

1. Introduction — Innova Foodtech Business Consultancy
2. Expert solutions for food manufacturing and technology
3. Our expertise
4. From Kathmandu to the world
5. Partner with us today
6. Contact

The logo stays top-left. WhatsApp, phone, and Facebook stay at the bottom. Each slide snaps into view; headings and lists fade and rise in, then fade out when you leave the slide.

There is no framework, tracker, or build step. GitHub Pages serves the files from the repository root.

**Live URLs**

- Custom domain: [https://iftbc.com](https://iftbc.com)
- GitHub Pages: [https://chocolatewafer.github.io/iftbc/](https://chocolatewafer.github.io/iftbc/) (redirects to the custom domain)

---

## Repository layout

```
iftbc/
├── index.html              Page structure, slide copy, and SEO meta
├── styles.css              Layout, scroll-snap, and fade transitions
├── site.js                 Contacts, slide visibility, reduced-motion
├── config.js               Branding and contact values (edit this)
├── robots.txt              Search-engine crawl rules
├── sitemap.xml             Canonical URL list for crawlers
├── CNAME                   GitHub Pages custom domain: iftbc.com
├── .nojekyll               Serve files as-is (no Jekyll)
├── .gitignore
├── README.md
└── assets/
    ├── logo.jpeg           On-page logo and Open Graph image
    ├── iftbc_favicon.png   Favicon
    └── IFTBC_VIDEO.mp4     Original looping brand film (not used on the live page)
```

---

## Editing the site

### Contacts and branding

All contact links and asset paths live in [`config.js`](config.js):

```js
window.SITE_CONFIG = {
  name: "Innova Food Tech Business Consultancy (IFBTC)",
  description: "Global Food Technology Solutions Consulting from Nepal",
  logo: "assets/logo.jpeg",
  favicon: "assets/iftbc_favicon.png",
  whatsapp: "+977 9841689111",
  phone: "+977 9841689111",
  facebook: "https://www.facebook.com/sanjay.nidhi.9/"
};
```

- WhatsApp accepts a number (`+977 9841689111`) or a full `https://wa.me/...` URL.
- Phone becomes a `tel:` link.
- Facebook accepts a full URL or a page/profile name.
- Leave a field as `""` or `null` to hide that icon.

After editing, commit and push to `main`. GitHub Pages rebuilds from the repository root.

### Slide copy

Slide text is in [`index.html`](index.html). Keep each `<section class="slide">` as one full-screen panel. The `style="--d:N"` value on `.reveal` elements is the fade delay (in steps of ~95ms).

### Look and motion

[`styles.css`](styles.css) controls colors, type, scroll-snap, and transitions.

| Token | Role |
| --- | --- |
| `--navy` | Page background (`#0a1628`) |
| `--accent` | Green highlight (`#3ddc84`) |
| `--icon` | Primary text |
| `--muted` | Secondary text |

Motion uses an `IntersectionObserver` in [`site.js`](site.js). If the visitor has **prefers-reduced-motion**, fades are skipped and all slides are shown at full opacity.

---

## Local preview

From this directory:

```bash
python -m http.server 8080 --bind 127.0.0.1
```

Open [http://127.0.0.1:8080/](http://127.0.0.1:8080/). No install or build is required.

---

## Deployment

| Setting | Value |
| --- | --- |
| Repository | [chocolatewafer/iftbc](https://github.com/chocolatewafer/iftbc) |
| Branch | `main` |
| Publish path | `/` (repository root) |
| Custom domain | `iftbc.com` |
| HTTPS | Enforced (GitHub Pages Let’s Encrypt) |

Pushing to `main` is enough. There is no GitHub Actions workflow.

### DNS (Hostinger)

`iftbc.com` is registered at Hostinger. GitHub Pages needs:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| ALIAS | `@` | `chocolatewafer.github.io` |
| CNAME | `www` | `iftbc.com` |

Do not point these records at Hostinger parking IPs, and do not use Hostinger SSL while the A records point at GitHub. GitHub issues the certificate for `iftbc.com` and `www.iftbc.com`.

`iftbc.com.np` is not wired yet. When that domain is active, it can redirect to `iftbc.com` or become the GitHub Pages custom domain. GitHub Pages supports only one custom domain per site.

---

## Search engines (SEO)

The homepage is crawlable without JavaScript. It includes:

- Unique title and meta description
- Canonical URL `https://iftbc.com/`
- Open Graph and Twitter card tags
- JSON-LD (`ProfessionalService`) for IFTBC, Kathmandu, phone, and Facebook
- [`robots.txt`](robots.txt) allowing all crawlers
- [`sitemap.xml`](sitemap.xml)

Indexing is not instant. After the sitemap is live, ask Google and Bing to crawl the site:

1. [Google Search Console](https://search.google.com/search-console) — add `https://iftbc.com`, verify the domain (DNS TXT or the HTML file method), then submit `https://iftbc.com/sitemap.xml`.
2. [Bing Webmaster Tools](https://www.bing.com/webmasters) — import the Search Console property or add the site and submit the same sitemap.

External links (Facebook, directories, partners) help discovery more than on-page tags alone.

---

## Design notes

- Static HTML, CSS, and a small amount of vanilla JavaScript
- Semantic sections, no menus, no analytics
- Viewport-fit and safe-area padding for phones
- Original brand film remains in `assets/` for reference; the live page does not play it

---

## License

Site content, logo, and brand assets belong to Innova Food Tech Business Consultancy. Code in this repository is provided for operating the IFTBC website.
