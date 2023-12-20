import { ApiResponse, Product } from "@/helpers/interface/interfaces";
import { revalidateTag } from "@/node_modules/next/cache";

export async function fetchProducts(currentPage: number): Promise<ApiResponse> {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/v1/products?active=${'true'}&page=${currentPage}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export async function ShowProductUser(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/v1/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      next: { tags: ['product'], revalidate: 1  },
    });
    const data = await response.json();
    console.log(data)
    revalidateTag('products')
    return data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return null
  }
};