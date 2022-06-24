import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import Settings from "../components/settings/settings";

const SettingScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Settings />
      </main>
    </>
  );
};

export default SettingScreen;
