// resources/js/components/WeddingForm.jsx
import React, { useEffect, useState } from "react";
import { getCsrfToken } from "../utils/csrf";
import API_URL from '../utils/ApiUrl';
import { useNavigate } from "react-router-dom";


const LinkWordpressList = 'http://localhost:8888/wordpress/wp-json/wp/v2/undangan_template/';
const LinkTemplate = 'http://localhost:8888/wordpress/undangan_template/';

const WeddingForm = () => {
const [templates, setTemplates] = useState([]);
const [loading, setLoading] = useState(true);
const csrf = getCsrfToken();
  const [settings, setSettings] = useState({
  hideHeader: false,
  hideBanner: false,
  hideFooter: false
});
const [formData, setFormData] = useState({
    bride_name: "",
    groom_name: "",
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
    fetch(LinkWordpressList)
        .then(response => response.json())
        .then(data => {
        setTemplates(data);
        })
        .catch(error => {
        console.error('Gagal fetch dari WordPress:', error);
        })
        .finally(() => setLoading(false));
}, []);

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3 max-w-md mx-auto">
      <input
        type="text"
        name="bride_name"
        placeholder="Bride's Name"
        value={formData.bride_name}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="groom_name"
        placeholder="Groom's Name"
        value={formData.groom_name}
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
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="hideHeader"
            checked={formData.settings?.hideHeader || false}
            onChange={handleCheckbox}
          />
          <span>Sembunyikan Header</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="hideBanner"
            checked={formData.settings?.hideBanner || false}
            onChange={handleCheckbox}
          />
          <span>Sembunyikan Banner</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="hideFooter"
           checked={formData.settings?.hideFooter || false}
            onChange={handleCheckbox}
          />
          <span>Sembunyikan Footer</span>
        </label>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Submit
      </button>
    </form>
  );
};

export default WeddingForm;
