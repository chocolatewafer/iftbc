(function () {
  const config = window.SITE_CONFIG || {};
  const logo = document.getElementById("logo");
  const contacts = document.getElementById("contacts");
  const slides = document.querySelectorAll(".slide");

  document.title = config.title || config.name || document.title;

  const description = document.querySelector('meta[name="description"]');
  if (description && config.description) {
    description.setAttribute("content", config.description);
  }

  function isAssetPath(value) {
    return typeof value === "string" && /^assets\/[A-Za-z0-9._-]+$/.test(value);
  }

  if (isAssetPath(config.favicon)) {
    const icon = document.querySelector('link[rel="icon"]');
    const apple = document.querySelector('link[rel="apple-touch-icon"]');
    if (icon) icon.href = config.favicon;
    if (apple) apple.href = config.favicon;
  }

  if (logo) {
    logo.draggable = false;
    logo.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
    logo.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });
    if (isAssetPath(config.logo)) {
      logo.src = config.logo;
      logo.alt = config.name || logo.alt;
    }
  }

  const icons = {
    whatsapp:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    phone:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',
    facebook:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'
  };

  function enabled(value) {
    return value != null && String(value).trim() !== "";
  }

  function httpsUrlOnHosts(raw, hosts) {
    try {
      const url = new URL(raw);
      if (url.protocol !== "https:") return "";
      if (hosts.indexOf(url.hostname) === -1) return "";
      return url.href;
    } catch (err) {
      return "";
    }
  }

  function whatsappHref(value) {
    const raw = String(value).trim();
    if (/^https?:\/\//i.test(raw)) {
      return httpsUrlOnHosts(raw, ["wa.me", "api.whatsapp.com", "www.whatsapp.com"]);
    }
    const digits = raw.replace(/\D/g, "");
    return digits ? "https://wa.me/" + digits : "";
  }

  function phoneHref(value) {
    const raw = String(value).trim();
    const number = raw.replace(/^tel:/i, "").replace(/[^\d+]/g, "");
    return /^\+?\d+$/.test(number) ? "tel:" + number : "";
  }

  function facebookHref(value) {
    const raw = String(value).trim();
    if (/^https?:\/\//i.test(raw)) {
      return httpsUrlOnHosts(raw, ["facebook.com", "www.facebook.com", "m.facebook.com", "web.facebook.com"]);
    }
    const handle = raw.replace(/^@/, "").replace(/[^A-Za-z0-9._/]/g, "");
    return handle ? "https://www.facebook.com/" + handle : "";
  }

  const items = [
    { key: "whatsapp", label: "WhatsApp", href: enabled(config.whatsapp) ? whatsappHref(config.whatsapp) : "" },
    { key: "phone", label: "Phone", href: enabled(config.phone) ? phoneHref(config.phone) : "" },
    { key: "facebook", label: "Facebook", href: enabled(config.facebook) ? facebookHref(config.facebook) : "" }
  ].filter(function (item) {
    return item.href;
  });

  if (items.length && contacts) {
    contacts.hidden = false;
    contacts.replaceChildren();
    items.forEach(function (item) {
      const link = document.createElement("a");
      link.className = "contact";
      link.href = item.href;
      link.setAttribute("aria-label", item.label);
      if (item.key !== "phone") {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      link.insertAdjacentHTML("afterbegin", icons[item.key]);
      contacts.appendChild(link);
    });
  }

  if (!slides.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    slides.forEach(function (slide) {
      slide.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          entry.target.classList.add("is-visible");
        } else if (!entry.isIntersecting) {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    { threshold: [0.45, 0.6] }
  );

  slides.forEach(function (slide) {
    observer.observe(slide);
  });
})();
