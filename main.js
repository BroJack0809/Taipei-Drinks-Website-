
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
        filterChewy: "咀嚼系",
        filterJelly: "凍飲控",
        filterLatte: "鮮奶歐蕾",
        filterFruitTea: "清爽果茶",
        footerText: "&copy; 2026 台北手搖飲菜單。",
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
        filterChewy: "Chewy",
        filterJelly: "Jelly",
        filterLatte: "Latte",
        filterFruitTea: "Fruit Tea",
        footerText: "&copy; 2026 Taipei Drinks Menu.",
        menuHighlights: "Menu Highlights",
        orderBtn: "Order Now",
        langName: "中文" // Text to show on button when current is EN
    }
};

// Data: COMEBUY Complete Menu (Bilingual)
const shopsData = [
    {
        id: "1",
        name: { zh: "COMEBUY", en: "COMEBUY" },
        description: {
            zh: "提供多樣化的茶飲選擇,從暖心熱飲到清爽果茶,滿足各種口味需求。",
            en: "Offering diverse tea selections from warming hot drinks to refreshing fruit teas, satisfying all taste preferences."
        },
        address: "Taipei City",
        rating: 4.6,
        tags: { zh: ["咀嚼系", "清爽果茶"], en: ["Chewy", "Fruit Tea"] },
        menuCategories: [
            {
                category: { zh: "暖心熱推薦", en: "Featured Hot Drinks" },
                items: [
                    { name: { zh: "雙Q奶茶1號 (珍珠+粉條)", en: "Double Q Milk Tea #1 (Pearl + Vermicelli)" }, price: "NT$60" },
                    { name: { zh: "抹茶拿鐵", en: "Matcha Latte" }, price: "NT$80" },
                    { name: { zh: "玫瑰普洱奶茶", en: "Rose Pu-erh Milk Tea" }, price: "NT$65" },
                    { name: { zh: "桂花奶綠", en: "Osmanthus Milk Green Tea" }, price: "NT$65" },
                    { name: { zh: "紫米奶茶", en: "Purple Rice Milk Tea" }, price: "NT$65" },
                    { name: { zh: "話梅冰綠", en: "Plum Green Tea" }, price: "NT$50" },
                    { name: { zh: "黑糖薑汁可可", en: "Brown Sugar Ginger Cocoa" }, price: "NT$70" },
                    { name: { zh: "熱檸紅/綠茶", en: "Hot Lemon Black/Green Tea" }, price: "NT$55" },
                    { name: { zh: "桂圓紅棗", en: "Longan Red Date Tea" }, price: "NT$50" },
                    { name: { zh: "超桔霸氣飲", en: "Super Tangerine Drink" }, price: "NT$50" }
                ]
            },
            {
                category: { zh: "原葉鮮萃茶系列", en: "Teapresso / Milk Tea / Tea Latte" },
                items: [
                    { name: { zh: "鮮萃大麥紅茶 (原葉)", en: "Teapresso Barley Black Tea" }, price: "NT$40" },
                    { name: { zh: "鮮萃大麥紅茶 (奶茶)", en: "Barley Black Milk Tea" }, price: "NT$60" },
                    { name: { zh: "海神 (原葉)", en: "Sea God Tea" }, price: "NT$45" },
                    { name: { zh: "海神 (奶茶)", en: "Sea God Milk Tea" }, price: "NT$65" },
                    { name: { zh: "玩火 (原葉)", en: "Play with Fire Tea" }, price: "NT$45" },
                    { name: { zh: "玩火 (奶茶)", en: "Play with Fire Milk Tea" }, price: "NT$65" },
                    { name: { zh: "碧螺春 (原葉)", en: "Bi Luo Chun Tea" }, price: "NT$40" },
                    { name: { zh: "四季春 (原葉)", en: "Four Seasons Spring Tea" }, price: "NT$40" },
                    { name: { zh: "四季春 (奶茶)", en: "Four Seasons Milk Tea" }, price: "NT$60" },
                    { name: { zh: "四季春 (拿鐵)", en: "Four Seasons Tea Latte" }, price: "NT$65" },
                    { name: { zh: "烏龍綠茶 (原葉)", en: "Oolong Green Tea" }, price: "NT$40" },
                    { name: { zh: "烏龍綠茶 (奶茶)", en: "Oolong Green Milk Tea" }, price: "NT$60" },
                    { name: { zh: "烏龍綠茶 (拿鐵)", en: "Oolong Green Tea Latte" }, price: "NT$65" },
                    { name: { zh: "茉莉烏龍 (原葉)", en: "Jasmine Oolong Tea" }, price: "NT$40" },
                    { name: { zh: "茉莉烏龍 (奶茶)", en: "Jasmine Oolong Milk Tea" }, price: "NT$60" },
                    { name: { zh: "茉莉烏龍 (拿鐵)", en: "Jasmine Oolong Latte" }, price: "NT$65" },
                    { name: { zh: "斯里蘭卡烏瓦紅茶 (原葉)", en: "Sri Lanka Uva Black Tea" }, price: "NT$40" },
                    { name: { zh: "斯里蘭卡烏瓦紅茶 (拿鐵)", en: "Sri Lanka Uva Black Tea Latte" }, price: "NT$65" },
                    { name: { zh: "金萱茶 (原葉)", en: "Jin Xuan Tea" }, price: "NT$40" },
                    { name: { zh: "金萱茶 (拿鐵)", en: "Jin Xuan Tea Latte" }, price: "NT$65" },
                    { name: { zh: "熟成觀音 (原葉)", en: "Aged Tie Guan Yin Tea" }, price: "NT$40" },
                    { name: { zh: "熟成觀音 (奶茶)", en: "Aged Tie Guan Yin Milk Tea" }, price: "NT$60" },
                    { name: { zh: "熟成觀音 (拿鐵)", en: "Aged Tie Guan Yin Latte" }, price: "NT$65" },
                    { name: { zh: "玫瑰普洱 (原葉)", en: "Rose Pu-erh Tea" }, price: "NT$45" },
                    { name: { zh: "玫瑰普洱 (奶茶)", en: "Rose Pu-erh Milk Tea" }, price: "NT$65" },
                    { name: { zh: "玫瑰普洱 (拿鐵)", en: "Rose Pu-erh Latte" }, price: "NT$70" },
                    { name: { zh: "文山包種 (原葉)", en: "Wenshan Pouchong Tea" }, price: "NT$50" },
                    { name: { zh: "文山包種 (拿鐵)", en: "Wenshan Pouchong Latte" }, price: "NT$75" },
                    { name: { zh: "東方美人 (原葉)", en: "Oriental Beauty Tea" }, price: "NT$50" },
                    { name: { zh: "桂花四季春 (原葉)", en: "Osmanthus Four Seasons Tea" }, price: "NT$50" },
                    { name: { zh: "白桃蜜烏龍 (原葉)", en: "White Peach Oolong Tea" }, price: "NT$55" }
                ]
            },
            {
                category: { zh: "鮮調果茶", en: "Specialty" },
                items: [
                    { name: { zh: "錫蘭紅茶", en: "Ceylon Black Tea" }, price: "NT$30" },
                    { name: { zh: "茉莉綠茶", en: "Jasmine Green Tea" }, price: "NT$30" },
                    { name: { zh: "蜂蜜紅/綠茶", en: "Honey Black/Green Tea" }, price: "NT$50" },
                    { name: { zh: "玉荷冰綠", en: "Jade Lotus Green Tea" }, price: "NT$50" },
                    { name: { zh: "檸檬紅/綠茶", en: "Lemon Black/Green Tea" }, price: "NT$55" },
                    { name: { zh: "養樂多綠茶", en: "Yakult Green Tea" }, price: "NT$55" },
                    { name: { zh: "百香搖果樂", en: "Passion Fruit Jelly Tea" }, price: "NT$60" },
                    { name: { zh: "蘋果冰茶", en: "Apple Iced Tea" }, price: "NT$60" },
                    { name: { zh: "鳳梨冰茶", en: "Pineapple Iced Tea" }, price: "NT$65" },
                    { name: { zh: "芭樂檸檬綠", en: "Guava Lemon Green Tea" }, price: "NT$65" }
                ]
            },
            {
                category: { zh: "奶茶/特調", en: "Milk Tea Special" },
                items: [
                    { name: { zh: "雙Q奶茶2號 (珍珠+芋圓+薯圓)", en: "Double Q Milk Tea #2 (Pearl + Taro + Sweet Potato Balls)" }, price: "NT$60" },
                    { name: { zh: "招牌奶茶", en: "Signature Milk Tea" }, price: "NT$50" },
                    { name: { zh: "黃金奶綠", en: "Golden Milk Green Tea" }, price: "NT$50" },
                    { name: { zh: "珍珠奶茶/奶綠", en: "Pearl Milk Tea/Green" }, price: "NT$55" },
                    { name: { zh: "粉條奶茶", en: "Vermicelli Milk Tea" }, price: "NT$60" },
                    { name: { zh: "仙草凍奶茶", en: "Grass Jelly Milk Tea" }, price: "NT$65" },
                    { name: { zh: "桂花奶綠", en: "Osmanthus Milk Green Tea" }, price: "NT$65" },
                    { name: { zh: "港式厚奶", en: "Hong Kong Style Thick Milk Tea" }, price: "NT$70" },
                    { name: { zh: "經典可可", en: "Classic Cocoa" }, price: "NT$60" },
                    { name: { zh: "宇治抹茶", en: "Uji Matcha" }, price: "NT$60" },
                    { name: { zh: "抹茶拿鐵", en: "Matcha Latte" }, price: "NT$80" }
                ]
            },
            {
                category: { zh: "果然系列 (無咖啡因)", en: "Decaffeine" },
                items: [
                    { name: { zh: "超桔霸氣飲", en: "Super Tangerine Drink" }, price: "NT$50" },
                    { name: { zh: "蜂蜜蘆薈", en: "Honey Aloe" }, price: "NT$50" },
                    { name: { zh: "金桔檸檬", en: "Kumquat Lemon" }, price: "NT$55" },
                    { name: { zh: "荔枝玉露", en: "Lychee Jade Dew" }, price: "NT$55" },
                    { name: { zh: "纖美小紫蘇", en: "Basil Seed Drink" }, price: "NT$65" },
                    { name: { zh: "芭樂多多", en: "Guava Yakult" }, price: "NT$85" }
                ]
            },
            {
                category: { zh: "季節/新品限定", en: "Seasonal & New" },
                items: [
                    { name: { zh: "話梅冰綠", en: "Plum Green Tea" }, price: "NT$50" },
                    { name: { zh: "話梅檸檬綠", en: "Plum Lemon Green Tea" }, price: "NT$65" },
                    { name: { zh: "沖繩黑糖奶茶/奶綠 (M)", en: "Okinawa Brown Sugar Milk Tea/Green (M)" }, price: "NT$60" },
                    { name: { zh: "沖繩黑糖奶茶/奶綠 (L)", en: "Okinawa Brown Sugar Milk Tea/Green (L)" }, price: "NT$80" },
                    { name: { zh: "黑糖紅茶拿鐵 (M)", en: "Brown Sugar Black Tea Latte (M)" }, price: "NT$75" },
                    { name: { zh: "檸檬愛玉風味飲", en: "Lemon Aiyu Jelly Drink" }, price: "NT$55" },
                    { name: { zh: "金芒果優酪", en: "Golden Mango Yogurt" }, price: "NT$65" },
                    { name: { zh: "葡萄柚綠茶", en: "Grapefruit Green Tea" }, price: "NT$65" },
                    { name: { zh: "青檸香柚QQ", en: "Lime Pomelo QQ" }, price: "NT$75" },
                    { name: { zh: "桂圓紅棗", en: "Longan Red Date Tea" }, price: "NT$50" },
                    { name: { zh: "暖薑茶", en: "Warm Ginger Tea" }, price: "NT$50" },
                    { name: { zh: "暖薑奶茶", en: "Warm Ginger Milk Tea" }, price: "NT$60" },
                    { name: { zh: "熱檸紅/綠茶", en: "Hot Lemon Black/Green Tea" }, price: "NT$55" },
                    { name: { zh: "熱桔茶", en: "Hot Tangerine Tea" }, price: "NT$55" },
                    { name: { zh: "紫米奶茶", en: "Purple Rice Milk Tea" }, price: "NT$65" },
                    { name: { zh: "紫米可可", en: "Purple Rice Cocoa" }, price: "NT$75" },
                    { name: { zh: "黑糖薑汁可可", en: "Brown Sugar Ginger Cocoa" }, price: "NT$70" }
                ]
            }
        ]
    },
    {
        id: "2",
        name: { zh: "可不可熟成紅茶", en: "KEBUKE" },
        description: {
            zh: "專注於熟成紅茶的英倫復古風品牌,茶味濃郁,招牌白玉歐蕾必喝。",
            en: "British-vintage styled brand specializing in aged black tea with rich flavor. Must-try White Jade Latte."
        },
        address: "Taipei City",
        rating: 4.7,
        tags: { zh: ["鮮奶歐蕾"], en: ["Latte"] },
        menuCategories: [
            {
                category: { zh: "乎乾 好茶", en: "Black & Green Tea" },
                items: [
                    { name: { zh: "熟成紅茶 (M)", en: "Signature Black Tea (M)" }, price: "NT$35" },
                    { name: { zh: "熟成紅茶 (L)", en: "Signature Black Tea (L)" }, price: "NT$40" },
                    { name: { zh: "麗春紅茶 (M)", en: "Li Chun Black Tea (M)" }, price: "NT$35" },
                    { name: { zh: "麗春紅茶 (L)", en: "Li Chun Black Tea (L)" }, price: "NT$40" },
                    { name: { zh: "春芽綠茶 (M)", en: "Spring Bud Green Tea (M)" }, price: "NT$35" },
                    { name: { zh: "春芽綠茶 (L)", en: "Spring Bud Green Tea (L)" }, price: "NT$40" },
                    { name: { zh: "胭脂紅茶 (M)", en: "Rouge Black Tea (M)" }, price: "NT$45" },
                    { name: { zh: "胭脂紅茶 (L)", en: "Rouge Black Tea (L)" }, price: "NT$50" }
                ]
            },
            {
                category: { zh: "乎乾 冬瓜", en: "Winter Melon" },
                items: [
                    { name: { zh: "雪花冷露 (M)", en: "Snowflake Winter Melon (M)" }, price: "NT$35" },
                    { name: { zh: "雪花冷露 (L)", en: "Snowflake Winter Melon (L)" }, price: "NT$40" },
                    { name: { zh: "熟成冷露 (M)", en: "Black Tea Winter Melon (M)" }, price: "NT$40" },
                    { name: { zh: "熟成冷露 (L)", en: "Black Tea Winter Melon (L)" }, price: "NT$45" },
                    { name: { zh: "春芽冷露 (M)", en: "Green Tea Winter Melon (M)" }, price: "NT$40" },
                    { name: { zh: "春芽冷露 (L)", en: "Green Tea Winter Melon (L)" }, price: "NT$45" },
                    { name: { zh: "胭脂冷露 (M)", en: "Rouge Winter Melon (M)" }, price: "NT$45" },
                    { name: { zh: "胭脂冷露 (L)", en: "Rouge Winter Melon (L)" }, price: "NT$50" },
                    { name: { zh: "檸檬冷露 (M)", en: "Lemon Winter Melon (M)" }, price: "NT$50" },
                    { name: { zh: "檸檬冷露 (L)", en: "Lemon Winter Melon (L)" }, price: "NT$60" }
                ]
            },
            {
                category: { zh: "乎乾 手作", en: "Handmade / Fruit Tea" },
                items: [
                    { name: { zh: "熟檸紅茶 (M)", en: "Lemon Black Tea (M)" }, price: "NT$45" },
                    { name: { zh: "熟檸紅茶 (L)", en: "Lemon Black Tea (L)" }, price: "NT$55" },
                    { name: { zh: "春檸綠茶 (M)", en: "Lemon Green Tea (M)" }, price: "NT$45" },
                    { name: { zh: "春檸綠茶 (L)", en: "Lemon Green Tea (L)" }, price: "NT$55" },
                    { name: { zh: "春梅冰茶 (M)", en: "Plum Green Tea (M)" }, price: "NT$50" },
                    { name: { zh: "春梅冰茶 (L)", en: "Plum Green Tea (L)" }, price: "NT$60" },
                    { name: { zh: "太妃熟成 (M)", en: "Toffee Black Tea (M)" }, price: "NT$50" },
                    { name: { zh: "太妃熟成 (L)", en: "Toffee Black Tea (L)" }, price: "NT$55" },
                    { name: { zh: "金蜜熟成 (M)", en: "Honey Black Tea (M)" }, price: "NT$53" },
                    { name: { zh: "金蜜熟成 (L)", en: "Honey Black Tea (L)" }, price: "NT$63" },
                    { name: { zh: "胭脂多多 (M)", en: "Rouge Yakult (M)" }, price: "NT$50" },
                    { name: { zh: "胭脂多多 (L)", en: "Rouge Yakult (L)" }, price: "NT$60" }
                ]
            },
            {
                category: { zh: "乎乾 好眠 (無咖啡因)", en: "Caffeine Free" },
                items: [
                    { name: { zh: "輕纖穀奈茶 (M)", en: "Grain Tea (M)" }, price: "NT$40" },
                    { name: { zh: "輕纖穀奈茶 (L)", en: "Grain Tea (L)" }, price: "NT$50" },
                    { name: { zh: "穀奈冷露 (M)", en: "Grain Winter Melon (M)" }, price: "NT$45" },
                    { name: { zh: "穀奈冷露 (L)", en: "Grain Winter Melon (L)" }, price: "NT$55" },
                    { name: { zh: "穀奈歐蕾 (M)", en: "Grain Latte (M)" }, price: "NT$59" },
                    { name: { zh: "穀奈歐蕾 (L)", en: "Grain Latte (L)" }, price: "NT$69" },
                    { name: { zh: "金蜜檸檬 (M)", en: "Honey Lemon (M)" }, price: "NT$53" },
                    { name: { zh: "金蜜檸檬 (L)", en: "Honey Lemon (L)" }, price: "NT$63" }
                ]
            },
            {
                category: { zh: "乎乾 奶茶", en: "Milk Tea" },
                items: [
                    { name: { zh: "熟成奶茶 (M)", en: "Signature Milk Tea (M)" }, price: "NT$45" },
                    { name: { zh: "熟成奶茶 (L)", en: "Signature Milk Tea (L)" }, price: "NT$55" },
                    { name: { zh: "春芽奶茶 (M)", en: "Green Milk Tea (M)" }, price: "NT$45" },
                    { name: { zh: "春芽奶茶 (L)", en: "Green Milk Tea (L)" }, price: "NT$55" },
                    { name: { zh: "胭脂奶茶 (M)", en: "Rouge Milk Tea (M)" }, price: "NT$50" },
                    { name: { zh: "胭脂奶茶 (L)", en: "Rouge Milk Tea (L)" }, price: "NT$60" },
                    { name: { zh: "白玉奶茶 (M)", en: "White Jade Milk Tea (M)" }, price: "NT$50" },
                    { name: { zh: "白玉奶茶 (L)", en: "White Jade Milk Tea (L)" }, price: "NT$60" }
                ]
            },
            {
                category: { zh: "乎乾 鮮奶茶", en: "Fresh Milk Tea / Latte" },
                items: [
                    { name: { zh: "熟成歐蕾 (M)", en: "Signature Latte (M)" }, price: "NT$55" },
                    { name: { zh: "熟成歐蕾 (L)", en: "Signature Latte (L)" }, price: "NT$65" },
                    { name: { zh: "冷露歐蕾 (M)", en: "Winter Melon Latte (M)" }, price: "NT$55" },
                    { name: { zh: "冷露歐蕾 (L)", en: "Winter Melon Latte (L)" }, price: "NT$65" },
                    { name: { zh: "金蜜歐蕾 (M)", en: "Honey Latte (M)" }, price: "NT$60" },
                    { name: { zh: "金蜜歐蕾 (L)", en: "Honey Latte (L)" }, price: "NT$70" },
                    { name: { zh: "胭脂歐蕾 (M)", en: "Rouge Latte (M)" }, price: "NT$59" },
                    { name: { zh: "胭脂歐蕾 (L)", en: "Rouge Latte (L)" }, price: "NT$69" },
                    { name: { zh: "白玉歐蕾 (M)", en: "White Jade Latte (M)" }, price: "NT$60" },
                    { name: { zh: "白玉歐蕾 (L)", en: "White Jade Latte (L)" }, price: "NT$70" },
                    { name: { zh: "鴛鴦歐蕾 (M)", en: "Yuanyang Latte (M)" }, price: "NT$60" },
                    { name: { zh: "鴛鴦歐蕾 (L)", en: "Yuanyang Latte (L)" }, price: "NT$70" },
                    { name: { zh: "熟成榛果歐蕾 (M)", en: "Hazelnut Latte (M)" }, price: "NT$60" },
                    { name: { zh: "熟成榛果歐蕾 (L)", en: "Hazelnut Latte (L)" }, price: "NT$70" },
                    { name: { zh: "墨玉鴛鴦歐蕾 (M)", en: "Black Jade Yuanyang Latte (M)" }, price: "NT$70" },
                    { name: { zh: "墨玉鴛鴦歐蕾 (L)", en: "Black Jade Yuanyang Latte (L)" }, price: "NT$80" }
                ]
            },
            {
                category: { zh: "乎乾 冰淇淋", en: "Ice Cream" },
                items: [
                    { name: { zh: "雪藏紅茶 (M)", en: "Ice Cream Black Tea (M)" }, price: "NT$60" },
                    { name: { zh: "雪藏奶茶 (M)", en: "Ice Cream Milk Tea (M)" }, price: "NT$69" },
                    { name: { zh: "咖啡雪藏胭脂 (M)", en: "Coffee Ice Cream Rouge (M)" }, price: "NT$65" },
                    { name: { zh: "咖啡雪藏胭脂 (L)", en: "Coffee Ice Cream Rouge (L)" }, price: "NT$75" }
                ]
            }
        ]
    },
    {
        id: "3",
        name: { zh: "五桐號", en: "WooTea" },
        description: {
            zh: "主打復古仙草與杏仁凍,茶底韻味十足,五桐奶霜是招牌必點。",
            en: "Specializes in vintage-style grass jelly and almond jelly with strong tea bases. Must-try WooTea Cream."
        },
        address: "Taipei City",
        rating: 4.7,
        tags: { zh: ["凍飲控", "清爽果茶"], en: ["Jelly", "Fruit Tea"] },
        menuCategories: [
            {
                category: { zh: "季節限定", en: "Seasonal" },
                items: [
                    { name: { zh: "雪絨草莓奶酪 (L)", en: "Strawberry Panna Cotta (L)" }, price: "NT$99" },
                    { name: { zh: "草莓抹茶奶霜 (L)", en: "Strawberry Matcha Cream (L)" }, price: "NT$79" },
                    { name: { zh: "琥珀烤奶 (L)", en: "Amber Roasted Milk (L)" }, price: "NT$60" },
                    { name: { zh: "紅豆琥珀烤奶 (L)", en: "Red Bean Amber Roasted Milk (L)" }, price: "NT$75" },
                    { name: { zh: "鹹梨青茶 (L)", en: "Salted Pear Green Tea (L)" }, price: "NT$65" },
                    { name: { zh: "桂花梨青 (L)", en: "Osmanthus Pear Green Tea (L)" }, price: "NT$65" },
                    { name: { zh: "杏仁凍焙茶冰沙 (L)", en: "Almond Jelly Roasted Tea Smoothie (L)" }, price: "NT$89" },
                    { name: { zh: "鐵觀音焙奶茶 (L)", en: "Tie Guan Yin Roasted Milk Tea (L)" }, price: "NT$65" },
                    { name: { zh: "焙茶珍珠可可 (L)", en: "Roasted Tea Pearl Cocoa (L)" }, price: "NT$69" }
                ]
            },
            {
                category: { zh: "醇茶", en: "Pure Tea" },
                items: [
                    { name: { zh: "經典五桐茶 (L)", en: "Classic WooTea (L)" }, price: "NT$35" },
                    { name: { zh: "杏仁凍五桐茶 (L)", en: "Almond Jelly WooTea (L)" }, price: "NT$49" },
                    { name: { zh: "一把青茶 (L)", en: "Green Tea (L)" }, price: "NT$35" },
                    { name: { zh: "茉莉香片 (L)", en: "Jasmine Tea (L)" }, price: "NT$35" },
                    { name: { zh: "老實人紅茶 (L)", en: "Honest Black Tea (L)" }, price: "NT$35" },
                    { name: { zh: "清香烏龍 (L)", en: "Oolong Tea (L)" }, price: "NT$35" },
                    { name: { zh: "玄米蕎麥 (L)", en: "Genmaicha Buckwheat (L)" }, price: "NT$40" }
                ]
            },
            {
                category: { zh: "鮮奶", en: "Latte / Fresh Milk Tea" },
                items: [
                    { name: { zh: "濃煮拿鐵 (L)", en: "Concentrated Latte (L)" }, price: "NT$60" },
                    { name: { zh: "綠茶凍濃煮拿鐵 (L)", en: "Green Tea Jelly Latte (L)" }, price: "NT$65" },
                    { name: { zh: "鐵觀音拿鐵 (L)", en: "Tie Guan Yin Latte (L)" }, price: "NT$60" },
                    { name: { zh: "玄米蕎麥拿鐵 (L)", en: "Genmaicha Buckwheat Latte (L)" }, price: "NT$65" },
                    { name: { zh: "琥珀烤拿鐵 (L)", en: "Amber Roasted Latte (L)" }, price: "NT$70" },
                    { name: { zh: "紅豆琥珀烤拿鐵 (L)", en: "Red Bean Amber Roasted Latte (L)" }, price: "NT$85" },
                    { name: { zh: "茉莉綠茶拿鐵 (L)", en: "Jasmine Green Tea Latte (L)" }, price: "NT$60" },
                    { name: { zh: "珍珠濃煮拿鐵 (L)", en: "Pearl Concentrated Latte (L)" }, price: "NT$60" }
                ]
            },
            {
                category: { zh: "奶茶", en: "Milk Tea" },
                items: [
                    { name: { zh: "濃煮奶茶 (L)", en: "Concentrated Milk Tea (L)" }, price: "NT$55" },
                    { name: { zh: "綠茶凍濃煮奶茶 (L)", en: "Green Tea Jelly Milk Tea (L)" }, price: "NT$60" },
                    { name: { zh: "鐵觀音奶茶 (L)", en: "Tie Guan Yin Milk Tea (L)" }, price: "NT$55" },
                    { name: { zh: "最完美手沖泰奶 (L)", en: "Perfect Hand-Brewed Thai Tea (L)" }, price: "NT$79" },
                    { name: { zh: "珍珠手沖泰奶 (L)", en: "Pearl Hand-Brewed Thai Tea (L)" }, price: "NT$69" },
                    { name: { zh: "玄米蕎麥奶茶 (L)", en: "Genmaicha Buckwheat Milk Tea (L)" }, price: "NT$60" },
                    { name: { zh: "茉莉奶綠 (L)", en: "Jasmine Milk Green Tea (L)" }, price: "NT$55" },
                    { name: { zh: "珍珠奶茶 (L)", en: "Pearl Milk Tea (L)" }, price: "NT$55" }
                ]
            },
            {
                category: { zh: "奶霜", en: "Cream Cheese Foam" },
                items: [
                    { name: { zh: "五桐奶霜 (L)", en: "WooTea Cream (L)" }, price: "NT$55" },
                    { name: { zh: "老實人奶霜紅茶 (L)", en: "Honest Black Tea Cream (L)" }, price: "NT$55" },
                    { name: { zh: "蕎麥奶霜 (L)", en: "Buckwheat Cream (L)" }, price: "NT$60" },
                    { name: { zh: "茉莉奶霜 (L)", en: "Jasmine Cream (L)" }, price: "NT$55" },
                    { name: { zh: "烏龍奶霜 (L)", en: "Oolong Cream (L)" }, price: "NT$55" }
                ]
            },
            {
                category: { zh: "古早味", en: "Traditional Taste" },
                items: [
                    { name: { zh: "粉粿青檸冬瓜 (L)", en: "Jelly Lime Winter Melon (L)" }, price: "NT$60" },
                    { name: { zh: "農榨青檸冬瓜 (L)", en: "Fresh Lime Winter Melon (L)" }, price: "NT$50" },
                    { name: { zh: "老鹽梅子 (L)", en: "Salted Plum (L)" }, price: "NT$60" },
                    { name: { zh: "青梅烏龍凍飲 (L)", en: "Green Plum Oolong (L)" }, price: "NT$50" }
                ]
            },
            {
                category: { zh: "農摘", en: "Fruit Tea" },
                items: [
                    { name: { zh: "柚香荔枝凍飲 (L)", en: "Pomelo Lychee (L)" }, price: "NT$65" },
                    { name: { zh: "山形蜜桃凍飲 (L)", en: "Yamagata Peach (L)" }, price: "NT$65" },
                    { name: { zh: "桂花烏龍凍飲 (L)", en: "Osmanthus Oolong (L)" }, price: "NT$60" },
                    { name: { zh: "紅柚青茶凍飲 (L)", en: "Red Pomelo Green Tea (L)" }, price: "NT$65" },
                    { name: { zh: "青檸青茶 (L)", en: "Lime Green Tea (L)" }, price: "NT$50" },
                    { name: { zh: "紅心芭樂綠茶 (L)", en: "Red Guava Green Tea (L)" }, price: "NT$65" },
                    { name: { zh: "紅心芭樂烏龍 (L)", en: "Red Guava Oolong (L)" }, price: "NT$65" }
                ]
            }
        ]
    },
    {
        id: "4",
        name: { zh: "50嵐", en: "Wushiland" },
        description: {
            zh: "台灣最經典的手搖飲品牌,以穩定品質與招牌小珍珠聞名,1號必喝。",
            en: "Taiwan's most classic bubble tea brand, known for consistent quality and signature small pearls. Must-try No.1."
        },
        address: "Taipei City",
        rating: 4.8,
        tags: { zh: ["咀嚼系", "鮮奶歐蕾"], en: ["Chewy", "Latte"] },
        menuCategories: [
            {
                category: { zh: "找好茶", en: "Tea Series" },
                items: [
                    { name: { zh: "茉莉綠茶 (M)", en: "Jasmine Green Tea (M)" }, price: "NT$35" },
                    { name: { zh: "茉莉綠茶 (L)", en: "Jasmine Green Tea (L)" }, price: "NT$40" },
                    { name: { zh: "阿薩姆紅茶 (M)", en: "Assam Black Tea (M)" }, price: "NT$35" },
                    { name: { zh: "阿薩姆紅茶 (L)", en: "Assam Black Tea (L)" }, price: "NT$40" },
                    { name: { zh: "四季春青茶 (M)", en: "Four Seasons Spring Tea (M)" }, price: "NT$35" },
                    { name: { zh: "四季春青茶 (L)", en: "Four Seasons Spring Tea (L)" }, price: "NT$40" },
                    { name: { zh: "黃金烏龍 (M)", en: "Golden Oolong (M)" }, price: "NT$35" },
                    { name: { zh: "黃金烏龍 (L)", en: "Golden Oolong (L)" }, price: "NT$40" },
                    { name: { zh: "檸檬綠 (M)", en: "Lemon Green Tea (M)" }, price: "NT$50" },
                    { name: { zh: "檸檬綠 (L)", en: "Lemon Green Tea (L)" }, price: "NT$60" },
                    { name: { zh: "梅の綠 (M)", en: "Plum Green Tea (M)" }, price: "NT$50" },
                    { name: { zh: "梅の綠 (L)", en: "Plum Green Tea (L)" }, price: "NT$60" },
                    { name: { zh: "桔子綠 (M)", en: "Tangerine Green Tea (M)" }, price: "NT$50" },
                    { name: { zh: "桔子綠 (L)", en: "Tangerine Green Tea (L)" }, price: "NT$60" },
                    { name: { zh: "8冰綠 (M)", en: "8 Ice Green (M)" }, price: "NT$50" },
                    { name: { zh: "8冰綠 (L)", en: "8 Ice Green (L)" }, price: "NT$60" },
                    { name: { zh: "養樂多綠 (M)", en: "Yakult Green Tea (M)" }, price: "NT$50" },
                    { name: { zh: "養樂多綠 (L)", en: "Yakult Green Tea (L)" }, price: "NT$60" },
                    { name: { zh: "旺來紅/綠 (M)", en: "Pineapple Black/Green Tea (M)" }, price: "NT$50" },
                    { name: { zh: "旺來紅/綠 (L)", en: "Pineapple Black/Green Tea (L)" }, price: "NT$60" },
                    { name: { zh: "柚子紅/綠/青/烏 (M)", en: "Pomelo Tea (M)" }, price: "NT$50" },
                    { name: { zh: "柚子紅/綠/青/烏 (L)", en: "Pomelo Tea (L)" }, price: "NT$60" },
                    { name: { zh: "鮮柚綠 (M)", en: "Fresh Grapefruit Green Tea (M)" }, price: "NT$60" },
                    { name: { zh: "鮮柚綠 (L)", en: "Fresh Grapefruit Green Tea (L)" }, price: "NT$75" },
                    { name: { zh: "麵茶紅/綠/青/烏 (M)", en: "Wheat Tea (M)" }, price: "NT$50" },
                    { name: { zh: "麵茶紅/綠/青/烏 (L)", en: "Wheat Tea (L)" }, price: "NT$60" }
                ]
            },
            {
                category: { zh: "找口感", en: "Chew Series" },
                items: [
                    { name: { zh: "四季春+珍波椰 1號 (M)", en: "No.1 Spring Tea Mix (M)" }, price: "NT$40" },
                    { name: { zh: "四季春+珍波椰 1號 (L)", en: "No.1 Spring Tea Mix (L)" }, price: "NT$50" },
                    { name: { zh: "波霸紅/綠/青/烏 (M)", en: "Boba Tea (M)" }, price: "NT$40" },
                    { name: { zh: "波霸紅/綠/青/烏 (L)", en: "Boba Tea (L)" }, price: "NT$50" },
                    { name: { zh: "波霸奶茶 (M)", en: "Boba Milk Tea (M)" }, price: "NT$50" },
                    { name: { zh: "波霸奶茶 (L)", en: "Boba Milk Tea (L)" }, price: "NT$60" },
                    { name: { zh: "波霸奶綠 (M)", en: "Boba Milk Green Tea (M)" }, price: "NT$50" },
                    { name: { zh: "波霸奶綠 (L)", en: "Boba Milk Green Tea (L)" }, price: "NT$60" },
                    { name: { zh: "波霸烏龍奶茶 (M)", en: "Boba Oolong Milk Tea (M)" }, price: "NT$50" },
                    { name: { zh: "波霸烏龍奶茶 (L)", en: "Boba Oolong Milk Tea (L)" }, price: "NT$60" },
                    { name: { zh: "珍珠紅/綠/青/烏 (M)", en: "Pearl Tea (M)" }, price: "NT$40" },
                    { name: { zh: "珍珠紅/綠/青/烏 (L)", en: "Pearl Tea (L)" }, price: "NT$50" },
                    { name: { zh: "珍珠奶茶 (M)", en: "Pearl Milk Tea (M)" }, price: "NT$50" },
                    { name: { zh: "珍珠奶茶 (L)", en: "Pearl Milk Tea (L)" }, price: "NT$60" },
                    { name: { zh: "珍珠奶綠 (M)", en: "Pearl Milk Green Tea (M)" }, price: "NT$50" },
                    { name: { zh: "珍珠奶綠 (L)", en: "Pearl Milk Green Tea (L)" }, price: "NT$60" },
                    { name: { zh: "椰果奶茶 (M)", en: "Coconut Jelly Milk Tea (M)" }, price: "NT$50" },
                    { name: { zh: "椰果奶茶 (L)", en: "Coconut Jelly Milk Tea (L)" }, price: "NT$60" },
                    { name: { zh: "布丁奶茶/奶綠 (M)", en: "Pudding Milk Tea/Green (M)" }, price: "NT$60" },
                    { name: { zh: "布丁奶茶/奶綠 (L)", en: "Pudding Milk Tea/Green (L)" }, price: "NT$75" },
                    { name: { zh: "布丁紅/綠/青/烏 (M)", en: "Pudding Tea (M)" }, price: "NT$50" },
                    { name: { zh: "布丁紅/綠/青/烏 (L)", en: "Pudding Tea (L)" }, price: "NT$60" }
                ]
            },
            {
                category: { zh: "找奶茶", en: "Milk Tea Series" },
                items: [
                    { name: { zh: "奶茶 (M)", en: "Milk Tea (M)" }, price: "NT$50" },
                    { name: { zh: "奶茶 (L)", en: "Milk Tea (L)" }, price: "NT$60" },
                    { name: { zh: "奶綠 (M)", en: "Milk Green Tea (M)" }, price: "NT$50" },
                    { name: { zh: "奶綠 (L)", en: "Milk Green Tea (L)" }, price: "NT$60" },
                    { name: { zh: "紅茶瑪奇朵 (M)", en: "Black Tea Macchiato (M)" }, price: "NT$50" },
                    { name: { zh: "紅茶瑪奇朵 (L)", en: "Black Tea Macchiato (L)" }, price: "NT$60" },
                    { name: { zh: "烏龍瑪奇朵 (M)", en: "Oolong Macchiato (M)" }, price: "NT$50" },
                    { name: { zh: "烏龍瑪奇朵 (L)", en: "Oolong Macchiato (L)" }, price: "NT$60" },
                    { name: { zh: "四季奶青 (M)", en: "Four Seasons Milk Green (M)" }, price: "NT$50" },
                    { name: { zh: "四季奶青 (L)", en: "Four Seasons Milk Green (L)" }, price: "NT$60" },
                    { name: { zh: "黃金烏龍奶茶 (M)", en: "Golden Oolong Milk Tea (M)" }, price: "NT$50" },
                    { name: { zh: "黃金烏龍奶茶 (L)", en: "Golden Oolong Milk Tea (L)" }, price: "NT$60" },
                    { name: { zh: "阿華田 (M)", en: "Ovaltine (M)" }, price: "NT$50" },
                    { name: { zh: "阿華田 (L)", en: "Ovaltine (L)" }, price: "NT$60" },
                    { name: { zh: "麵茶奶茶/奶綠 (M)", en: "Wheat Milk Tea/Green (M)" }, price: "NT$60" },
                    { name: { zh: "麵茶奶茶/奶綠 (L)", en: "Wheat Milk Tea/Green (L)" }, price: "NT$75" }
                ]
            },
            {
                category: { zh: "找新鮮", en: "Fresh Fruit Series" },
                items: [
                    { name: { zh: "檸檬汁 (M)", en: "Lemon Juice (M)" }, price: "NT$55" },
                    { name: { zh: "檸檬汁 (L)", en: "Lemon Juice (L)" }, price: "NT$65" },
                    { name: { zh: "金桔檸檬 (M)", en: "Kumquat Lemon (M)" }, price: "NT$55" },
                    { name: { zh: "金桔檸檬 (L)", en: "Kumquat Lemon (L)" }, price: "NT$65" },
                    { name: { zh: "檸檬梅汁 (M)", en: "Lemon Plum Juice (M)" }, price: "NT$60" },
                    { name: { zh: "檸檬梅汁 (L)", en: "Lemon Plum Juice (L)" }, price: "NT$75" },
                    { name: { zh: "檸檬養樂多 (M)", en: "Lemon Yakult (M)" }, price: "NT$65" },
                    { name: { zh: "檸檬養樂多 (L)", en: "Lemon Yakult (L)" }, price: "NT$80" },
                    { name: { zh: "8冰茶 (M)", en: "8 Ice Tea (M)" }, price: "NT$50" },
                    { name: { zh: "8冰茶 (L)", en: "8 Ice Tea (L)" }, price: "NT$60" },
                    { name: { zh: "柚子茶 (M)", en: "Pomelo Tea (M)" }, price: "NT$50" },
                    { name: { zh: "柚子茶 (L)", en: "Pomelo Tea (L)" }, price: "NT$60" },
                    { name: { zh: "鮮柚汁 (M)", en: "Fresh Grapefruit Juice (M)" }, price: "NT$60" },
                    { name: { zh: "鮮柚汁 (L)", en: "Fresh Grapefruit Juice (L)" }, price: "NT$75" },
                    { name: { zh: "葡萄柚多多 (M)", en: "Grapefruit Yakult (M)" }, price: "NT$65" },
                    { name: { zh: "葡萄柚多多 (L)", en: "Grapefruit Yakult (L)" }, price: "NT$80" }
                ]
            },
            {
                category: { zh: "找拿鐵", en: "Tea Latte Series" },
                items: [
                    { name: { zh: "紅茶拿鐵 (M)", en: "Black Tea Latte (M)" }, price: "NT$60" },
                    { name: { zh: "紅茶拿鐵 (L)", en: "Black Tea Latte (L)" }, price: "NT$75" },
                    { name: { zh: "綠茶拿鐵 (M)", en: "Green Tea Latte (M)" }, price: "NT$60" },
                    { name: { zh: "綠茶拿鐵 (L)", en: "Green Tea Latte (L)" }, price: "NT$75" },
                    { name: { zh: "黃金烏龍拿鐵 (M)", en: "Golden Oolong Latte (M)" }, price: "NT$60" },
                    { name: { zh: "黃金烏龍拿鐵 (L)", en: "Golden Oolong Latte (L)" }, price: "NT$75" },
                    { name: { zh: "阿華田拿鐵 (M)", en: "Ovaltine Latte (M)" }, price: "NT$60" },
                    { name: { zh: "阿華田拿鐵 (L)", en: "Ovaltine Latte (L)" }, price: "NT$75" },
                    { name: { zh: "重焙烏龍拿鐵 (M)", en: "Roasted Oolong Latte (M)" }, price: "NT$60" },
                    { name: { zh: "重焙烏龍拿鐵 (L)", en: "Roasted Oolong Latte (L)" }, price: "NT$75" },
                    { name: { zh: "麵茶紅茶拿鐵 (M)", en: "Wheat Black Tea Latte (M)" }, price: "NT$65" },
                    { name: { zh: "麵茶紅茶拿鐵 (L)", en: "Wheat Black Tea Latte (L)" }, price: "NT$80" }
                ]
            },
            {
                category: { zh: "冰淇淋", en: "Ice Cream Series" },
                items: [
                    { name: { zh: "冰淇淋紅茶 (M)", en: "Ice Cream Black Tea (M)" }, price: "NT$50" },
                    { name: { zh: "冰淇淋紅茶 (L)", en: "Ice Cream Black Tea (L)" }, price: "NT$60" },
                    { name: { zh: "冰淇淋綠茶 (M)", en: "Ice Cream Green Tea (M)" }, price: "NT$50" },
                    { name: { zh: "冰淇淋綠茶 (L)", en: "Ice Cream Green Tea (L)" }, price: "NT$60" },
                    { name: { zh: "芒果青 (M)", en: "Mango Ice Cream Green Tea (M)" }, price: "NT$50" },
                    { name: { zh: "芒果青 (L)", en: "Mango Ice Cream Green Tea (L)" }, price: "NT$60" },
                    { name: { zh: "荔枝烏龍 (M)", en: "Lychee Ice Cream Oolong (M)" }, price: "NT$50" },
                    { name: { zh: "荔枝烏龍 (L)", en: "Lychee Ice Cream Oolong (L)" }, price: "NT$60" }
                ]
            }
        ]
    },
    {
        id: "5",
        name: { zh: "一沐日", en: "An Ice Holiday" },
        description: {
            zh: "主打台灣牧場鮮奶與特色草仔粿奶茶,逮丸奶茶是招牌必點。",
            en: "Specializes in Taiwan fresh milk and signature grass jelly mochi milk tea. Must-try Dai Wan Milk Tea."
        },
        address: "Taipei City",
        rating: 4.6,
        tags: { zh: ["咀嚼系", "凍飲控", "鮮奶歐蕾"], en: ["Chewy", "Jelly", "Latte"] },
        menuCategories: [
            {
                category: { zh: "原味茶", en: "Original Tea" },
                items: [
                    { name: { zh: "油切蕎麥茶", en: "Buckwheat Tea (Caffeine Free)" }, price: "NT$40" },
                    { name: { zh: "手採高山青", en: "Hand-Picked High Mountain Green" }, price: "NT$40" },
                    { name: { zh: "島韻紅茶", en: "Island Black Tea" }, price: "NT$40" },
                    { name: { zh: "炭焙烏龍", en: "Charcoal Roasted Oolong" }, price: "NT$40" },
                    { name: { zh: "糯香烏龍", en: "Glutinous Oolong" }, price: "NT$45" },
                    { name: { zh: "經香烏龍綠", en: "Classic Oolong Green" }, price: "NT$40" }
                ]
            },
            {
                category: { zh: "牧場鮮乳", en: "Fresh Milk Tea" },
                items: [
                    { name: { zh: "蕎麥鮮奶茶", en: "Buckwheat Fresh Milk Tea" }, price: "NT$75" },
                    { name: { zh: "高山青鮮奶茶", en: "High Mountain Green Fresh Milk Tea" }, price: "NT$75" },
                    { name: { zh: "島韻紅茶拿鐵", en: "Island Black Tea Latte" }, price: "NT$75" },
                    { name: { zh: "炭焙烏龍拿鐵", en: "Charcoal Roasted Oolong Latte" }, price: "NT$75" },
                    { name: { zh: "糯香鮮奶茶", en: "Glutinous Fresh Milk Tea" }, price: "NT$80" },
                    { name: { zh: "烏龍綠鮮奶茶", en: "Oolong Green Fresh Milk Tea" }, price: "NT$75" },
                    { name: { zh: "黑芝麻鮮奶茶", en: "Black Sesame Fresh Milk Tea" }, price: "NT$85" },
                    { name: { zh: "粉粿黑糖鮮奶", en: "Mochi Brown Sugar Fresh Milk" }, price: "NT$90" }
                ]
            },
            {
                category: { zh: "風味茶", en: "Flavor Tea" },
                items: [
                    { name: { zh: "桂花蕎麥茶", en: "Osmanthus Buckwheat Tea" }, price: "NT$50" },
                    { name: { zh: "檸檬高山青", en: "Lemon High Mountain Green" }, price: "NT$60" },
                    { name: { zh: "檸檬紅茶", en: "Lemon Black Tea" }, price: "NT$60" },
                    { name: { zh: "荔枝烏龍", en: "Lychee Oolong" }, price: "NT$65" },
                    { name: { zh: "粉粿桂花檸檬", en: "Mochi Osmanthus Lemon" }, price: "NT$70" },
                    { name: { zh: "糯香檸檬茶", en: "Glutinous Lemon Tea" }, price: "NT$60" },
                    { name: { zh: "輕檸烏龍綠", en: "Light Lemon Oolong Green" }, price: "NT$60" },
                    { name: { zh: "酸梅湯烏龍綠", en: "Plum Oolong Green" }, price: "NT$65" }
                ]
            },
            {
                category: { zh: "香醇奶茶", en: "Milk Tea" },
                items: [
                    { name: { zh: "逮丸奶茶 (招牌)", en: "Dai Wan Milk Tea (Signature)" }, price: "NT$75" },
                    { name: { zh: "粉粿黑糖奶茶", en: "Mochi Brown Sugar Milk Tea" }, price: "NT$75" },
                    { name: { zh: "黃金蕎麥奶茶", en: "Golden Buckwheat Milk Tea" }, price: "NT$60" },
                    { name: { zh: "糯香奶茶", en: "Glutinous Milk Tea" }, price: "NT$60" },
                    { name: { zh: "烏龍綠奶茶", en: "Oolong Green Milk Tea" }, price: "NT$60" },
                    { name: { zh: "速丸奶茶", en: "Quick Mochi Milk Tea" }, price: "NT$70" },
                    { name: { zh: "黑芝麻奶茶", en: "Black Sesame Milk Tea" }, price: "NT$75" },
                    { name: { zh: "島韻紅奶茶", en: "Island Black Milk Tea" }, price: "NT$55" },
                    { name: { zh: "烏龍奶茶", en: "Oolong Milk Tea" }, price: "NT$55" },
                    { name: { zh: "高山青奶茶", en: "High Mountain Green Milk Tea" }, price: "NT$55" },
                    { name: { zh: "椒麻奶茶", en: "Pepper Milk Tea" }, price: "NT$70" },
                    { name: { zh: "嫩仙草奶茶", en: "Grass Jelly Milk Tea" }, price: "NT$65" }
                ]
            },
            {
                category: { zh: "奶蓋茶", en: "Milk Foam" },
                items: [
                    { name: { zh: "奶蓋蕎麥茶", en: "Milk Foam Buckwheat Tea" }, price: "NT$70" },
                    { name: { zh: "奶蓋高山青", en: "Milk Foam High Mountain Green" }, price: "NT$70" },
                    { name: { zh: "奶蓋紅茶", en: "Milk Foam Black Tea" }, price: "NT$70" },
                    { name: { zh: "奶蓋烏龍茶", en: "Milk Foam Oolong Tea" }, price: "NT$70" },
                    { name: { zh: "奶蓋烏龍綠", en: "Milk Foam Oolong Green" }, price: "NT$70" }
                ]
            },
            {
                category: { zh: "冬瓜茶", en: "Winter Melon" },
                items: [
                    { name: { zh: "冬瓜蕎麥茶", en: "Winter Melon Buckwheat Tea" }, price: "NT$50" },
                    { name: { zh: "冬瓜青茶", en: "Winter Melon Green Tea" }, price: "NT$50" },
                    { name: { zh: "冬瓜紅茶", en: "Winter Melon Black Tea" }, price: "NT$50" },
                    { name: { zh: "冬瓜檸檬", en: "Winter Melon Lemon" }, price: "NT$55" },
                    { name: { zh: "冬瓜烏龍茶", en: "Winter Melon Oolong Tea" }, price: "NT$50" }
                ]
            }
        ]
    },
    {
        id: "6",
        name: { zh: "得正", en: "Dejeng" },
        description: {
            zh: "主打春烏龍系列,鮮果茶與芝士奶蓋是招牌特色。",
            en: "Specializes in Spring Oolong series with signature fruit teas and cheese milk foam."
        },
        address: "Taipei City",
        rating: 4.7,
        tags: { zh: ["鮮奶歐蕾", "清爽果茶"], en: ["Latte", "Fruit Tea"] },
        menuCategories: [
            {
                category: { zh: "原茶系列", en: "Original TEA" },
                items: [
                    { name: { zh: "紅茶 (M)", en: "Black Tea (M)" }, price: "NT$25" },
                    { name: { zh: "紅茶 (L)", en: "Black Tea (L)" }, price: "NT$30" },
                    { name: { zh: "綠茶 (M)", en: "Green Tea (M)" }, price: "NT$25" },
                    { name: { zh: "綠茶 (L)", en: "Green Tea (L)" }, price: "NT$30" },
                    { name: { zh: "春烏龍 (M)", en: "Spring Oolong (M)" }, price: "NT$30" },
                    { name: { zh: "春烏龍 (L)", en: "Spring Oolong (L)" }, price: "NT$35" },
                    { name: { zh: "輕烏龍 (M)", en: "Light Roasted Oolong (M)" }, price: "NT$30" },
                    { name: { zh: "輕烏龍 (L)", en: "Light Roasted Oolong (L)" }, price: "NT$35" },
                    { name: { zh: "焙烏龍 (M)", en: "Dark Roasted Oolong (M)" }, price: "NT$30" },
                    { name: { zh: "焙烏龍 (L)", en: "Dark Roasted Oolong (L)" }, price: "NT$35" }
                ]
            },
            {
                category: { zh: "鮮果系列", en: "Double FRUIT" },
                items: [
                    { name: { zh: "檸檬春烏龍 (M)", en: "Lemon Spring Oolong (M)" }, price: "NT$55" },
                    { name: { zh: "檸檬春烏龍 (L)", en: "Lemon Spring Oolong (L)" }, price: "NT$65" },
                    { name: { zh: "香橙春烏龍 (M)", en: "Orange Spring Oolong (M)" }, price: "NT$60" },
                    { name: { zh: "香橙春烏龍 (L)", en: "Orange Spring Oolong (L)" }, price: "NT$70" },
                    { name: { zh: "甘蔗春烏龍 (M)", en: "Sugar Cane Spring Oolong (M)" }, price: "NT$60" },
                    { name: { zh: "甘蔗春烏龍 (L)", en: "Sugar Cane Spring Oolong (L)" }, price: "NT$70" },
                    { name: { zh: "青梅春烏龍 (M)", en: "Green Plum Spring Oolong (M)" }, price: "NT$50" },
                    { name: { zh: "青梅春烏龍 (L)", en: "Green Plum Spring Oolong (L)" }, price: "NT$60" },
                    { name: { zh: "優酪春烏龍 (M)", en: "Yogurt Spring Oolong (M)" }, price: "NT$55" },
                    { name: { zh: "優酪春烏龍 (L)", en: "Yogurt Spring Oolong (L)" }, price: "NT$65" },
                    { name: { zh: "雙柚金烏龍 (M)", en: "Yuzu Oolong (M)" }, price: "NT$55" },
                    { name: { zh: "雙柚金烏龍 (L)", en: "Yuzu Oolong (L)" }, price: "NT$65" }
                ]
            },
            {
                category: { zh: "芝士奶蓋系列", en: "Cheese MILK FOAM" },
                items: [
                    { name: { zh: "芝士奶蓋春烏龍 (M)", en: "Cheese Milk Foam Spring Oolong (M)" }, price: "NT$50" },
                    { name: { zh: "芝士奶蓋春烏龍 (L)", en: "Cheese Milk Foam Spring Oolong (L)" }, price: "NT$60" },
                    { name: { zh: "芝士奶蓋焙烏龍 (M)", en: "Cheese Milk Foam Dark Roasted Oolong (M)" }, price: "NT$50" },
                    { name: { zh: "芝士奶蓋焙烏龍 (L)", en: "Cheese Milk Foam Dark Roasted Oolong (L)" }, price: "NT$60" },
                    { name: { zh: "芝士奶蓋阿華田 (M)", en: "Cheese Milk Foam Ovaltine (M)" }, price: "NT$55" },
                    { name: { zh: "芝士奶蓋阿華田 (L)", en: "Cheese Milk Foam Ovaltine (L)" }, price: "NT$65" },
                    { name: { zh: "芝士奶蓋烘吉茶 (M)", en: "Cheese Milk Foam Hojicha (M)" }, price: "NT$55" },
                    { name: { zh: "芝士奶蓋烘吉茶 (L)", en: "Cheese Milk Foam Hojicha (L)" }, price: "NT$65" }
                ]
            },
            {
                category: { zh: "經典奶茶", en: "Classic MILK TEA" },
                items: [
                    { name: { zh: "奶茶 (M)", en: "Milk Tea (M)" }, price: "NT$45" },
                    { name: { zh: "奶茶 (L)", en: "Milk Tea (L)" }, price: "NT$50" },
                    { name: { zh: "焙烏龍奶茶 (M)", en: "Dark Roasted Oolong Milk Tea (M)" }, price: "NT$45" },
                    { name: { zh: "焙烏龍奶茶 (L)", en: "Dark Roasted Oolong Milk Tea (L)" }, price: "NT$50" },
                    { name: { zh: "珍珠奶茶 (M)", en: "Pearl Milk Tea (M)" }, price: "NT$55" },
                    { name: { zh: "珍珠奶茶 (L)", en: "Pearl Milk Tea (L)" }, price: "NT$60" },
                    { name: { zh: "黃金珍珠奶綠 (M)", en: "Golden Bubble Green Milk Tea (M)" }, price: "NT$55" },
                    { name: { zh: "黃金珍珠奶綠 (L)", en: "Golden Bubble Green Milk Tea (L)" }, price: "NT$60" },
                    { name: { zh: "烘吉奶茶 (L)", en: "Hojicha Milk Tea (L)" }, price: "NT$50" }
                ]
            },
            {
                category: { zh: "鮮奶系列", en: "Fresh MILK" },
                items: [
                    { name: { zh: "紅茶鮮奶 (M)", en: "Black Tea Latte (M)" }, price: "NT$55" },
                    { name: { zh: "紅茶鮮奶 (L)", en: "Black Tea Latte (L)" }, price: "NT$65" },
                    { name: { zh: "輕烏龍鮮奶 (M)", en: "Light Roasted Oolong Tea Latte (M)" }, price: "NT$55" },
                    { name: { zh: "輕烏龍鮮奶 (L)", en: "Light Roasted Oolong Tea Latte (L)" }, price: "NT$65" },
                    { name: { zh: "焙烏龍鮮奶 (M)", en: "Dark Roasted Oolong Tea Latte (M)" }, price: "NT$55" },
                    { name: { zh: "焙烏龍鮮奶 (L)", en: "Dark Roasted Oolong Tea Latte (L)" }, price: "NT$65" },
                    { name: { zh: "烘吉鮮奶 (L)", en: "Hojicha Latte (L)" }, price: "NT$70" }
                ]
            }
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

// Modal Logic (Updated for I18n and Categories)
function openModal(shop) {
    currentShop = shop; // Track current shop
    const name = shop.name[currentLang];
    const desc = shop.description[currentLang];
    const menuCategories = shop.menuCategories;

    modalTitle.textContent = name;
    modalRating.innerHTML = `<i class="fa-solid fa-star"></i> ${shop.rating}`;
    modalDesc.textContent = desc;

    // Helper function to merge M/L size variants
    function mergeSizeVariants(items) {
        const merged = [];
        const processed = new Set();

        items.forEach((item, index) => {
            if (processed.has(index)) return;

            // Extract base name without size marker
            const nameZh = item.name.zh;
            const nameEn = item.name.en;
            const baseNameZh = nameZh.replace(/\s*\([ML]\)\s*$/, '');
            const baseNameEn = nameEn.replace(/\s*\([ML]\)\s*$/, '');

            const hasM = nameZh.includes('(M)') || nameEn.includes('(M)');
            const hasL = nameZh.includes('(L)') || nameEn.includes('(L)');

            if (hasM) {
                // Look for corresponding L size
                const lIndex = items.findIndex((other, i) => {
                    if (i <= index || processed.has(i)) return false;
                    const otherBaseZh = other.name.zh.replace(/\s*\([ML]\)\s*$/, '');
                    const otherBaseEn = other.name.en.replace(/\s*\([ML]\)\s*$/, '');
                    const otherHasL = other.name.zh.includes('(L)') || other.name.en.includes('(L)');
                    return otherBaseZh === baseNameZh && otherBaseEn === baseNameEn && otherHasL;
                });

                if (lIndex !== -1) {
                    // Merge M and L
                    merged.push({
                        name: {
                            zh: baseNameZh + ' (M/L)',
                            en: baseNameEn + ' (M/L)'
                        },
                        price: `${item.price}/${items[lIndex].price}`
                    });
                    processed.add(lIndex);
                } else {
                    // Only M size exists
                    merged.push(item);
                }
            } else if (hasL) {
                // Check if this L has a corresponding M before it
                const hasPreviousM = items.slice(0, index).some((other, i) => {
                    if (processed.has(i)) return false;
                    const otherBaseZh = other.name.zh.replace(/\s*\([ML]\)\s*$/, '');
                    const otherBaseEn = other.name.en.replace(/\s*\([ML]\)\s*$/, '');
                    const otherHasM = other.name.zh.includes('(M)') || other.name.en.includes('(M)');
                    return otherBaseZh === baseNameZh && otherBaseEn === baseNameEn && otherHasM;
                });

                if (!hasPreviousM) {
                    // Standalone L size (no corresponding M) - keep it
                    merged.push(item);
                }
                // If hasPreviousM is true, this L was already merged, skip it
            } else {
                // No size marker
                merged.push(item);
            }
        });

        return merged;
    }

    // Generate menu HTML with categories and merged items
    modalMenu.innerHTML = menuCategories.map(category => {
        const mergedItems = mergeSizeVariants(category.items);
        return `
        <div class="menu-category">
            <h3 class="category-title">${category.category[currentLang]}</h3>
            ${mergedItems.map(item => `
                <li class="menu-item">
                    <div class="item-info">
                        <span class="item-name">${item.name[currentLang]}</span>
                    </div>
                    <div class="item-price">${item.price}</div>
                </li>
            `).join('')}
        </div>
        `;
    }).join('');

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

    const filtered = allShops.filter(shop => {
        const name = shop.name[currentLang].toLowerCase();
        const tags = shop.tags[currentLang].map(t => t.toLowerCase());

        // Extract menu item names from menuCategories
        const menuNames = [];
        shop.menuCategories.forEach(category => {
            category.items.forEach(item => {
                menuNames.push(item.name[currentLang].toLowerCase());
            });
        });

        const matchesSearch = name.includes(term) ||
            tags.some(t => t.includes(term)) ||
            menuNames.some(m => m.includes(term));

        const activeFilter = document.querySelector('.tag-btn.active').getAttribute('data-filter');

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
