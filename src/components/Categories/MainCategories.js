import React, { useEffect } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { listCategories } from "../../Redux/Actions/CategoryActions";

const MainCategories = () => {
  const dispatch = useDispatch();

  const categoriesList = useSelector((state) => state.categoriesList);
  const { loading, error, categories } = categoriesList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { success: successDelete } = categoryDelete;

  const createCategory = useSelector((state) => state.createCategory);
  const { category } = createCategory;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch, successDelete, category]);

  return (
    <section className="content-main">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          <div className="content-header">
            <h2 className="content-title">Categories</h2>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="main-category-row">
                <CreateCategory />
                <CategoriesTable categories={categories} />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MainCategories;
