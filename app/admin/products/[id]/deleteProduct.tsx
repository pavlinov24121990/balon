'use client'
import { DeleteProducts } from '@/helpers/interface/interfaces';
import { useRouter } from '@/node_modules/next/navigation';

const DeleteProducts: React.FC<DeleteProducts> = ({ productId, cookies }) => {
  const router = useRouter();

  const deleteProductHandler = async () => {
    if (!cookies) {
      return null
    }
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/v1/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': cookies,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        console.error('Error deleting product. Status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <button className="btn btn-danger mb-3" onClick={deleteProductHandler}>
      Product delete
    </button>
  );
}

export default DeleteProducts;
