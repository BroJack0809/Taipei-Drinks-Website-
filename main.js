
// DOM Elements
const shopGrid = document.getElementById('shop-grid');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.tag-btn');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalRating = document.getElementById('modal-rating');
const modalDesc = document.getElementById('modal-desc');
const modalMenu = document.getElementById('modal-menu');
const langToggleBtn = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');

// State
let currentLang = 'zh'; // Default to Traditional Chinese
let allShops = [];

// Translations
const translations = {
    zh: {
        heroTitle: "發掘台北<br /><span>極致手搖飲</span>",
        heroSubtitle: "探索城市中最棒的飲料店。<br />從經典珍珠奶茶到現代特調。",
        searchPlaceholder: "搜尋店家、茶飲或口味...",
        navHome: "首頁",
        navAbout: "關於",
        trendingTitle: "熱門店家",
        filterAll: "全部",
        filterBubbleTea: "珍珠奶茶",
        filterPureTea: "純茶",
        filterPremium: "精選",
        footerText: "&copy; 2025 台北手搖飲指南。",
        menuHighlights: "精選菜單",
        orderBtn: "立即訂購",
        langName: "English" // Text to show on button when current is ZH
    },
    en: {
        heroTitle: "Discover Taipei's<br /><span>Finest Sips</span>",
        heroSubtitle: "Explore the best beverage shops in the city. <br />From classic pearl tea to modern mocktails.",
        searchPlaceholder: "Search for shops, tea, or flavors...",
        navHome: "Home",
        navAbout: "About",
        trendingTitle: "Trending Shops",
        filterAll: "All",
        filterBubbleTea: "Bubble Tea",
        filterPureTea: "Pure Tea",
        filterPremium: "Premium",
        footerText: "&copy; 2025 Taipei Drinks Directory.",
        menuHighlights: "Menu Highlights",
        orderBtn: "Order Now",
        langName: "中文" // Text to show on button when current is EN
    }
};

