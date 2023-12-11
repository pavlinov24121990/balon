'use client'
import { Carousel } from 'react-bootstrap';

const Caourusel: React.FC = ({ product }) => {
  return (
    <Carousel className="mx-auto mb-3" interval={Math.max(5000, 10000 - product.image_urls?.length * 500)}>
      {product.image_urls?.map((imageUrl, index) => (
        <Carousel.Item className="" key={index}>
          <img
            className="d-block"
            src={`http://localhost:3000${imageUrl}`}
            alt="company foto"
            style={{ maxWidth: '300px', maxHeight: '300px', marginBottom: '10px' }}
          />
        </Carousel.Item>
      ))}
    </Carousel> 
  );
}

export default Caourusel;
