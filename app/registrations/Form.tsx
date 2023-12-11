'use client'
import Link from "@/node_modules/next/link";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from '@/node_modules/next/navigation';

interface avatar {
  avatar: File | null;
}

interface FormErrors {
  [key: string]: string[];
}

const Form: React.FC = () => {
  const [avatar, setAvatar] = useState<avatar>({ avatar: null });
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  console.log(errors)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const fileInput = document.querySelector('input[name="avatar"]') as HTMLInputElement;
      const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyfQ.B8Mj72lfdlp3hLsKSPwXM6sJtYFEWgDlHSmKJXccHpo';
      const formDataToSend = new FormData();
      const avatarFile = fileInput.files ? fileInput.files[0] : null;
      formDataToSend.append('user[email]', e.currentTarget.email.value);
      formDataToSend.append('user[name]', e.currentTarget.name.value);
      formDataToSend.append('user[phone]', e.currentTarget.phone.value);
      formDataToSend.append('user[password]', e.currentTarget.password.value);
      formDataToSend.append('user[password_confirmation]', e.currentTarget.password_confirmation.value);
      formDataToSend.append('user[policy]', e.currentTarget.policy.checked);
      if (avatarFile) {
        formDataToSend.append('user[avatar]', avatarFile);
      }
      
      const response = await fetch(`http://localhost:3000/api/v1/registrations`, {
        method: 'POST',
        headers: {
          'Authorization': token,
        },
        body: formDataToSend,
      });
      const data = await response.json()
      if (response.ok) {
        router.push('/')
      } else {
        setErrors(data)
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDeleteAvatar = () => {
    setAvatar((prevData) => ({
      ...prevData,
      avatar: null,
    }));
    const fileInput: HTMLInputElement | null = document.getElementById('avatar') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setAvatar((prevData) => ({
      ...prevData,
      [name]: files?.[0] || null,
    }));
  };

  return (
    <form className="container mb-3" onSubmit={handleSubmit}>
      {errors ?
        <p className="text-danger">{errors.errors} </p> 
        :
        ""
      }
      <div>
        <input type="email" required className="form-control" name="email" id="UserEmail" placeholder="Email" />
      </div>
      <div>
        <input type="text" required className="form-control" name="name" id="UserName" placeholder="Name" />
      </div>
      <div>
        <input type="text" required className="form-control" name="phone" id="UserPhone" placeholder="Phone" />
      </div>
      <div>
        <input type="file" className="form-control" name="avatar" id="avatar" onChange={handleFileChange} />
      </div>
      {avatar.avatar ?
          <div className="mb-3 d-flex flex-column">
            <img className="mb-3 rounded-circle" src={URL.createObjectURL(avatar.avatar)} alt={'avatar'} style={{ maxWidth: '100px', maxHeight: '100px' }} />
            <button className='btn btn-danger mb-3' style={{ maxWidth: '100px' }} onClick={handleDeleteAvatar}>Delete</button>
          </div>
          : 
          ""
        }
      <div>
        <input type="password" required className="form-control" name="password" id="UserPassword" placeholder="Password" />
      </div>
      <div>
        <input type="password" required className="form-control" name="password_confirmation" id="UserPasswordConfirmation" placeholder="Password Confirmation" />
      </div>
      <div className='d-flex justify-content-around text-start align-items-center'>
        <input type="checkbox" defaultChecked required name="policy" id="Policy" />
        <Link href="" className="text-decoration-none">
          Я согласен с политикой конфиденциальности<br />
          и с обработкой персональных данных
        </Link>
      </div>
      <button type="submit" className="button btn btn-primary w-100 mb-3"> Create user </button>
    </form>
  );
}

export default Form;
