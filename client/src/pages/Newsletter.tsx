import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { teams } from "@/lib/data";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FaEnvelope, FaBell, FaCalendarAlt, FaNewspaper, FaTrophy } from "react-icons/fa";

const Newsletter = () => {
  const { toast } = useToast();
  
  // Newsletter subscription form state
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    favoriteTeam: "",
  });
  const [consent, setConsent] = useState(false);
  const [preferredContentTypes, setPreferredContentTypes] = useState({
    exclusiveDeals: true,
    newArrivals: true,
    teamSpecificMerch: false,
    limitedEditions: false,
    seasonalOffers: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (contentType: string) => {
    setPreferredContentTypes(prev => ({
      ...prev,
      [contentType]: !prev[contentType as keyof typeof prev]
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.firstName || !formData.favoriteTeam || !consent) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields and agree to the terms.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/newsletter/subscribe", {
        ...formData,
        // We'd normally also save preferred content types here
      });
      
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter. You'll receive your first issue soon!",
      });
      
      // Reset form
      setFormData({
        email: "",
        firstName: "",
        favoriteTeam: "",
      });
      setConsent(false);
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Newsletter Subscription | Serie A Insider</title>
        <meta 
          name="description" 
          content="Subscribe to the Serie A Insider newsletter for the latest news, match previews, and exclusive content about Italian football." 
        />
      </Helmet>
      
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-serie-navy to-serie-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Subscribe to our Newsletter</h1>
            <p className="text-serie-gray text-lg max-w-3xl mx-auto mb-8">
              Subscribe to receive VIP access to exclusive merchandise promotions, early bird discounts, and limited edition 
              Serie A collectibles. Never miss out on the best deals for your favorite team's gear!
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="bg-serie-red hover:bg-serie-red/90 font-accent text-lg" onClick={() => {
                const formElement = document.getElementById('newsletter-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}>
                Subscribe Now
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-heading text-serie-navy text-center mb-12">Why Subscribe?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-t-4 border-t-serie-blue">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-serie-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaTrophy className="text-3xl text-serie-blue" />
                  </div>
                  <CardTitle className="text-serie-navy">Early Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Get early access to new merchandise collections before they're available to the general public. Never miss limited edition releases.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-t-serie-light-blue">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-serie-light-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaBell className="text-3xl text-serie-light-blue" />
                  </div>
                  <CardTitle className="text-serie-navy">Exclusive Discounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Receive subscriber-only discount codes for up to 25% off official Serie A merchandise and special offers on limited edition items.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-t-serie-red">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-serie-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaEnvelope className="text-3xl text-serie-red" />
                  </div>
                  <CardTitle className="text-serie-navy">Personalized Offers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Get custom recommendations and special offers for merchandise from your favorite Serie A team, tailored to your preferences.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Newsletter Subscription Form */}
        <section id="newsletter-form" className="py-16 bg-serie-gray/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-none shadow-xl">
                <CardHeader className="bg-gradient-to-r from-serie-blue to-serie-light-blue text-white">
                  <CardTitle className="text-2xl">Subscribe to our Newsletter</CardTitle>
                  <CardDescription className="text-serie-gray">
                    Subscribe for VIP discounts, early access to new releases, and special offers on official Serie A merchandise.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email" className="text-serie-navy font-accent">
                          Email Address <span className="text-serie-red">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-serie-navy font-accent">
                            First Name <span className="text-serie-red">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Your first name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="favoriteTeam" className="text-serie-navy font-accent">
                            Favorite Team <span className="text-serie-red">*</span>
                          </Label>
                          <select
                            id="favoriteTeam"
                            name="favoriteTeam"
                            value={formData.favoriteTeam}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-serie-light-blue mt-1"
                            required
                          >
                            <option value="">Select your favorite team</option>
                            {teams.map((team) => (
                              <option key={team.id} value={team.name}>
                                {team.name}
                              </option>
                            ))}
                            <option value="other">Other / No preference</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-serie-navy mb-3">Deal Preferences</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Select the type of merchandise deals you'd like to receive:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            id="exclusiveDeals" 
                            checked={preferredContentTypes.exclusiveDeals}
                            onCheckedChange={() => handleCheckboxChange('exclusiveDeals')}
                          />
                          <div>
                            <Label htmlFor="exclusiveDeals" className="font-medium text-serie-navy">Exclusive Deals</Label>
                            <p className="text-xs text-gray-500">Subscriber-only discounts and promotions</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            id="newArrivals" 
                            checked={preferredContentTypes.newArrivals}
                            onCheckedChange={() => handleCheckboxChange('newArrivals')}
                          />
                          <div>
                            <Label htmlFor="newArrivals" className="font-medium text-serie-navy">New Arrivals</Label>
                            <p className="text-xs text-gray-500">Be the first to know about new merchandise</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            id="teamSpecificMerch" 
                            checked={preferredContentTypes.teamSpecificMerch}
                            onCheckedChange={() => handleCheckboxChange('teamSpecificMerch')}
                          />
                          <div>
                            <Label htmlFor="teamSpecificMerch" className="font-medium text-serie-navy">Team-Specific Merchandise</Label>
                            <p className="text-xs text-gray-500">Deals for your favorite team's merchandise</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            id="limitedEditions" 
                            checked={preferredContentTypes.limitedEditions}
                            onCheckedChange={() => handleCheckboxChange('limitedEditions')}
                          />
                          <div>
                            <Label htmlFor="limitedEditions" className="font-medium text-serie-navy">Limited Editions</Label>
                            <p className="text-xs text-gray-500">Limited edition and collector's items alerts</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            id="seasonalOffers" 
                            checked={preferredContentTypes.seasonalOffers}
                            onCheckedChange={() => handleCheckboxChange('seasonalOffers')}
                          />
                          <div>
                            <Label htmlFor="seasonalOffers" className="font-medium text-serie-navy">Seasonal Offers</Label>
                            <p className="text-xs text-gray-500">Special deals during holidays and special events</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="consent" 
                        checked={consent}
                        onCheckedChange={() => setConsent(!consent)}
                        required
                      />
                      <div>
                        <Label htmlFor="consent" className="text-sm text-gray-600">
                          I agree to receive newsletters and marketing communications from Serie A Insider.
                          I understand that I can unsubscribe at any time by clicking the unsubscribe link
                          in any email. <span className="text-serie-red">*</span>
                        </Label>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-serie-navy hover:bg-serie-blue font-accent text-lg"
                    >
                      {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center mt-4">
                      We respect your privacy and will never share your information with third parties.
                      For more information, please read our <a href="#" className="text-serie-light-blue hover:underline">Privacy Policy</a>.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-serie-navy text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-heading mb-12">What Our Subscribers Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-serie-light-blue mx-auto mb-4">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                <p className="text-serie-gray mb-6">
                  "I saved over €75 on my last AC Milan jersey purchase thanks to the exclusive subscriber discount. The early access to new kit releases means I never miss out on limited editions!"
                </p>
                <div>
                  <p className="font-bold text-white">Marco Ferrari</p>
                  <p className="text-xs text-serie-gray">Milan fan since 1992</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-serie-light-blue mx-auto mb-4">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                <p className="text-serie-gray mb-6">
                  "Being in the USA, I was able to get my Juventus collector's edition jersey before it sold out thanks to the early access alerts. The subscriber-only 20% discount made international shipping much more affordable!"
                </p>
                <div>
                  <p className="font-bold text-white">Sarah Johnson</p>
                  <p className="text-xs text-serie-gray">Juventus supporter</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-serie-light-blue mx-auto mb-4">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                <p className="text-serie-gray mb-6">
                  "The limited edition Napoli memorabilia alerts are fantastic! I've built an amazing collection thanks to the newsletter, and the seasonal discount offers have saved me hundreds of euros over the past year."
                </p>
                <div>
                  <p className="font-bold text-white">Luca Esposito</p>
                  <p className="text-xs text-serie-gray">Napoli fan for life</p>
                </div>
              </div>
            </div>
            
            <Button className="mt-12 bg-serie-red hover:bg-serie-red/90 font-accent" onClick={() => {
              const formElement = document.getElementById('newsletter-form');
              if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              Subscribe to our Newsletter
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Newsletter;