import React from "react";
import Nav from "./template/Nav";
import Add from "./template/Add";
import http from "../http";

function Berkas() {
  const [data, setData] = React.useState([]);
  const [calonsiswa, setCalonSiswa] = React.useState([]);

  React.useEffect(() => {
    fetchingData();

    http.get("/calonsiswa").then((response) => {
      // save data from backend to state variable
      setCalonSiswa(response?.data ?? []);
    });
  }, []);
  const fetchingData = () => {
    http.get("/berkas").then((response) => {
      // save data from backend to state variable
      setData(response?.data ?? []);
    });
  };
  return (
    <div>
      <Nav></Nav>
      <div className="basepage">
        <Add
          name="Tambah Berkas Siswa"
          buttonName="Tambah berkas siswa"
          link="add-berkas"
        ></Add>
        <table className="table-fixed border-solid border-2 mt-4">
          <thead>
            <tr className=" bg-slate-200">
              <th className="border-solid border-2 text-sm">Nama Siswa</th>
              <th className="border-solid border-2 text-sm">NISN Siswa</th>
              <th className="border-solid border-2 text-sm">Jenis</th>
              <th className="border-solid border-2 text-sm">File</th>
              <th className="border-solid border-2 text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {React.Children.toArray(
              data.map((item) => (
                <tr>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">
                      {
                        calonsiswa?.find(
                          (child) => child?.id === item?.id_siswa
                        )?.nama_lengkap
                      }
                    </p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">
                      {
                        calonsiswa?.find(
                          (child) => child?.id === item?.id_siswa
                        )?.nisn
                      }
                    </p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">
                      {item?.jenis === "A"
                        ? "Ijazah"
                        : item?.jenis === "B"
                        ? "Transkrip Nilai"
                        : item?.jenis === "C"
                        ? "Foto 3X4"
                        : "-"}
                    </p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">{item?.file ?? "-"}</p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">
                      {/* {item?.status ?? "-"} */}
                      <p className=" line-clamp-1 text-sm">
                        {item?.status === 1
                          ? "Unverified"
                          : item?.status === 2
                          ? "Verified"
                          : "-"}
                      </p>
                    </p>
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

export default Berkas;
