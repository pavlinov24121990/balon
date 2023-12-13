'use client'
import { Logo } from "./navpanel/Logo";
import { RiSearchLine } from 'react-icons/ri';
import Link from "@/node_modules/next/link";
import Image from "@/node_modules/next/image";
import '../scss/HeaderNavigation.scss';
import Heart from '..//public/navPanel/Heart.svg';
import Cart from '..//public/navPanel/Cart.svg';
import MyUser from '..//public/navPanel/MyUser.svg';
import Admins from '..//public/navPanel/Admin.svg';
import { fetchCookie } from '../helpers/cookies/fetchCookie';
import { fetchUser } from "@/helpers/api/fetchUser";
import { deleteCookie } from '../helpers/cookies/deleteCookie';
import { useEffect, useState } from 'react';
import { Token, User } from "@/helpers/interface/interfaces";

const HeaderNavigation: React.FC = () => {
  
  const [user, setUser] = useState<User | null>({
    id: null,
    avatar_url: "",
    email: "",
    formatted_phone: "",
    name: "",
    role: "",
  });
  const [token, setToken] = useState<Token | null>(null)
  const logout = () => {
    setToken(null)
    deleteCookie()
    setUser(null)
  }

  useEffect(() => {
    if (!token) {
      fetchCookie().then(token => { setToken(token) });
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUser(token).then((data) => { setUser(data) });
    }
  }, [token]);

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
        <li>
          <Logo />
        </li>
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
          <Link href="/sessions"><Image src={MyUser} alt="User Icon" width={30} height={30}/></Link>
        </li>
        <li>
          <Link href="" onClick={logout}><i className="bi bi-box-arrow-right"></i></Link>
        </li>
        {user && user.role === 'admin' && (
          <li>
            <Link href="/admin">
              <Image src={Admins} alt="User Icon" width={30} height={30} />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export { HeaderNavigation };
