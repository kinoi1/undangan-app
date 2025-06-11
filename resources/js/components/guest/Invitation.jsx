import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from '../../utils/ApiUrl';

const Invitation = () => {
  const { id } = useParams();
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL+"invitation/"+id)
        .then((res) => res.json())
        .then((data) =>
            setWeddings(data)
        )
        .catch((err) => console.error("Error fetch:", err))
        .finally(() => setLoading(false));
  }, []);
console.log(id);
console.log(weddings);

  return (
    <div className="w-full h-screen">
      {/* <iframe
        src={`http://localhost:8888/undangan_template/${id}`}
        title="Preview Undangan"
        className="w-full h-full border-0"
      /> */}
    </div>
  );
};

export default Invitation;
