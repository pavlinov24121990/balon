'use client'
import { Carousel } from 'react-bootstrap';
import '../scss/MyCarousel.scss'
import Link from "@/node_modules/next/link";
import { MyCarouselProps } from '@/helpers/interface/interfaces';

const MyCarousel: React.FC<MyCarouselProps> = ({ company }) => {

  return (
    <Carousel>
      {company.image_urls.map((imageUrl, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 fullscreen-image"
            src={`http://localhost:3000${imageUrl}`}
            alt="company foto"
          />
          <Carousel.Caption>
            <p>Весна — лето 2024</p>
            <h3>with love, <br /> to you </h3>
            <Link href="">Перейти в каталог</Link>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel> 
  );
}

export { MyCarousel };
