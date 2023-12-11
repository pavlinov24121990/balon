'use client'
import { fetchProductList } from 'helpers/api/admin/fetchProductList';
import { useEffect, useState } from "react";
import Price from 'helpers/FormattingPrice';
import Link from "@/node_modules/next/link";
import Caourusel from 'app/admin/products/[id]/caourusel'

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image_urls: string[];
  active: boolean;
}

interface ApiResponse {
  products: Product[];
  pages_count: number;
}

const ProductList: React.FC = () => {
  const defaultProduct: ApiResponse = { products: [], pages_count: 0 };
  const [products, setProducts] = useState<ApiResponse>(defaultProduct);
  const [currentPage, setCurrentPage] = useState<Number>(1);
  const [active, setActive] = useState<boolean>(true);
  
  useEffect(() => {
    fetchProductList(currentPage, active).then((data: ApiResponse) => {
      setProducts(data)
    })
  }, [currentPage, active])
  
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = Array.from({ length: products.pages_count }, (_, index) => index + 1);

    return (
      <div className="pagination">
        {pages.map((page) => (
          <button
            key={page}
            className={`btn me-3 mb-3 ${currentPage === page ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActive(e.target.value);
    setCurrentPage(1)
  };
  
  return (
  <div>
    <div className="mb-3 justify-content-end align-items-center d-flex pe-4">
      <div className="flex-column d-flex me-3">
        <select className="form-select" id="selectInput" value={active} onChange={handleSelectChange}>
          <option value={true}>Product active true</option>
          <option value={false}>Product active false</option>
        </select>
      </div>
      <Link className='btn btn-primary' href="/admin/products/new">Create product</Link>
    </div>
    <div className='col-9 d-flex flex-column justify-content-center align-items-center text-center w-100 product-list'>
      <div className='row align-items-center justify-content-center w-100'>
        {products.products.map((product) => (
          <div key={product.id} className='col-4 mb-3 d-flex justify-content-center flex-column'>
            <Caourusel product={product} />
            <p className="title mb-3" key={`title-${product.id}`}>{product.title}</p>
            <Price key={product.id} price={product.price} />
            <div>
              <Link href={`/admin/products/${product.id}`} className="btn btn-primary mb-5" >
                Show Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
      {products.pages_count > 1 && renderPagination()}
    </div>
  </div>
);
}

export default ProductList;
