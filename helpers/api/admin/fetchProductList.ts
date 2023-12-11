const fetchProductList = async (currentPage: Number, active: boolean) => {
  try {
    const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyfQ.B8Mj72lfdlp3hLsKSPwXM6sJtYFEWgDlHSmKJXccHpo';
    const response = await fetch(`http://127.0.0.1:3000/api/v1/admin/products?active=${active}&page=${currentPage}`, {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export { fetchProductList }