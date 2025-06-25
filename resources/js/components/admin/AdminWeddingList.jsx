import React, { useEffect, useState } from "react";
import API_URL from '../../utils/ApiUrl';

const AdminWeddingList = () => {
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/admin/wedding")
      .then((res) => res.json())
      .then((data) => setWeddings(data))
      .catch((err) => console.error("Error fetch:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Daftar Undangan</h1>
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <>
        <a href={API_URL+'app/wedding-form'} className="btn btn-info hover:bg-gray-700 px-3 py-2 rounded mb-8">Tambah</a>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead className="">
              <tr>
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Pengantin</th>
                <th className="border px-4 py-2 text-left">Tanggal</th>
                <th className="border px-4 py-2 text-left">Template</th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {weddings.map((wedding) => (
                <tr key={wedding.id}>
                  <td className="border px-4 py-2">{wedding.id}</td>
                  <td className="border px-4 py-2">
                    {wedding.nama_pria} & {wedding.nama_wanita}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(wedding.wedding_date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{wedding.wptemplateslug}</td>
                  <td className="border px-4 py-2">
                    <div className="flex flex-col">
                        <a className="btn btn-outline btn-success" href={API_URL+"app/admin/wedding-viewer/"+wedding.id} target="_blank">lihat</a>
                        <a className="btn btn-outline btn-warning" href={API_URL+"app/admin/wedding-edit/"+wedding.id} target="_blank">edit</a>
                    </div>
                  </td>
                </tr>
              ))}
              {weddings.length === 0 && (
                <tr>
                  <td className="border px-4 py-2" colSpan="5">
                    Tidak ada data undangan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </>
      )}
    </div>
  );
};

export default AdminWeddingList;
