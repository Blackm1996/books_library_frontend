import { React } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomeUser from "./pages/HomeUsers";
import HomeAdmin from "./pages/HomeAdmin";
import Login from "./pages/Login";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Header from "./components/Header";
import ViewUsers from "./pages/Users/ViewUsers";
import LendBook from "./pages/Lending/LendBook";

import UploadExcel from "./pages/UploadExcel";

function App() {
  //const { isLoggedIn, userId } = store?.getState()?.auth?.isLoggedIn;

  // useEffect(() => {
  //   var localUserId = localStorage.getItem("userId");
  //   if (localUserId) dispatch(login({ localUserId }));
  // }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      {/* <Navbar /> */}
      <div className="pt-[88px] px-1 lg:px-4">
        {/* start routes section */}
        <Routes>
          <Route path="/" exact element={<HomeUser />} />

          <Route path="login" element={<Login />} />

          <Route element={<ProtectedRoute allowdRoles={[2006, 1996]} />}>
            <Route path="ViewUsers" element={<ViewUsers />} />
          </Route>

          <Route element={<ProtectedRoute allowdRoles={[2006, 2020, 1996]} />}>
            <Route path="lendingList" element={<HomeAdmin />} />
            {/* Add Another route booksDetails */}
          </Route>

          {/*<Route path="AddUser" element={<AddUser />} />
          <Route path="AddNewBook" element={<AddBook />} />*/}

          <Route path="UploadExcel19962014" element={<UploadExcel/>}/>
        </Routes>
        {/* end routes section */}
      </div>
    </BrowserRouter>
  );
}

export default App;
