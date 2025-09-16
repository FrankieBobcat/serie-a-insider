import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/lib/CartContext";
import Cart from "@/components/shop/Cart";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LiveMatchTicker from "@/components/layout/LiveMatchTicker";
import MobileNav from "@/components/layout/MobileNav";
import PullToRefresh from "@/components/layout/PullToRefresh";
import PwaInstallPrompt from "@/components/layout/PwaInstallPrompt";
import { useIsMobile } from "@/hooks/use-mobile";
import { HelmetProvider } from "react-helmet-async";
import Home from "@/pages/Home";
import Teams from "@/pages/Teams";
import TeamDetail from "@/pages/TeamDetail";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import Checkout from "@/pages/Checkout";
import Media from "@/pages/Media";
import VideoDetail from "@/pages/VideoDetail";
import FanZone from "@/pages/FanZone";
import Newsletter from "@/pages/Newsletter";
import Contact from "@/pages/Contact";

function Router() {
  const isMobile = useIsMobile();

  return (
    <>
      <Header />
      <LiveMatchTicker />
      <Cart />
      <div className={isMobile ? "pb-16" : ""}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/teams" component={Teams} />
          <Route path="/teams/:id" component={TeamDetail} />
          <Route path="/news" component={News} />
          <Route path="/news/:id" component={NewsDetail} />
          <Route path="/shop" component={Shop} />
          <Route path="/shop/product/:id" component={ProductDetail} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/media" component={Media} />
          <Route path="/media/video/:id" component={VideoDetail} />
          <Route path="/fan-zone" component={FanZone} />
          <Route path="/newsletter" component={Newsletter} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
      {isMobile && (
        <>
          <MobileNav />
          <PullToRefresh />
          <PwaInstallPrompt />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Router />
          <Toaster />
        </CartProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
