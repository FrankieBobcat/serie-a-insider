import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { featuredProducts } from "@/lib/data";
import { teams } from "@/lib/data";
import ProductCard from "@/components/shared/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

// Create more product data based on the featuredProducts
export const allProducts = [
  ...featuredProducts,
  {
    id: 5,
    name: "Napoli Away Jersey 2023/24",
    team: "Napoli",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/2/28/S.S.C._Napoli_logo.svg",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1580975327062-38471368fd51?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    id: 6,
    name: "Juventus Home Jersey 2023/24",
    team: "Juventus",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
    badge: "NEW",
    badgeColor: "bg-serie-red"
  },
  {
    id: 7,
    name: "AC Milan Training Jacket",
    team: "Milan",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1515040242872-87ac419c565b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    id: 8,
    name: "Roma Vintage Cap",
    team: "Roma",
    teamLogo: "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg",
    price: 29.99,
    originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1513116476489-7635e79feb27?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
    badge: "SALE",
    badgeColor: "bg-serie-green"
  },
  {
    id: 9,
    name: "Inter Training Shorts",
    team: "Inter",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    id: 10,
    name: "Lazio Polo Shirt",
    team: "Lazio",
    teamLogo: "https://upload.wikimedia.org/wikipedia/en/c/ce/S.S._Lazio_badge.svg",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1581760544892-5269dd52df71?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    id: 11,
    name: "Napoli Fan Scarf",
    team: "Napoli",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/2/28/S.S.C._Napoli_logo.svg",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1585184394271-4c0a47dc59c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    id: 12,
    name: "Juventus Backpack",
    team: "Juventus",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
  }
];

