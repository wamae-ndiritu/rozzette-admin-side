import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import Transaction from "../components/transactions/Transactions";

const TransactionList = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Transaction />
      </main>
    </>
  );
};

export default TransactionList;
