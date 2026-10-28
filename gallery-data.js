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
let currentFilter = 'all'; 
const galleryGrid = document.getElementById('dynamic-gallery-grid');
const loadMoreBtn = document.getElementById('load-more-btn');

// Yahan class ka naam "filter-btn" zaroor hona chahiye aapki HTML mein
const filterBtns = document.querySelectorAll('.filter-btn'); 

function loadGalleryItems() {
  if (!galleryGrid) return;
  
  const filteredData = currentFilter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === currentFilter);

  let maxItem = currentItem + itemsPerPage;
  if (maxItem > filteredData.length) maxItem = filteredData.length;

  for (let i = currentItem; i < maxItem; i++) {
    const item = filteredData[i];
    
    // Maine yahan se "reveal active" nikal diya hai, ab data hide nahi hoga
    const html = `
      <div class="gallery-item" data-category="${item.category}">
        <div class="gallery-img-wrapper">
          <img src="${item.src}" alt="${item.titleEn}" loading="lazy" decoding="async" onerror="this.closest('.gallery-item').style.display='none'">
          <span class="gallery-badge">#${i + 1}</span>
        </div>
        <div class="gallery-overlay">
          <h4 class="lang-ar" style="display:block;">${item.titleAr}</h4>
          <p class="lang-ar" style="display:block;">${item.descAr}</p>
          <h4 class="lang-en" style="display:none;">${item.titleEn}</h4>
          <p class="lang-en" style="display:none;">${item.descEn}</p>
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
      loadMoreBtn.style.display = 'block'; // Ya inline-block
    }
  }
}

// Filter Buttons Click Logic
if (filterBtns) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Pehle tamam buttons se 'active' hata dein
      filterBtns.forEach(b => b.classList.remove('active'));
      // Jo click hua us par 'active' lagayein
      e.target.classList.add('active');
      
      // Filter value read karein (ensure karein HTML mein data-filter ho)
      currentFilter = e.target.getAttribute('data-filter') || 'all';
      galleryGrid.innerHTML = ''; 
      currentItem = 0; 
      loadGalleryItems(); 
    });
  });
}

// Language Switcher Logic (ensure HTML buttons have class="lang-switcher" and data-lang="ar"/"en")
const langBtns = document.querySelectorAll('.lang-switcher');
if(langBtns) {
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.getAttribute('data-lang'); 
            
            // Toggle Arabic text
            document.querySelectorAll('.lang-ar').forEach(el => {
                el.style.display = (lang === 'ar') ? 'block' : 'none';
            });
            // Toggle English text
            document.querySelectorAll('.lang-en').forEach(el => {
                el.style.display = (lang === 'en') ? 'block' : 'none';
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
  loadGalleryItems();
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadGalleryItems);
  }
});
