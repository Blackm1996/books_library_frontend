import { connect, useSelector } from "react-redux";
import React, { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ِAR } from "../../../assets/localization/ar";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { arEG } from "@mui/material/locale";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddUser from "../AddUser";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { FormModal } from "../../../components/FormModal";
const Roles = {
  2020: "ادمن مستوى 1",
  2006: "ادمن مستوى 2",
  1996: "مبرمج",
};
const queryClient = new QueryClient();
const UsersList = () => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const APIURL = process.env.REACT_APP_API_URL;
  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      "table-data",
      columnFilters, //refetch when columnFilters changes
      globalFilter, //refetch when globalFilter changes
      pagination.pageIndex, //refetch when pagination.pageIndex changes
      pagination.pageSize, //refetch when pagination.pageSize changes
      sorting, //refetch when sorting changes
    ],
    queryFn: async () => {
      const fetchURL = new URL("users", APIURL);

      fetchURL.searchParams.set(
        "start",
        `${pagination.pageIndex * pagination.pageSize}`
      );
      fetchURL.searchParams.set("size", `${pagination.pageSize}`);
      fetchURL.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
      fetchURL.searchParams.set("globalFilter", globalFilter ?? "");
      fetchURL.searchParams.set("sorting", JSON.stringify(sorting ?? []));
      const token = localStorage.getItem("token");
      const requestHeaders = token
        ? {
            method: "GET", // Or use the appropriate HTTP method
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Adjust the content type as needed
            },
          }
        : null;
      const response = await fetch(fetchURL.href, requestHeaders);
      const json = await response.json();
      await console.log("ddd", json);
      return json;
    },
    keepPreviousData: true,
  });

  const ShowAddUser = () => setShowAddUser(true);
  const HideAddUser = () => setShowAddUser(false);
  // isLoggedIn
  const { isLoggedIn, role } = useSelector((state) => {
    return state.auth;
  });
  const columns = useMemo(() => {
    const basecol = [
      {
        accessorKey: "name",
        header: "الاسم",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "اسم المستخدم",
        size: 150,
      },
      {
        accessorKey: "role",
        header: "النوع",
        size: 150,
        Cell: ({ cell }) => { return <div>{Roles[cell.getValue()]}</div>},
      },
    ];
    if (isLoggedIn) {
      basecol.push();
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
          <div style={{ direction: "rtl" }}>
            <FormModal open={showAddUser} onClose={HideAddUser}>
              <AddUser />
            </FormModal>
            <div>
              <button
                className="mb-4 py-4 px-8 rounded-lg font-semibold mt-8 bg-primary-Button text-white hover:bg-primary-Hover active:bg-primary-Active"
                onClick={ShowAddUser}
              >
                إضافة مستخدم جديد
              </button>
            </div>
            {isLoading ? (
              // Render a loading indicator
              <div>Loading...</div>
            ) : isError ? (
              // Handle error state
              <div>Error loading data</div>
            ) : (
              <MaterialReactTable
                columns={columns}
                data={data}
                enableColumnFilterModes
                enableColumnResizing
                muiToolbarAlertBannerProps={
                  isError
                    ? {
                        color: "error",
                        children: "Error loading data",
                      }
                    : undefined
                }
                initialState={{
                  showColumnFilters: false,
                  showGlobalFilter: true,
                  density: "compact",
                }}
                localization={MRT_Localization_ِAR}
                state={{
                  columnFilters,
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

const ViewUsers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersList />
    </QueryClientProvider>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps)(ViewUsers);