const Shop = () => {
  const [location] = useLocation();
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedProductType, setSelectedProductType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 150]);
  const [sortOption, setSortOption] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get URL params to filter by team
  const searchParams = new URLSearchParams(location.split("?")[1]);
  const teamId = searchParams.get("team");
  
  if (teamId && !selectedTeam) {
    const team = teams.find(t => t.id === parseInt(teamId));
    if (team) {
      setSelectedTeam(team.name);
    }
  }

  // Filter products
  let filteredProducts = [...allProducts];
  
  if (selectedTeam) {
    filteredProducts = filteredProducts.filter(product => product.team === selectedTeam);
  }
  
  if (selectedProductType) {
    const typeMap: Record<string, string[]> = {
      "jerseys": ["Jersey", "Kit"],
      "training": ["Training", "Jacket", "Shorts", "Shirt"],
      "accessories": ["Scarf", "Cap", "Backpack"],
      "memorabilia": ["Retro", "Vintage"]
    };
    
    filteredProducts = filteredProducts.filter(product => {
      const keywords = typeMap[selectedProductType] || [];
      return keywords.some(keyword => product.name.includes(keyword));
    });
  }
  
  // Filter by price range
  filteredProducts = filteredProducts.filter(product => {
    const price = product.originalPrice || product.price;
    return price >= priceRange[0] && price <= priceRange[1];
  });
  
  // Sort products
  if (sortOption === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "name-asc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "name-desc") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <>
      <Helmet>
        <title>Serie A Merchandise Shop | Official Serie A Insider Store</title>
        <meta 
          name="description" 
          content="Shop official Serie A merchandise including jerseys, training wear, and fan accessories for all 20 Serie A clubs. Fast shipping and secure payment." 
        />
        <meta name="keywords" content="Serie A merchandise, Serie A jerseys, Italian football merchandise, soccer jerseys, football gifts" />
      </Helmet>
      
      <main>
        <section className="py-12 bg-gradient-to-b from-serie-navy to-serie-blue text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold font-heading text-center mb-4">Serie A Shop</h1>
            <p className="text-serie-gray text-center max-w-3xl mx-auto">
              Browse our official Serie A merchandise to find jerseys, training wear, and accessories for all 20 Serie A clubs.
            </p>
          </div>
        </section>

        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold font-heading text-serie-navy mb-6">Filters</h2>
                  
                  <div className="mb-6">
                    <h3 className="font-bold text-serie-blue mb-3">Team</h3>
                    <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Teams" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-teams">All Teams</SelectItem>
                        {teams.map(team => (
                          <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-bold text-serie-blue mb-3">Product Type</h3>
                    <Select value={selectedProductType} onValueChange={setSelectedProductType}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Products" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-products">All Products</SelectItem>
                        <SelectItem value="jerseys">Jerseys</SelectItem>
                        <SelectItem value="training">Training Wear</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                        <SelectItem value="memorabilia">Memorabilia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-bold text-serie-blue mb-3">Price Range</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 150]}
                        max={150}
                        step={5}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>€{priceRange[0]}</span>
                        <span>€{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-bold text-serie-blue mb-3">Availability</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="in-stock" checked />
                        <label htmlFor="in-stock" className="ml-2 text-sm text-gray-600">In Stock</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="sale" />
                        <label htmlFor="sale" className="ml-2 text-sm text-gray-600">Sale Items</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="new-arrivals" />
                        <label htmlFor="new-arrivals" className="ml-2 text-sm text-gray-600">New Arrivals</label>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-serie-navy text-white py-2 rounded font-accent hover:bg-serie-blue transition">
                    Reset Filters
                  </button>
                </div>
              </div>
              
              {/* Products Grid */}
              <div className="lg:w-3/4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  {/* Product Categories Tabs */}
                  <Tabs defaultValue="all" className="mb-6">
                    <TabsList className="bg-serie-gray/20 w-full justify-start">
                      <TabsTrigger value="all" className="font-accent">All Products</TabsTrigger>
                      <TabsTrigger value="jerseys" className="font-accent">Jerseys</TabsTrigger>
                      <TabsTrigger value="training" className="font-accent">Training Wear</TabsTrigger>
                      <TabsTrigger value="accessories" className="font-accent">Accessories</TabsTrigger>
                      <TabsTrigger value="memorabilia" className="font-accent">Memorabilia</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  {/* Sort and View Controls */}
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <div className="mb-4 sm:mb-0">
                      <span className="text-gray-600">Showing {filteredProducts.length} products</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="featured">Featured</SelectItem>
                          <SelectItem value="price-asc">Price: Low to High</SelectItem>
                          <SelectItem value="price-desc">Price: High to Low</SelectItem>
                          <SelectItem value="name-asc">Name: A to Z</SelectItem>
                          <SelectItem value="name-desc">Name: Z to A</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="flex border rounded">
                        <button 
                          className={`p-2 ${viewMode === 'grid' ? 'bg-serie-blue text-white' : 'bg-white text-gray-600'}`}
                          onClick={() => setViewMode('grid')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        </button>
                        <button 
                          className={`p-2 ${viewMode === 'list' ? 'bg-serie-blue text-white' : 'bg-white text-gray-600'}`}
                          onClick={() => setViewMode('list')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Products */}
                  {filteredProducts.length > 0 ? (
                    <div className={viewMode === 'grid' 
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                      : "space-y-6"
                    }>
                      {filteredProducts.map(product => (
                        viewMode === 'grid' ? (
                          <ProductCard key={product.id} product={product} />
                        ) : (
                          <div key={product.id} className="flex border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                            <div className="w-1/3">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="w-2/3 p-4 flex flex-col">
                              <div className="flex items-center mb-2">
                                <img src={product.teamLogo} alt={product.team} className="h-5 mr-2" />
                                <span className="text-sm text-gray-600">{product.team}</span>
                                {product.badge && (
                                  <div className={`${product.badgeColor || 'bg-serie-blue'} text-white ml-2 px-2 py-0.5 rounded text-xs font-accent`}>
                                    {product.badge}
                                  </div>
                                )}
                              </div>
                              <h3 className="font-bold font-heading text-serie-navy text-lg mb-2">{product.name}</h3>
                              <p className="text-gray-600 text-sm mb-4 flex-grow">
                                Official {product.team} merchandise. High-quality materials for maximum comfort and durability.
                              </p>
                              <div className="flex justify-between items-center mt-auto">
                                <div className="text-xl font-bold text-serie-blue">
                                  {product.originalPrice && (
                                    <span className="line-through text-gray-500 text-sm mr-2">
                                      €{product.originalPrice.toFixed(2)}
                                    </span>
                                  )}
                                  €{product.price.toFixed(2)}
                                </div>
                                <button className="bg-serie-blue hover:bg-serie-navy text-white px-4 py-2 rounded font-accent transition">
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-serie-gray mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <h3 className="text-2xl font-bold font-heading text-serie-navy mb-2">No Products Found</h3>
                      <p className="text-gray-600 mb-6">We couldn't find any products matching your current filters.</p>
                      <button 
                        className="bg-serie-blue hover:bg-serie-navy text-white px-6 py-3 rounded-lg font-accent transition"
                        onClick={() => {
                          setSelectedTeam("all-teams");
                          setSelectedProductType("all-products");
                          setPriceRange([0, 150]);
                        }}
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                  
                  {/* Pagination */}
                  {filteredProducts.length > 0 && (
                    <div className="flex justify-center mt-12">
                      <div className="flex items-center space-x-1">
                        <button className="px-3 py-1 rounded border border-serie-blue text-serie-blue hover:bg-serie-blue hover:text-white transition">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button className="px-3 py-1 rounded bg-serie-blue text-white">1</button>
                        <button className="px-3 py-1 rounded border border-serie-blue text-serie-blue hover:bg-serie-blue hover:text-white transition">2</button>
                        <button className="px-3 py-1 rounded border border-serie-blue text-serie-blue hover:bg-serie-blue hover:text-white transition">3</button>
                        <button className="px-3 py-1 rounded border border-serie-blue text-serie-blue hover:bg-serie-blue hover:text-white transition">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shopping Information */}
        <section className="py-12 bg-serie-gray/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-serie-blue/10 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-serie-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="font-bold font-heading text-serie-navy mb-2">Official Products</h3>
                <p className="text-gray-600 text-sm">All our products are 100% authentic and officially licensed Serie A merchandise.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-serie-blue/10 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-serie-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-bold font-heading text-serie-navy mb-2">Secure Payment</h3>
                <p className="text-gray-600 text-sm">We use the latest security measures to ensure your payment information is always safe.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-serie-blue/10 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-serie-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="font-bold font-heading text-serie-navy mb-2">Fast Shipping</h3>
                <p className="text-gray-600 text-sm">We ship worldwide with tracking available on all orders. Fast delivery throughout Europe.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-serie-blue/10 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-serie-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                  </svg>
                </div>
                <h3 className="font-bold font-heading text-serie-navy mb-2">Easy Returns</h3>
                <p className="text-gray-600 text-sm">Not satisfied? Return or exchange your product within 30 days of purchase.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-heading text-serie-navy text-center mb-8">Popular Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/shop?category=jerseys">
                <a className="relative rounded-lg overflow-hidden h-64 group">
                  <img 
                    src="https://images.unsplash.com/photo-1571736444983-5b7a4a01730c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                    alt="Jerseys" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-white text-xl font-bold font-heading mb-1">Official Jerseys</h3>
                      <div className="flex items-center text-serie-gray group-hover:text-white transition">
                        <span>Shop Now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
              
              <Link href="/shop?category=training">
                <a className="relative rounded-lg overflow-hidden h-64 group">
                  <img 
                    src="https://images.unsplash.com/photo-1515040242872-87ac419c565b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                    alt="Training Wear" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-white text-xl font-bold font-heading mb-1">Training Wear</h3>
                      <div className="flex items-center text-serie-gray group-hover:text-white transition">
                        <span>Shop Now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
              
              <Link href="/shop?category=accessories">
                <a className="relative rounded-lg overflow-hidden h-64 group">
                  <img 
                    src="https://images.unsplash.com/photo-1585184394271-4c0a47dc59c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                    alt="Accessories" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-white text-xl font-bold font-heading mb-1">Accessories</h3>
                      <div className="flex items-center text-serie-gray group-hover:text-white transition">
                        <span>Shop Now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
              
              <Link href="/shop?category=memorabilia">
                <a className="relative rounded-lg overflow-hidden h-64 group">
                  <img 
                    src="https://images.unsplash.com/photo-1587290413476-b7e966729c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                    alt="Memorabilia" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-white text-xl font-bold font-heading mb-1">Memorabilia</h3>
                      <div className="flex items-center text-serie-gray group-hover:text-white transition">
                        <span>Shop Now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Shop;
