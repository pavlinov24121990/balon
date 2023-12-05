'use server'
import Link from "@/node_modules/next/link";

const NavPanel: React.FC = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="">Products</Link>
        </li>
        <li>
          <Link href="/admin/company">Company</Link>
        </li>
        <li>
          <Link href="/">Back to site</Link>
        </li>
      </ul>
    </div>
  );
}

export { NavPanel };