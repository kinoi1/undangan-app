// resources/js/components/WeddingForm.jsx
import React, { useEffect, useState, useRef } from "react";
import { getCsrfToken } from "../utils/csrf";
import API_URL from '../utils/ApiUrl';
import { useNavigate,useParams } from "react-router-dom";


const LinkWordpressList = 'http://localhost:8888/wordpress/wp-json/wp/v2/undangan_template/';
const LinkTemplate = 'http://localhost:8888/wordpress/undangan_template/';

const WeddingForm = () => {
const { id } = useParams();
const [templates, setTemplates] = useState([]);
const [loading, setLoading] = useState(true);
const csrf = getCsrfToken();
  const [settings, setSettings] = useState({
  hideHeader: false,
  hideBanner: false,
  hideFooter: false
});
const [formData, setFormData] = useState({
    nama_pria: "",
    nama_wanita: "",
    wedding_date: "",
    time: "",
    location: "",
    address: "",
    link: "",
    title:"",
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
                time: data.time || "",
                location: data.location || "",
                address: data.address || "",
                link: data.link || "",
                title: data.title || "",
                settings: data.settings || settings,
                wptemplateslug: data.wptemplateslug || ""
            }));
            }
        })
        .catch((err) => console.error("Error fetch:", err))
        .finally(() => setLoading(false));
    }, [id]);

  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }else{
      modalRef.current.hideModal();
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3 max-w-md mx-auto">
      <div className="flex flex-col gap-2">
        <div>
          <label className="block mb-2 font-medium">Mempelai Pria</label>
          <input type="text" name="nama_pria" placeholder="Mempelai pria" className="border p-2 w-full rounded-lg"
          value={formData.nama_pria}
          onChange={handleChange}
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Mempelai Wanita</label>
          <input type="text" name="nama_wanita" placeholder="Mempelai wanita" className="border p-2 w-full rounded-lg"
          value={formData.nama_wanita}
          onChange={handleChange}
          />
        </div>
        
        <div className="flex flex-row gap-4">
          <div>
            <label className="block mb-2 font-medium">Waktu</label>
            <input type="time" name="time" className="border p-2 rounded-lg"
            value={formData.time}
            onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Tanggal</label>
            <input type="date" name="wedding_date" className="border p-2 rounded-lg"
            value={formData.wedding_date}
            onChange={handleChange}
            />
          </div>
          
        </div>

        <div>
            <label className="block mb-2 font-medium">Lokasi</label>
            <input type="text" name="location" className="border p-2 w-full rounded-lg"
            value={formData.location}
            onChange={handleChange}
            />
        </div>
        <div>
            <label className="block mb-2 font-medium">Alamat</label>
            <textarea name="address" className="border p-2 w-full rounded-lg" placeholder="Alamat...."
            value={formData.address}
            onChange={handleChange}
            />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Link undangan</label>
          <div className="flex flex-row border rounded-lg">
              <span className="link p-2 text-gray-500">https://undangan-online/</span>
              <input className="flex-auto pl-2 rounded-lg" type="text" placeholder="URL" 
              value={formData.link}
              onChange={handleChange}/>
          </div>
        </div>
        <div>
            <label className="block mb-2 font-medium">Judul</label>
            <input className="border p-2 w-full rounded-lg" type="text" name="title"
              value={formData.title}
              onChange={handleChange}
            />
        </div>
      </div>
      <div>
        <button className="btn btn-primary" onClick={openModal}>
        Pilih template
        </button>
      </div>
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
            <input className="toggle toggle-primary" type="checkbox" name="hideHeader"
                checked={formData.settings?.hideHeader || false}
                onChange={handleCheckbox}
            />
        </div>
        <div className="flex justify-between">
            <span>Banner</span>
            <input className="toggle toggle-primary" type="checkbox" name="hideBanner"
                checked={formData.settings?.hideBanner || false}
                onChange={handleCheckbox}
            />
        </div>
        <div className="flex justify-between">
            <span>Footer</span>
            <input className="toggle toggle-primary" type="checkbox" name="hideFooter"
                checked={formData.settings?.hideFooter || false}
                onChange={handleCheckbox}
            />
        </div>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Submit
      </button>

      <dialog id="my_modal_3" className="modal modal-middle" ref={modalRef}>
        <div className="modal-box p-0">
          <form method="dialog">
            <div className="flex flex-row justify-between p-4">
              <h3 className="font-bold text-lg">Tema</h3>
              <button className="btn btn-sm btn-circle btn-ghost">
                ✕
              </button>
            </div>
            <div className="gray-line"></div>
            <div className="container p-4 flex flex-col gap-2">
              <label htmlFor="">Template</label>
              <label className="w-full input">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <label htmlFor=""></label>
              <input type="search" placeholder="Cari template..." />
              </label>
              <div className="flex flex-row flex-wrap gap-2">
                <div className="template-box">tes</div>
                <div className="template-box">tes</div>
                <div className="template-box">tes</div>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </form>
  );
};

export default WeddingForm;
