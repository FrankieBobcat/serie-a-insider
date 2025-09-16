import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useLocation } from 'wouter';
import { FaArrowLeft, FaShoppingCart, FaTruck, FaUndo, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/lib/CartContext';
import { allProducts } from '@/pages/Shop';
import { useToast } from '@/hooks/use-toast';

// Define the product type
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

// Reusable star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        if (star <= rating) {
          return <FaStar key={star} className="text-yellow-400" />;
        } else if (star - 0.5 <= rating) {
          return <FaStarHalfAlt key={star} className="text-yellow-400" />;
        } else {
          return <FaRegStar key={star} className="text-yellow-400" />;
        }
      })}
      <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

const ProductDetail = () => {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  // Find the product by ID
  const product = allProducts.find(p => p.id === parseInt(params.id));
  
  // If product not found, redirect to shop
  if (!product) {
    setLocation('/shop');
    return null;
  }
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Generate some additional images for the product (in a real app these would come from the API)
  const productImages = [
    product.image,
    `https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80`,
    `https://images.unsplash.com/photo-1565379793984-e65b51b33b37?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80`,
  ];
  
  // Handle quantity changes
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} has been added to your cart.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | Serie A Insider Shop</title>
        <meta 
          name="description" 
          content={`Buy ${product.name} for ${product.team} from the Official Serie A Insider Store. Fast shipping and secure payment.`} 
        />
      </Helmet>
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="mb-8 flex items-center text-sm text-gray-500">
            <Link href="/shop" className="hover:text-serie-blue transition flex items-center">
              <FaArrowLeft className="mr-2" /> Back to Shop
            </Link>
            <span className="mx-2">›</span>
            <Link href={`/shop?team=${product.team}`} className="hover:text-serie-blue transition">
              {product.team}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">{product.name}</span>
          </div>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg overflow-hidden border shadow-sm">
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {productImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer border rounded-md overflow-hidden h-24 ${selectedImage === index ? 'ring-2 ring-serie-blue' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <div className="flex items-center mb-2">
                <img src={product.teamLogo} alt={product.team} className="h-6 mr-2" />
                <Link href={`/shop?team=${product.team}`} className="text-gray-600 hover:text-serie-blue transition">
                  {product.team}
                </Link>
                {product.badge && (
                  <div className={`${product.badgeColor || 'bg-serie-blue'} text-white ml-4 px-2 py-0.5 rounded text-xs font-accent`}>
                    {product.badge}
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-2 text-serie-navy">{product.name}</h1>
              
              <div className="mb-4">
                <StarRating rating={4.5} />
              </div>
              
              <div className="mb-6">
                <div className="text-2xl font-bold text-serie-blue mb-1">
                  {product.originalPrice && (
                    <span className="line-through text-gray-500 text-xl mr-2">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice && (
                  <div className="text-serie-green font-semibold">
                    You save {formatPrice(product.originalPrice - product.price)} ({Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}%)
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold mb-2">Size</h3>
                <div className="flex space-x-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"} 
                      className={`w-12 h-12 ${selectedSize === size ? 'bg-serie-blue text-white' : 'border-gray-300'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-bold mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button 
                    onClick={decreaseQuantity}
                    className="w-10 h-10 bg-gray-100 text-gray-600 flex items-center justify-center rounded-l-md hover:bg-gray-200"
                  >
                    -
                  </button>
                  <div className="w-16 h-10 border-t border-b flex items-center justify-center text-gray-800 font-medium">
                    {quantity}
                  </div>
                  <button 
                    onClick={increaseQuantity}
                    className="w-10 h-10 bg-gray-100 text-gray-600 flex items-center justify-center rounded-r-md hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  className="w-full bg-serie-blue hover:bg-serie-navy text-white flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </Button>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <FaTruck className="mr-2 text-serie-blue" />
                    <span className="text-sm">Free shipping over €100</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaUndo className="mr-2 text-serie-blue" />
                    <span className="text-sm">30-day returns policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Description Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start bg-gray-100">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Product Details</TabsTrigger>
                <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="pt-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Product Description</h2>
                  <p className="mb-4">
                    Show your support for {product.team} with the official {product.name}. Designed with both style and comfort in mind, this product is perfect for match days or casual wear.
                  </p>
                  <p>
                    Made with high-quality materials, this officially licensed Serie A merchandise is built to last and features the iconic {product.team} colors and emblem.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="pt-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Product Details</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Official {product.team} merchandise</li>
                    <li>Material: 100% Polyester</li>
                    <li>Machine washable at 30°C</li>
                    <li>Regular fit</li>
                    <li>Imported</li>
                    <li>Product Code: {product.id.toString().padStart(6, '0')}</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <StarRating rating={4.5} />
                      <span className="ml-2 text-gray-600">Based on 24 reviews</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full w-full">
                      <div className="h-1 bg-yellow-400 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { name: 'Marco V.', rating: 5, date: '2 weeks ago', comment: 'Great quality and fast shipping! The colors are vibrant and it fits perfectly.' },
                      { name: 'Giulia R.', rating: 4, date: '1 month ago', comment: 'Nice product, very comfortable. Sizing runs a bit large though.' },
                      { name: 'Alessandro B.', rating: 5, date: '2 months ago', comment: 'Perfect gift for any fan. The material feels premium and durable.' },
                    ].map((review, index) => (
                      <div key={index} className="border-b pb-6 last:border-0">
                        <div className="flex justify-between mb-2">
                          <div className="font-bold">{review.name}</div>
                          <div className="text-gray-500 text-sm">{review.date}</div>
                        </div>
                        <StarRating rating={review.rating} />
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-serie-navy">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allProducts
                .filter(p => p.id !== product.id && p.team === product.team)
                .slice(0, 4)
                .map(relatedProduct => (
                  <div key={relatedProduct.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                    <Link href={`/shop/product/${relatedProduct.id}`}>
                      <div className="relative">
                        <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-48 object-cover" />
                        {relatedProduct.badge && (
                          <div className={`absolute top-0 right-0 ${relatedProduct.badgeColor || 'bg-serie-blue'} text-white m-2 px-2 py-1 rounded text-xs font-accent`}>
                            {relatedProduct.badge}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold truncate">{relatedProduct.name}</h3>
                        <div className="text-serie-blue font-bold mt-1">
                          {formatPrice(relatedProduct.price)}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetail;