import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listSources } from "../../Redux/Actions/sourceActions";
import CreateSeller from "./createSeller";
import SellersTable from "./sellersTable";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const Sellers = () => {
  const dispatch = useDispatch();
  const sourcesList = useSelector((state) => state.sourcesList);
  const { loading, error, sources } = sourcesList;

  const sourceCreate = useSelector((state) => state.sourceCreate);
  const { source: sourceCreated } = sourceCreate;

  const sourceDelete = useSelector((state) => state.sourceDelete);
  const { success } = sourceDelete;

  useEffect(() => {
    dispatch(listSources());
  }, [dispatch, sourceCreated, success]);

  return (
    <section className="content-main">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          <div className="content-header">
            <h2 className="content-title">Sellers</h2>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="main-category-row">
                <CreateSeller />
                <SellersTable sources={sources} />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Sellers;
