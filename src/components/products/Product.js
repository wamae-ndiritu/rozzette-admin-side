import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../Redux/Actions/ProductActions";

const Product = (props) => {
  const { products } = props;

  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Product Title</th>
          <th scope="col">Price</th>
          <th>Status</th>
          <th scope="col" className="text-end">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <tr key={product._id} className="tr-container">
            <td classNmae="td-1">
              <Link to="#" className="img-cont">
                <img src={product.image} alt="Product" className="img" />
              </Link>
            </td>
            <td classNmae="td-2">
              <div className="title text-truncate name-1">
                {product.productName}
              </div>
            </td>
            <td classNmae="td-3">
              <div className="price mb-2">${product.price}</div>
            </td>
            <td classNmae="td-4">
              {product.countInStock > 0 ? (
                <span className="badge btn-success">In Stock</span>
              ) : (
                <span className="badge btn-dark">Out of Stock</span>
              )}
            </td>
            <td className="d-flex justify-content-end align-item-center">
              <div className="row actions-cont">
                <Link
                  to={`/product/${product._id}/edit`}
                  className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                >
                  <i className="fas fa-pen"></i>
                </Link>
                <Link
                  to="#"
                  onClick={() => deletehandler(product._id)}
                  className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                >
                  <i className="fas fa-trash-alt"></i>
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Product;
