'use server'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderNavigation } from 'components/HeaderNavigation';
import Form from './Form';
import 'scss/sessions.scss';
import Link from "@/node_modules/next/link";

const sessions = async () => {
  return (
    <main className='sessions'>
      <HeaderNavigation />
      <div className="text-center sessions-form">
        <h2>Log in</h2>
        <Form />
        <Link className="text-decoration-none" href='/registrations'>User register</Link>
      </div>
    </main>
  );
}

export default sessions;
