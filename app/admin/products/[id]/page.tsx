'use server'
import Link from "@/node_modules/next/link";
import Price from 'helpers/FormattingPrice';
import DeleteProducts from './deleteProduct';
import Caourusel from './caourusel'
import { fetchCookie, ShowProduct } from '../api/route';

const ProductDetailPage = async ({ params }: { params: { id: number } }) => {
  try {
    const response = await fetchCookie();
    const cookies: string | null = response.headers.get('set-cookie');
    const product = await ShowProduct(params.id, cookies);

    return (
      <div className="products d-flex text-center flex-column">
        <h1 className="mb-5">Product Detail Page</h1>
        <div className="d-flex justify-content-center flex-column">
          <Caourusel product={product} />
          <p className="title mb-3">{product.title}</p>
          <p className="title mb-3">{product.description}</p>
          <Price key={product.id} price={product.price} />
          <div>
            <Link href={`/admin/products/edit/${params.id}`} className="btn btn-primary me-3 mb-3" >
              Product update
            </Link>
              <DeleteProducts productId={params.id} cookies={cookies}/>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return <div>Error loading product</div>;
  }
};

export default ProductDetailPage;
