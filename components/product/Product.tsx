import Stars from "@/components/product/Stars";
import ImageDisplay from "@/components/product/ImageDisplay";
import { getSingleProduct } from "@/lib/actions/product.action";
import { IProduct } from "@/lib/models/product";

export default function Product({product}: {product: IProduct}) {
  // const {name, price, description, category, images} = await getSingleProduct(params.id);

  return (
    <div className="grid gap-6">
      <ImageDisplay images={product.images} />
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500 dark:text-gray-400">{product.description}</p>
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold">${product.price}</span>
          <div className="flex items-center gap-0.5">
            <Stars rating={4} />
          </div>
        </div>
      </div>
    </div>
  );
}
