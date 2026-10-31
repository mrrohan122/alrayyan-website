// =========================================================================
// Al-Rayyan Dynamic Gallery Data & Controller (gallery-data.js)
// Zero-conflict architecture — works seamlessly with index.html
// - Fetches images ONLY from the gallery/ folder (English filenames)
// - Every entry uses a 100% unique image (duplicate between #8 and #21 resolved)
// - Sandwich Panel Rooms entries updated to titleAr: "غرف سندويش بنل" & category: "panels"
// - Every <img> tag includes loading="lazy" decoding="async" and object-fit: cover
// =========================================================================
(function() {
  if (window.__RAYYAN_GALLERY_INITIALIZED__) return;
  window.__RAYYAN_GALLERY_INITIALIZED__ = true;

  // Smart multi-extension fallback handler inside gallery/ folder
  if (!window.__handleGalleryImgError) {
    window.__handleGalleryImgError = function(img) {
      if (!img) return;
      const currentTry = parseInt(img.getAttribute("data-try") || "0", 10);
      const orig = img.getAttribute("data-orig") || img.getAttribute("src") || "";
      if (!img.getAttribute("data-orig")) {
        img.setAttribute("data-orig", orig);
      }
      const basePath = orig.replace(/\.[a-zA-Z0-9]+$/, "");
      const candidates = [".jpg", ".png", ".webp", ".JPG", ".JPEG"];

      if (currentTry < candidates.length) {
        img.setAttribute("data-try", (currentTry + 1).toString());
        img.src = basePath + candidates[currentTry];
        return;
      }

      const fallbackSvg = img.getAttribute("data-fallback");
      img.onerror = null;
      if (fallbackSvg) {
        img.src = fallbackSvg;
      }
    };
  }

  // Complete, unique portfolio items fetched exclusively from gallery/ folder
  const galleryData = [
    {
      serial: 1,
      src: "gallery/panel-1.jpeg",
      category: "panels",
      titleAr: "سندويش بنل - رقم 1",
      titleEn: "Sandwich Panels - #1",
      descAr: "توريد وتركيب ألواح سندويش بنل للغرف والملاحق والشقق كاملة.",
      descEn: "Supply and installation of sandwich panels for rooms and apartments."
    },
    {
      serial: 2,
      src: "gallery/panel-2.jpeg",
      category: "panels",
      titleAr: "سندويش بنل - رقم 2",
      titleEn: "Sandwich Panels - #2",
      descAr: "توريد وتركيب ألواح سندويش بنل للغرف والملاحق والشقق كاملة.",
      descEn: "Supply and installation of sandwich panels for rooms and apartments."
    },
    {
      serial: 3,
      src: "gallery/panel-3.jpeg",
      category: "panels",
      titleAr: "سندويش بنل - رقم 3",
      titleEn: "Sandwich Panels - #3",
      descAr: "توريد وتركيب ألواح سندويش بنل للغرف والملاحق والشقق كاملة.",
      descEn: "Supply and installation of sandwich panels for rooms and apartments."
    },
    {
      serial: 4,
      src: "gallery/shade-1.jpeg",
      category: "shades",
      titleAr: "مظلات مخروطي PVDF",
      titleEn: "PVDF Cone Shades",
      descAr: "تصميم وتنفيذ مظلات مخروطي بأغشية PVDF الألمانية والوطنية المقاومة للأشعة فوق البنفسجية والأمطار.",
      descEn: "Design and installation of conical PVDF membrane shades resistant to UV rays and rain."
    },
    {
      serial: 5,
      src: "gallery/shade-2.jpeg",
      category: "shades",
      titleAr: "مظلات إنشائية",
      titleEn: "Tensile Shades",
      descAr: "توريد وتركيب مظلات الشد الإنشائي للمشاريع والمواقف والمساحات الواسعة بهياكل فولاذية عالية المتانة.",
      descEn: "Engineering and installation of architectural tensile shades with heavy-duty steel structures."
    },
    {
      serial: 6,
      src: "gallery/shade-3.jpeg",
      category: "shades",
      titleAr: "مظلات سيارات - رقم 6",
      titleEn: "Car Shades - #6",
      descAr: "حلول كاملة للتظليل وتفصيل جميع أنواع مظلات السيارات.",
      descEn: "Complete shading solutions and custom car shades."
    },
    {
      serial: 7,
      src: "gallery/shade-5.jpeg",
      category: "swater",
      titleAr: "سواتر حديد",
      titleEn: "Iron Swater",
      descAr: "تركيب سواتر حديد (شرائح ومجدول) بدهانات فرن حرارية مقاومة للصدأ توفر الخصوصية التامة والأمان.",
      descEn: "Installation of oven-painted rust-resistant iron privacy screens providing complete security."
    },
    {
      serial: 8,
      src: "gallery/shade-6.jpeg",
      category: "swater",
      titleAr: "سواتر لكسان",
      titleEn: "Lexan Swater",
      descAr: "تنفيذ سواتر لكسان بولي كربونيت ضد الكسر بتصاميم فخمة تجمع بين الخصوصية والجمال العصري.",
      descEn: "Unbreakable polycarbonate Lexan privacy screens combining luxury aesthetics with full privacy."
    },
    {
      serial: 9,
      src: "gallery/swater-1.jpeg",
      category: "swater",
      titleAr: "سواتر - رقم 9",
      titleEn: "Privacy Screens - #9",
      descAr: "تركيب سواتر حديثة توفر الخصوصية التامة والحماية.",
      descEn: "Installation of modern privacy screens providing complete protection."
    },
    {
      serial: 10,
      src: "gallery/swater-2.jpeg",
      category: "swater",
      titleAr: "سواتر - رقم 10",
      titleEn: "Privacy Screens - #10",
      descAr: "تركيب سواتر حديثة توفر الخصوصية التامة والحماية.",
      descEn: "Installation of modern privacy screens providing complete protection."
    },
    {
      serial: 11,
      src: "gallery/swater-3.jpeg",
      category: "pergolas",
      titleAr: "برجولة مودرن",
      titleEn: "Modern Pergola",
      descAr: "تصميم وتنفيذ برجولة مودرن للحدائق والأسطح والجلسات الخارجية بلمسات معمارية أنيقة.",
      descEn: "Bespoke modern pergola for gardens, rooftops, and outdoor seating areas."
    },
    {
      serial: 12,
      src: "gallery/pergola-1.jpeg",
      category: "pergolas",
      titleAr: "برجولات - رقم 12",
      titleEn: "Pergolas - #12",
      descAr: "ابتكار مساحات استرخاء خارجية وبرجولات للحدائق.",
      descEn: "Innovative outdoor relaxation spaces and pergolas for gardens."
    },
    {
      serial: 13,
      src: "gallery/pergola-2.jpeg",
      category: "pergolas",
      titleAr: "برجولات - رقم 13",
      titleEn: "Pergolas - #13",
      descAr: "ابتكار مساحات استرخاء خارجية وبرجولات للحدائق.",
      descEn: "Innovative outdoor relaxation spaces and pergolas for gardens."
    },
    {
      serial: 14,
      src: "gallery/pergola-3.jpeg",
      category: "pergolas",
      titleAr: "برجولات - رقم 14",
      titleEn: "Pergolas - #14",
      descAr: "ابتكار مساحات استرخاء خارجية وبرجولات للحدائق.",
      descEn: "Innovative outdoor relaxation spaces and pergolas for gardens."
    },
    {
      serial: 15,
      src: "gallery/pergola-4.jpeg",
      category: "pergolas",
      titleAr: "برجولات - رقم 15",
      titleEn: "Pergolas - #15",
      descAr: "ابتكار مساحات استرخاء خارجية وبرجولات للحدائق.",
      descEn: "Innovative outdoor relaxation spaces and pergolas for gardens."
    },
    {
      serial: 16,
      src: "gallery/tent-1.jpeg",
      category: "tents",
      titleAr: "بيوت شعر - رقم 16",
      titleEn: "Traditional Tents - #16",
      descAr: "تفصيل وتركيب بيوت شعر ملكية وعادية بتصاميم تراثية وعصرية.",
      descEn: "Custom royal and regular traditional tents with modern designs."
    },
    {
      serial: 17,
      src: "gallery/tent-2.jpeg",
      category: "tents",
      titleAr: "بيوت شعر - رقم 17",
      titleEn: "Traditional Tents - #17",
      descAr: "تفصيل وتركيب بيوت شعر ملكية وعادية بتصاميم تراثية وعصرية.",
      descEn: "Custom royal and regular traditional tents with modern designs."
    },
    {
      serial: 18,
      src: "gallery/tent-3.jpeg",
      category: "qarmid",
      titleAr: "قرميد فخار إيطالي",
      titleEn: "Italian Pottery Qarmid",
      descAr: "توريد وتركيب قرميد فخار إيطالي أصلي للأسقف والملاحق والواجهات مع العزل المائي والحراري المتكامل.",
      descEn: "Supply and installation of authentic Italian terracotta clay roof tiles with full insulation."
    },
    {
      serial: 19,
      src: "gallery/qarmid-1.jpeg",
      category: "qarmid",
      titleAr: "قرميد إيطالي ومعدني - رقم 19",
      titleEn: "Italian & Metal Qarmid - #19",
      descAr: "توريد وتركيب القرميد الإيطالي والمعدني للأسطح والواجهات.",
      descEn: "Supply and installation of Italian and metal roof tiles."
    },
    {
      serial: 20,
      src: "gallery/qarmid-2.jpeg",
      category: "pergolas",
      titleAr: "برجولات حديد ولكسان",
      titleEn: "Iron & Lexan Pergolas",
      descAr: "تصميم وتركيب برجولات حديد مغطاة بألواح اللكسان المقاومة للكسر لحماية الجلسات من الأمطار والشمس.",
      descEn: "Custom iron pergolas topped with unbreakable polycarbonate Lexan sheets."
    },
    {
      serial: 21,
      src: "gallery/decor-1.jpeg",
      category: "decor",
      titleAr: "ديكورات عشبية ولكسان - رقم 21",
      titleEn: "Grass & Lexan Decor - #21",
      descAr: "تصميم وتنفيذ الديكورات الخارجية باستخدام بديل الخشب والعشب.",
      descEn: "Exterior decorations using weather-resistant wood alternatives and grass."
    },
    {
      serial: 22,
      src: "gallery/decor-2.jpeg",
      category: "decor",
      titleAr: "ديكورات عشبية ولكسان - رقم 22",
      titleEn: "Grass & Lexan Decor - #22",
      descAr: "تصميم وتنفيذ الديكورات الخارجية باستخدام بديل الخشب والعشب.",
      descEn: "Exterior decorations using weather-resistant wood alternatives and grass."
    },
    {
      serial: 23,
      src: "gallery/decor-3.jpeg",
      category: "decor",
      titleAr: "ديكورات عشبية ولكسان - رقم 23",
      titleEn: "Grass & Lexan Decor - #23",
      descAr: "تصميم وتنفيذ الديكورات الخارجية باستخدام بديل الخشب والعشب.",
      descEn: "Exterior decorations using weather-resistant wood alternatives and grass."
    },
    {
      serial: 24,
      src: "gallery/decor-4.jpeg",
      category: "panels",
      titleAr: "غرف سندويش بنل",
      titleEn: "Sandwich Panel Rooms",
      descAr: "تصميم وتنفيذ غرف وملاحق سندويش بنل حديثة بواجهات زجاجية وعزل حراري ومائي متكامل.",
      descEn: "Design and construction of modern insulated sandwich panel rooms and backyard extensions."
    },
    {
      serial: 25,
      src: "gallery/decor-5.jpeg",
      category: "panels",
      titleAr: "غرف سندويش بنل",
      titleEn: "Sandwich Panel Rooms",
      descAr: "إنشاء وتجهيز غرف سندويش بنل خارجية ومجالس مودرن بأعلى معايير العزل الحراري والتشطيب الفاخر.",
      descEn: "Turnkey modern insulated sandwich panel rooms and luxury outdoor extensions."
    },
    {
      serial: 26,
      src: "gallery/tensile-1.jpeg",
      category: "tensile",
      titleAr: "مظلات الشد الإنشائي - رقم 26",
      titleEn: "Tensile Shades - #26",
      descAr: "مظلات هندسية بأقمشة PVC و PVDF المقاومة للماء.",
      descEn: "Giant engineered shades with waterproof PVC/PVDF fabrics."
    },
    {
      serial: 27,
      src: "gallery/tensile-2.jpeg",
      category: "tensile",
      titleAr: "مظلات الشد الإنشائي - رقم 27",
      titleEn: "Tensile Shades - #27",
      descAr: "مظلات هندسية بأقمشة PVC و PVDF المقاومة للماء.",
      descEn: "Giant engineered shades with waterproof PVC/PVDF fabrics."
    }
  ];

  window.GALLERY_DATA = galleryData;

  let currentItem = 0;
  const itemsPerPage = 9;
  let currentFilter = "all";

  function getActiveLang() {
    if (window.currentLang === "en" || document.documentElement.getAttribute("lang") === "en") {
      return "en";
    }
    return "ar";
  }

  function syncGalleryLanguage(lang) {
    const activeLang = (lang === "en") ? "en" : ((lang === "ar") ? "ar" : getActiveLang());
    document.querySelectorAll("#dynamic-gallery-grid .lang-ar").forEach(function(el) {
      el.style.display = (activeLang === "ar") ? "block" : "none";
    });
    document.querySelectorAll("#dynamic-gallery-grid .lang-en").forEach(function(el) {
      el.style.display = (activeLang === "en") ? "block" : "none";
    });
  }

  window.syncGalleryLanguage = syncGalleryLanguage;

  function loadGalleryItems() {
    const galleryGrid = document.getElementById("dynamic-gallery-grid");
    const loadMoreBtn = document.getElementById("load-more-btn");
    if (!galleryGrid) return;

    const activeLang = getActiveLang();
    const arDisplay = (activeLang === "ar") ? "block" : "none";
    const enDisplay = (activeLang === "en") ? "block" : "none";

    const filteredData = (currentFilter === "all")
      ? galleryData
      : galleryData.filter(function(item) { return item.category === currentFilter; });

    let maxItem = currentItem + itemsPerPage;
    if (maxItem > filteredData.length) {
      maxItem = filteredData.length;
    }

    for (let i = currentItem; i < maxItem; i++) {
      const item = filteredData[i];
      const badgeNum = item.serial || (i + 1);
      const fallbackSvg = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">' +
        '<rect width="600" height="400" fill="#1A1917"/>' +
        '<rect x="20" y="20" width="560" height="360" fill="none" stroke="#B68D52" stroke-width="1.5" stroke-opacity="0.45"/>' +
        '<text x="300" y="190" text-anchor="middle" fill="#D1AE79" font-family="sans-serif" font-size="22" font-weight="bold">' + item.titleAr + '</text>' +
        '<text x="300" y="225" text-anchor="middle" fill="#C6BFB3" font-family="sans-serif" font-size="16">' + item.titleEn + '</text>' +
        '</svg>'
      );

      const cardHtml =
        '<div class="gallery-item" data-category="' + item.category + '" data-serial="' + badgeNum + '">' +
          '<div class="gallery-img-wrapper" style="object-fit: cover; width: 100%; height: 100%;">' +
            '<img src="' + item.src + '" alt="' + item.titleAr + ' - ' + item.descAr + '" loading="lazy" decoding="async" style="object-fit: cover; width: 100%; height: 100%;" data-fallback="' + fallbackSvg + '" onerror="window.__handleGalleryImgError&&window.__handleGalleryImgError(this)">' +
            '<span class="gallery-badge">#' + badgeNum + '</span>' +
          '</div>' +
          '<div class="gallery-card-body">' +
            '<h4 class="lang-ar" style="display:' + arDisplay + ';">' + item.titleAr + '</h4>' +
            '<p class="lang-ar" style="display:' + arDisplay + ';">' + item.descAr + '</p>' +
            '<h4 class="lang-en" style="display:' + enDisplay + ';">' + item.titleEn + '</h4>' +
            '<p class="lang-en" style="display:' + enDisplay + ';">' + item.descEn + '</p>' +
          '</div>' +
        '</div>';

      galleryGrid.insertAdjacentHTML("beforeend", cardHtml);
    }

    currentItem = maxItem;

    if (loadMoreBtn) {
      if (currentItem >= filteredData.length) {
        loadMoreBtn.style.display = "none";
      } else {
        loadMoreBtn.style.display = "inline-flex";
      }
    }
  }

  function initGallery() {
    const galleryGrid = document.getElementById("dynamic-gallery-grid");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const filterBtns = document.querySelectorAll(".filter-btn");

    if (!galleryGrid) return;

    galleryGrid.innerHTML = "";
    currentItem = 0;
    loadGalleryItems();

    filterBtns.forEach(function(btn) {
      if (btn.getAttribute("data-gallery-bound") === "true") return;
      btn.setAttribute("data-gallery-bound", "true");
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        filterBtns.forEach(function(b) {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");

        currentFilter = btn.getAttribute("data-filter") || "all";
        galleryGrid.innerHTML = "";
        currentItem = 0;
        loadGalleryItems();
      });
    });

    if (loadMoreBtn && loadMoreBtn.getAttribute("data-gallery-bound") !== "true") {
      loadMoreBtn.setAttribute("data-gallery-bound", "true");
      loadMoreBtn.addEventListener("click", function(e) {
        e.preventDefault();
        loadGalleryItems();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGallery);
  } else {
    initGallery();
  }
})();
