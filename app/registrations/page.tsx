'use server'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderNavigation } from 'components/HeaderNavigation';
import Form from './Form';
import 'scss/registrations.scss';

const registrations = async () => {
  return (
    <main className='registrations'>
      <HeaderNavigation />
      <div className="text-center registrations-form">
        <h2>Registration</h2>
        <Form />
      </div>
    </main>
  );
}

export default registrations;
