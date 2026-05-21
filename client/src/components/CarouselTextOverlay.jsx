import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const sweetsImage = "/categories/laddo.jpg"; // choose any sweets image

import { useState, useEffect } from "react";



const categories = [
  {
    id: "coco-mittai",
    name: "Coco Mittai",
    img: "/categories/cocobar.png",
  },
  {
    id: "theanga-mittai",

    name: "Theanga Mittai",
    img: "/categories/coconut2.png",
  },
  {
    id: "then-mittai",
    name: "Then Mittai",
    img: "/categories/honey1.png",
  },
  {
    id: "ellu-mittai",
    name: "Ellu Mittai",
    img: "/categories/sesame1.png",
  },
  {
    id: "special-kadalai-mittai",
    name: "Special Kadalai Mittai",
    img: "/categories/penautcandy.png",
  },
];
const sweetsData = [
  {
    title: "Ladoo",
    items: [
      { id: "ladoo", name: "Ladoo", img: "/categories/laddo.jpg" },
      { id: "dryfruitladdo", name: "Dry Fruit Ladoo", img: "/categories/dryfruitladdo.jpg" },
      { id: "gheeladoo", name: "Ghee Ladoo", img: "/categories/gheeladoo.jpg" },
    ],
  },
  {
    title: "Mittai",
    items: [
      { id: "karuppati-mittai", name: "Karuppati Mittai", img: "/sweets/karuppati-mittai.png" },
      { id: "seeni-mittai", name: "Seeni Mittai", img: "/sweets/seeni-mittai.png" },
      { id: "red-seeni-mittai", name: "red Seeni Mittai", img: "/sweets/seeni-mittai.png" },
    ],
  },
  {
    title: "Mysorepak",
    items: [
      { id: "mysorepak", name: "Mysorepak", img: "/sweets/mysorepak.png" },
      { id: "ghee-mysorepak", name: "Ghee Mysorepak", img: "/sweets/ghee-mysorepak.png" },
    ],
  },
  {
    title: "Halwa",
    items: [
      { id: "thirunelveli-halwa", name: "Thirunelveli Halwa", img: "/sweets/thirunelveli-halwa.png" },
      { id: "muskoth-halwa", name: "Muskoth Halwa", img: "/sweets/muskoth-halwa.png" },
    ],
  },
  {
    title: "Jangiri",
    items: [{ id: "jangeri", name: "Jangeri", img: "/sweets/jilebi.png" },
    { id: "mini-jangeri", name: "mini Jangeri", img: "/sweets/jilebi.png" }

    ],

  },
];

const bakeryData = [
  {
    title: "Cakes",
    items: [
      { id: "plum-cake", name: "plum Cake", img: "/categories/blumcake.jpg" },
      { id: "vanilla-cake", name: "Vanilla Cake", img: "/bakery/vanilla-cake.jpg" },
    ],
  },
  {
    title: "Biscuits",
    items: [
      { id: "buter-biscuit", name: "Butter Biscuit", img: "/bakery/butter-biscuit.jpg" },
      { id: "cashew-biscuit", name: "Cashew Biscuit", img: "/bakery/cashew-biscuit.jpg" },
    ],
  },
  {
    title: "Breads",
    items: [
      { id: "milk-bread", name: "Milk Bread", img: "/bakery/milk-bread.jpg" },
      { id: "wheat-bread", name: "Wheat Bread", img: "/bakery/wheat-bread.jpg" },
      { id: "special-banana-bread", name: "special banana Bread", img: "/categories/banana bread.jpg" },
    ],
  },
];

const savouriesData = [
  {
    title: "Sev",
    items: [
      { id: "karasevu", name: "Karasevu", img: "/categories/karasevu.jpg" },
      { id: "milagu-sevu", name: "Milagu Sevu", img: "/savouries/milagu-sevu.jpg" },
      { id: "seeni-sevu", name: "Seeni Sevu", img: "/savouries/seeni-sevu.jpg" },
      { id: "karuppati-sevu", name: "Karuppati Sevu", img: "/savouries/karuppati-sevu.jpg" },
    ],
  },
  {
    title: "Seeval",
    items: [
      { id: "ribbon-seeval", name: "Ribbon Seeval", img: "/savouries/ribbon-seeval.jpg" },
      { id: "seeval", name: "Seeval", img: "/savouries/seeval.jpg" },
      { id: "pakkoda", name: "Pakkoda", img: "/savouries/pakkoda.jpg" },
    ],
  },
  {
    title: "Mixture",
    items: [
      { id: "mixture", name: "Mixture", img: "/savouries/mixture.jpg" },
      { id: "kara-boondi", name: "Kara Boondi", img: "/savouries/kara-boondi.jpg" },
      { id: "bombay-mixture", name: "Bombay Mixture", img: "/savouries/bombay-mixture.jpg" },
      { id: "ompodi", name: "Ompodi", img: "/savouries/ompodi.jpg" },
    ],
  },
  {
    title: "Murukku",
    items: [
      { id: "onion-murukku", name: "Onion Murukku", img: "/savouries/onion-murukku.jpg" },
      { id: "ragi-murukku", name: "Ragi Murukku", img: "/savouries/ragi-murukku.jpg" },
      { id: "murukku", name: "Murukku", img: "/savouries/murukku.jpg" },
    ],
  },
  {
    title: "Chips",
    items: [
      { id: "corn-chips", name: "Corn Chips", img: "/savouries/corn-chips.jpg" },
    ],
  },
];




