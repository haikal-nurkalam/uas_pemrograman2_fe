import React from "react";

function Nav() {
  return (
    <div className="flex items-center justify-center gap-x-5 w-full p-5 bg-red-900 text-white">
      <a href="/" className="p-nav">
        Dashboard
      </a>
      <a href="/calonsiswa" className="p-nav">
        Calon Siswa
      </a>
      <a href="/berkas" className="p-nav">
        Berkas
      </a>
      <a href="/admin" className="p-nav">
        Admin
      </a>
      <a href="/verifberkas" className="p-nav">
        Verif Berkas
      </a>
    </div>
  );
}

export default Nav;
