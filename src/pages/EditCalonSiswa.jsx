import React from "react";
import http from "../http";
import { useParams, useNavigate } from "react-router-dom";

function EditCalonSiswa() {
  const navigate = useNavigate();
  const params = useParams();
  const [nama_lengkap, setnama_lengkap] = React.useState("");
  const [no_pendaftaran, setNo_pendaftaran] = React.useState("");
  const [nisn, setnisn] = React.useState("");
  const [tanggal_lahir, settanggal_lahir] = React.useState("");
  const [alamat, setalamat] = React.useState("");
  const [nama_ortu, setnama_ortu] = React.useState("");
  const [telp, settelp] = React.useState("");
  const [foto, setfoto] = React.useState("");
  const [asal_sekolah, setasal_sekolah] = React.useState("");
  const [status_pendaftaran, setstatus_pendaftaran] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = () => {
    http.get(`/calonsiswa/${params?.id}`).then(({ data }) => {
      setnama_lengkap(data?.nama_lengkap);
      setNo_pendaftaran(data?.no_pendaftaran);
      setnisn(data?.nisn);
      settanggal_lahir(data?.tanggal_lahir);
      setalamat(data?.alamat);
      setnama_ortu(data?.nama_ortu);
      settelp(data?.telp);
      setfoto(data?.foto);
      setasal_sekolah(data?.asal_sekolah);
      setstatus_pendaftaran(data?.status_pendaftaran);
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await http.patch(`/calonsiswa/${params?.id}`, {
        nama_lengkap,
        no_pendaftaran,
        nisn,
        tanggal_lahir: tanggal_lahir,
        alamat,
        nama_ortu,
        telp,
        foto,
        asal_sekolah,
        status_pendaftaran,
      });

      navigate("/calonsiswa");

      setIsLoading(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="flex gap-x-5 w-full p-5 bg-red-900 text-white">
        <a href="/calonsiswa">Back</a>
      </div>
      <div className="flex flex-column justify-center items-center ">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col my-10 w-[800px] gap-6">
            <p className="text-2xl">Add Calon Siswa</p>
            <div className="flex flex-col gap-2">
              <label for="nama" className="text-sm font-medium text-gray-900">
                Nama Calon Siswa
              </label>
              <input
                type="text"
                className="border-solid border-2 py-2 px-4"
                placeholder="Nama Calon Siswa"
                name="nama"
                id="nama"
                defaultValue={nama_lengkap}
                onChange={(e) => setnama_lengkap(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                for="no_pendaftaran"
                className="text-sm font-medium text-gray-900"
              >
                No Pendaftaran
              </label>
              <input
                type="number"
                className="border-solid border-2 py-2 px-4"
                placeholder="No Pendaftaran"
                name="no_pendaftaran"
                id="no_pendaftaran"
                defaultValue={no_pendaftaran}
                onChange={(e) => setNo_pendaftaran(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label for="nisn" className="text-sm font-medium text-gray-900">
                NISN
              </label>
              <input
                type="number"
                className="border-solid border-2 py-2 px-4"
                placeholder="NISN"
                name="nisn"
                id="nisn"
                defaultValue={nisn}
                onChange={(e) => setnisn(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                for="tanggal_lahir"
                className="text-sm font-medium text-gray-900"
              >
                Tanggal Lahir
              </label>
              <input
                type="date"
                className="border-solid border-2 py-2 px-4"
                placeholder="No Pendaftaran"
                name="tanggal_lahir"
                id="tanggal_lahir"
                defaultValue={tanggal_lahir}
                onChange={(e) => settanggal_lahir(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label for="alamat" className="text-sm font-medium text-gray-900">
                Alamat
              </label>
              <input
                type="text"
                className="border-solid border-2 py-2 px-4"
                placeholder="Alamat"
                name="alamat"
                id="alamat"
                defaultValue={alamat}
                onChange={(e) => setalamat(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                for="NamaOrtu"
                className="text-sm font-medium text-gray-900"
              >
                Nama Ortu
              </label>
              <input
                type="text"
                className="border-solid border-2 py-2 px-4"
                placeholder="Nama Ortu"
                name="NamaOrtu"
                id="NamaOrtu"
                defaultValue={nama_ortu}
                onChange={(e) => setnama_ortu(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label for="telp" className="text-sm font-medium text-gray-900">
                Nomor Telepon
              </label>
              <input
                type="text"
                className="border-solid border-2 py-2 px-4"
                placeholder="Nomor Telepon"
                name="telp"
                id="telp"
                defaultValue={telp}
                onChange={(e) => settelp(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                for="asalsekolah"
                className="text-sm font-medium text-gray-900"
              >
                Asal Sekolah
              </label>
              <input
                type="text"
                className="border-solid border-2 py-2 px-4"
                placeholder="Asal Sekolah"
                name="asalsekolah"
                id="asalsekolah"
                defaultValue={asal_sekolah}
                onChange={(e) => setasal_sekolah(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                for="status_pendaftaran"
                className="text-sm font-medium text-gray-900"
              >
                Set Status Pendaftaran (1 = Terdaftar, 2 = Diverifikasi, 3 =
                Lulus, 4 = Tidak Lulus)
              </label>
              <input
                type="text"
                className="border-solid border-2 py-2 px-4"
                placeholder="Asal Sekolah"
                name="status_pendaftaran"
                id="status_pendaftaran"
                defaultValue={status_pendaftaran}
                onChange={(e) => setstatus_pendaftaran(e.target.value)}
              />
            </div>

            <button
              className="w-full py-4 bg-slate-800 rounded-lg text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Save Calon Siswa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCalonSiswa;
