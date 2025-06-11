import Sidebar from "./Sidebar";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* <Navbar /> */}
        <main className="flex-1 p-4 bg-base-200">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default MainLayout;
