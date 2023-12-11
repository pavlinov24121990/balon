'use server'
import AdminLayout from '../AdminLayout';
import ProductList from './ProductList';

const ProductPages: React.FC = async () => {

  return (
    <AdminLayout>
      <main className="products d-flex flex-column justify-content-end">
        <ProductList />
      </main>
    </AdminLayout>
  );
}

export default ProductPages;
