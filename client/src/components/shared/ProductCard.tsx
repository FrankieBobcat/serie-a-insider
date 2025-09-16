import { FaShoppingCart, FaEye } from "react-icons/fa";
import { formatPrice } from "@/lib/utils";
import { Link } from "wouter";
import { useCart } from "@/lib/CartContext";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  team: string;
  teamLogo: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  badgeColor?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link href={`/shop/product/${product.id}`}>
      <div className="bg-white rounded-lg overflow-hidden text-serie-navy group hover:shadow-xl transition cursor-pointer">
        <div className="relative">
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
          {product.badge && (
            <div className={`absolute top-0 right-0 ${product.badgeColor || 'bg-serie-blue'} text-white m-3 px-2 py-1 rounded text-xs font-accent`}>
              {product.badge}
            </div>
          )}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              className="bg-white text-serie-navy px-4 py-2 rounded font-accent hover:bg-serie-light-blue hover:text-white transition flex items-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/shop/product/${product.id}`;
              }}
            >
              <FaEye className="mr-2" /> Quick View
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <img src={product.teamLogo} alt={product.team} className="h-5 mr-2" />
            <span className="text-sm text-gray-600">{product.team}</span>
          </div>
          <h3 className="font-bold font-heading mb-2">{product.name}</h3>
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-serie-blue">
              {product.originalPrice && (
                <span className="line-through text-gray-500 text-sm mr-2">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {formatPrice(product.price)}
            </div>
            <button 
              className="text-serie-light-blue hover:text-serie-blue transition p-2"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
