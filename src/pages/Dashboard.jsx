import React from "react";
import Nav from "./template/Nav";

function Dashboard() {
  return (
    <div>
      <Nav />
      <div className="flex mx-12 bg-slate-200 mt-4 h-56 items-center justify-center rounded-lg">
        <p className=" text-4xl font-medium">Welcome to PPDB</p>
      </div>
    </div>
  );
}

export default Dashboard;
