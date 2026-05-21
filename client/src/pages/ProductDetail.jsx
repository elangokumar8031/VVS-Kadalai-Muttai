import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "../data/Products";
import AddToCartButton from "../components/AddToCartButton";

const findProductById = (data, id) => {
    if (Array.isArray(data)) {
        return data.find((item) => item.id === id);
    }
    if (typeof data === "object") {
        for (let key in data) {
            const result = findProductById(data[key], id);
            if (result) return result;
        }
    }
    return null;
};

// ✅ Get related products by same group, exclude current product, limit to 6
const getRelatedProducts = (allProducts, currentProduct) => {
    const related = [];

    const search = (data) => {
        if (Array.isArray(data)) {
            data.forEach((item) => {
                if (
                    item.id !== currentProduct.id &&
                    item.group === currentProduct.group &&
                    item.category === currentProduct.category
                ) {
                    related.push(item);
                }
            });
        } else if (typeof data === "object") {
            Object.values(data).forEach((val) => search(val));
        }
    };

    search(allProducts);

    // ✅ If same group has fewer than 6, fill from same category
    if (related.length < 6) {
        const categoryFill = [];
        const search2 = (data) => {
            if (Array.isArray(data)) {
                data.forEach((item) => {
                    if (
                        item.id !== currentProduct.id &&
                        item.category === currentProduct.category &&
                        !related.find((r) => r.id === item.id)
                    ) {
                        categoryFill.push(item);
                    }
                });
            } else if (typeof data === "object") {
                Object.values(data).forEach((val) => search2(val));
            }
        };
        search2(allProducts);
        related.push(...categoryFill);
    }

    return related.slice(0, 6);
};

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = findProductById(products, id);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [zipCode, setZipCode] = useState("");
    const [selectedImg, setSelectedImg] = useState(null);

    useEffect(() => {
        setSelectedImg(null);
    }, [product?.id]);

    if (!product) return <h2 className="text-center py-20 text-gray-500">Product Not Found</h2>;

    const currentImage = selectedImg || product.img1;
    const allImages = [product.img1, product.img2].filter(Boolean);

    const relatedProducts = getRelatedProducts(products, product); // ✅

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 bg-white">

            {/* Breadcrumb */}
            <p className="text-gray-400 mb-6 text-sm flex gap-2">
                <Link to="/" className="hover:text-orange-500">Home</Link>
                <span>/</span>
                <Link to={`/${product.category.toLowerCase()}`} className="hover:text-orange-500">
                    {product.category}
                </Link>
                <span>/</span>
                <span className="text-gray-600">{product.name}</span>
            </p>

            {/* Main Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                {/* LEFT — IMAGE */}
                <div className="flex flex-col gap-4">
                    <div className="overflow-hidden shadow-md">
                        <img
                            src={currentImage}
                            alt={product.name}
                            className="w-full h-[480px] object-cover transition-all duration-300"
                        />
                    </div>
                    {/* Thumbnails */}
                    {allImages.length > 1 && (
                        <div className="flex gap-4">
                            {allImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`${product.name} preview ${index + 1}`}
                                    onClick={() => setSelectedImg(img)}
                                    className={`w-24 h-24 object-cover cursor-pointer transition-all duration-200 hover:opacity-80 rounded-sm ${currentImage === img ? 'border-2 border-orange-500 shadow-sm opacity-100' : 'border border-gray-200 opacity-60'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT — DETAILS */}
                <div className="relative">

                    <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className="absolute top-0 right-0 text-2xl focus:outline-none"
                        aria-label="Add to wishlist"
                    >
                        <span className="text-gray-800">♥</span>
                    </button>

                    <h1 className="text-4xl font-bold text-gray-800 mb-3 pr-10">{product.name}</h1>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-orange-400 text-lg">{"★★★★☆"}</div>
                        <span className="text-gray-500 text-sm">{product.reviews || 19} reviews</span>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed mb-5">
                        Experience the rich taste of tradition with Sattur Mittai Kadai's {product.name}, a perfect blend of health and flavour.
                    </p>

                    <p className="text-3xl text-[#6b1f0e] font-bold mb-6">
                        Rs. {product.price || "180.00"}
                    </p>

                    <div className="mb-5">
                        <p className="flex items-center gap-2 font-semibold text-orange-500 mb-3">
                            <span>🗺️</span> Delivery Options
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                placeholder="Enter your zip code"
                                className="border border-gray-500 bg-white px-4 py-2 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                            />
                            <button className="border border-orange-500 text-orange-500 px-5 py-2 rounded-md font-semibold text-sm hover:bg-orange-50 transition whitespace-nowrap">
                                CHECK
                            </button>
                        </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-2">
                        <span className="font-medium">weight :</span> 250 gms
                    </p>

                    <div className="mb-6">
                        <button className="px-5 py-2 border-2 border-orange-500 text-[#6b1f0e] rounded-md text-sm font-semibold">
                            250 gms
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-2 text-gray-600 text-lg hover:bg-gray-100 transition">−</button>
                            <span className="px-4 py-2 text-gray-800 font-medium border-x border-gray-300">{quantity}</span>
                            <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-2 text-gray-600 text-lg hover:bg-gray-100 transition">+</button>
                        </div>
                        <AddToCartButton product={product} className="flex-1 bg-[#7B2D1E] hover:bg-[#9B3D2E] text-white py-3 font-semibold text-sm transition">Add To Cart</AddToCartButton>
                        <button className="flex-1 bg-black hover:bg-gray-800 text-white py-3 font-semibold text-sm transition">Buy It Now</button>
                    </div>

                </div>
            </div>

            {/* ✅ YOU MAY ALSO LIKE */}
            {relatedProducts.length > 0 && (
                <div className="mt-20">

                    {/* Section Heading */}
                    <div className="mb-8">
                        <p className="text-sm tracking-widest text-gray-400 uppercase mb-1">Related Products</p>
                        <h2 className="text-3xl font-serif text-[#6b1f0e]">You May Also Like</h2>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                        {relatedProducts.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    navigate(`/product/${item.id}`);
                                    window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ scroll to top on navigate
                                }}
                                className="group cursor-pointer"
                            >
                                {/* Image */}
                                <div className="relative h-[180px] overflow-hidden rounded-md shadow-sm">
                                    <img
                                        src={item.img1}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Name & Reviews */}
                                <div className="mt-3">
                                    <h3 className="text-sm font-medium text-gray-800 group-hover:text-orange-500 transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">
                                        ⭐⭐⭐⭐⭐ <span>({item.reviews})</span>
                                    </p>
                                </div>

                                {/* Add to Cart */}
                                <AddToCartButton product={item} className="mt-3 w-full py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium tracking-wide transition-colors rounded-sm">
                                    ADD TO CART
                                </AddToCartButton>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProductDetail;