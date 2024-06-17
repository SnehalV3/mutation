
import { Outlet } from "react-router-dom";
import Navbar from "./common/components/navbar/navbar";
import { Toastr } from "@sparrowengg/twigs-react";

const App = () => {
  return (
    <>
      <Toastr duration={1000} />
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
