'use client'
import { useRouter } from '@/node_modules/next/navigation';

const DeleteProducts: React.FC<{ params: { id: number } }> = ({ productId }) => {
  const router = useRouter();

  const deleteProductHandler = async () => {
    try {
      const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyfQ.B8Mj72lfdlp3hLsKSPwXM6sJtYFEWgDlHSmKJXccHpo';
      const response = await fetch(`http://127.0.0.1:3000/api/v1/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
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
