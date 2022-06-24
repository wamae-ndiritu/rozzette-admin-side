import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSource } from "../../Redux/Actions/sourceActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const CreateSeller = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const sourceCreate = useSelector((state) => state.sourceCreate);
  const { loading, error, source } = sourceCreate;

  useEffect(() => {
    if (source) {
      toast.success("Source Added", ToastObjects);
      setName("");
    }
  }, [source]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (name) {
      dispatch(createSource(name));
    } else {
      toast.success("Please add a source", ToastObjects);
    }
  };

  return (
    <div className="col-md-12 col-lg-5">
      <Toast />
      {loading ? (
        <Loading />
      ) : (
        error && <Message variant="alert-danger">{error}</Message>
      )}

      <form className="category-form">
        <div className="mb-4">
          <label htmlFor="product_source" className="form-label">
            Name
          </label>
          <input
            value={name}
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_source"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button className="btn btn-primary py-3" onClick={submitHandler}>
            Create Source
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSeller;
