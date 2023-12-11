'use server'
import AdminLayout from 'app/admin/AdminLayout';
import Link from "@/node_modules/next/link";
import Price from 'helpers/FormattingPrice';
import DeleteProducts from './deleteProduct';
import Caourusel from './caourusel'
import { revalidateTag } from '@/node_modules/next/cache';

async function ShowProduct(id: number) {
  try {
    const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyfQ.B8Mj72lfdlp3hLsKSPwXM6sJtYFEWgDlHSmKJXccHpo';
    const response = await fetch(`http://127.0.0.1:3000/api/v1/admin/products/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      next: { tags: ['products'], revalidate: 1  },
    });
    const data = await response.json();
    revalidateTag('products')
    return data;
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
};


const ProductDetailPage: React.FC<{ params: { id: number } }> = async ({ params }) => {
  try {
    
    const product = await ShowProduct(params.id);

    return (
      <AdminLayout>
         <main className="products d-flex text-center flex-column">
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
            <DeleteProducts productId={params.id} />
          </div>
        </div>
      </main>
      </AdminLayout>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return <div>Error loading product</div>;
  }
};

export default ProductDetailPage;
