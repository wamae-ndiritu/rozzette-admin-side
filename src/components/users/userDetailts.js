import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listUserOrders } from "../../Redux/Actions/OrderActions";
import { getUserDetails } from "../../Redux/Actions/userActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const UserDetails = (props) => {
  const { userId } = props;

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userOrders = useSelector((state) => state.userOrders);
  const { orders } = userOrders;

  useEffect(() => {
    dispatch(getUserDetails(userId));
    dispatch(listUserOrders(userId));
  }, [dispatch, userId]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Customer Info</h2>
      </div>
      <div className="card mb-4">
        {/* Card */}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <div className="card-body">
            <div className="user-container alert-success">
              <div className="user-wrapper">
                <div className="user-col-1">
                  <div className="User-image-cont">
                    <img src={user.image} alt={user.name} />
                  </div>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <div className="user-role">
                    {user.isAdmin ? (
                      <button className="btn btn-success col-12">ADMIN</button>
                    ) : (
                      <button className="btn btn-dark col-12">CUSTOMER</button>
                    )}
                  </div>
                  <div className="user-role">
                    {user.isAdmin ? (
                      <button className="btn btn-dark col-12">
                        REMOVE ADMIN
                      </button>
                    ) : (
                      <button className="btn btn-success col-12">
                        MAKE ADMIN
                      </button>
                    )}
                  </div>
                  <div className="user-join-date">
                    <p>Joined {moment(user.createdAt).format("LL")}</p>
                  </div>
                </div>
                <div className="user-col-2">
                  <div className="user-order-header">
                    <div className="user-order-header-id">ID</div>
                    <div className="user-order-header-amount">AMOUNT</div>
                  </div>
                  <div className="user-order-hr">
                    <hr />
                  </div>
                  {orders?.map((order) => (
                    <div
                      //className="user-order-list"
                      key={order._id}
                      className={`${
                        order.isPaid ? "alert-success" : "alert-danger"
                      }`}
                    >
                      <div className="orders-list-cont">
                        <div className="user-order-id">
                          <Link to={`/order/${order._id}`}>
                            <p>{order._id}</p>
                          </Link>
                        </div>
                        <div className="user-order-amount">
                          <p>Ksh {order.totalPrice}</p>
                        </div>
                      </div>
                      <div className="orders-list-hr">
                        <hr />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserDetails;
