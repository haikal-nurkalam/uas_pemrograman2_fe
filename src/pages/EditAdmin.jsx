import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../http";

function EditAdmin() {
  const navigate = useNavigate();
  const params = useParams();
  const [id_siswa, setid_siswa] = React.useState("");
  const [nama, setnama] = React.useState("");
  const [username, setusername] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = () => {
    http.get(`/admin/${params?.id}`).then(({ data }) => {
      setid_siswa(data?.id_siswa);
      setnama(data?.nama);
      setusername(data?.username);
      setpassword(data?.password);
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await http.patch(`/admin/${params?.id}`, {
        nama,
        username,
        password,
      });

      navigate("/admin");

      setIsLoading(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="flex gap-x-5 w-full p-5 bg-red-900 text-white">
        <a href="/admin">Back</a>
      </div>
      <div className="flex flex-column justify-center items-center ">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col my-10 w-[800px] gap-6">
            <p className="text-2xl">Edit Admin</p>

            <div className="flex flex-col gap-2">
              <label for="nama" className="text-sm font-medium text-gray-900">
                Nama
              </label>
              <input
                type="text"
                className="border-solid border-2 py-2 px-4"
                placeholder="Nama Admin"
                name="nama"
                id="nama"
                defaultValue={nama}
                onChange={(e) => setnama(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                for="username"
                className="text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                className="border-solid border-2 py-2 px-4"
                placeholder="Username Akun"
                name="username"
                id="username"
                defaultValue={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                for="password"
                className="text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="text"
                className="border-solid border-2 py-2 px-4"
                placeholder="Password Admin"
                name="password"
                id="password"
                defaultValue={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <button
              className="w-full py-4 bg-slate-800 rounded-lg text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Save Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAdmin;
