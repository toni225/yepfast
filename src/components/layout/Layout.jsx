import TopNavigation from "./TopNavigation";
import { ToastContainer } from "react-toastify";

const Layout = ({ children, socket = null }) => {
  return (
    <div>
      <div>
        <TopNavigation socket={socket} />
        {/*<ToastContainer/>*/}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
