import React, { useEffect, useState } from "react";
import API_URL from '../../utils/ApiUrl';
import Sidebar from "../layouts/Sidebar";

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
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead className="">
              <tr>
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Pengantin</th>
                <th className="border px-4 py-2 text-left">Tanggal</th>
                <th className="border px-4 py-2 text-left">Template</th>
                <th className="border px-4 py-2 text-left">Settings</th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {weddings.map((wedding) => (
                <tr key={wedding.id}>
                  <td className="border px-4 py-2">{wedding.id}</td>
                  <td className="border px-4 py-2">
                    {wedding.bride_name} & {wedding.groom_name}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(wedding.wedding_date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{wedding.wptemplateslug}</td>
                  <td className="border px-4 py-2">
                    <pre className="text-sm whitespace-pre-wrap">
                      {JSON.stringify(wedding.settings, null, 2)}
                    </pre>
                  </td>
                  <td><a href={API_URL+"app/admin/wedding-viewer/"+wedding.id} target="_blank">lihat halaman</a></td>
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
      )}
    </div>
  );
};

export default AdminWeddingList;
