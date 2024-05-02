import React, { useContext ,useEffect,useState} from 'react';
import './index.css';
import { store } from '../../App.jsx';

const ShowProduct = (props) => {
  const { details, deleteProductByAdmin, field } = props;
  const { productName, price, rating, description, image, _id } = details;

  const { cartitems, setcartitems } = useContext(store);
  const [imagefile,setimagefile] = useState(null);

  useEffect(() => {
    async function getImage() {
      try {
        //const response = await fetch(`https://ecommercebackend-2-tnje.onrender.com/uploads/uploads/${image}`);
        const response = await fetch(`http://localhost:5001/uploads/uploads/${image}`)
        const data = await response.blob(); // Get image data as a blob
        //console.log(response);
        //console.log(data);
        if (response.ok) {
          console.log(URL.createObjectURL(data))
          setimagefile(URL.createObjectURL(data)); // Create a URL for the blob and set it as image source
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }
    getImage(); // Call the getImage function
  }, []);
  

  const addToCart = () => {
    setcartitems([...cartitems, details]);
  };

  const deletingProduct = () => {
    deleteProductByAdmin(_id);
  };

  //{`https://ecommercebackend-2-tnje.onrender.com/uploads/uploads/${image}`}

  let productImage;
  try {
    productImage = (
      <img
        className="productImage"
        src={imagefile}
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
