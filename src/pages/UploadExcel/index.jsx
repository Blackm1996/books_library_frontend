import React, { useState } from "react";
import api from "../../assets/Api/axios";

const UploadExcel = () => {
  const [file, setFile] = useState();

  const submit = () => {
    if (file) {
      const formData = new FormData();
      console.log("files nb", file.length);
      for (let i = 0; i < file.length; i++) {
        const filet = file[i];
        formData.append("files", filet, filet.name); // Preserve the original file name
      }
      for (var pair of formData.entries()) {
        console.log(pair);
      }
      api
        .post("bulkBooks", formData)
        .then((response) => {
          if (response.status === 201) {
            console.log("results", response);
            alert("success");
          }
        })
        .catch((error) => {
          console.error("err", error.response);
          alert("error");
        });
    }
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const files = e.currentTarget.files;
          //console.log("files",e.currentTarget.files)
          if (files) {
            setFile(files);
          } else {
            setFile(null);
          }
        }}
        className="px-4 py-2 file:outline-none file:border-none file:py-2 file:px-4 file:rounded-lg file:font-semibold file:bg-primary-Button file:text-white text-white hover:file:bg-primary-Hover active:file:bg-primary-Active"
      />

      <button
        onClick={submit}
        className="py-4 px-8 rounded-lg font-semibold mt-8 bg-primary-Button text-white hover:bg-primary-Hover active:bg-primary-Active"
      >
        submit
      </button>
    </div>
  );
};

export default UploadExcel;
