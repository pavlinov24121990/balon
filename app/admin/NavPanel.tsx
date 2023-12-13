'use server'
import Link from "@/node_modules/next/link";

const NavPanel = () => {
  return (
    <div className="admin_panel mb-3">
      <ul>
        <li>
          <Link href="/admin/products">Products</Link>
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
