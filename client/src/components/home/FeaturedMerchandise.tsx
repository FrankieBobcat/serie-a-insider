import { Link } from "wouter";
import { featuredProducts } from "@/lib/data";
import ProductCard from "@/components/shared/ProductCard";

const FeaturedMerchandise = () => {
  return (
    <section className="py-12 bg-serie-navy text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-heading">Featured Merchandise</h2>
          <Link
            href="/shop"
            className="bg-serie-light-blue hover:bg-white hover:text-serie-navy text-white px-4 py-2 rounded font-accent transition"
          >
            Visit Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMerchandise;
