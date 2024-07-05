import React from "react";
import Nav from "./template/Nav";
import Add from "./template/Add";
import http from "../http";
import moment from "moment";

function VerifBerkas() {
  const [data, setData] = React.useState([]);
  const [calonsiswa, setCalonSiswa] = React.useState([]);
  const [verifberkas, setVerifBerkas] = React.useState([]);
  React.useEffect(() => {
    fetchingData();

    http.get("/calonsiswa").then((response) => {
      // save data from backend to state variable
      setCalonSiswa(response?.data ?? []);
    });
    http.get("/verifikasiberkas").then((response) => {
      // save data from backend to state variable
      setVerifBerkas(response?.data ?? []);
    });
  }, []);
  const fetchingData = () => {
    http.get("/berkas").then((response) => {
      // save data from backend to state variable
      setData(response?.data ?? []);
    });
  };

  const handleVerifikasi = async (id) => {
    try {
      const {
        data: { id: selectedId },
        data: dataSelectedData,
      } = await http.get(`/berkas/${id}`);

      await http.patch(`/berkas/${selectedId}`, {
        ...dataSelectedData,
        status: 2,
      });
      await http.post(`/verifikasiberkas`, {
        tgl_verifikasi: moment().format("YYYY-MM-DD"),
        id_berkas: id,
        status: 2,
      });

      // Re-fetch the data to update the state and UI
      fetchingData();
    } catch (error) {
      console.error("Error verifying the file:", error);
    }
  };

  return (
    <div>
      <Nav></Nav>
      <div className="basepage">
        <table className="table-fixed border-solid border-2 mt-4">
          <thead>
            <tr className=" bg-slate-200">
              <th className="border-solid border-2 text-sm">File</th>
              <th className="border-solid border-2 text-sm">Nama Siswa</th>
              <th className="border-solid border-2 text-sm">Jenis</th>
              <th className="border-solid border-2 text-sm">File</th>
              <th className="border-solid border-2 text-sm">
                Tanggal Verifikasi
              </th>
              <th className="border-solid border-2 text-sm">Verifikasi</th>
            </tr>
          </thead>
          <tbody>
            {React.Children.toArray(
              data.map((item) => (
                <tr>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1">{item?.file}</p>
                  </td>
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
                    <p className=" line-clamp-1 text-sm">
                      {item?.status === 1
                        ? "Unverified"
                        : item?.status === 2
                        ? "Verified"
                        : "-"}
                    </p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1 w-[300px]">
                    <p className=" line-clamp-1 text-sm">
                      {
                        verifberkas?.find(
                          (child) => child?.id_berkas === item?.id
                        )?.tgl_verifikasi
                      }
                    </p>
                  </td>
                  <td className="border-solid border-2 py-2 px-1">
                    {item?.status === 1 ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleVerifikasi(item?.id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                          Verifikasi
                        </button>
                      </div>
                    ) : item?.status === 2 ? (
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-slate-500 text-white rounded-lg">
                          Sudah Diverifikasi
                        </button>
                      </div>
                    ) : (
                      "-"
                    )}
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

export default VerifBerkas;
