import { connect, useSelector } from "react-redux";
import React, { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ِAR } from "../../assets/localization/ar";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { arEG } from "@mui/material/locale";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ImageModal } from "../../components/ImageModal";
import AddBook from "../AddBook";
import Contacts from "../../components/Contacts";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { FormModal } from "../../components/FormModal";

const queryClient = new QueryClient();
const BooksList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [bigImageSrc, setBigImageSrc] = useState();
  const [showAddBook, setShowAddBook] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);
  const APIURL = process.env.REACT_APP_API_URL;
  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      "table-data",
      globalFilter, //refetch when globalFilter changes
      pagination.pageIndex, //refetch when pagination.pageIndex changes
      pagination.pageSize, //refetch when pagination.pageSize changes
      sorting, //refetch when sorting changes
    ],
    queryFn: async () => {
      console.log("url", `${APIURL}books`);
      const fetchURL = new URL("books", APIURL);

      fetchURL.searchParams.set("page",`${pagination.pageIndex+1}`);
      fetchURL.searchParams.set("size", `${pagination.pageSize}`);
      fetchURL.searchParams.set("globalFilter", globalFilter ?? "");
      fetchURL.searchParams.set("sorting", JSON.stringify(sorting ?? []));

      console.log("fetching", fetchURL);
      const response = await fetch(fetchURL.href);
      const json = await response.json();
      await console.log("ddd", json);
      setRowCount(json.total);
      return json;
    },
    keepPreviousData: true,
  });

  const ShowImage = (src) => {
    setBigImageSrc(src);
    setShowImageModal(true);
  };
  const HideImage = () => {
    setShowImageModal(false);
    setBigImageSrc("");
  };
  const ShowAddBook = () => setShowAddBook(true);
  const HideAddBook = () => setShowAddBook(false);
  // isLoggedIn
  const { isLoggedIn, role } = useSelector((state) => {
    return state.auth;
  });
  const columns = useMemo(() => {
    const basecol = [
      {
        accessorKey: "coverUrl",
        header: "الغلاف",
        Cell: ({ cell }) => (
          <img
            onClick={() => {
              ShowImage(
                process.env.REACT_APP_URL_BACK+"storage/app/" +
                  cell.getValue()
              );
            }}
            src={
              `${process.env.REACT_APP_URL_BACK}storage/app/${cell.getValue()}`
            }
            alt="cover"
            className="max-w-[100px] max-h-[50px]"
          />
        ),
        size:75
      },
      {
        accessorKey: "book_name",
        header: "عنوان الكتاب",
        size: 150,
      },
      {
        accessorKey: "book_code",
        header: "رمز الكتاب",
        size: 97,
      },
      
      {
        accessorKey: "author_name",
        header: "اسم الكاتب",
        size: 135,
      },
      {
        accessorKey: "category_name",
        header: "الفئة",
        size: 100,
      },
      {
        accessorKey: "nbPages",
        header: "عدد الصفحات",
        size: 100,
      },
      {
        accessorKey: "description",
        header: "وصف للكتاب",
        size: 180,
      },
    ];
    if (isLoggedIn) {
      basecol.push(
        {
          accessorKey: "owner",
          header: "اسم صاحب الكتاب",
          size: 130,
        },
        {
          accessorKey: "owner_phone",
          header: "رقم الهاتف",
          size: 120,
        }
      );
    }
    return basecol;
  }, [isLoggedIn]);

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility

    <div>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider
          theme={createTheme({ ...theme, direction: "rtl" }, arEG)}
        >
          <div>
            <Contacts/>
          </div>
          <div style={{ direction: "rtl" }}>
            <ImageModal
              open={showImageModal}
              onClose={HideImage}
              src={bigImageSrc}
            />
            <FormModal open={showAddBook} onClose={HideAddBook}>
              <AddBook />
            </FormModal>
            <div>
              {isLoggedIn && (
                <button
                  className="mb-4 py-4 px-8 rounded-lg font-semibold mt-8 bg-primary-Button text-white hover:bg-primary-Hover active:bg-primary-Active"
                  onClick={ShowAddBook}
                >
                  إضافة كتاب جديد
                </button>
              )}
            </div>
            {isLoading ? (
              // Render a loading indicator
              <div>Loading...</div>
            ) : isError ? (
              // Handle error state
              <div>خطأ في تحميل المعلومات</div>
            ) : (
              <MaterialReactTable
                columns={columns}
                data={data.data}
                rowCount={rowCount}
                enableColumnResizing
                enableColumnFilters={false}
                //manualFiltering
                manualPagination
                manualSorting
                muiToolbarAlertBannerProps={
                  isError
                    ? {
                        color: "error",
                        children: "خطأ في تحميل المعلومات",
                      }
                    : undefined
                }
                initialState={{
                  showColumnFilters: false,
                  showGlobalFilter: true,
                  density: "spacious",
                }}
                onGlobalFilterChange={setGlobalFilter}
                onPaginationChange={setPagination}
                onSortingChange={setSorting}
                renderTopToolbarCustomActions={() => (
                  <Tooltip arrow title="Refresh Data">
                    <IconButton onClick={() => refetch()}>
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                )}
                localization={MRT_Localization_ِAR}
                state={{
                  globalFilter,
                  isLoading,
                  pagination,
                  showAlertBanner: isError,
                  showProgressBars: isFetching,
                  sorting,
                }}
              />
            )}
          </div>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
};

const HomeUser = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BooksList />
    </QueryClientProvider>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps)(HomeUser);
