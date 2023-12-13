'use client'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from '@/node_modules/next/navigation';
import { fetchCompany } from "helpers/api/fetchCompany";
import { CompanyAdmin } from '@/helpers/interface/interfaces';

const defaultCompany: CompanyAdmin = { title: "", description: "", name: "", phone: "", image_urls: [""], address: "", email: "", logo: null, formatted_phone: '', logo_url: '', id: null, images: [] }

const Form: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<CompanyAdmin>(defaultCompany);

  useEffect(() => {
    fetchCompany().then((data: CompanyAdmin) => {
      setFormData(data);
    });
  }, []);

 
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: Array.from(files),
      }));
    } else {
      console.error('No files selected.');
    }
  };

  const handleDeleteImage = (index: number, e: React.MouseEvent<HTMLButtonElement>): void => {
    setFormData((prevData) => {
      const newImages = [...prevData.images];
      newImages.splice(index, 1);
      return {
        ...prevData,
        images: newImages,
      };
    });

    const fileInput: HTMLInputElement | null = document.getElementById('CompanyImages') as HTMLInputElement;
    if (fileInput) {
      const newFiles = Array.from(fileInput.files || []).filter((_, i) => i !== index);
      const newFileList = new DataTransfer();
      newFiles.forEach((file) => newFileList.items.add(file));
      fileInput.files = newFileList.files;
      e.preventDefault();
    }
  };

  const handleDeleteLogo = (): void => {
    setFormData((prevData) => ({
      ...prevData,
      logo: null,
    }));

    const fileInput: HTMLInputElement | null = document.getElementById('CompanyLogo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files?.[0] || null,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyfQ.B8Mj72lfdlp3hLsKSPwXM6sJtYFEWgDlHSmKJXccHpo';
      const formDataToSend = new FormData();

      formDataToSend.append('company[title]', formData.title);
      formDataToSend.append('company[name]', formData.name);
      formDataToSend.append('company[description]', formData.description);
      formDataToSend.append('company[phone]', formData.phone);
      formDataToSend.append('company[address]', formData.address);
      formDataToSend.append('company[email]', formData.email);
      formDataToSend.append('company[logo]', formData.logo || '');
      formData.images.forEach((image) => {
        formDataToSend.append('company[images][]', image);
      });

      const response = await fetch(`http://localhost:3000/api/v1/admin/companies/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': token,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="CompanyTitle" className="form-label">Company title</label>
        <input type="text" required className="form-control" name="title" id="CompanyTitle" placeholder="Company title" value={formData.title} onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="CompanyName" className="form-label">Company Name</label>
        <input type="text" required className="form-control" name="name" id="CompanyName" placeholder="Company name" value={formData.name} onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="CompanyDescription" className="form-label">Company Description</label>
        <input type="text" required className="form-control" name="description" id="CompanyDescription" placeholder="Company Description" value={formData.description} onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="CompanyPhone" className="form-label">Company Phone</label>
        <input type="text" required className="form-control" name="phone" id="CompanyPhone" placeholder="(xx)xxxxxxx" value={formData.phone} onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="CompanyImages" className="form-label">Company Images</label>
        <input type="file" required className="form-control" name="images" id="CompanyImages" multiple placeholder="Company Images" onChange={handleFilesChange}/>
      </div>
      <div className='d-flex'>
        {formData.images && formData.images.length > 0 ?
          formData.images.map((image, index) => (
            <div key={index} className="mb-3 me-3 d-flex flex-column" id={index}>
              <img className='mb-3' src={URL.createObjectURL(image)} alt={`Image ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
              <button className='btn btn-danger' onClick={(e) => handleDeleteImage(index, e)}>Delete</button>
            </div>
          ))
          :
          formData.image_urls.map((image, index) => (
            <div key={index} className="mb-3 me-3" id={index}>
              <img src={`http://localhost:3000${image}`} alt={`Image ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </div>
          ))
        }
      </div>
      <div className="mb-3">
        <label htmlFor="CompanyAddress" className="form-label">Company Address</label>
        <input type="text" required className="form-control" name="address" id="CompanyAddress" placeholder="Company Address" value={formData.address} onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="CompanyEmail" className="form-label">Company Email</label>
        <input type="email" required className="form-control" name="email" id="CompanyEmail" placeholder="Company Email" value={formData.email} onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="CompanyLogo" className="form-label">Company Logo</label>
        <input type="file" required className="form-control" name="logo" id="CompanyLogo" placeholder="Company Logo" onChange={handleFileChange} />
      </div>
        {formData.logo ?
          <div className="mb-3 d-flex flex-column">
            <img className="mb-3" src={URL.createObjectURL(formData.logo)} alt={'logo'} style={{ maxWidth: '100px', maxHeight: '100px' }} />
            <button className='btn btn-danger' style={{ maxWidth: '100px' }} onClick={handleDeleteLogo}>Delete</button>
          </div>
          : 
          <div className="mb-3">
            <img src={`http://localhost:3000${formData.logo_url}`} alt={'logo'} style={{ maxWidth: '100px', maxHeight: '100px' }} />
          </div>
        }
      <button type="submit" className="btn btn-primary w-100 mb-3">Update company</button>
    </form>
  );
};

export default Form;
