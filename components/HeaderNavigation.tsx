'use server'
import { Logo } from "./navpanel/Logo";
import { RiSearchLine } from 'react-icons/ri';
import Link from "@/node_modules/next/link";
import Image from "@/node_modules/next/image";
import '../scss/HeaderNavigation.scss';
import Heart from '..//public/navPanel/Heart.svg';
import Cart from '..//public/navPanel/Cart.svg';
import User from '..//public/navPanel/User.svg';
import Admin from '..//public/navPanel/Admin.svg';

const HeaderNavigation: React.FC = () => {
  return (
    <div className='nav-panel'>
      <ul>
        <li>
          <Link href="">Новинки</Link>
        </li>
        <li>
          <Link href="">Одежда</Link>
        </li>
        <li>
          <Link href="">Аксессуары</Link>
        </li>
        <li>
          <Link href="">SALE</Link>
        </li>
        <li><Logo /></li>
        <li>
          <form>
            <label>
              <input type="text" placeholder="Поиск" />
              <span><RiSearchLine /></span>
            </label>
          </form>
        </li>
        <li>
          <Link href=""><Image src={Heart}  alt="Heart Icon" width={30} height={30} /></Link>
        </li>
        <li>
          <Link href=""><Image src={Cart} alt="Cart Icon" width={30} height={30}/></Link>
        </li>
        <li>
          <Link href="/registrations"><Image src={User} alt="User Icon" width={30} height={30}/></Link>
        </li>
        <li>
          <Link href="/admin"><Image src={Admin} alt="User Icon" width={30} height={30}/></Link>
        </li>
      </ul>
  </div>
  );
}

export { HeaderNavigation };
