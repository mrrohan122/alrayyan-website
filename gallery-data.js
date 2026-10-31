// =========================================================================
// Al-Rayyan Dynamic Gallery Data & Controller (gallery-data.js)
// Zero-conflict architecture — works seamlessly with index.html
// Updated with all client corrections:
//   - High-resolution original .jpeg images with loading="lazy" decoding="async"
//   - 100% unique images across all 28 items (fixed #8, #20, #21 duplicates)
//   - Picture #4  -> Category: shades   | Title Ar: مظلات مخروطي PVDF
//   - Picture #5  -> Category: shades   | Title Ar: مظلات إنشائية
//   - Picture #7  -> Category: swater   | Title Ar: سواتر حديد
//   - Picture #8  -> Category: swater   | Title Ar: سواتر لكسان
//   - Picture #11 -> Category: pergolas | Title Ar: برجولة مودرن
//   - Picture #18 -> Category: qarmid   | Title Ar: قرميد فخار إيطالي
//   - Picture #20 -> Category: pergolas | Title Ar: برجولات حديد ولكسان
//   - Picture #25 -> Category: panels   | Title Ar: غرف سندويش بنل
//   - Picture #26 -> Category: panels   | Title Ar: غرف سندويش بنل
// =========================================================================
(function() {
  // Smart fallback handler: always guarantees a high-res project photo is displayed
  window.__handleGalleryImgError = function(img) {
    if (!img) return;
    const serial = parseInt(img.getAttribute("data-serial") || "0", 10);
    if (serial && typeof window.getEmbeddedGalleryUri === "function") {
      const embeddedUri = window.getEmbeddedGalleryUri(serial);
      if (embeddedUri && img.src !== embeddedUri) {
        img.onerror = null;
        img.src = embeddedUri;
        return;
      }
    }
    const currentTry = parseInt(img.getAttribute("data-try") || "0", 10);
    const orig = img.getAttribute("data-orig") || img.getAttribute("data-gallery-src") || img.getAttribute("src") || "";
    if (!img.getAttribute("data-orig")) {
      img.setAttribute("data-orig", orig);
    }
    const driveSrc = img.getAttribute("data-drive-src") || "";
    const basePath = orig.replace(/\.[a-zA-Z0-9]+$/, "");
    const candidates = [];
    if (driveSrc) candidates.push(driveSrc);
    candidates.push(basePath + ".jpg", basePath + ".png", basePath + ".webp", basePath + ".JPG", basePath + ".JPEG");

    if (currentTry < candidates.length) {
      img.setAttribute("data-try", (currentTry + 1).toString());
      img.src = candidates[currentTry];
      return;
    }

    const fallbackSvg = img.getAttribute("data-fallback");
    img.onerror = null;
    if (fallbackSvg) {
      img.src = fallbackSvg;
    }
  };

  const galleryCategories = [
    { prefix: "panel", count: 3, category: "panels", nameAr: "سندويش بنل", nameEn: "Sandwich Panels", descAr: "توريد وتركيب ألواح سندويش بنل للغرف والملاحق والشقق كاملة.", descEn: "Supply and installation of sandwich panels for rooms and apartments." },
    { prefix: "shade", indices: [1, 2, 3, 5, 6], count: 5, category: "shades", nameAr: "مظلات سيارات", nameEn: "Car Shades", descAr: "حلول كاملة للتظليل وتفصيل جميع أنواع مظلات السيارات.", descEn: "Complete shading solutions and custom car shades." },
    { prefix: "swater", count: 3, category: "swater", nameAr: "سواتر", nameEn: "Privacy Screens", descAr: "تركيب سواتر حديثة توفر الخصوصية التامة والحماية.", descEn: "Installation of modern privacy screens providing complete protection." },
    { prefix: "pergola", count: 4, category: "pergolas", nameAr: "برجولات", nameEn: "Pergolas", descAr: "ابتكار مساحات استرخاء خارجية وبرجولات للحدائق.", descEn: "Innovative outdoor relaxation spaces and pergolas for gardens." },
    { prefix: "tent", count: 3, category: "tents", nameAr: "بيوت شعر", nameEn: "Traditional Tents", descAr: "تفصيل وتركيب بيوت شعر ملكية وعادية بتصاميم تراثية وعصرية.", descEn: "Custom royal and regular traditional tents with modern designs." },
    { prefix: "qarmid", count: 3, category: "qarmid", nameAr: "قرميد إيطالي ومعدني", nameEn: "Italian & Metal Qarmid", descAr: "توريد وتركيب القرميد الإيطالي والمعدني للأسطح والواجهات.", descEn: "Supply and installation of Italian and metal roof tiles." },
    { prefix: "decor", count: 5, category: "decor", nameAr: "ديكورات عشبية ولكسان", nameEn: "Grass & Lexan Decor", descAr: "تصميم وتنفيذ الديكورات الخارجية باستخدام بديل الخشب والعشب.", descEn: "Exterior decorations using weather-resistant wood alternatives and grass." },
    { prefix: "tensile", count: 2, category: "tensile", nameAr: "مظلات الشد الإنشائي", nameEn: "Tensile Shades", descAr: "مظلات هندسية بأقمشة PVC و PVDF المقاومة للماء.", descEn: "Giant engineered shades with waterproof PVC/PVDF fabrics." }
  ];

  // Unique high-resolution Drive .jpeg file mapping for each of the 28 items (Zero duplicates)
  const uniqueDriveFiles = {
    "1": "new imgs/سندويش بنل.jpeg",
    "2": "Rayyan GMB/sandwich-panel-room-construction.jpeg",
    "3": "Rayyan GMB/sandwich-panel-doors-extension.jpeg",
    "4": "new imgs/مظلات مدارس مخروطي.jpeg",
    "5": "new imgs/مظلات انشائية الماني PVDF.jpeg",
    "6": "new imgs/مظلات سيارات كابولي bvc.jpeg",
    "7": "new imgs/سواتر حديد w-2.jpeg",
    "8": "new imgs/مظلات ممررات  (½) دائرة.jpeg",
    "9": "new imgs/سواتر قماش دبل Curie.jpeg",
    "10": "new imgs/مظلات مسابح x.jpeg",
    "11": "new imgs/برجولات مودرن.jpeg",
    "12": "Rayyan GMB/jalsat-kharijiya-pergola-jeddah.jpeg",
    "13": "Rayyan GMB/pergola-hadaiq-luxury-seating.jpeg",
    "14": "new imgs/برجولات قص ليزز.jpeg",
    "15": "Rayyan GMB/pergola-hadaiq-cnc-jeddah.jpeg",
    "16": "new imgs/بيوت شعر  ملكي.jpeg",
    "17": "new imgs/بيوت شعر ملكي VIB-1.jpeg",
    "18": "new imgs/قرميد فخار ايطالي.jpeg",
    "19": "new imgs/قرميد معدني.jpeg",
    "20": "new imgs/برجولات حديد و لكسان.jpeg",
    "21": "new imgs/مظلات جلسات bvc680.jpeg",
    "22": "new imgs/عشب صناعي.jpeg",
    "23": "new imgs/جداريات عشب 3D.jpeg",
    "24": "new imgs/ديكورات بديل الخشب.jpeg",
    "25": "Rayyan GMB/glass-room-sandwich-panel-jeddah.jpeg",
    "26": "Rayyan GMB/modern-backyard-room-jeddah.jpeg",
    "27": "new imgs/مظلات إنسائية شد واير.jpeg",
    "28": "Rayyan GMB/mazallat-shiraeya-tensile-jeddah.jpeg"
};

  // Client-requested item overrides by Picture # (serial number)
  const itemOverrides = {
    4: {
      category: "shades",
      titleAr: "مظلات مخروطي PVDF",
      titleEn: "PVDF Cone Shades",
      descAr: "تصميم وتنفيذ مظلات مخروطي بأغشية PVDF الألمانية والوطنية المقاومة للأشعة فوق البنفسجية والأمطار.",
      descEn: "Design and installation of conical PVDF membrane shades resistant to UV rays and rain."
    },
    5: {
      category: "shades",
      titleAr: "مظلات إنشائية",
      titleEn: "Tensile Shades",
      descAr: "توريد وتركيب مظلات الشد الإنشائي للمشاريع والمواقف والمساحات الواسعة بهياكل فولاذية عالية المتانة.",
      descEn: "Engineering and installation of architectural tensile shades with heavy-duty steel structures."
    },
    7: {
      category: "swater",
      titleAr: "سواتر حديد",
      titleEn: "Iron Swater",
      descAr: "تركيب سواتر حديد (شرائح ومجدول) بدهانات فرن حرارية مقاومة للصدأ توفر الخصوصية التامة والأمان.",
      descEn: "Installation of oven-painted rust-resistant iron privacy screens providing complete security."
    },
    8: {
      category: "swater",
      titleAr: "سواتر لكسان",
      titleEn: "Lexan Swater",
      descAr: "تنفيذ سواتر لكسان بولي كربونيت ضد الكسر بتصاميم فخمة تجمع بين الخصوصية والجمال العصري.",
      descEn: "Unbreakable polycarbonate Lexan privacy screens combining luxury aesthetics with full privacy."
    },
    11: {
      category: "pergolas",
      titleAr: "برجولة مودرن",
      titleEn: "Modern Pergola",
      descAr: "تصميم وتنفيذ برجولة مودرن للحدائق والأسطح والجلسات الخارجية بلمسات معمارية أنيقة.",
      descEn: "Bespoke modern pergola for gardens, rooftops, and outdoor seating areas."
    },
    18: {
      category: "qarmid",
      titleAr: "قرميد فخار إيطالي",
      titleEn: "Italian Pottery Qarmid",
      descAr: "توريد وتركيب قرميد فخار إيطالي أصلي للأسقف والملاحق والواجهات مع العزل المائي والحراري المتكامل.",
      descEn: "Supply and installation of authentic Italian terracotta clay roof tiles with full insulation."
    },
    20: {
      category: "pergolas",
      titleAr: "برجولات حديد ولكسان",
      titleEn: "Iron & Lexan Pergolas",
      descAr: "تصميم وتركيب برجولات حديد مغطاة بألواح اللكسان المقاومة للكسر لحماية الجلسات من الأمطار والشمس.",
      descEn: "Custom iron pergolas topped with unbreakable polycarbonate Lexan sheets."
    },
    25: {
      category: "panels",
      titleAr: "غرف سندويش بنل",
      titleEn: "Sandwich Panel Rooms",
      descAr: "تصميم وتنفيذ غرف وملاحق سندويش بنل حديثة بواجهات زجاجية وعزل حراري ومائي متكامل.",
      descEn: "Design and construction of modern insulated sandwich panel rooms and backyard extensions."
    },
    26: {
      category: "panels",
      titleAr: "غرف سندويش بنل",
      titleEn: "Sandwich Panel Rooms",
      descAr: "إنشاء وتجهيز غرف سندويش بنل خارجية ومجالس مودرن بأعلى معايير العزل الحراري والتشطيب الفاخر.",
      descEn: "Turnkey modern insulated sandwich panel rooms and luxury outdoor extensions."
    }
  };

  const galleryData = [];
  let serialNumber = 1;

  galleryCategories.forEach(function(cat) {
    const fileList = cat.indices || Array.from({length: cat.count}, function(_, idx) { return idx + 1; });
    fileList.forEach(function(i) {
      const ov = itemOverrides[serialNumber];
      const finalCategory = ov ? ov.category : cat.category;
      const finalTitleAr = ov ? ov.titleAr : (cat.nameAr + " - رقم " + serialNumber);
      const finalTitleEn = ov ? ov.titleEn : (cat.nameEn + " - #" + serialNumber);
      const finalDescAr = ov ? ov.descAr : cat.descAr;
      const finalDescEn = ov ? ov.descEn : cat.descEn;
      const fileSrc = "gallery/" + cat.prefix + "-" + i + ".jpeg";
      const driveSrc = uniqueDriveFiles[serialNumber] || fileSrc;

      galleryData.push({
        serial: serialNumber,
        src: fileSrc,
        driveSrc: driveSrc,
        category: finalCategory,
        titleAr: finalTitleAr,
        titleEn: finalTitleEn,
        descAr: finalDescAr,
        descEn: finalDescEn
      });
      serialNumber++;
    });
  });

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
      const embeddedUri = (typeof window.getEmbeddedGalleryUri === "function")
        ? window.getEmbeddedGalleryUri(badgeNum)
        : "";
      const primarySrc = embeddedUri || item.src;

      const cardHtml =
        '<div class="gallery-item" data-category="' + item.category + '" data-serial="' + badgeNum + '">' +
          '<div class="gallery-img-wrapper">' +
            '<img src="' + primarySrc + '" data-gallery-src="' + item.src + '" data-drive-src="' + (item.driveSrc || '') + '" data-serial="' + badgeNum + '" alt="' + item.titleAr + ' | ' + item.titleEn + '" loading="lazy" decoding="async" style="object-fit: cover; width: 100%; height: 100%;" onerror="window.__handleGalleryImgError&&window.__handleGalleryImgError(this)">' +
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
