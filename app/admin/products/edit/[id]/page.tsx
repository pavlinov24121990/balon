'use server'
import AdminLayout from 'app/admin/AdminLayout';
import Form from 'app/admin/products/new/Form';
import { fetchCookie, ShowProduct } from '../../api/route';

const UpdateProduct = async ({ params }) => {
  try {
    const response = await fetchCookie();
    const cookies: string | null = response.headers.get('set-cookie');
    const product = await ShowProduct(params.id, cookies);

    return (
      <AdminLayout>
        <Form product={product} cookies={cookies} />
      </AdminLayout>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return <div>Error loading product</div>;
  }
}

export default UpdateProduct;