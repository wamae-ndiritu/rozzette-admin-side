import React from "react";

const MonthlyStatistics = () => {
  const year = new Date().getFullYear();
  const date = new Date();
  console.log(date);
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">{year} Monthly Sales statistics</h5>
          <iframe
            title="monthly sales statistics"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
            }}
            className="i-frame-1"
            height="480"
            src="https://charts.mongodb.com/charts-ecommerce-store-rctgt/embed/charts?id=62b3f22c-a230-4247-86b5-4ebd5941b575&maxDataAge=1800&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default MonthlyStatistics;
