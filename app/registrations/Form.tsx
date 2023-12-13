'use client'
import Link from "@/node_modules/next/link";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from '@/node_modules/next/navigation';
import { avatar, FormErrors } from "@/helpers/interface/interfaces";





const Form: React.FC = () => {
  const [avatar, setAvatar] = useState<avatar>({ avatar: null });
  const [errors, setErrors] = useState<FormErrors>({});
  const [inputType, setInputType] = useState<string>('password');
  const [inputTypePassword, setInputTypePassword] = useState<string>('password');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const fileInput = document.querySelector('input[name="avatar"]') as HTMLInputElement;
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
        body: formDataToSend,
      });
      const data = await response.json()
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

  const handleDeleteAvatar = (): void => {
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

  const handleMouseDown = (): void => {
    setInputType('text');
  };

  const handleMouseUp = (): void => {
    setInputType('password');
  };

  const handleMouseDownPassword = (): void => {
    setInputTypePassword('text');
  };

  const handleMouseUpPassword = (): void => {
    setInputTypePassword('password');
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
      {errors?.name && errors?.name.length > 0 && (
        <div className='text-danger'>
          {errors?.name.map((error, index) => (
            <span key={index}>{error}</span>
          ))}
        </div>
      )}
      <div>
        <input type="text" required className="form-control" name="name" id="UserName" placeholder="Name" />
      </div>
      {errors?.phone && errors?.phone.length > 0 && (
        <div className='text-danger'>
          {errors?.phone.map((error, index) => (
            <span key={index}>{error}</span>
          ))}
        </div>
      )}
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
      {errors?.password_confirmation && errors?.password_confirmation.length > 0 && (
        <div className='text-danger'>
          {errors?.password_confirmation.map((error, index) => (
            <span key={index}>{error}</span>
          ))}
        </div>
      )}
      <div>
        <input type={inputTypePassword} required className="form-control" name="password_confirmation" id="UserPasswordConfirmation" placeholder="Password Confirmation" />
        <i className="bi bi-eye" onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword}></i>
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
