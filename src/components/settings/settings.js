import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSettings,
  configureStkPush,
} from "../../Redux/Actions/settingsActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const Settings = () => {
  const dispatch = useDispatch();

  const settingsList = useSelector((state) => state.settingsList);
  const { settings } = settingsList;

  const stkPush = useSelector((state) => state.stkPush);
  const { loading, error, success } = stkPush;

  useEffect(() => {
    if (success) {
      toast.success("Mpesa Online Status changed", ToastObjects);
    }
  }, [success]);

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch, success]);

  const configureStkPushHandler = () => {
    dispatch(configureStkPush());
  };

  return (
    <section className="content-main">
      <Toast />
      <div className="content-header">
        <h2 className="content-title">Settings</h2>
      </div>
      {loading ? (
        <Loading />
      ) : (
        error && <Message variant="alert-danger">{error}</Message>
      )}
      <div className="row">
        <div className="col-lg-4">
          <div className="card card-body mb-4 shadow-sm">
            <article className="icontext">
              <div className="text">
                <h6 className="mb-2">Payment Settings</h6>
                <button
                  className={
                    settings?.status
                      ? "btn btn-success col-12"
                      : "btn btn-dark col-12"
                  }
                  onClick={configureStkPushHandler}
                >
                  MPESA ONLINE
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
