'use server'
import AdminLayout from '../AdminLayout';
import { fetchCookie } from './api/route';
import ProductList from './ProductList';

const ProductPages = async () => {
  const response = await fetchCookie();
  const cookies: string | null = response.headers.get('set-cookie');

  return (
    <AdminLayout>
      <div className="products d-flex flex-column justify-content-end">
        <ProductList cookies={ cookies }/>
      </div>
    </AdminLayout>
  );
}

export default ProductPages;
