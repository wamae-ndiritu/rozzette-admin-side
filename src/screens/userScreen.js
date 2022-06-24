import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import UserDetails from "../components/users/userDetailts.js";

const UserScreen = ({ match }) => {
  const userId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserDetails userId={userId} />
      </main>
    </>
  );
};

export default UserScreen;
