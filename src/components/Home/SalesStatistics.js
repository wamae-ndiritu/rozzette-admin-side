import React from "react";

const SaleStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Sales statistics</h5>
          <iframe
            title="sales statistics"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
            }}
            className="i-frame-1"
            height="480"
            src="https://charts.mongodb.com/charts-ecommerce-store-rctgt/embed/charts?id=62b3e4e2-5876-4a37-8500-9d8f2cb88eab&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
