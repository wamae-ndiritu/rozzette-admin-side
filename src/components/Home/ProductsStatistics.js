import React from "react";

const ProductsStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Products statistics</h5>
          <iframe
            title="product statistics"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
            }}
            className="i-frame-2"
            height="480"
            src="https://charts.mongodb.com/charts-ecommerce-store-rctgt/embed/charts?id=62b3e8b6-7fbe-4744-8fae-f88e652bede9&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
