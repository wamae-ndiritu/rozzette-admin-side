import React from "react";
import Header from "../components/Header";
import Sellers from "../components/sellers/sellers";
import Sidebar from "../components/sidebar";

const SellersScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Sellers />
      </main>
    </>
  );
};

export default SellersScreen;
