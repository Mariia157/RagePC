import Link from "next/link";
import { formatPrice } from "@/lib/categories";
import ProductImage from "@/components/ProductImage";
import { ShoppingCart } from "lucide-react";

type Props = {
  product: {
    id: string;
    slug: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    description: string;
    stock?: number;
  };
};

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="card p-0 overflow-hidden flex flex-col group"
    >
      <div className="p-4 pb-2">
        <ProductImage
          src={product.image}
          alt={product.name}
          brand={product.brand}
          size="lg"
          className="rounded-xl"
        />
      </div>
      <div className="px-4 pb-4 flex-1 flex flex-col">
        <div className="text-[11px] text-[var(--color-muted)] uppercase tracking-wider font-medium">
          {product.brand}
        </div>
        <div className="font-semibold text-sm mt-1 line-clamp-2 leading-snug">
          {product.name}
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="text-lg font-bold text-[var(--color-brand)]">
            {formatPrice(product.price)}
          </div>
          <div className="w-9 h-9 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center group-hover:bg-[var(--color-brand)] transition">
            <ShoppingCart size={16} className="text-[var(--color-brand)] group-hover:text-white transition" />
          </div>
        </div>
      </div>
    </Link>
  );
}
