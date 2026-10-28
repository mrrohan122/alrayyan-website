const galleryCategories = [
  { prefix: "panel", count: 3, category: "panels", nameAr: "سندويش بنل", nameEn: "Sandwich Panels", descAr: "توريد وتركيب ألواح سندويش بنل للغرف والملاحق والشقق كاملة.", descEn: "Supply and installation of sandwich panels for rooms and apartments." },
  { prefix: "shade", count: 6, category: "shades", nameAr: "مظلات سيارات", nameEn: "Car Shades", descAr: "حلول كاملة للتظليل وتفصيل جميع أنواع مظلات السيارات.", descEn: "Complete shading solutions and custom car shades." },
  { prefix: "swater", count: 3, category: "swater", nameAr: "سواتر", nameEn: "Privacy Screens", descAr: "تركيب سواتر حديثة توفر الخصوصية التامة والحماية.", descEn: "Installation of modern privacy screens providing complete protection." },
  { prefix: "pergola", count: 4, category: "pergolas", nameAr: "برجولات", nameEn: "Pergolas", descAr: "ابتكار مساحات استرخاء خارجية وبرجولات للحدائق.", descEn: "Innovative outdoor relaxation spaces and pergolas for gardens." },
  { prefix: "tent", count: 3, category: "tents", nameAr: "بيوت شعر", nameEn: "Traditional Tents", descAr: "تفصيل وتركيب بيوت شعر ملكية وعادية بتصاميم تراثية وعصرية.", descEn: "Custom royal and regular traditional tents with modern designs." },
  { prefix: "qarmid", count: 3, category: "qarmid", nameAr: "قرميد إيطالي ومعدني", nameEn: "Italian & Metal Qarmid", descAr: "توريد وتركيب القرميد الإيطالي والمعدني للأسطح والواجهات.", descEn: "Supply and installation of Italian and metal roof tiles." },
  { prefix: "decor", count: 5, category: "decor", nameAr: "ديكورات عشبية ولكسان", nameEn: "Grass & Lexan Decor", descAr: "تصميم وتنفيذ الديكورات الخارجية باستخدام بديل الخشب والعشب.", descEn: "Exterior decorations using weather-resistant wood alternatives and grass." },
  { prefix: "tensile", count: 2, category: "tensile", nameAr: "مظلات الشد الإنشائي", nameEn: "Tensile Shades", descAr: "مظلات هندسية بأقمشة PVC و PVDF المقاومة للماء.", descEn: "Giant engineered shades with waterproof PVC/PVDF fabrics." }
];

const galleryData = [];
let serialNumber = 1;

galleryCategories.forEach(cat => {
  for (let i = 1; i <= cat.count; i++) {
    galleryData.push({
      src: `gallery/${cat.prefix}-${i}.jpeg`, 
      category: cat.category,
      titleAr: `${cat.nameAr} - رقم ${serialNumber}`,
      titleEn: `${cat.nameEn} - #${serialNumber}`,
      descAr: cat.descAr,
      descEn: cat.descEn
    });
    serialNumber++;
  }
});

let currentItem = 0;
const itemsPerPage = 9;
let currentFilter = 'all'; // Default filter
const galleryGrid = document.getElementById('dynamic-gallery-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const filterBtns = document.querySelectorAll('.filter-btn'); // Filter buttons ko select kiya

function loadGalleryItems() {
  if (!galleryGrid) return;
  
  // Filter ki hui list banayen
  const filteredData = currentFilter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === currentFilter);

  let maxItem = currentItem + itemsPerPage;
  if (maxItem > filteredData.length) maxItem = filteredData.length;

  for (let i = currentItem; i < maxItem; i++) {
    const item = filteredData[i];
    const html = `
      <div class="gallery-item" data-category="${item.category}">
        <div class="gallery-img-wrapper">
          <img src="${item.src}" alt="${item.titleEn}" loading="lazy" decoding="async" onerror="this.closest('.gallery-item').style.display='none'">
          <span class="gallery-badge">#${i + 1}</span>
        </div>
        <div class="gallery-overlay">
          <h4 class="lang-ar">${item.titleAr}</h4>
          <p class="lang-ar">${item.descAr}</p>
          <h4 class="lang-en" style="display: none;">${item.titleEn}</h4>
          <p class="lang-en" style="display: none;">${item.descEn}</p>
        </div>
      </div>
    `;
    galleryGrid.insertAdjacentHTML('beforeend', html);
  }
  
  currentItem += itemsPerPage;

  if (loadMoreBtn) {
    if (currentItem >= filteredData.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  }
}

// Filter Buttons par click event lagayen
if (filterBtns) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Pehle wale active button se class hatayen
      filterBtns.forEach(b => b.classList.remove('active'));
      // Naye click kiye hue button par active class lagayen
      e.target.classList.add('active');
      
      // Filter ki value lein aur gallery reset karein
      currentFilter = e.target.getAttribute('data-filter') || 'all';
      galleryGrid.innerHTML = ''; // Purani photos hata dein
      currentItem = 0; // Reset counter
      loadGalleryItems(); // Nayi (filtered) photos load karein
    });
  });
}

// Language Switcher Logic (Simple Version)
const langBtns = document.querySelectorAll('.lang-switcher'); // Aapke language buttons ki class (check karke theek kar lein)
if(langBtns) {
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.getAttribute('data-lang'); // 'ar' ya 'en'
            
            // Sabhi text elements ko select karein
            document.querySelectorAll('.lang-ar').forEach(el => el.style.display = (lang === 'ar') ? 'block' : 'none');
            document.querySelectorAll('.lang-en').forEach(el => el.style.display = (lang === 'en') ? 'block' : 'none');
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
  loadGalleryItems();
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadGalleryItems);
  }
});