// Data: Top 10 Shops (Bilingual)
// Note: Descriptions and menu items are extensive to meet "All drinks" request reasonably.
const shopsData = [
    {
        id: "1",
        name: { zh: "50嵐", en: "50 Lan" },
        description: {
            zh: "台灣最經典的手搖飲品牌，以穩定品質與招牌小珍珠聞名。",
            en: "Taiwan's classic bubble tea shop, known for consistent quality and signature small pearls."
        },
        address: "Everywhere in Taipei",
        rating: 4.8,
        tags: { zh: ["珍珠奶茶", "經典", "平價"], en: ["Bubble Tea", "Classic", "Affordable"] },
        menu: [
            { name: { zh: "珍珠奶茶", en: "Pearl Milk Tea" }, price: "NT$50" },
            { name: { zh: "波霸奶茶", en: "Boba Milk Tea" }, price: "NT$50" },
            { name: { zh: "四季春青茶", en: "Four Seasons Tea" }, price: "NT$35" },
            { name: { zh: "1號 (四季春+珍波椰)", en: "No. 1 (Four Seasons + Mix)" }, price: "NT$55" },
            { name: { zh: "紅茶拿鐵", en: "Black Tea Latte" }, price: "NT$60" },
            { name: { zh: "黃金烏龍", en: "Golden Oolong Tea" }, price: "NT$35" },
            { name: { zh: "阿華田", en: "Ovaltine" }, price: "NT$50" },
            { name: { zh: "檸檬綠茶", en: "Lemon Green Tea" }, price: "NT$50" },
            { name: { zh: "燕麥奶茶", en: "Oats Milk Tea" }, price: "NT$55" },
            { name: { zh: "布丁奶茶", en: "Pudding Milk Tea" }, price: "NT$60" }
        ]
    },
    {
        id: "2",
        name: { zh: "可不可熟成紅茶", en: "Kebuke" },
        description: {
            zh: "專注於熟成紅茶的英倫復古風品牌，茶味濃郁。",
            en: "British-vintage styled brand specializing in aged black tea with rich flavor."
        },
        address: "Taipei City",
        rating: 4.7,
        tags: { zh: ["熟成紅茶", "復古", "熱門"], en: ["Black Tea", "Vintage", "Popular"] },
        menu: [
            { name: { zh: "熟成紅茶", en: "Signature Black Tea" }, price: "NT$35" },
            { name: { zh: "白玉歐蕾", en: "White Jade Latte" }, price: "NT$65" },
            { name: { zh: "春芽冷露", en: "Spring Bud Wintermelon" }, price: "NT$35" },
            { name: { zh: "胭脂紅茶", en: "Rouge Black Tea" }, price: "NT$45" },
            { name: { zh: "雪藏紅茶", en: "Ice Cream Black Tea" }, price: "NT$60" },
            { name: { zh: "熟成歐蕾", en: "Black Tea Latte" }, price: "NT$55" },
            { name: { zh: "冷露歐蕾", en: "Wintermelon Latte" }, price: "NT$55" },
            { name: { zh: "春芽綠茶", en: "Spring Bud Green Tea" }, price: "NT$35" }
        ]
    },
    {
        id: "3",
        name: { zh: "迷客夏", en: "Milksha" },
        description: {
            zh: "堅持使用自家牧場鮮奶，口感香醇天然。",
            en: "Uses fresh milk from their own ranch, offering creamy and natural drinks."
        },
        address: "Taipei City",
        rating: 4.9,
        tags: { zh: ["鮮奶", "芋頭", "精選"], en: ["Fresh Milk", "Taro", "Premium"] },
        menu: [
            { name: { zh: "大甲芋頭鮮奶", en: "Taro Fresh Milk" }, price: "NT$65" },
            { name: { zh: "珍珠紅茶拿鐵", en: "Pearl Black Tea Latte" }, price: "NT$60" },
            { name: { zh: "伯爵紅茶拿鐵", en: "Earl Grey Latte" }, price: "NT$60" },
            { name: { zh: "青檸香茶", en: "Lemon Jasmine Tea" }, price: "NT$55" },
            { name: { zh: "柳丁綠茶", en: "Orange Green Tea" }, price: "NT$60" },
            { name: { zh: "決明大麥", en: "Roasted Barley Tea" }, price: "NT$30" },
            { name: { zh: "法芙娜可可拿鐵", en: "Valrhona Cocoa Latte" }, price: "NT$70" },
            { name: { zh: "出雲抹茶拿鐵", en: "Izumo Matcha Latte" }, price: "NT$80" }
        ]
    },
    {
        id: "4",
        name: { zh: "麻古茶坊", en: "Macu Tea" },
        description: {
            zh: "以新鮮水果系列與「芝芝」奶蓋聞名，果粒滿滿。",
            en: "Famous for fresh fruit series and 'Cheezo' foam, packed with fruit pulp."
        },
        address: "Taipei City",
        rating: 4.8,
        tags: { zh: ["水果茶", "奶蓋", "楊枝甘露"], en: ["Fruit Tea", "Cheese Foam", "Mango"] },
        menu: [
            { name: { zh: "楊枝甘露2.0", en: "Mango Sago" }, price: "NT$85" },
            { name: { zh: "芝芝葡萄果粒", en: "Cheezo Grape" }, price: "NT$95" },
            { name: { zh: "高山金萱茶", en: "High Mountain Jin Xuan" }, price: "NT$35" },
            { name: { zh: "柳橙果粒茶", en: "Orange Green Tea" }, price: "NT$70" },
            { name: { zh: "翡翠柳橙", en: "Jade Orange Tea" }, price: "NT$65" },
            { name: { zh: "金萱茶", en: "Jin Xuan Tea" }, price: "NT$30" },
            { name: { zh: "梅子綠茶", en: "Plum Green Tea" }, price: "NT$45" }
        ]
    },
    {
        id: "5",
        name: { zh: "清心福全", en: "Ching Shin Fu Quan" },
        description: {
            zh: "老字號手搖店，客製化程度高，烏龍綠茶必點。",
            en: "Long-standing chain, highly customizable, famous for Oolong Green Tea."
        },
        address: "Taipei City",
        rating: 4.3,
        tags: { zh: ["烏龍綠", "平價", "隨處可見"], en: ["Oolong Green", "Affordable", "Everywhere"] },
        menu: [
            { name: { zh: "烏龍綠茶", en: "Oolong Green Tea" }, price: "NT$30" },
            { name: { zh: "優多綠茶", en: "Yogurt Green Tea" }, price: "NT$45" },
            { name: { zh: "珍珠蜂蜜鮮奶普洱", en: "Pearl Honey Pu-erh Latte" }, price: "NT$60" },
            { name: { zh: "梅子綠茶", en: "Plum Green Tea" }, price: "NT$45" },
            { name: { zh: "蜂蜜檸檬", en: "Honey Lemon" }, price: "NT$50" },
            { name: { zh: "特級綠茶", en: "Premium Green Tea" }, price: "NT$30" }
        ]
    },
    {
        id: "6",
        name: { zh: "再睡5分鐘", en: "Nap Tea" },
        description: {
            zh: "百萬YouTuber滴妹創立，主打療癒系厚奶蓋與特調。",
            en: "Founded by YouTuber Dimei, featuring healing thick milk foam and special blends."
        },
        address: "Taipei City",
        rating: 4.9,
        tags: { zh: ["網紅", "厚奶蓋", "療癒"], en: ["Trendy", "Thick Foam", "Healing"] },
        menu: [
            { name: { zh: "棉被午茉綠", en: "Cotton Quilt Jasmine Green" }, price: "NT$70" },
            { name: { zh: "日安紅珍珠歐蕾", en: "Sunrise Black Pearl Latte" }, price: "NT$75" },
            { name: { zh: "全糖女神", en: "Full Sugar Goddess" }, price: "NT$80" },
            { name: { zh: "棉被紅茶", en: "Cotton Quilt Black Tea" }, price: "NT$70" },
            { name: { zh: "香芋啵啵", en: "Taro Boba Milk" }, price: "NT$85" }
        ]
    },
    {
        id: "7",
        name: { zh: "得正", en: "De Zheng (Oolong Tea Project)" },
        description: {
            zh: "專注於烏龍茶的專家，風格清新，焙火香氣迷人。",
            en: "Oolong tea specialist with a focus on roasted aroma and specialized tea processing."
        },
        address: "Taipei City",
        rating: 4.8,
        tags: { zh: ["烏龍茶", "焙火", "文青"], en: ["Oolong", "Roasted", "Hipster"] },
        menu: [
            { name: { zh: "焙烏龍奶茶", en: "Roasted Oolong Milk Tea" }, price: "NT$55" },
            { name: { zh: "芝士奶蓋春烏龍", en: "Cheese Foam Spring Oolong" }, price: "NT$65" },
            { name: { zh: "檸檬春烏龍", en: "Lemon Spring Oolong" }, price: "NT$55" },
            { name: { zh: "輕烏龍", en: "Light Oolong" }, price: "NT$35" },
            { name: { zh: "甘蔗春烏龍", en: "Cane Spring Oolong" }, price: "NT$60" }
        ]
    },
    {
        id: "8",
        name: { zh: "一沐日", en: "Yi Mu Ri" },
        description: {
            zh: "台中起家，以獨特「草仔粿」粉粿和粉粿奶茶爆紅。",
            en: "Originally from Taichung, famous for unique herbal rice cake jelly (Caozai Guo)."
        },
        address: "Taipei City",
        rating: 4.8,
        tags: { zh: ["粉粿", "草仔粿", "特色"], en: ["Jelly", "Traditional", "Unique"] },
        menu: [
            { name: { zh: "逮丸奶茶 (草仔粿)", en: "Taiwan Milk Tea (Jelly)" }, price: "NT$65" },
            { name: { zh: "粉粿黑糖奶茶", en: "Brown Sugar Jelly Milk Tea" }, price: "NT$60" },
            { name: { zh: "油切蕎麥茶", en: "Buckwheat Tea" }, price: "NT$40" },
            { name: { zh: "黃金芯葉茶", en: "Golden Leaf Tea" }, price: "NT$35" },
            { name: { zh: "奶蓋招牌紅", en: "Cream Cap Signature Red" }, price: "NT$60" }
        ]
    },
    {
        id: "9",
        name: { zh: "CoCo都可", en: "CoCo" },
        description: {
            zh: "全球展店最多的品牌之一，百香雙響炮是永遠的經典。",
            en: "One of the largest global chains, famous for the Passion Fruit Tea with Pearls & Jelly."
        },
        address: "Taipei City",
        rating: 4.6,
        tags: { zh: ["百香雙響炮", "全球", "高CP值"], en: ["Passion Fruit", "Global", "Value"] },
        menu: [
            { name: { zh: "百香雙響炮", en: "Passion Fruit Trio" }, price: "NT$55" },
            { name: { zh: "奶茶三兄弟", en: "3 Guys (Pearl, Pudding, Grass Jelly)" }, price: "NT$50" },
            { name: { zh: "珍珠奶茶", en: "Bubble Milk Tea" }, price: "NT$50" },
            { name: { zh: "鮮芋牛奶", en: "Taro Milk" }, price: "NT$65" },
            { name: { zh: "莓果戀人", en: "Berry Lovers" }, price: "NT$60" }
        ]
    },
    {
        id: "10",
        name: { zh: "五桐號", en: "WooTea" },
        description: {
            zh: "主打復古仙草與杏仁凍，茶底韻味十足。",
            en: "Specializes in vintage-style grass jelly and almond jelly with strong tea bases."
        },
        address: "Taipei City",
        rating: 4.7,
        tags: { zh: ["杏仁凍", "五桐茶", "復古"], en: ["Almond Jelly", "WooTea", "Vintage"] },
        menu: [
            { name: { zh: "五桐奶霜", en: "WooTea Cream" }, price: "NT$55" },
            { name: { zh: "杏仁凍五桐茶", en: "Almond Jelly WooTea" }, price: "NT$50" },
            { name: { zh: "老實人紅茶拿鐵", en: "Honest Black Tea Latte" }, price: "NT$60" },
            { name: { zh: "綠茶凍五桐奶茶", en: "Green Tea Jelly Milk Tea" }, price: "NT$55" },
            { name: { zh: "招牌五桐茶", en: "Signature WooTea" }, price: "NT$35" }
        ]
    }
];

