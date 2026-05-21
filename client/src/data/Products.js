export const products = {

  // ================= SWEETS =================
  Ladoo: [
    { id: "ladoo", name: "Ladoo", category: "sweets", group: "Ladoo", img1: "/categories/laddo.jpg", img2: "/categories/ladoo2.jpg", type: "swap", reviews: 25 },
    { id: "dryfruitladdo", name: "Dry Fruit Ladoo", category: "sweets", group: "Ladoo", img1: "/categories/dryfruitladdo.jpg", type: "zoom", reviews: 15 },
    { id: "gheeladoo", name: "Ghee Ladoo", category: "sweets", group: "Ladoo", img1: "/categories/gheeladdoo.avif", type: "zoom", reviews: 20 },
    { id: "specialladdo", name: "Special Ladoo", category: "sweets", group: "Ladoo", img1: "/categories/specialladdoo.png", type: "zoom", reviews: 20 },
  ],

  Mittai: [
    { id: "karuppati-mittai", name: "Karuppati Mittai", category: "sweets", group: "Mittai", img1: "/categories/karupattimittai.webp", type: "zoom", reviews: 14 },
    { id: "seeni-mittai", name: "Seeni Mittai", category: "sweets", group: "Mittai", img1: "/categories/seenimittai.webp", type: "zoom", reviews: 11 },
    { id: "red-seeni-mittai", name: "Red Seeni Mittai", category: "sweets", group: "Mittai", img1: "/categories/redseenimittai.jpg", type: "zoom", reviews: 17 },
    { id: "boondhi", name: "Boondhi", category: "sweets", group: "Mittai", img1: "/categories/bhoondhi.jpg", type: "zoom", reviews: 17 },
  ],

  Halwa: [
    { id: "thirunelveli-halwa", name: "Thirunelveli Halwa", category: "sweets", group: "Halwa", img1: "/categories/halwa1.jpg", img2: "/categories/halwa2.jpg", type: "swap", reviews: 18 },
    { id: "muskoth-halwa", name: "Muskoth Halwa", category: "sweets", group: "Halwa", img1: "/categories/MuscothHalwa.jpg", type: "zoom", reviews: 12 },
  ],

  Jangri: [
    { id: "jangeri", name: "Jangeri", category: "sweets", group: "Jangri", img1: "/categories/jilebi2.jpg", img2: "/categories/jilebi1.jpg", type: "swap", reviews: 18 },
    { id: "mini-jangeri", name: "Mini Jangeri", category: "sweets", group: "Jangri", img1: "/categories/minijangeri.webp", type: "zoom", reviews: 12 },
  ],

  MysorePak: [
    { id: "mysorepak", name: "Mysorepak", category: "sweets", group: "MysorePak", img1: "/categories/MysorePak.webp", type: "zoom", reviews: 16 },
    { id: "ghee-mysorepak", name: "Ghee Mysorepak", category: "sweets", group: "MysorePak", img1: "/categories/gheemysorepak.webp", type: "zoom", reviews: 9 },
  ],

  // ✅ MOVED OUT of Savouries — Chikki is a sweet, belongs at top level
  Chikki: [
    { id: "groundnut-chikki", name: "Classic Groundnut Chikki", category: "sweets", group: "Chikki", img1: "/categories/groundnutchikki.jpg", img2: "/categories/groundnutchikki2.jpg", type: "swap", reviews: 42 },
    { id: "kaju-katli", name: "Kaju Katli", category: "sweets", group: "Chikki", img1: "/categories/KajuKatli.jpg", img2: "/categories/kajukatli2.jpg", type: "swap", reviews: 19 },
  ],

  // ================= SAVOURIES =================
  Savouries: {
    Sev: [
      { id: "karasevu", name: "Karasevu", category: "savouries", group: "Sev", img1: "/categories/karasevu.jpg", type: "zoom", reviews: 18 },
      { id: "milagu-sevu", name: "Milagu Sevu", category: "savouries", group: "Sev", img1: "/categories/milagsevu.webp", type: "zoom", reviews: 12 },
      { id: "seeni-sevu", name: "Seeni Sevu", category: "savouries", group: "Sev", img1: "/categories/sweetsevu.png", type: "zoom", reviews: 15 },
      { id: "karuppati-sevu", name: "Karuppati Sevu", category: "savouries", group: "Sev", img1: "/categories/karupattisev.webp", type: "zoom", reviews: 9 },
    ],

    Seeval: [
      { id: "ribbon-seeval", name: "Ribbon Seeval", category: "savouries", group: "Seeval", img1: "/categories/ribbionseeval.jpg", type: "zoom", reviews: 11 },
      { id: "seeval", name: "Seeval", category: "savouries", group: "Seeval", img1: "/categories/seeval.webp", type: "zoom", reviews: 13 },
      { id: "pakkoda", name: "Pakkoda", category: "savouries", group: "Seeval", img1: "/categories/pakkoda.webp", type: "zoom", reviews: 16 },
    ],

    Mixture: [
      { id: "mixture", name: "Mixture", category: "savouries", group: "Mixture", img1: "/categories/mixture.jpg", type: "zoom", reviews: 20 },
      { id: "kara-boondi", name: "Kara Boondi", category: "savouries", group: "Mixture", img1: "/categories/karabhoondi.jpg", type: "zoom", reviews: 14 },
      { id: "bombay-mixture", name: "Bombay Mixture", category: "savouries", group: "Mixture", img1: "/categories/BombayMixture.webp", type: "zoom", reviews: 17 },
      { id: "ompodi", name: "Ompodi", category: "savouries", group: "Mixture", img1: "/categories/oomapodi.webp", type: "zoom", reviews: 10 },
    ],

    Murukku: [
      { id: "onion-murukku", name: "Onion Murukku", category: "savouries", group: "Murukku", img1: "/categories/OnionMurukku.webp", type: "zoom", reviews: 15 },
      { id: "ragi-murukku", name: "Ragi Murukku", category: "savouries", group: "Murukku", img1: "/categories/ragimurruku.webp", type: "zoom", reviews: 12 },
      { id: "murukku", name: "Murukku", category: "savouries", group: "Murukku", img1: "/categories/murukku.jpg", type: "zoom", reviews: 19 },
    ],

    Chips: [
      { id: "corn-chips", name: "Corn Chips", category: "savouries", group: "Chips", img1: "/categories/cornchips.webp", type: "zoom", reviews: 8 },
      { id: "potato-chips", name: "Potato Chips", category: "savouries", group: "Chips", img1: "/categories/potatochips.avif", type: "zoom", reviews: 8 },
      { id: "banana-chips", name: "Banana Chips", category: "savouries", group: "Chips", img1: "/categories/bananachips.jpg", img2: "/categories/bananachips2.jpg", type: "swap", reviews: 21 },
    ],
  },

  // ================= BAKERY =================
  Bakery: {
    Cakes: [
      { id: "plum-cake", name: "Plum Cake", category: "bakery", group: "Cakes", img1: "/categories/blumcake.jpg", type: "zoom", reviews: 12 },
      { id: "black-forest", name: "Black Forest", category: "bakery", group: "Cakes", img1: "/categories/blackforest.jpg", type: "zoom", reviews: 9 },
      { id: "vanilla-cake", name: "Vanilla Cake", category: "bakery", group: "Cakes", img1: "/categories/whiteforest.webp", type: "zoom", reviews: 9 },
      { id: "red-velvet", name: "Red Velvet", category: "bakery", group: "Cakes", img1: "/categories/redvelvetcake.jpg", type: "zoom", reviews: 9 },
    ],

    Puffs: [
      { id: "veg-puff", name: "Veg Puff", category: "bakery", group: "Puffs", img1: "/categories/vegpuff.jpg", type: "zoom", reviews: 8 },
      { id: "egg-puff", name: "Egg Puff", category: "bakery", group: "Puffs", img1: "/categories/eggpuff.jpg", type: "zoom", reviews: 15 },
      { id: "chicken-puff", name: "Chicken Puff", category: "bakery", group: "Puffs", img1: "/categories/chickenpuff.jpg", type: "zoom", reviews: 15 },
    ],

    Cookies: [
      { id: "buter-biscuit", name: "Butter Cookies", category: "bakery", group: "Cookies", img1: "/categories/buttercookies.jpg", type: "zoom", reviews: 8 },
      { id: "cashew-biscuit", name: "Choco Chip Cookies", category: "bakery", group: "Cookies", img1: "/categories/chocochipscookies.jpg", type: "zoom", reviews: 15 },
    ],

    Breads: [
      { id: "milk-bread", name: "Milk Bread", category: "bakery", group: "Breads", img1: "/categories/milkbread.webp", type: "zoom", reviews: 6 },
      { id: "wheat-bread", name: "Wheat Bread", category: "bakery", group: "Breads", img1: "/categories/wheatbread.jpg", type: "zoom", reviews: 10 },
      { id: "special-banana-bread", name: "Banana Bread", category: "bakery", group: "Breads", img1: "/categories/banana bread.jpg", type: "zoom", reviews: 10 },
    ],
  },

  // ================= KITCHEN SPECIAL =================
  KitchenSpecial: [
    { id: "coco-mittai", name: "Coco Mittai", category: "kitchen-special", group: "kitchen-special", img1: "/categories/cocobar.png", img2: "/categories/cocobar2.png", type: "swap", reviews: 10 },
    { id: "theanga-mittai", name: "Theanga Mittai", category: "kitchen-special", group: "kitchen-special", img1: "/categories/coconut1.png", img2: "/categories/coconut2.png", type: "swap", reviews: 12 },
    { id: "thean-mittai", name: "Thean Mittai", category: "kitchen-special", group: "kitchen-special", img1: "/categories/honey1.png", img2: "/categories/honey2.png", type: "swap", reviews: 8 },
    { id: "ellu-mittai", name: "Ellu Mittai", category: "kitchen-special", group: "kitchen-special", img1: "/categories/sesame1.png", img2: "/categories/sesame2.png", type: "swap", reviews: 14 },
    { id: "special-kadalai-mittai", name: "Special Kadalai Mittai", category: "kitchen-special", group: "kitchen-special", img1: "/categories/penautcandy.png", img2: "/categories/peanut2.png", type: "swap", reviews: 11 },
  ],

};