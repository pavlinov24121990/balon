import { cookies } from '@/node_modules/next/headers';
import { ApiResponse } from "@/helpers/interface/interfaces";
import { revalidateTag } from '@/node_modules/next/cache';
 
export async function fetchCookie() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `Bearer ${token.value}` },
  })
}

export async function fetchProductList(currentPage: number, active: string, cookies: string | null): Promise<ApiResponse | null> {
  if (!cookies) {
    return null
  }
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/v1/admin/products?active=${active}&page=${currentPage}`, {
      method: 'GET',
      headers: {
        'Authorization': cookies,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export async function ShowProduct(id: number, cookies: string | null) {
  if (!cookies) {
    return null
  }
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/v1/admin/products/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': cookies,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
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

