import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description}></meta>
        <meta name="keywords" content={keywords}></meta>
        <meta name="author" content={author}></meta>
        <title> {title} </title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Toaster position="top-right" reverseOrder={true} />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern, react, node, mongodb",
  author: "Sarab",
};
export default Layout;
