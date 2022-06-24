import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTransactions } from "../../Redux/Actions/TransactionActions.js";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const Transaction = () => {
  const dispatch = useDispatch();

  const transactionList = useSelector((state) => state.transactionList);
  const { loading, error, transactions } = transactionList;

  useEffect(() => {
    dispatch(listTransactions());
  }, [dispatch]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Transactions</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Receipt No.</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>
                      <b>{transaction.mpesaReceiptNumber}</b>
                    </td>
                    <td>Ksh {transaction.amountPaid}</td>
                    <td>0{transaction.phoneNo}</td>
                    <td>{transaction.transactionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default Transaction;
