'use client'
import { ProductProps } from '@/helpers/interface/interfaces';
import { Carousel } from 'react-bootstrap';

const CaouruselUser: React.FC<ProductProps> = ({ product }) => {
  return (
    <>
      {product && product.image_urls && product.image_urls.length > 0 && (
        <Carousel className="mx-auto mb-3" interval={Math.max(5000, 10000 - product.image_urls.length * 500)}>
          {product.image_urls.map((imageUrl, index) => (
            <Carousel.Item key={index}>
              <img
                src={`http://localhost:3000${imageUrl}`}
                alt="company foto"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
}

export default CaouruselUser;
