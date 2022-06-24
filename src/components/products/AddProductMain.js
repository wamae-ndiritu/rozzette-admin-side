import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import check from "../../Images/check.png";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const bucket_url = process.env.REACT_APP_BUCKET_URL;

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  const [inputs, setInputs] = useState({});
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [inStock, setInStock] = useState(false);
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [progressShow, setProgressShow] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCategory = (e) => {
    setCategory(e.target.value.split(","));
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setInputs({
        price: "",
        productName: "",
        productCbm: "",
        productShippingTime: "",
        productWeight: "",
      });
      setDescription("");
      setCategory([]);
      setColor([]);
      setSize([]);
      setImages([]);
      setUrls([]);
      setProgress(0);
      setProgressShow(false);
      setInStock(false);
    }
  }, [product, dispatch]);

  const handleImages = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const uploadImages = () => {
    setProgressShow(true);
    const promises = [];
    images.forEach((image) => {
      const fileName = new Date().getTime() + image.name;
      const storage = getStorage(app, bucket_url);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrls((prevState) => [...prevState, downloadURL]);
          });
        }
      );
    });
    Promise.all(promises)
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const product = {
      ...inputs,
      image: urls,
      description,
      color,
      category,
      inStock,
      size,
    };
    dispatch(createProduct(product));
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
            <h2 className="content-title">Add product</h2>
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
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="alert-danger">
                    <div className="margin-left">
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Product title
                        </label>
                        <input
                          name="productName"
                          value={inputs.productName}
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Price
                        </label>
                        <input
                          name="price"
                          value={inputs.price}
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          onChange={handleChange}
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
                          value={category}
                          type="text"
                          placeholder="shoes,men"
                          className="form-control"
                          required
                          onChange={handleCategory}
                          id="product-category"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label" id="product-colors">
                          Colors
                        </label>
                        <input
                          name="productColors"
                          value={color}
                          type="text"
                          placeholder="white,black,red"
                          className="form-control"
                          required
                          onChange={handleColor}
                          id="product-colors"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label" id="product-size">
                          Colors
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
                          value={inputs.productSource}
                          type="text"
                          placeholder="Turkey"
                          className="form-control"
                          onChange={handleChange}
                          required
                          id="product-source"
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
                          value={inputs.productShippingTime}
                          type="text"
                          placeholder="shipping time"
                          className="form-control"
                          onChange={handleChange}
                          id="product-shipping-time"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label" id="product-weight">
                          Product Weight
                        </label>
                        <input
                          name="productWeight"
                          value={inputs.productWeight}
                          type="number"
                          placeholder="type here"
                          className="form-control"
                          onChange={handleChange}
                          id="product-weight"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label" id="product-cbm">
                          Product CBM
                        </label>
                        <input
                          name="productCbm"
                          value={inputs.productCbm}
                          type="number"
                          placeholder="type here"
                          className="form-control"
                          onChange={handleChange}
                          id="product-cbm"
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
                      <div className="mb-4">
                        <label className="form-label">Images</label>
                        <input
                          type="text"
                          id="file"
                          value={urls}
                          className="form-control"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          id="file"
                          required
                          onChange={handleImages}
                        />
                      </div>
                      <div className="mb-4 bot-pr">
                        <button
                          type="submit"
                          className="submit-btn"
                          onClick={uploadImages}
                        >
                          Upload
                        </button>
                        <div>
                          {progressShow && progress < 100 && (
                            <div className="progress_container">
                              <p>{progress}%</p>
                            </div>
                          )}
                          {progress === 100 && (
                            <div className="progress_container">
                              <img
                                src={check}
                                alt="check circle"
                                className="check_img"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
