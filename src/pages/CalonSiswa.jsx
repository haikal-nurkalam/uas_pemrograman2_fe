import React from "react";
import Nav from "./template/Nav";
import http from "../http";
import Add from "./template/Add";

function CalonSiswa() {
  const [data, setData] = React.useState([]);

  // Get data from backend
  React.useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = () => {
    http.get("/calonsiswa").then((response) => {
      // save data from backend to state variable
      setData(response?.data ?? []);
    });
  };

  const handleDelete = async (id) => {
    try {
      // delete admin by selected id
      await http.delete(`/calonsiswa/${id}`);
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
          name="Tambah Calon Siswa"
          buttonName="Tambah calon siswa"
          link="add-calonsiswa"
        ></Add>
        <table className="table-fixed border-solid border-2 mt-4">
          <thead>
            <tr className=" bg-slate-200">
              <th className="border-solid border-2 text-sm">Nama</th>
              <th className="border-solid border-2 text-sm">NISN</th>
              <th className="border-solid border-2 text-sm">No_Daftar</th>
              <th className="border-solid border-2 text-sm">Tanggal Lahir</th>
              <th className="border-solid border-2 text-sm">Alamat</th>
              <th className="border-solid border-2 text-sm">Nama Ortu</th>
              <th className="border-solid border-2 text-sm">telp</th>
              <th className="border-solid border-2 text-sm">Asal Sekolah</th>
              <th className="border-solid border-2 text-sm">
                Status Pendaftaran
              </th>

              <th className="border-solid border-2 text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Looping data from state variable */}
            {React.Children.toArray(
              data.map((item) => (
                <tr>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">
                      {item?.nama_lengkap ?? "-"}
                    </p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">{item?.nisn ?? "-"}</p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">
                      {item?.no_pendaftaran ?? "-"}
                    </p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">
                      {item?.tanggal_lahir ?? "-"}
                    </p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">
                      {item?.alamat ?? "-"}
                    </p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">
                      {item?.nama_ortu ?? "-"}
                    </p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">{item?.telp ?? "-"}</p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">
                      {item?.asal_sekolah ?? "-"}
                    </p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">
                      {item?.status_pendaftaran === 1
                        ? "Terdaftar"
                        : item?.status_pendaftaran === 2
                        ? "Diverifikasi"
                        : item?.status_pendaftaran === 3
                        ? "Lulus"
                        : item?.status_pendaftaran === 4
                        ? "Tidak Lulus"
                        : "-"}
                    </p>
                  </td>

                  <td className="border-solid border-2 py-2 px-1">
                    <div className="flex gap-2">
                      <a
                        href={`/edit-calonsiswa/${item.id}`}
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

export default CalonSiswa;
