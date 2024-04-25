import React, { useContext } from 'react';
import './index.css';
import { store } from '../../App.jsx';

const ShowProduct = (props) => {
  const { details, deleteProductByAdmin, field } = props;
  const { productName, price, rating, description, image, _id } = details;

  const { cartitems, setcartitems } = useContext(store);

  const addToCart = () => {
    setcartitems([...cartitems, details]);
  };

  const deletingProduct = () => {
    deleteProductByAdmin(_id);
  };

  let productImage;
  try {
    productImage = (
      <img
        className="productImage"
        src={`https://ecommercebackend-2-tnje.onrender.com/uploads/uploads/${image}`}
        alt={productName}
      />
    );
    
  } catch (error) {
    
    console.error('Error loading image:', error);
    productImage = <div className="productImage">Image not available</div>;
  }

  return (
    <li className="li">
      <div className="productcontainer">
        {productImage}
        <h1>
          <span className="name">Product Name : </span>
          <span className="productName">{productName}</span>
        </h1>
        <p>
          <span className="details">Description : </span>
          <span className="detailproduct">{description}</span>
        </p>
        <p>
          <span className="details">Price : </span>
          <span className="detailproduct">{`${price} RS`}</span>
        </p>
        <p>
          <span className="details">Rating : </span>
          <span className="detailproduct">{rating}</span>
        </p>
        {field === 'admin' ? (
          <button type="button" className="addToCart" onClick={deletingProduct}>
            Delete Product
          </button>
        ) : (
          <button type="button" className="addToCart" onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </li>
  );
};

export default ShowProduct;
