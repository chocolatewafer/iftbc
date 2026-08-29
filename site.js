(function () {
  const config = window.SITE_CONFIG || {};
  const video = document.getElementById("bg-video");
  const logo = document.getElementById("logo");
  const contacts = document.getElementById("contacts");
  const sampleCanvas = document.createElement("canvas");
  const sampleCtx = sampleCanvas.getContext("2d", {
    alpha: false,
    willReadFrequently: true
  });
  sampleCanvas.width = 8;
  sampleCanvas.height = 8;

  document.title = config.name || document.title;

  const description = document.querySelector('meta[name="description"]');
  if (description && config.description) {
    description.setAttribute("content", config.description);
  }

  if (config.favicon) {
    const icon = document.querySelector('link[rel="icon"]');
    const apple = document.querySelector('link[rel="apple-touch-icon"]');
    if (icon) icon.href = config.favicon;
    if (apple) apple.href = config.favicon;
  }

  if (config.logo && logo) {
    logo.src = config.logo;
    logo.alt = config.name || logo.alt;
  }

  if (config.video && video) {
    const source = video.querySelector("source");
    if (source) source.src = config.video;
    video.load();
  }

  const icons = {
    whatsapp:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.1A11 11 0 0 0 20.5 3.5zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.9.7.7-3.8-.2-.3A9.1 9.1 0 1 1 12 20.5zm5.3-6.8c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.2l-.9 1.1c-.2.2-.3.2-.6.1a7.5 7.5 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.5-.6.2-.3c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1.1 2.8 1.2 3 .2.4 2.1 3.3a11.4 11.4 0 0 0 4.4 2.4c.6.2 1.1.1 1.5.1.5-.1 1.7-.7 1.9-1.3s.2-1.2.2-1.3-.2-.2-.5-.3z"/></svg>',
    phone:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 2.8c.4-.4 1-.6 1.6-.5l2.2.5c.7.2 1.2.8 1.3 1.5l.4 2.3c.1.7-.2 1.4-.7 1.8L10 9.8c.8 1.6 2.1 3 3.8 3.8l1.4-1.4c.4-.5 1.1-.8 1.8-.7l2.3.4c.7.1 1.3.6 1.5 1.3l.5 2.2c.1.6 0 1.2-.4 1.6l-1.1 1.1c-.5.5-1.2.8-1.9.7-4.2-.4-8.1-2.6-10.9-5.4S3.1 8.1 2.7 3.9c-.1-.7.2-1.4.7-1.9z"/></svg>',
    facebook:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z"/></svg>'
  };

  function enabled(value) {
    return value != null && String(value).trim() !== "";
  }

  function whatsappHref(value) {
    const raw = String(value).trim();
    if (/^https?:\/\//i.test(raw)) return raw;
    const digits = raw.replace(/\D/g, "");
    return digits ? "https://wa.me/" + digits : "";
  }

  function phoneHref(value) {
    const raw = String(value).trim();
    if (/^tel:/i.test(raw)) return raw;
    const number = raw.replace(/[^\d+]/g, "");
    return number ? "tel:" + number : "";
  }

  function facebookHref(value) {
    const raw = String(value).trim();
    if (/^https?:\/\//i.test(raw)) return raw;
    return "https://www.facebook.com/" + raw.replace(/^@/, "");
  }

  const items = [
    { key: "whatsapp", label: "WhatsApp", href: enabled(config.whatsapp) ? whatsappHref(config.whatsapp) : "" },
    { key: "phone", label: "Phone", href: enabled(config.phone) ? phoneHref(config.phone) : "" },
    { key: "facebook", label: "Facebook", href: enabled(config.facebook) ? facebookHref(config.facebook) : "" }
  ].filter((item) => item.href);

  if (items.length) {
    contacts.hidden = false;
    contacts.innerHTML = items
      .map(function (item) {
        return (
          '<a class="contact" href="' +
          item.href +
          '" aria-label="' +
          item.label +
          '"' +
          (item.key === "phone" ? "" : ' target="_blank" rel="noopener noreferrer"') +
          ">" +
          icons[item.key] +
          "</a>"
        );
      })
      .join("");
  }

  function keepPlaying() {
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    const play = video.play();
    if (play && typeof play.catch === "function") {
      play.catch(function () {});
    }
  }

  function paintFrameBase() {
    if (!video || !sampleCtx || !video.videoWidth) return;

    sampleCtx.drawImage(video, 0, 0, 8, 8);

    // Corners of the current frame — used as the page base on taller phones.
    const corners = [
      sampleCtx.getImageData(0, 0, 1, 1).data,
      sampleCtx.getImageData(7, 0, 1, 1).data,
      sampleCtx.getImageData(0, 7, 1, 1).data,
      sampleCtx.getImageData(7, 7, 1, 1).data
    ];
    let r = 0;
    let g = 0;
    let b = 0;
    for (let i = 0; i < corners.length; i += 1) {
      r += corners[i][0];
      g += corners[i][1];
      b += corners[i][2];
    }
    const color =
      "rgb(" +
      Math.round(r / corners.length) +
      "," +
      Math.round(g / corners.length) +
      "," +
      Math.round(b / corners.length) +
      ")";

    document.documentElement.style.backgroundColor = color;
    document.body.style.backgroundColor = color;
    document.documentElement.style.setProperty("--navy", color);

    const theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.setAttribute("content", color);
  }

  if (video) {
    video.addEventListener("loadeddata", function () {
      keepPlaying();
      paintFrameBase();
    });
    let lastSample = 0;
    video.addEventListener("playing", paintFrameBase);
    video.addEventListener("timeupdate", function () {
      const now = Date.now();
      if (now - lastSample < 250) return;
      lastSample = now;
      paintFrameBase();
    });
    video.addEventListener("pause", keepPlaying);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) keepPlaying();
    });
    window.addEventListener("resize", paintFrameBase);
    keepPlaying();
  }
})();
