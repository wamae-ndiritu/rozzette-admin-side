import React, { useEffect } from "react";
import { Link } from "react-router-dom";
//import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import {
  deleteProduct,
  listProducts,
} from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Pagination from "../pagination/pagination";

const MainProducts = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const categoriesList = useSelector((state) => state.categoriesList);
  const { categories } = categoriesList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteProduct(id));
    }
  };

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listCategories());
  }, [dispatch, successDelete]);

  return (
    <section className="content-main">
      <div className="content-header pr-header">
        <h2 className="content-title">Products</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>
      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                {categories?.map((category) => (
                  <option key={category._id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Latest added</option>
                <option>Cheap first</option>
                <option>Most viewed</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              {/*<Product products={products} />*/}
              <div className="product-cont">
                <div className="prod-title">
                  <div className="prod-image-title">Product</div>
                  <div className="prod-name-title">Product Title</div>
                  <div className="prod-price-title">Price</div>
                  <div className="prod-actions-title">Actions</div>
                </div>
                <hr />
                {products.map((product) => (
                  <div
                    className="prod-items-cont alert-success"
                    key={product._id}
                  >
                    <div className="prod-items">
                      <div className="prod-image">
                        <div className="prod-image-cont">
                          <img src={product.image} alt={product.productName} />
                        </div>
                      </div>
                      <div className="prod-name">{product.productName}</div>
                      <div className="prod-price">Ksh {product.price}</div>
                      <div className="prod-actions">
                        <div className="row actions-cont">
                          <Link
                            to={`/product/${product._id}/edit`}
                            className="action-btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                          >
                            <i className="fas fa-pen"></i>
                          </Link>
                          <Link
                            to="#"
                            onClick={() => deletehandler(product._id)}
                            className="action-btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <hr className="product-hr" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/*<nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>*/}
          <Pagination pages="5" page="3" />
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
