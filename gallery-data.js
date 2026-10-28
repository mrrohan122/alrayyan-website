const galleryCategories = [
  {
    prefix: "panel",
    count: 3, 
    category: "panels",
    nameAr: "سندويش بنل",
    descAr: "توريد وتركيب ألواح سندويش بنل للغرف والملاحق والشقق كاملة. عازل حراري 100% ومقاوم للرطوبة والصوت والماء بعمر افتراضي يصل إلى 25 سنة."
  },
  {
    prefix: "shade",
    count: 6, 
    category: "shades",
    nameAr: "مظلات سيارات",
    descAr: "حلول كاملة للتظليل وتفصيل جميع أنواع مظلات السيارات بأيدي فنيين ذوي خبرة ومهارة مع استخدام أفضل المواد عالية الجودة وإرفاق شهادات المنشأ."
  },
  {
    prefix: "swater",
    count: 3, 
    category: "swater",
    nameAr: "سواتر",
    descAr: "تركيب سواتر حديثة توفر الخصوصية التامة والحماية بأعلى معايير المتانة والمقاومة للعوامل الجوية في جدة."
  },
  {
    prefix: "pergola",
    count: 4, 
    category: "pergolas",
    nameAr: "برجولات",
    descAr: "ابتكار مساحات استرخاء خارجية وبرجولات للحدائق والجلسات تجمع بين الظل والتصاميم العصرية الفخمة."
  },
  {
    prefix: "tent",
    count: 3, 
    category: "tents",
    nameAr: "بيوت شعر",
    descAr: "تفصيل وتركيب بيوت شعر ملكية وعادية بتصاميم تراثية وعصرية مجهزة بأفضل العوازل والخامات."
  },
  {
    prefix: "qarmid",
    count: 3, 
    category: "qarmid",
    nameAr: "قرميد إيطالي ومعدني",
    descAr: "توريد وتركيب القرميد الإيطالي والمعدني للأسطح والواجهات بمواصفات عالية الجودة ومقاومة تامة للأمطار والحرارة."
  },
  {
    prefix: "decor",
    count: 5, 
    category: "decor",
    nameAr: "ديكورات عشبية وخشبية ولكسان",
    descAr: "تصميم وتنفيذ الديكورات الخارجية للمنازل والفلل باستخدام بديل الخشب المقاوم للعوامل الجوية، العشب الصناعي، خشب WPC، وتغطيات اللكسان."
  },
  {
    prefix: "tensile",
    count: 2, 
    category: "tensile",
    nameAr: "مظلات الشد الإنشائي",
    descAr: "مظلات هندسية عملاقة بأقمشة PVC و PVDF المقاومة للماء والحرارة بنسبة 100% مع عمر افتراضي 10-18 عاماً وضمان معتمد لمدة 10 سنوات."
  },
  {
    prefix: "laser",
    count: 0, 
    category: "laser",
    nameAr: "مظلات وسواتر قص ليزر",
    descAr: "تفصيل وتركيب أعمال الحديد المقطوع بالليزر (CNC) بتصاميم هندسية وزخرفية أنيقة تعطي المكان تميزاً وفخامة."
  }
];

// Yeh hissa khud-ba-khud photos ki list tayyar karega aur .jpeg extension lagayega
const galleryData = [];
let serialNumber = 1;

galleryCategories.forEach(cat => {
  for (let i = 1; i <= cat.count; i++) {
    galleryData.push({
      src: `gallery/${cat.prefix}-${i}.jpeg`, // Extension .jpeg fix kar di gayi hai
      category: cat.category,
      title: `${cat.nameAr} - رقم ${serialNumber}`,
      desc: cat.descAr,
      alt: `${cat.nameAr} رقم ${serialNumber} - مؤسسة الريان في جدة`
    });
    serialNumber++;
  }
});

// Website ki speed fast rakhne ke liye 9-9 photos load karne ka system
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
          <span class="gallery-badge">#${i + 1}</span>
        </div>
        <div class="gallery-overlay">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
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
