import React from "react";

const Settings = () => {
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Settings</h2>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="card card-body mb-4 shadow-sm">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle alert-primary">
                <i className="text-primary fas fa-usd-circle"></i>
              </span>
              <div className="text">
                <h6 className="mb-5">Payment Settings</h6>
                <button className="btn btn-dark col-12">
                  MARK AS DELIVERED
                </button>
              </div>
            </article>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card card-body mb-4 shadow-sm">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle alert-success">
                <i className="text-success fas fa-bags-shopping"></i>
              </span>
              <div className="text">
                <h6 className="mb-1">Total Orders</h6>
                <span>0</span>
              </div>
            </article>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card card-body mb-4 shadow-sm">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle alert-warning">
                <i className="text-warning fas fa-shopping-basket"></i>
              </span>
              <div className="text">
                <h6 className="mb-1">Total Products</h6>
                <span>0</span>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <article className="icontext">
            <div className="text">
              <h6 className="mb-1">Payment Settings</h6>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Settings;
