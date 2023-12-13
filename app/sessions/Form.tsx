'use client'
import React, { useState, FormEvent } from 'react';
import { useRouter } from '@/node_modules/next/navigation';
import { setCookieToken } from 'helpers/cookies/setCookie';
import { FormErrors } from "@/helpers/interface/interfaces";



const Form: React.FC = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [inputType, setInputType] = useState<string>('password');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('user[email]', e.currentTarget.email.value);
      formDataToSend.append('user[password]', e.currentTarget.password.value);
      
      const response = await fetch(`http://localhost:3000/api/v1/sessions`, {
        method: 'POST',
        body: formDataToSend,
      });
      const data = await response.json()
      setCookieToken(data.token)
      setErrors(data.errors)
      if (response.ok) {
        router.push('/')
      } else {
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleMouseDown = (): void => {
    setInputType('text');
  };

  const handleMouseUp = (): void => {
    setInputType('password');
  };

  return (
    <form className="container mb-3" onSubmit={handleSubmit}>
      {errors?.email && errors?.email.length > 0 && (
        <div className='text-danger'>
          {errors?.email.map((error, index) => (
            <span key={index}>{error}</span>
          ))}
        </div>
      )}
      <div>
        <input type="email" required className="form-control" name="email" id="UserEmail" placeholder="Email" />
      </div>
      {errors?.password && errors?.password.length > 0 && (
        <div className='text-danger'>
          {errors?.password.map((error, index) => (
            <span key={index}>{error}</span>
          ))}
        </div>
      )}
      <div>
        <input type={inputType} required className="form-control" name="password" id="UserPassword" placeholder="Password" />
        <i className="bi bi-eye" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}></i>
      </div>
      <button type="submit" className="button btn btn-primary w-100 mb-3"> Log in </button>
    </form>
  );
}

export default Form;
