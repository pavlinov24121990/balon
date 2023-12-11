'use server'
import { revalidateTag } from '@/node_modules/next/cache';
import AdminLayout from 'app/admin/AdminLayout';
import Form from 'app/admin/products/new/Form';

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
    return data
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
};

const UpdateProduct: React.FC<{ params: { id: number } }> = async ({ params }) => {
  try {
    const product = await ShowProduct(params.id);

    return (
      <AdminLayout>
        <Form product={product} />
      </AdminLayout>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return <div>Error loading product</div>;
  }
}

export default UpdateProduct;