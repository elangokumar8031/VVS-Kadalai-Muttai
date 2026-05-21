import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">{children}</main>
    </>
  );
};

export default Layout;
