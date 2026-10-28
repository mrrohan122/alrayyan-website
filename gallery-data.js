const galleryCategories = [
  {
    prefix: "panel",
    count: 3, 
    category: "panels",
    nameAr: "سندويش بنل",
    nameEn: "Sandwich Panels",
    descAr: "توريد وتركيب ألواح سندويش بنل للغرف والملاحق والشقق كاملة. عازل حراري 100% ومقاوم للرطوبة والصوت.",
    descEn: "Supply and installation of sandwich panels for rooms and apartments. 100% heat & moisture insulated."
  },
  {
    prefix: "shade",
    count: 6, 
    category: "shades",
    nameAr: "مظلات سيارات",
    nameEn: "Car Shades",
    descAr: "حلول كاملة للتظليل وتفصيل جميع أنواع مظلات السيارات بأيدي فنيين ذوي خبرة ومهارة.",
    descEn: "Complete shading solutions and custom car shades built by experienced technicians with premium materials."
  },
  {
    prefix: "swater",
    count: 3, 
    category: "swater",
    nameAr: "سواتر",
    nameEn: "Privacy Screens",
    descAr: "تركيب سواتر حديثة توفر الخصوصية التامة والحماية بأعلى معايير المتانة والمقاومة.",
    descEn: "Installation of modern privacy screens providing complete protection and durability against weather."
  },
  {
    prefix: "pergola",
    count: 4, 
    category: "pergolas",
    nameAr: "برجولات",
    nameEn: "Pergolas",
    descAr: "ابتكار مساحات استرخاء خارجية وبرجولات للحدائق والجلسات تجمع بين الظل والتصاميم العصرية.",
    descEn: "Innovative outdoor relaxation spaces and pergolas for gardens combining shade with modern designs."
  },
  {
    prefix: "tent",
    count: 3, 
    category: "tents",
    nameAr: "بيوت شعر",
    nameEn: "Traditional Tents",
    descAr: "تفصيل وتركيب بيوت شعر ملكية وعادية بتصاميم تراثية وعصرية مجهزة بأفضل العوازل.",
    descEn: "Custom royal and regular traditional tents with modern and heritage designs, fully insulated."
  },
  {
    prefix: "qarmid",
    count: 3, 
    category: "qarmid",
    nameAr: "قرميد إيطالي ومعدني",
    nameEn: "Italian & Metal Qarmid",
    descAr: "توريد وتركيب القرميد الإيطالي والمعدني للأسطح والواجهات بمواصفات عالية الجودة.",
    descEn: "Supply and installation of Italian and metal roof tiles with high-quality specifications."
  },
  {
    prefix: "decor",
    count: 5, 
    category: "decor",
    nameAr: "ديكورات عشبية ولكسان",
    nameEn: "Grass & Lexan Decor",
    descAr: "تصميم وتنفيذ الديكورات الخارجية باستخدام بديل الخشب، العشب الصناعي وتغطيات اللكسان.",
    descEn: "Exterior decorations using weather-resistant wood alternatives, WPC, artificial grass, and Lexan."
  },
  {
    prefix: "tensile",
    count: 2, 
    category: "tensile",
    nameAr: "مظلات الشد الإنشائي",
    nameEn: "Tensile Shades",
    descAr: "مظلات هندسية بأقمشة PVC و PVDF المقاومة للماء بنسبة 100% مع عمر افتراضي طويل.",
    descEn: "Giant engineered shades with 100% waterproof PVC/PVDF fabrics and a lifespan of 10-18 years."
  },
  {
    prefix: "laser",
    count: 0, 
    category: "laser",
    nameAr: "قص ليزر",
    nameEn: "Laser Cut (CNC)",
    descAr: "تفصيل وتركيب أعمال الحديد المقطوع بالليزر بتصاميم هندسية وزخرفية أنيقة.",
    descEn: "Custom CNC laser-cut metalworks with elegant geometric and decorative designs."
  }
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
      descEn: cat.descEn,
      alt: `${cat.nameAr} رقم ${serialNumber}`
    });
    serialNumber++;
  }
});

let currentItem = 0;
const itemsPerPage = 9;
const galleryGrid = document.getElementById('dynamic-gallery-grid');
const loadMoreBtn = document.getElementById('load-more-btn');

function loadGalleryItems() {
  if (!galleryGrid) return;
  
  let maxItem = currentItem + itemsPerPage;
  if (maxItem > galleryData.length) maxItem = galleryData.length;

  for (let i = currentItem; i < maxItem; i++) {
    const item = galleryData[i];
    const html = `
      <div class="gallery-item reveal active" data-category="${item.category}">
        <div class="gallery-img-wrapper">
          <img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async" onerror="this.closest('.gallery-item').style.display='none'">
        </div>
        <div class="gallery-overlay">
          <!-- Arabic Text -->
          <h4 lang="ar">${item.titleAr}</h4>
          <p lang="ar">${item.descAr}</p>
          <!-- English Text -->
          <h4 lang="en" style="display: none;">${item.titleEn}</h4>
          <p lang="en" style="display: none;">${item.descEn}</p>
        </div>
      </div>
    `;
    galleryGrid.insertAdjacentHTML('beforeend', html);
  }
  
  currentItem += itemsPerPage;

  if (loadMoreBtn && currentItem >= galleryData.length) {
    loadMoreBtn.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadGalleryItems();
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadGalleryItems);
  }
});
