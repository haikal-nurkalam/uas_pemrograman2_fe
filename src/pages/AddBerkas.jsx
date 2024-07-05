import React from "react";
import http from "../http";
import { useNavigate } from "react-router-dom";
function AddBerkas() {
  const navigate = useNavigate();
  const [id_siswa, setid_siswa] = React.useState("");
  const [jenis, setjenis] = React.useState("");
  const [status, setstatus] = React.useState("");
  const [file, setfile] = React.useState("");
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    fetchingData();
  }, []);
  const fetchingData = () => {
    http.get("/calonsiswa").then((response) => {
      // save data from backend to state variable
      setData(response?.data ?? []);
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await http.post("/berkas", {
        id_siswa,
        jenis,
        status: 1,
        file,
      });

      navigate("/berkas");

      setIsLoading(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="flex gap-x-5 w-full p-5 bg-red-900 text-white">
        <a href="/berkas">Back</a>
      </div>
      <div className="flex flex-column justify-center items-center ">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col my-10 w-[800px] gap-6">
            <p className="text-2xl">Add Berkas</p>
            <div className="flex flex-col gap-2">
              <label for="nama" className="text-sm font-medium text-gray-900">
                Calon Siswa
              </label>
              <select
                name="nama"
                id="nama"
                className="border-solid border-2 py-2 px-4"
                value={id_siswa}
                onChange={(e) => setid_siswa(e.target.value)}
              >
                {React.Children.toArray(
                  data.map((item) => (
                    <option value={item.id}>
                      {item.nama_lengkap} (NISN {item.nisn})
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label for="Jenis" className="text-sm font-medium text-gray-900">
                Jenis
              </label>
              <select
                name="Jenis"
                id="Jenis"
                className="border-solid border-2 py-2 px-4"
                value={jenis}
                onChange={(e) => setjenis(e.target.value)}
              >
                <option value={"A"}>Ijazah</option>
                <option value={"B"}>Transkrip Nilai</option>
                <option value={"C"}>Foto 3x4</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label for="file" className="text-sm font-medium text-gray-900">
                File (Masukkan URL File Anda)
              </label>
              <input
                type="text"
                className="border-solid border-2 py-2 px-4"
                placeholder="Masukkan URL File Anda"
                name="file"
                id="file"
                defaultValue={file}
                onChange={(e) => setfile(e.target.value)}
              />
              {/* <input type="file" onChange={(e) => setfile(e.target.value)} /> */}
            </div>

            <button
              className="w-full py-4 bg-slate-800 rounded-lg text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Save Berkas"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBerkas;
