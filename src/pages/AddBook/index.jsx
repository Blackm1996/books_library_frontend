import React, { useState } from "react";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import AsyncCreatableSelect from "react-select/async-creatable";
import { connect, useSelector } from "react-redux";
import AddAuthCatModal from "../../components/AuthCatModal";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../assets/Api/axios";
import Swal from "sweetalert2";

const schema = yup
  .object({
    book_code: yup.string().required("يجب ادخال رمز الكتاب"),
    book_name: yup.string().required("يجب ادخال اسم الكتاب"),
    author: yup
      .object()
      .shape({
        id: yup.string().required(),
        author_name: yup.string().required(),
      })
      .required("يجب اختيار الكاتب"),
    category: yup
      .object()
      .shape({
        id: yup.string().required(),
        category_name: yup.string().required(),
      })
      .required("يجب اختيار الفئة"),
    nbPages: yup.number().required("يجب ادخال عدد الصفحات"),
    owner: yup.string().required("يجب ادخال اسم صاحب الكتاب"),
    owner_phone: yup
      .string()
      .matches(/^[0-9]*$/, "يجب ادخال رقم هاتف صحيح")
      .required("يجب ادخال رقم هاتف صاحب الكتاب"),
  })
  .required();

const AddBook = ({ Close }) => {
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [authLoad, setAuhLoad] = useState(false);
  const [catLoad, setCatLoad] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const userId = useSelector((state) => {
    return state.auth.userId;
  });
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      book_code: "",
      book_name: "",
      author: { id: "", author_name: "" },
      category: { id: "", category_name: "" },
      nbPages: 0,
      owner: "",
      owner_phone: "",
      added_by: userId,
      description: "",
    },
  });

  const handleAuthorModalOpen = () => {
    setShowAuthorModal(true);
  };

  const handleCategoryModalOpen = () => {
    setShowCategoryModal(true);
  };

  const handleModalClose = () => {
    setShowAuthorModal(false);
    setShowCategoryModal(false);
  };

  const setAuthor = (data) => {
    setValue("author", { id: data.id, author_name: data.author_name });
  };

  const setCategory = (data) => {
    setValue("category", { id: data.id, category_name: data.category_name });
  };

  const fetchAuthors = (InputValue, callback) => {
    setAuhLoad(true);
    api.get("/authors?input=" + InputValue).then((response) => {
      if (response.status === 200) {
        setAuhLoad(false);
        callback(response.data);
      }
    });
  };

  const fetchCategories = (InputValue, callback) => {
    setCatLoad(true);
    const input = InputValue ? "?input=" + InputValue : "";
    console.log("categ", input);
    console.log("categIn", InputValue);
    api.get("/categories" + input).then((response) => {
      if (response.status === 200) {
        setCatLoad(false);
        callback(response.data);
      }
    });
  };

  const onSubmit = (dataRaw) => {
    const data = {
      ...dataRaw,
      author: dataRaw.author.id,
      category: dataRaw.category.id,
    };
    if (selectedImage) {
      // Include the object URL in the form data
      data.coverURL = selectedImage;
    }
    console.log("Raw", dataRaw);
    const formData = new FormData();
    formData.append("book_code", data.book_code);
    formData.append("book_name", data.book_name);
    formData.append("author", data.author);
    formData.append("category", data.category);
    formData.append("nbPages", data.nbPages);
    selectedImage && formData.append("coverURL", data.coverURL);
    formData.append("owner", data.owner);
    formData.append("owner_phone", data.owner_phone);
    formData.append("added_by", data.added_by);
    formData.append("description", data.description);
    console.log("FormData", formData);

    api
      .post("book", formData)
      .then((response) => {
        if (response.status === 201) {
          console.log("results", response);
          Swal.fire({
            title: "تمت العملية بنجاح",
            text: "تم اضافة الكتاب بنجاح",
            icon: "success",
            confirmButtonText: "حسناً",
          }).then(() => {
            Close();
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
      });
  };

  return (
    <section
      className="max-w-4xl p-6 mx-auto bg-secondary rounded-md  mt-20"
      dir="rtl"
    >
      <h1 className="text-3xl font-bold text-white capitalize ">
        اضافة كتاب جديد
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          {/* Book Code */}
          <div>
            <label className="text-white text-xl " htmlFor="bookName">
              رمز الكتاب
            </label>
            <input
              id="bookCode"
              type="text"
              className="block w-full px-4 py-2 mt-2 bg-primary-200 text-primary-Active placeholder:text-primary-300 mb-4
                        focus:border-solid focus:border-2 focus:border-accent rounded-md focus:outline-none"
              {...register("book_code")}
            />
            <p className="text-red-600">{errors.book_code?.message}</p>
          </div>
          {/* Book Name */}
          <div>
            <label className="text-white text-xl " htmlFor="bookName">
              عنوان الكتاب
            </label>
            <input
              id="bookName"
              type="text"
              className="block w-full px-4 py-2 mt-2 bg-primary-200 text-primary-Active placeholder:text-primary-300 mb-4
                        focus:border-solid focus:border-2 focus:border-accent rounded-md focus:outline-none"
              {...register("book_name")}
            />
            <p className="text-red-600">{errors.bookName?.message}</p>
          </div>

          {/* Author */}
          <div>
            <label className="text-white text-xl " htmlFor="author">
              اسم الكاتب
            </label>
            <Controller
              name="author"
              control={control}
              render={({ field }) => (
                <AsyncCreatableSelect
                  {...field}
                  defaultOptions
                  cacheOptions
                  loadOptions={fetchAuthors}
                  isSearchable
                  placeholder="اختر اسم الكاتب"
                  isClearable
                  isLoading={authLoad}
                  formatOptionLabel={(e) => e.author_name}
                  getOptionValue={(e) => e.id}
                />
              )}
            />
            <p className="text-red-600">{errors.author?.message}</p>
            <button
              type="button"
              onClick={handleAuthorModalOpen}
              className="text-accent font-bold mt-2 flex items-center space-x-1 text-lg"
            >
              <AddCircleOutlineOutlined fontSize="medium" />{" "}
              <span>اضافة كاتب جديد</span>
            </button>
          </div>

          {/* Category */}
          <div>
            <label className="text-white text-xl " htmlFor="category">
              الفئة
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <AsyncCreatableSelect
                  {...field}
                  defaultOptions
                  placeholder="اختر الفئة"
                  loadOptions={fetchCategories}
                  isSearchable
                  isClearable
                  isLoading={catLoad}
                  formatOptionLabel={(e) => e.category_name}
                  getOptionValue={(e) => e.id}
                />
              )}
            />
            <p className="text-red-600">{errors.category?.message}</p>
            <button
              type="button"
              onClick={handleCategoryModalOpen}
              className="text-accent font-bold mt-2 flex items-center space-x-1 text-lg"
            >
              <AddCircleOutlineOutlined fontSize="medium" />{" "}
              <span>اضافة فئة جديدة</span>
            </button>
          </div>

          {/* Number of Pages */}
          <div>
            <label className="text-white text-xl " htmlFor="numberOfPages">
              عدد الصفحات
            </label>
            <input
              id="numberOfPages"
              type="number"
              className="block w-full px-4 py-2 mt-2 bg-primary-200 text-primary-Active placeholder:text-primary-300 mb-4
                                focus:border-solid focus:border-2 focus:border-accent rounded-md focus:outline-none"
              onWheel={(e) => e.target.blur()}
              {...register("nbPages")}
            />
            <p className="text-red-600">{errors.nbPages?.message}</p>
          </div>

          {/* Cover */}
          <div>
            <label className="text-white text-xl" htmlFor="coverURL">
              غلاف الكتاب
            </label>
            <label className="block w-full">
              <input
                type="file"
                id="coverURL"
                accept="image/*"
                className="px-4 py-2 file:outline-none file:border-none file:py-2 file:px-4 file:rounded-lg file:font-semibold file:bg-primary-Button file:text-white text-white hover:file:bg-primary-Hover active:file:bg-primary-Active"
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  if (file) {
                    setSelectedImage(file);

                    // Display the selected image
                    const imageURL = URL.createObjectURL(file);
                    setImageURL(imageURL);
                  } else {
                    setSelectedImage(null);
                    setImageURL(null);
                  }
                }}
              />
            </label>
            {imageURL && (
              <img
                src={imageURL}
                alt="Selected Cover"
                className="max-w-[200px]"
              />
            )}
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="text-white text-xl " htmlFor="description">
              {"وصف للكتاب (اختياري)"}
            </label>
            <textarea
              id="description"
              className="block w-full px-4 py-2 mt-2 bg-primary-200 text-primary-Active placeholder:text-primary-300 mb-4
                            focus:border-solid focus:border-2 focus:border-accent rounded-md focus:outline-none"
              rows="4"
              {...register("description")}
            />
          </div>

          {/* Owner Name */}
          <div>
            <label className="text-white text-xl " htmlFor="ownerName">
              اسم صاحب الكتاب
            </label>
            <input
              id="ownerName"
              type="text"
              className="block w-full px-4 py-2 mt-2 bg-primary-200 text-primary-Active placeholder:text-primary-300 mb-4
                            focus:border-solid focus:border-2 focus:border-accent rounded-md focus:outline-none"
              {...register("owner")}
            />
            <p className="text-red-600">{errors.owner?.message}</p>
          </div>

          {/* Owner Phone Number */}
          <div>
            <label className="text-white text-xl " htmlFor="ownerPhoneNumber">
              رقم الهاتف
            </label>
            <input
              id="ownerPhoneNumber"
              type="tel"
              className="block w-full px-4 py-2 mt-2 bg-primary-200 text-primary-Active placeholder:text-primary-300 mb-4
                            focus:border-solid focus:border-2 focus:border-accent rounded-md focus:outline-none"
              {...register("owner_phone")}
            />
            <p className="text-red-600">{errors.owner_phone?.message}</p>
          </div>

          {/* ... other form fields */}
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="py-4 px-8 rounded-lg font-semibold mt-8 bg-primary-Button text-white hover:bg-primary-Hover active:bg-primary-Active"
          >
            اضافة الكتاب
          </button>
        </div>
      </form>
      <AddAuthCatModal
        open={showAuthorModal}
        onClose={handleModalClose}
        title="كاتب"
        setValue={setAuthor}
      />

      <AddAuthCatModal
        open={showCategoryModal}
        onClose={handleModalClose}
        title="فئة"
        setValue={setCategory}
      />
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(AddBook);
