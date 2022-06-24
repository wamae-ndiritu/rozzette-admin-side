import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  updateProduct,
} from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState("");
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState([]);
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(false);
  const [shippingTime, setShippingTime] = useState("");
  const [productWeight, setProductWeight] = useState(0);
  const [productCbm, setProductCbm] = useState(0);

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const handleColors = (e) => {
    setColors(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const handleCategories = (e) => {
    setCategories(e.target.value.split(","));
  };

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Product Updated", ToastObjects);
    } else {
      if (!product.productName || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setProductName(product.productName);
        setDescription(product.description);
        setImages(product.image);
        setPrice(product.price);
        setCategories(product.productCategory);
        setColors(product.productColors);
        setSize(product.productSize);
        setSource(product.productSource);
        setShippingTime(product.productShippingTime);
        setProductWeight(product.productWeight);
        setProductCbm(product.productCbm);
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        productName,
        image: images,
        price,
        description,
        productCategory: categories,
        productColors: colors,
        productSource: source,
        productSize: size,
        inStock,
        productShippinTime: shippingTime,
        productWeight,
        productCbm,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <div className="alert-danger">
                      <div className="margin-left">
                        <div className="mb-4">
                          <label htmlFor="product_title" className="form-label">
                            Product title
                          </label>
                          <input
                            name="productName"
                            value={productName}
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_title"
                            required
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="product_price" className="form-label">
                            Price
                          </label>
                          <input
                            name="price"
                            value={price}
                            type="number"
                            placeholder="Type here"
                            className="form-control"
                            id="product_price"
                            required
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="product_price" className="form-label">
                            Status
                          </label>
                          <select
                            name="inStock"
                            value={inStock}
                            onChange={(e) => setInStock(e.target.value)}
                            id="product_price"
                            className="form-control"
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="form-label" id="product-category">
                            Categories
                          </label>
                          <input
                            name="productCategory"
                            value={categories}
                            type="text"
                            placeholder="shoes, men"
                            className="form-control"
                            required
                            id="product-category"
                            onChange={handleCategories}
                          />
                        </div>
                        <div className="mb-4">
                          <label className="form-label" id="product-colors">
                            Colors
                          </label>
                          <input
                            name="productColors"
                            value={colors}
                            type="text"
                            placeholder="white, black, red"
                            className="form-control"
                            required
                            id="product-colors"
                            onChange={handleColors}
                          />
                        </div>
                        <div className="mb-4">
                          <label className="form-label" id="product-size">
                            Sizes
                          </label>
                          <input
                            name="productSize"
                            value={size}
                            type="text"
                            placeholder="31,28,XL,L,M"
                            className="form-control"
                            onChange={handleSize}
                            id="product-size"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="form-label" id="product-source">
                            Product Source
                          </label>
                          <input
                            name="productSource"
                            value={source}
                            type="text"
                            placeholder="Turkey"
                            className="form-control"
                            required
                            id="product-source"
                            onChange={(e) => setSource(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="form-label"
                            id="product-shipping-time"
                          >
                            Shipping Time
                          </label>
                          <input
                            name="productShippingTime"
                            value={shippingTime}
                            type="text"
                            placeholder="shipping time"
                            className="form-control"
                            required
                            id="product-shipping-time"
                            onChange={(e) => setShippingTime(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label className="form-label" id="product-weight">
                            Product Weight
                          </label>
                          <input
                            name="productWeight"
                            value={productWeight}
                            type="number"
                            placeholder="type here"
                            className="form-control"
                            required
                            id="product-weight"
                            onChange={(e) => setProductWeight(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label className="form-label" id="product-cbm">
                            Product CBM
                          </label>
                          <input
                            name="productCbm"
                            value={productCbm}
                            type="number"
                            placeholder="type here"
                            className="form-control"
                            required
                            id="product-cbm"
                            onChange={(e) => setProductCbm(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label className="form-label">Description</label>
                          <textarea
                            name="description"
                            value={description}
                            placeholder="Type here"
                            className="form-control"
                            rows="7"
                            required
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="mb-4 edit-image">
                          {images?.map((image) => (
                            <img src={image} alt="" />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
