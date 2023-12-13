'use client'
import 'scss/HardReset.css';
import { FormEvent, useState, ChangeEvent } from 'react';
import { useRouter } from '@/node_modules/next/navigation';
import { ProductPropsAndCockies } from '@/helpers/interface/interfaces';

const Form: React.FC<ProductPropsAndCockies> = ({ product, cookies }) => {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<File[] | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cookies) {
      return null
    }
    try {
      const formDataToSend = new FormData();
      const files = (e.currentTarget.querySelector('input[name="images"]') as HTMLInputElement).files;
      const titleInput = e.currentTarget.querySelector('input[name="title"]') as HTMLInputElement | null;
      const descriptionInput = e.currentTarget.querySelector('input[name="description"]') as HTMLInputElement | null;
      const priceInput = e.currentTarget.querySelector('input[name="price"]') as HTMLInputElement | null;

      const titleValue = titleInput ? titleInput.value : '';
      const descriptionValue = descriptionInput ? descriptionInput.value : '';
      const priceValue = priceInput ? priceInput.value : '';

      formDataToSend.append('product[title]', titleValue);
      formDataToSend.append('product[description]', descriptionValue);
      formDataToSend.append('product[price]', priceValue);

      if (files) {
        for (let i = 0; i < files.length; i++) {
          formDataToSend.append('product[images][]', files[i]);
        }
      }
      formDataToSend.append('product[active]', e.currentTarget.active.checked.toString());
      
      const response = await fetch(`http://localhost:3000/api/v1/admin/products/${product ? product.id : ""}`, {
        method: product ? 'PATCH' : 'POST',
        headers: {
          'Authorization': cookies,
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files: FileList | null = e.target.files;
    if (files) {
      const filesArray: File[] = Array.from(files);
      setSelectedImages(filesArray);
    } else {
      setSelectedImages(null);
    }
  };

  const handleDeleteImage = (index: number) => {
    if (selectedImages) {
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
        <input type="file" className="form-control" name="images" id="ProductImages" multiple placeholder="Product Images" onChange={handleImageChange} />
      </div>
      <div className="d-flex">
        {selectedImages && selectedImages.length > 0 ? (
          Array.from(selectedImages).map((image, index) => (
            <div key={index} className="mb-3 me-3 d-flex flex-column">
              <img className='mb-3' src={URL.createObjectURL(image)} alt={`Image ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
              <button className='btn btn-danger' onClick={() => handleDeleteImage(index)}>Delete</button>
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
        <input type="checkbox" defaultChecked={product ? Boolean(product.active) : true} className="" name="active" id="ProductActive" placeholder="Product active" />
      </div>
      <button type="submit" className="btn btn-primary w-100 mb-3">{product ? "Update product" : "Create product"} </button>
    </form>
  );
}

export default Form;
