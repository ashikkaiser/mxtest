import Footer from "../footer";
import Header from "../header";
import { useMediaQuery } from "react-responsive";
import { useContext, useEffect } from "react";
import HeaderContext from "../../context/headerContext";
const Layout = (props) => {
  const { setCountry } = useContext(HeaderContext)
  const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const Mobile = isMobile ? "layout_mobile" : "layout_tablet";
  const Desktop = isDesktop ? "layout_desktop" : Mobile;
  useEffect(() => {
    document.body.dataset.display = Desktop;
  }, [Desktop]);
  useEffect(() => {
    setCountry(props.country)
  }, []);


  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
