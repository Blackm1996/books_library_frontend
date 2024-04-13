import React from "react";
import { Dialog, DialogContent, TextField } from "@mui/material";
import { StyledEngineProvider } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../assets/Api/axios";
import Swal from "sweetalert2";

const schema = yup
  .object({
    name: yup.string().required("يجب ادخال الإسم "),
  })
  .required();

const AddAuthCatModal = ({ open, onClose, title, setValue }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    onClose();
  };

  const handleSave = (data) => {
    console.log("AuthCat",data);
    var input = title === "كاتب"? {author_name : data.name}:{category_name : data.name};
    console.log("input", input);
    const url = title === "كاتب" ? "author" : "category";
    api
    .post(url, input)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "تمت العملية بنجاح",
          text: title === "كاتب" ? "تم اضافة كاتب جديد بنجاح" : "تم اضافة فئة جديدة بنجاح",
          icon: "success",
          confirmButtonText: "حسناً",
        })
        .then(()=>{
          setValue(response.data.newAdd);
          handleClose();
        });
      }
    })
    .catch((error) => {
      console.log("err", error.response);
      const response = error.response;
      if (response.status === 422) {
        Swal.fire({
          title: "خطأ في المعلومات",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "حسناً",
        });
      } else {
        Swal.fire({
          title: "خطأ",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "حسناً",
        });
      }
    })
  };

  return (
    <StyledEngineProvider injectFirst>
      <Dialog
        open={open}
        onClose={handleClose}
        dir="rtl"
        maxWidth="sm"
        fullWidth
      >
        <DialogContent className="bg-secondary-300 p-8">
          <h2 className="text-lg font-bold text-primary-Hover capitalize mb-4">
            {title === "كاتب" ? "اضافة كاتب جديد" : "اضافة فئة جديدة"}
          </h2>
          <form onSubmit={handleSubmit(handleSave)}>
            <input
              type="text"
              id="name"
              label="الإسم"
              
              className="block w-full px-4 py-2 mt-2 bg-primary-100 text-primary-Active placeholder:text-primary-300 mb-4
          focus:border-solid focus:border-2 focus:border-accent rounded-md focus:outline-none"
              placeholder={title === "كاتب" ? "اسم الكاتب" : "اسم الفئة"}
              {...register("name")}
            />
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="py-4 px-8 rounded-lg font-semibold mt-8 bg-primary-Button text-white hover:bg-primary-Hover active:bg-primary-Active"
              >
                حفظ
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </StyledEngineProvider>
  );
};

export default AddAuthCatModal;
