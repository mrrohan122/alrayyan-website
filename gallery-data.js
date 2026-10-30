// =========================================================================
// Al-Rayyan Dynamic Gallery Data & Controller (gallery-data.js)
// Zero-conflict architecture — works seamlessly with index.html
// =========================================================================
(function() {
  if (window.__RAYYAN_GALLERY_INITIALIZED__) return;
  window.__RAYYAN_GALLERY_INITIALIZED__ = true;

  // Smart multi-extension fallback handler
  if (!window.__handleGalleryImgError) {
    window.__handleGalleryImgError = function(img) {
      if (!img) return;
      const currentTry = parseInt(img.getAttribute('data-try') || '0', 10);
      const orig = img.getAttribute('data-orig') || img.getAttribute('src') || '';
      if (!img.getAttribute('data-orig')) {
        img.setAttribute('data-orig', orig);
      }
      const basePath = orig.replace(/\.[a-zA-Z0-9]+$/, '');
      const candidates = ['.jpg', '.png', '.webp', '.JPG', '.JPEG'];

      if (currentTry < candidates.length) {
        img.setAttribute('data-try', (currentTry + 1).toString());
        img.src = basePath + candidates[currentTry];
        return;
      }

      const fallbackSvg = img.getAttribute('data-fallback');
      img.onerror = null;
      if (fallbackSvg) {
        img.src = fallbackSvg;
      }
    };
  }


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

  const galleryData = [];
  let serialNumber = 1;

  galleryCategories.forEach(function(cat) {
    const fileList = cat.indices || Array.from({length: cat.count}, function(_, idx) { return idx + 1; });
    fileList.forEach(function(i) {
      galleryData.push({
        serial: serialNumber,
        src: "gallery/" + cat.prefix + "-" + i + ".jpeg",
        category: cat.category,
        titleAr: cat.nameAr + " - رقم " + serialNumber,
        titleEn: cat.nameEn + " - #" + serialNumber,
        descAr: cat.descAr,
        descEn: cat.descEn
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
      const badgeNum = i + 1;
      const fallbackSvg = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">' +
        '<rect width="600" height="400" fill="#1A1917"/>' +
        '<rect x="20" y="20" width="560" height="360" fill="none" stroke="#B68D52" stroke-width="1.5" stroke-opacity="0.45"/>' +
        '<text x="300" y="190" text-anchor="middle" fill="#D1AE79" font-family="sans-serif" font-size="22" font-weight="bold">' + item.titleAr + '</text>' +
        '<text x="300" y="225" text-anchor="middle" fill="#C6BFB3" font-family="sans-serif" font-size="16">' + item.titleEn + '</text>' +
        '</svg>'
      );

      const cardHtml =
        '<div class="gallery-item" data-category="' + item.category + '">' +
          '<div class="gallery-img-wrapper">' +
            '<img src="' + item.src + '" alt="' + item.titleAr + ' | ' + item.titleEn + '" loading="lazy" decoding="async" data-fallback="' + fallbackSvg + '" onerror="window.__handleGalleryImgError?window.__handleGalleryImgError(this):(this.onerror=null,this.src=this.getAttribute(\'data-fallback\'))">' +
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

    if (loadMoreBtn) {
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
