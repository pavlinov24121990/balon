'use client'
import Price from '@/helpers/FormattingPrice';
import { ApiResponse, Product } from '@/helpers/interface/interfaces';
import Link from '@/node_modules/next/link';
import { useEffect, useState } from 'react';
import { fetchProducts } from './api/route';
import CaouruselUser from './CaouruselUser';
import 'scss/user/ProductListUser.scss'

const ProductListUser = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [products, setProducts] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProducts(currentPage);
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageClick = (page: number): void => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (!products) {
      return null
    }
    const pages = Array.from({ length: products.pages_count }, (_, index) => index + 1);

    return (
      <div className="pagination">
        {pages.map((page: number) => (
          <button
            key={page}
            className={`btn me-3 mb-3 ${currentPage === page ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handlePageClick(page)}>
            {page}
          </button>
        ))}
      </div>
    );
  };
  
  return (
    <div className="product-list-user">
      <div className='col-9 d-flex flex-column justify-content-center align-items-center text-center w-100 product-list'>
        <div className='row align-items-center justify-content-center w-100'>
          {products?.products.map((product) => (
            <div key={product.id} className='col-6 mb-5 d-flex justify-content-center flex-column'>
              <CaouruselUser product={product} />
              <p className="title mb-5" key={`title-${product.id}`}>{product.title}</p>
              <Price key={product.id} price={product.price} />
              <div className="link-show">
                <Link href={`/products/${product.id}`} className="" >
                  Show Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      {products && products.pages_count > 1 && renderPagination()}
    </div>
    </div>
  );
}

export default ProductListUser;
