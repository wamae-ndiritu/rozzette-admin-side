import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-toastify";
import app from "../../firebase";
import {
  categoryCreate,
  listCategories,
} from "../../Redux/Actions/CategoryActions";
import { CATEGORY_CREATE_RESET } from "../../Redux/Constants/CategoryConstants";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const CreateCategory = () => {
  const bucket_url = process.env.REACT_APP_BUCKET_URL;

  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const createCategory = useSelector((state) => state.createCategory);
  const { loading, category } = createCategory;

  const dispatch = useDispatch();

  useEffect(() => {
    if (category) {
      toast.success("Category Added", ToastObjects);
      dispatch({ type: CATEGORY_CREATE_RESET });
    }
  }, [category, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + categoryImage.name;
    const storage = getStorage(app, bucket_url);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, categoryImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const category = {
            categoryImage: downloadURL,
            categoryName,
          };
          dispatch(categoryCreate(category));
          dispatch(listCategories());
        });
      }
    );
  };

  return (
    <div className="col-md-12 col-lg-5">
      {loading && <Loading />}
      <form className="category-form">
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Images</label>
          <input
            className="form-control"
            type="file"
            onChange={(e) => setCategoryImage(e.target.files[0])}
          />
        </div>

        <div className="d-grid">
          <button className="btn btn-primary py-3" onClick={handleSubmit}>
            Create category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
