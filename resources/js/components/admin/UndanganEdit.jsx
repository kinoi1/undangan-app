import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LinkWordpressList = 'http://localhost:8888/wordpress/wp-json/wp/v2/undangan_template/';
const LinkTemplate = 'http://localhost:8888/wordpress/undangan_template/';

const UndanganEdit = () => {
  const { id } = useParams();
  const [templates, setTemplates] = useState([]);
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    hideHeader: false,
    hideBanner: false,
    hideFooter: false
  });
  const [formData, setFormData] = useState({
    nama_pria: "",
    nama_wanita: "",
    wedding_date: "",
    location: "",
    settings: settings,
    wptemplateslug: ""
  });
  const navigate = useNavigate();
  const handleCheckbox = (e) => {
  const updatedSettings = {
    ...formData.settings,
    [e.target.name]: e.target.checked
  };

  setFormData({
    ...formData,
    settings: updatedSettings
  });
};
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData),);
    try {
      const res = await fetch(`${API_URL}wedding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrf
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      navigate("/admin/wedding");
      console.log("Success:", data);
    } catch (err) {
        console.log(err);
    //   console.error("Submission error:", err);
    }
  };

  useEffect(() => {
  if (!id) return;

  fetch("/admin/wedding/" + id)
    .then((res) => res.json())
    .then((response) => {
      console.log("Response dari fetch:", response);

      const data = response.data;

      if (data) {
        setFormData((prev) => ({
          ...prev,
          nama_pria: data.nama_pria || "",
          nama_wanita: data.nama_wanita || "",
          wedding_date: data.wedding_date || "",
          location: data.location || "",
          settings: data.settings || settings,
          wptemplateslug: data.wptemplateslug || ""
        }));
      }
    })
    .catch((err) => console.error("Error fetch:", err))
    .finally(() => setLoading(false));
}, [id]);
  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3 max-w-md mx-auto">
      <input
        type="text"
        name="nama_pria"
        placeholder="Mempelai pria"
        value={formData.nama_pria}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="nama_wanita"
        placeholder="Mempelai wanita"
        value={formData.nama_wanita}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="date"
        name="wedding_date"
        value={formData.wedding_date}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <div className="">
        <label htmlFor="template" className="block mb-2 font-medium">Pilih Template</label>
        <select name="wptemplateslug" id="template" className="border p-2 rounded w-full" value={formData.wptemplateslug} onChange={handleChange}>
            {templates.map((template) => (
            <option key={template.id} value={template.slug}>
                {template.title.rendered}
            </option>
            ))}
        </select>
      </div>
      <div className="space-y-2 flex flex-col gap-2">
        <div className="flex justify-between">
            <span>Header</span>
            <input
                className="toggle toggle-primary"
                type="checkbox"
                name="hideHeader"
                checked={formData.settings?.hideHeader || false}
                onChange={handleCheckbox}
            />
        </div>
        <div className="flex justify-between">
            <span>Banner</span>
            <input
                className="toggle toggle-primary"
                type="checkbox"
                name="hideBanner"
                checked={formData.settings?.hideBanner || false}
                onChange={handleCheckbox}
            />
        </div>
        <div className="flex justify-between">
            <span>Footer</span>
            <input
                className="toggle toggle-primary"
                type="checkbox"
                name="hideFooter"
                checked={formData.settings?.hideFooter || false}
                onChange={handleCheckbox}
            />
        </div>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Submit
      </button>
    </form>
  )
}

export default UndanganEdit;
