'use server'
import { HeaderNavigation } from '../components/HeaderNavigation';
import { MyCarousel } from '@/components/MyCarousel';
import { fetchCompany } from './api/route';
import { CompanyAdmin } from '@/helpers/interface/interfaces';
import { metadata } from 'app/layout';



const Home = async () => {

  const company: CompanyAdmin = await fetchCompany()

  return (
    <div>
      <HeaderNavigation />
      <MyCarousel company={ company }/>
    </div>
  );
}


  
export default Home;

 