import React from "react";
import Nav from "./template/Nav";
import Add from "./template/Add";
import http from "../http";

function Admin() {
  const [data, setData] = React.useState([]);
  const [calonsiswa, setCalonSiswa] = React.useState([]);

  React.useEffect(() => {
    fetchingData();
  }, []);
  const fetchingData = () => {
    http.get("/admin").then((response) => {
      // save data from backend to state variable
      setData(response?.data ?? []);
    });
  };

  const handleDelete = async (id) => {
    try {
      // delete admin by selected id
      await http.delete(`/admin/${id}`);
      fetchingData();
    } catch (error) {
      // handle error
    }
  };
  return (
    <div>
      <Nav></Nav>
      <div className="basepage">
        <Add
          name="Tambah Admin"
          buttonName="Tambah Admin"
          link="add-admin"
        ></Add>
        <table className="table-fixed border-solid border-2 mt-4">
          <thead>
            <tr className=" bg-slate-200">
              <th className="border-solid border-2 text-sm">ID Siswa</th>
              <th className="border-solid border-2 text-sm">Nama</th>
              <th className="border-solid border-2 text-sm">Username</th>
              <th className="border-solid border-2 text-sm">Password</th>
              <th className="border-solid border-2 text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {React.Children.toArray(
              data.map((item) => (
                <tr>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">
                      {item?.id_siswa ?? "-"}
                    </p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">{item?.nama ?? "-"}</p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">
                      {item?.username ?? "-"}
                    </p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">
                      {item?.password ?? "-"}
                    </p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1">
                    <div className="flex gap-2">
                      <a
                        href={`/edit-admin/${item.id}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Edit
                      </a>
                      <button
                        href="/delete-book"
                        className="px-4 py-2 border-solid border-red-500 border-2 text-red-500 rounded-lg"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
