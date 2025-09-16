import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'wouter';
import { FaArrowLeft, FaCreditCard, FaLock } from 'react-icons/fa';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { loadStripe } from '@stripe/stripe-js';
import { 
  useStripe, 
  useElements, 
  Elements, 
  PaymentElement 
} from '@stripe/react-stripe-js';

// Make sure to call loadStripe outside of a component
// to avoid recreating the Stripe object
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Define the checkout form schema
const checkoutFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  postalCode: z.string().min(5, "Postal code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  paymentMethod: z.enum(["credit", "paypal", "banktransfer"]),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const CheckoutForm = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { cart, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'initial' | 'processing' | 'succeeded' | 'error'>('initial');
  
  const stripe = useStripe();
  const elements = useElements();
  
  // If cart is empty, redirect to shop
  if (cart.length === 0) {
    setLocation('/shop');
    return null;
  }
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      paymentMethod: "credit",
    },
  });
  
  // Calculate shipping cost (free over €100)
  const shippingCost = cartTotal >= 100 ? 0 : 7.99;
  
  // Calculate total with shipping
  const orderTotal = cartTotal + shippingCost;
  
  // Handle form submission
  const onSubmit = async (data: CheckoutFormValues) => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    
    setIsProcessing(true);
    setPaymentStatus('processing');
    
    // Confirm the payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
        payment_method_data: {
          billing_details: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            address: {
              line1: data.address,
              city: data.city,
              postal_code: data.postalCode,
              country: data.country,
            }
          }
        }
      },
      redirect: 'if_required'
    });
    
    if (error) {
      setPaymentStatus('error');
      toast({
        title: "Payment failed",
        description: error.message || "An error occurred during payment processing.",
        variant: "destructive",
      });
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setPaymentStatus('succeeded');
      toast({
        title: "Payment successful!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      });
      clearCart();
      setTimeout(() => {
        setLocation('/');
      }, 2000);
    }
    
    setIsProcessing(false);
  };

  return (
    <>
      <Helmet>
        <title>Checkout | Serie A Insider Shop</title>
        <meta 
          name="description" 
          content="Complete your order securely with Serie A Insider. Fast shipping and secure payment options." 
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
            <span className="text-gray-700">Checkout</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-8 text-serie-navy">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-4 text-serie-navy">Order Summary</h2>
                
                <div className="max-h-80 overflow-y-auto mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex py-4 border-b">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 mr-4">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                        <div className="flex items-center text-xs text-gray-500">
                          <img src={item.teamLogo} alt={item.team} className="h-3 mr-1" />
                          <span>{item.team}</span>
                          <span className="mx-2">•</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                        <div className="text-serie-blue font-bold mt-1">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-serie-green">FREE</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-serie-navy text-lg">{formatPrice(orderTotal)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center text-sm text-gray-600 mt-6">
                  <FaLock className="mr-2 text-serie-green" />
                  <span>Secure checkout with encrypted data</span>
                </div>
              </div>
            </div>
            
            {/* Checkout Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <h2 className="text-xl font-bold mb-4 text-serie-navy">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Milan" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="20123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="Italy" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="border-t pt-6 mt-6">
                      <h2 className="text-xl font-bold mb-4 text-serie-navy">Payment Method</h2>
                      
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2 border rounded p-3 hover:bg-gray-50">
                                  <RadioGroupItem value="credit" id="payment-card" />
                                  <label htmlFor="payment-card" className="flex items-center cursor-pointer">
                                    <FaCreditCard className="mr-2 text-serie-blue" />
                                    Credit/Debit Card
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {form.watch("paymentMethod") === "credit" && (
                        <div className="mt-4 space-y-4">
                          <div className="p-4 border rounded-md">
                            <PaymentElement />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t pt-6 mt-6">
                      <Button 
                        type="submit" 
                        className="w-full bg-serie-green hover:bg-serie-green/90 text-white py-3 text-lg"
                        disabled={isProcessing || !stripe || !elements}
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            Processing...
                          </>
                        ) : (
                          `Pay ${formatPrice(orderTotal)}`
                        )}
                      </Button>
                      
                      <p className="text-sm text-center text-gray-500 mt-4">
                        By clicking "Pay", you agree to our <Link href="/terms" className="text-serie-blue hover:underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-serie-blue hover:underline">Privacy Policy</Link>.
                      </p>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const Checkout = () => {
  const { cart, cartTotal } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  
  // Calculate shipping cost (free over €100)
  const shippingCost = cartTotal >= 100 ? 0 : 7.99;
  
  // Calculate total with shipping
  const orderTotal = cartTotal + shippingCost;
  
  // Create a payment intent when the page loads
  useEffect(() => {
    if (cart.length === 0) return;
    
    const createPaymentIntent = async () => {
      try {
        const response = await apiRequest("POST", "/api/create-payment-intent", {
          amount: orderTotal,
          currency: "eur"
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };
    
    createPaymentIntent();
  }, [cart, orderTotal]);
  
  // If no clientSecret is available yet, show a loading state
  if (!clientSecret && cart.length > 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin mr-2 h-8 w-8 border-4 border-serie-blue border-t-transparent rounded-full"></div>
        <span>Setting up payment...</span>
      </div>
    );
  }
  
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#0032A0', // Serie A blue
        colorBackground: '#ffffff',
        colorText: '#1A1659', // Serie A navy
      },
    },
  };
  
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;