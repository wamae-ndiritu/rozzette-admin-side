import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSource } from "../../Redux/Actions/sourceActions";

const SellersTable = (props) => {
  const { sources } = props;

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("You are about to delete a category?")) {
      dispatch(deleteSource(id));
    }
  };

  return (
    <div className="col-md-12 col-lg-5">
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Source</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {sources?.map((source) => (
            <tr key={source._id}>
              <td>
                <div className="cat-image-cont">
                  <img src={source.categoryImage} alt={source.name} />
                </div>
              </td>
              <td>{source.name}</td>
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
                    <Link
                      className="dropdown-item text-danger"
                      onClick={() => handleDelete(source._id)}
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

export default SellersTable;