allShops = shopsData;

// I18n Logic
function updateLanguage(lang) {
    // Update Static Text
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key]; // Use innerHTML for <br> support
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Update Toggle Button Text
    langText.textContent = translations[lang].langName;

    // Re-render Shops
    renderShops(allShops);

    // Refresh Modal if open
    if (currentShop && !modalOverlay.classList.contains('hidden')) {
        openModal(currentShop);
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    updateLanguage(currentLang);
}

// Render Shops (Updated for I18n)
function renderShops(shops) {
    shopGrid.innerHTML = '';

    if (shops.length === 0) {
        shopGrid.innerHTML = '<p style="text-align:center; width:100%; opacity:0.7;">No shops found.</p>';
        return;
    }

    shops.forEach((shop, index) => {
        const card = document.createElement('div');
        card.classList.add('shop-card');
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0';

        // Get localized data
        const name = shop.name[currentLang];
        const desc = shop.description[currentLang];
        const tags = shop.tags[currentLang];

        card.innerHTML = `
      <div class="card-header">
        <h3 class="card-title">${name}</h3>
        <span class="card-rating"><i class="fa-solid fa-star"></i> ${shop.rating}</span>
      </div>
      <p class="card-desc">${desc}</p>
      <div class="card-tags">
        ${tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
      </div>
    `;

        card.addEventListener('click', () => openModal(shop));
        shopGrid.appendChild(card);
    });
}

