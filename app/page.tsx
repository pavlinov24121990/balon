import '../scss/HardReset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderNavigation } from '../components/HeaderNavigation';
import { MyCarousel } from '@/components/MyCarousel';

const Home: React.FC = () => {
  return (
    <main>
      <HeaderNavigation />
      <MyCarousel />
    </main>
  );
}

export default Home;
