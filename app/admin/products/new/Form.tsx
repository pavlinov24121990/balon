'use client'
import 'scss/HardReset.css';
import { FormEvent, useState, ChangeEvent } from 'react';
import { useRouter } from '@/node_modules/next/navigation';

const Form: React.FC = ({product}) => {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyfQ.B8Mj72lfdlp3hLsKSPwXM6sJtYFEWgDlHSmKJXccHpo';
      const formDataToSend = new FormData();
      const files = (e.currentTarget.querySelector('input[name="images"]') as HTMLInputElement).files;
      formDataToSend.append('product[title]', e.currentTarget.title.value);
      formDataToSend.append('product[description]', e.currentTarget.description.value);
      formDataToSend.append('product[price]', e.currentTarget.price.value);
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formDataToSend.append('product[images][]', files[i]);
        }
      }
      formDataToSend.append('product[active]', e.currentTarget.active.checked.toString());
      
      const response = await fetch(`http://localhost:3000/api/v1/admin/products/${product ? product.id : ""}`, {
        method: product ? 'PATCH' : 'POST',
        headers: {
          'Authorization': token,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedImages(files);
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = Array.from(selectedImages);
    if (selectedImages) {
      updatedImages.splice(index, 1);
      setSelectedImages(updatedImages);
    }
    const inputElement = document.getElementById('ProductImages') as HTMLInputElement;
      if (inputElement) {
        const newFileList = new DataTransfer();
        for (const file of updatedImages) {
          newFileList.items.add(file);
        }
        inputElement.files = newFileList.files;
      }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="ProductTitle" className="form-label">Product title</label>
        <input type="text" required defaultValue={product?.title} className="form-control" name="title" id="ProductTitle" placeholder="Product title" />
      </div>
      <div className="mb-3">
        <label htmlFor="ProductDescription" className="form-label">Product description</label>
        <input type="text" required className="form-control" defaultValue={product?.description} name="description" id="ProductDescription" placeholder="Product description" />
      </div>
      <div className="mb-3">
        <label htmlFor="ProductPrice" className="form-label">Product price</label>
        <input type="text" required className="form-control" defaultValue={product?.price} name="price" id="ProductPrice" placeholder="Product price" />
      </div>
      <div className="mb-3">
        <label htmlFor="ProductImages" className="form-label">Product Images</label>
        <input type="file" required className="form-control" name="images" id="ProductImages" multiple placeholder="Product Images" onChange={handleImageChange} />
      </div>
      <div className="d-flex">
        {selectedImages && selectedImages.length > 0 ? (
          Array.from(selectedImages).map((image, index) => (
            <div key={index} className="mb-3 me-3 d-flex flex-column" id={index}>
              <img className='mb-3' src={URL.createObjectURL(image)} alt={`Image ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
              <button className='btn btn-danger' onClick={(e) => handleDeleteImage(index, e)}>Delete</button>
            </div>
          ))
        ) : (
          product?.image_urls.map((imageUrl, index) => (
            <div key={index} className="mb-3 me-3">
              <img src={`http://localhost:3000${imageUrl}`} alt={'logo'} style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </div>
          ))
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="ProductActive" className="form-label me-3">Product active</label>
        <input type="checkbox" defaultChecked={product ? product.active : true} className="" name="active" id="ProductActive" placeholder="Product active" />
      </div>
      <button type="submit" className="btn btn-primary w-100 mb-3">{product ? "Update product" : "Create product"} </button>
    </form>
  );
}

export default Form;