let currentShop = null;

// Modal Logic (Updated for I18n)
function openModal(shop) {
    currentShop = shop; // Track current shop
    const name = shop.name[currentLang];
    const desc = shop.description[currentLang];
    const menu = shop.menu;

    modalTitle.textContent = name;
    modalRating.innerHTML = `<i class="fa-solid fa-star"></i> ${shop.rating}`;
    modalDesc.textContent = desc;

    modalMenu.innerHTML = menu.map(item => `
    <li class="menu-item">
      <div class="item-info">
        <span class="item-name">${item.name[currentLang]}</span>
      </div>
      <div class="item-price">${item.price}</div>
    </li>
  `).join('');

    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    currentShop = null; // Clear current shop
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = '';
}

// Event Listeners
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Search Filter (Updated for I18n)
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();

    // Note: For simplicity, searching matches against BOTH languages or current?
    // Let's match against current displayed language for consistency
    const filtered = allShops.filter(shop => {
        const name = shop.name[currentLang].toLowerCase();
        const tags = shop.tags[currentLang].map(t => t.toLowerCase());
        const menuNames = shop.menu.map(m => m.name[currentLang].toLowerCase());

        const matchesSearch = name.includes(term) ||
            tags.some(t => t.includes(term)) ||
            menuNames.some(m => m.includes(term));

        const activeFilter = document.querySelector('.tag-btn.active').getAttribute('data-filter');
        // Map active filter to current lang tags logic if needed, 
        // but here we use the data-filter attribute which is static English keys (Bubble Tea, Tea, Premium)
        // We need to check if the shop has that tag in its ENGLISH tag list for consistency of filtering logic,
        // OR we change data-filter to be language agnostic. 
        // Let's assume data-filter="Bubble Tea" maps to checking shop.tags.en.includes("Bubble Tea") always.

        let matchesCategory = true;
        if (activeFilter !== 'all') {
            matchesCategory = shop.tags.en.includes(activeFilter);
        }

        return matchesSearch && matchesCategory;
    });

    renderShops(filtered);
});

// Category Filter
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Trigger search input event to re-filter
        searchInput.dispatchEvent(new Event('input'));
    });
});

// Language Toggle Element
langToggleBtn.addEventListener('click', toggleLanguage);

// CSS Animation Keyframes injection
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleSheet);

// Initialize
updateLanguage(currentLang);