const CarouselTextOverlay = ({ type, onMouseEnter, onMouseLeave }) => {

  const isKitchen = type === "kitchen";
  const isSweets = type === "sweets";
  const isBakery = type === "bakery";
  const isSavouries = type === "savouries";
  const navigate = useNavigate();


  return (

    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        absolute 
        top-full 
        left-0 
        w-full 
        h-auto
        z-30
        flex
        items-center
        justify-start
        bg-[#fff7ed]
      "
    >
      <div className="relative floral-border-after w-full  pb-[80px]">

        {/* TWO COLUMN LAYOUT */}
        <div className="flex items-start pt-10">

          {/* LEFT SIDE : ITEM NAMES */}
          <div className="w-1/2 text-left  pl-6 md:pl-16">

            {/* ========= KITCHEN ========= */}
            {isKitchen &&
              categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => navigate(`/product/${cat.id}`)}
                  className="mb-5 cursor-pointer"
                >
                  <motion.p
                    whileHover="hover"
                    className="relative inline-block text-base md:text-l font-serif text-black"
                  >
                    {cat.name}

                    <motion.span
                      className="absolute left-0 -bottom-1 h-[2px] w-full bg-black origin-left"
                      initial={{ scaleX: 0 }}
                      variants={{ hover: { scaleX: 1 } }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.p>
                </div>
              ))}


            {/* ========= SWEETS ========= */}
            {isSweets && (
              <div className="grid grid-cols-2 gap-x-20 gap-y-6">

                {/* COLUMN 1 */}
                <div className="space-y-6">
                  {sweetsData.slice(0, 3).map((group, index) => (
                    <div key={group.title}>
                      <p className="text-lg font-semibold font-serif text-black mb-2">
                        {group.title}
                      </p>

                      <ul className="ml-4 space-y-1">
                        {group.items.map((item) => (
                          <motion.li
                            key={item.id}
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="relative cursor-pointer font-serif text-sm text-gray-700 w-fit"
                            whileHover="hover"
                          >
                            {item.name}

                            {/* UNDERLINE */}
                            <motion.span
                              className="absolute left-0 -bottom-1 h-[2px] w-full bg-black origin-left"
                              initial={{ scaleX: 0 }}
                              variants={{ hover: { scaleX: 1 } }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                          </motion.li>

                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* COLUMN 2 */}
                <div className="space-y-6">
                  {sweetsData.slice(3).map((group) => (
                    <div key={group.title}>
                      <p className="text-lg font-semibold font-serif text-black mb-2">
                        {group.title}
                      </p>

                      <ul className="ml-4 space-y-1">
                        {group.items.map((item) => (
                          <motion.li
                            key={item.id}
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="relative cursor-pointer font-serif text-sm text-gray-700 w-fit"
                            whileHover="hover"
                          >
                            {item.name}
                            <motion.span
                              className="absolute left-0 -bottom-1 h-[2px] w-full bg-black origin-left"
                              initial={{ scaleX: 0 }}
                              variants={{ hover: { scaleX: 1 } }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {isBakery && (
              <div className="grid grid-cols-2 gap-x-20 gap-y-6">

                {bakeryData.map((group) => (
                  <div key={group.title}>
                    <p className="text-lg font-semibold font-serif text-black mb-2">
                      {group.title}
                    </p>

                    <ul className="ml-4 space-y-1">
                      {group.items.map((item) => (
                        <motion.li
                          key={item.id}
                          onClick={() => navigate(`/product/${item.id}`)}
                          className="relative cursor-pointer font-serif text-sm text-gray-700 w-fit"
                          whileHover="hover"
                        >
                          {item.name}

                          <motion.span
                            className="absolute left-0 -bottom-1 h-[2px] w-full bg-black origin-left"
                            initial={{ scaleX: 0 }}
                            variants={{ hover: { scaleX: 1 } }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}

              </div>
            )}

            {isSavouries && (
              <div className="grid grid-cols-3 gap-x-16 gap-y-8">

                {savouriesData.map((group) => (
                  <div key={group.title}>
                    <p className="text-lg font-semibold font-serif text-black mb-3 uppercase tracking-wide">
                      {group.title}
                    </p>

                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <motion.li
                          key={item.id}
                          onClick={() => navigate(`/product/${item.id}`)}
                          className="relative cursor-pointer font-serif text-sm text-gray-700 w-fit"
                          whileHover="hover"
                        >
                          {item.name}

                          <motion.span
                            className="absolute left-0 -bottom-1 h-[2px] w-full bg-black origin-left"
                            initial={{ scaleX: 0 }}
                            variants={{ hover: { scaleX: 1 } }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}

              </div>
            )}


          </div>

          {/* RIGHT SIDE : BIG IMAGE */}
          <div className="w-1/2 flex justify-center items-center ml-6 md:ml-12">
            <div className="relative w-[250px] md:w-[320px] h-[220px] md:h-[300px] rounded-full overflow-hidden bg-[#fff7ed]">

              <img
                src={
                  isKitchen
                    ? categories[0].img
                    : isSweets
                      ? sweetsImage
                      : isBakery
                        ? bakeryData[0].items[0].img
                        : savouriesData[0].items[0].img
                }
                alt="Category Image"
                className="absolute inset-0 w-full h-full object-cover"
              />

            </div>
          </div>


        </div>
      </div>

    </motion.div>
  );
};

export default CarouselTextOverlay;
