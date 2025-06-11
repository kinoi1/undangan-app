import React from "react";
import { useParams } from "react-router-dom";

const UndanganViewer = () => {
  const { id } = useParams();

  return (
    <div className="h-screen">
      <iframe
        src={`http://localhost:8000/wedding-viewer/${id}`}
        title="Undangan"
        className="w-full h-full border-0"
      ></iframe>
    </div>
  );
};

export default UndanganViewer;
