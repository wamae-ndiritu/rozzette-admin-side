import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCategory } from "../../Redux/Actions/CategoryActions";

const CategoriesTable = (props) => {
  const { categories } = props;

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("You are about to delete a category?")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="col-md-12 col-lg-5">
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Category</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {categories?.map((category) => (
            <tr key={category._id}>
              <td>
                <div className="cat-image-cont">
                  <img
                    src={category.categoryImage}
                    alt={category.categoryName}
                  />
                </div>
              </td>
              <td>{category.categoryName}</td>
              <td className="text-end">
                <div className="dropdown">
                  <Link
                    to="#"
                    data-bs-toggle="dropdown"
                    className="btn btn-light"
                  >
                    <i className="fas fa-ellipsis-h"></i>
                  </Link>
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="#">
                      Edit info
                    </Link>
                    <Link
                      className="dropdown-item text-danger"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
