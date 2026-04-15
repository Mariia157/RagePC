import Link from "next/link";
import { formatPrice } from "@/lib/categories";
import ProductImage from "@/components/ProductImage";

type Props = {
  product: {
    id: string;
    slug: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    description: string;
  };
};

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="card p-4 flex flex-col gap-3"
    >
      <ProductImage src={product.image} alt={product.name} brand={product.brand} size="lg" />
      <div className="flex-1 flex flex-col">
        <div className="text-xs text-[var(--color-muted)] uppercase tracking-wide">
          {product.brand}
        </div>
        <div className="font-semibold mt-1 line-clamp-2">{product.name}</div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="text-lg font-bold text-[var(--color-brand)]">
            {formatPrice(product.price)}
          </div>
        </div>
      </div>
    </Link>
  );
}
