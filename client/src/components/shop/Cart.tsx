import { useCart } from '@/lib/CartContext';
import { formatPrice } from '@/lib/utils';
import { FaTrash, FaPlus, FaMinus, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

const CartItem = ({ item }: { item: ReturnType<typeof useCart>['cart'][0] }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  return (
    <div className="flex py-4 border-b">
      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 mr-4">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow pr-2">
        <div className="flex justify-between items-start mb-1">
          <Link href={`/shop/product/${item.id}`}>
            <h3 className="font-bold text-sm hover:text-serie-blue transition cursor-pointer">{item.name}</h3>
          </Link>
          <button 
            onClick={() => removeFromCart(item.id)}
            className="text-gray-400 hover:text-red-500 transition"
            aria-label="Remove item"
          >
            <FaTrash size={14} />
          </button>
        </div>
        
        <div className="flex items-center">
          <img src={item.teamLogo} alt={item.team} className="h-3 mr-1" />
          <span className="text-xs text-gray-500">{item.team}</span>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center border rounded">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              <FaMinus size={10} />
            </button>
            <span className="px-2 text-sm">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              <FaPlus size={10} />
            </button>
          </div>
          <div className="font-bold text-serie-blue">
            {formatPrice(item.price * item.quantity)}
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cart, cartTotal, cartCount, clearCart, isCartOpen, setIsCartOpen } = useCart();
  const { toast } = useToast();
  
  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting you to the checkout page.",
    });
    // Close cart drawer when proceeding to checkout
    setIsCartOpen(false);
    // Navigate to checkout
    window.location.href = "/checkout";
  };

  return (
    <>
      {/* Cart toggle button for mobile/tablet */}
      <div className="sm:hidden fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-serie-blue text-white rounded-full p-3 shadow-lg flex items-center justify-center"
          aria-label="Open cart"
        >
          <FaShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-serie-red text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Cart drawer/sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />

            {/* Cart panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-xl flex flex-col"
            >
              <div className="p-4 border-b flex justify-between items-center bg-serie-navy text-white">
                <h2 className="text-lg font-bold font-heading flex items-center">
                  <FaShoppingCart className="mr-2" /> Shopping Cart ({cartCount})
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-white p-1 hover:text-gray-300 transition"
                  aria-label="Close cart"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-auto p-4">
                {cart.length > 0 ? (
                  <>
                    {cart.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <FaShoppingCart size={50} className="mb-4 opacity-30" />
                    <p className="mb-2">Your cart is empty</p>
                    <p className="text-sm text-center">Add some items to your cart and they will appear here.</p>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex justify-between mb-4">
                    <span className="font-bold text-lg">Subtotal:</span>
                    <span className="font-bold text-xl text-serie-blue">{formatPrice(cartTotal)}</span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout</p>
                  
                  <div className="flex flex-col space-y-2">
                    <Button onClick={handleCheckout} className="w-full bg-serie-green text-white hover:bg-serie-green/90">
                      Proceed to Checkout
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                      onClick={() => clearCart()}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;