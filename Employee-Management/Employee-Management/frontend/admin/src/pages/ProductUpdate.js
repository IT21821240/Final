import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductUpdate.css";

function ProductUpdate() {
  const { id } = useParams();

  const [values, setValues] = useState({
    productName: "",
    productDescription: "",
    productQuantity: "",
    productType: "",
    productPrice: "",
    productImage: "",
  });

  const [errors, setErrors] = useState({
    productName: "",
    productDescription: "",
    productQuantity: "",
    productType: "",
    productPrice: "",
    productImage: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8070/api/products/${id}`)
      .then((response) => {
        setValues({
          productName: response.data.product.productName,
          productDescription: response.data.product.productDescription,
          productQuantity: response.data.product.productQuantity,
          productType: response.data.product.productType,
          productPrice: response.data.product.productPrice,
          productImage: response.data.product.productImage,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!values.productName) {
      newErrors.productName = "Product Name is required.";
      isValid = false;
    } else {
      newErrors.productName = "";
    }

    if (!values.productDescription) {
      newErrors.productDescription = "Product Description is required.";
      isValid = false;
    } else {
      newErrors.productDescription = "";
    }

    if (
      !values.productQuantity ||
      isNaN(values.productQuantity) ||
      values.productQuantity < 0
    ) {
      newErrors.productQuantity =
        "Product Quantity must be a non-negative number.";
      isValid = false;
    } else {
      newErrors.productQuantity = "";
    }

    if (!values.productType) {
      newErrors.productType = "Product Type is required.";
      isValid = false;
    } else {
      newErrors.productType = "";
    }

    if (
      !values.productPrice ||
      isNaN(values.productPrice) ||
      values.productPrice <= 0
    ) {
      newErrors.productPrice = "Product Price must be a positive number.";
      isValid = false;
    } else {
      newErrors.productPrice = "";
    }

    if (!values.productImage) {
      newErrors.productImage = "Product Image is required.";
      isValid = false;
    } else {
      newErrors.productImage = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .put(`http://localhost:3001/api/products/${id}`, values)
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <div className="update-container">
        <h1>Update Product Details</h1>
        <div className="product-update-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={values.productName}
              onChange={(e) =>
                setValues({ ...values, productName: e.target.value })
              }
            />
            <div className="error">{errors.productName}</div>

            <label htmlFor="productDescription">Product Description:</label>
            <input
              type="text"
              id="productDescription"
              name="productDescription"
              value={values.productDescription}
              onChange={(e) =>
                setValues({ ...values, productDescription: e.target.value })
              }
            />
            <div className="error">{errors.productDescription}</div>

            <label htmlFor="productQuantity">Product Quantity:</label>
            <input
              type="number"
              id="productQuantity"
              name="productQuantity"
              value={values.productQuantity}
              onChange={(e) =>
                setValues({ ...values, productQuantity: e.target.value })
              }
            />
            <div className="error">{errors.productQuantity}</div>

            <label htmlFor="productType">Product Type:</label>
            <input
              type="text"
              id="productType"
              name="productType"
              value={values.productType}
              onChange={(e) =>
                setValues({ ...values, productType: e.target.value })
              }
            />
            <div className="error">{errors.productType}</div>

            <label htmlFor="productPrice">Product Price:</label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              value={values.productPrice}
              onChange={(e) =>
                setValues({ ...values, productPrice: e.target.value })
              }
            />
            <div className="error">{errors.productPrice}</div>

            <label htmlFor="productImage">Product Image:</label>
            <input
              type="text"
              id="productImage"
              name="productImage"
              value={values.productImage}
              onChange={(e) =>
                setValues({ ...values, productImage: e.target.value })
              }
            />
            <div className="error">{errors.productImage}</div>

            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductUpdate;
