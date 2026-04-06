import { Button } from "@/components/ui/button";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  "All",
  "Machine",
  "Raw Material",
  "Sales Items",
  "Marketing",
  "Utilities",
];

const PRODUCTS = [
  {
    id: 1,
    name: "Industrial Mixer",
    category: "Machine",
    price: 15000,
    emoji: "⚙️",
    desc: "Heavy-duty industrial mixer for manufacturing.",
  },
  {
    id: 2,
    name: "Raw Turmeric (1kg)",
    category: "Raw Material",
    price: 150,
    emoji: "🌿",
    desc: "Premium quality raw turmeric sourced directly.",
  },
  {
    id: 3,
    name: "AUG Herbal Powder",
    category: "Sales Items",
    price: 299,
    emoji: "🌺",
    desc: "Best-selling herbal wellness powder.",
  },
  {
    id: 4,
    name: "Marketing Kit",
    category: "Marketing",
    price: 499,
    emoji: "📦",
    desc: "Complete marketing material kit with brochures.",
  },
  {
    id: 5,
    name: "AUG Aloe Vera Gel",
    category: "Sales Items",
    price: 199,
    emoji: "🌿",
    desc: "100% pure aloe vera gel for skin care.",
  },
  {
    id: 6,
    name: "Business Cards (500)",
    category: "Marketing",
    price: 250,
    emoji: "💼",
    desc: "Professional printed business cards.",
  },
  {
    id: 7,
    name: "Packaging Material",
    category: "Utilities",
    price: 350,
    emoji: "📦",
    desc: "Eco-friendly packaging for products.",
  },
  {
    id: 8,
    name: "Grinding Machine",
    category: "Machine",
    price: 25000,
    emoji: "⚙️",
    desc: "Heavy-duty spice grinding machine.",
  },
  {
    id: 9,
    name: "Raw Neem Powder (500g)",
    category: "Raw Material",
    price: 120,
    emoji: "🌳",
    desc: "Organic neem powder for product manufacturing.",
  },
];

export function ShoppingSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<number[]>([]);

  const filtered =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const addToCart = (id: number) => {
    setCart((prev) => [...prev, id]);
    toast.success("Added to cart!");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{ background: "rgba(236,72,153,0.1)" }}
          >
            <ShoppingBag className="h-6 w-6" style={{ color: "#EC4899" }} />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
              Shopping 🛍️
            </h1>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Browse and order AUG products
            </p>
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg"
          style={{
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
          data-ocid="shopping.button"
        >
          <ShoppingCart className="h-4 w-4" style={{ color: "#EC4899" }} />
          <span className="text-sm font-bold" style={{ color: "#EC4899" }}>
            {cart.length}
          </span>
        </div>
      </div>

      {/* Category filters */}
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            data-ocid={`shopping.${cat.toLowerCase().replace(/ /g, "-")}.tab`}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0"
            style={{
              background: activeCategory === cat ? "#142D4A" : "#fff",
              color: activeCategory === cat ? "#C7A24A" : "#6B7280",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl overflow-hidden"
            style={{
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            data-ocid={`shopping.item.${i + 1}`}
          >
            <div
              className="h-28 flex items-center justify-center text-5xl"
              style={{
                background: "linear-gradient(135deg, #F0F4F8, #E5EBF2)",
              }}
            >
              <span className="animate-bounce">{product.emoji}</span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    className="font-semibold text-sm"
                    style={{ color: "#111827" }}
                  >
                    {product.name}
                  </h3>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(20,45,74,0.08)",
                      color: "#142D4A",
                    }}
                  >
                    {product.category}
                  </span>
                </div>
                <p className="font-bold text-base" style={{ color: "#142D4A" }}>
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>
              <p className="text-xs mt-2" style={{ color: "#6B7280" }}>
                {product.desc}
              </p>
              <Button
                data-ocid={`shopping.button.${i + 1}`}
                onClick={() => addToCart(product.id)}
                className="w-full mt-3 h-9 text-sm"
                style={{ background: "#142D4A", color: "#C7A24A" }}
              >
                Add to Cart
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
