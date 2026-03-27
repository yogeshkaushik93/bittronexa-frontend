import { useLocation } from "react-router-dom";
import "../../styles/website/UserMain.css";
import { useEffect } from "react";
import Hero from "./Hero";
import Header from "./Header";
import Benefits from "./Benefits";
import DiscoverSuccess from "./DiscoverSuccess";
import ForexBlueprint from "./ForexBlueprint";
import BlogSection from "./BlogSection";
import Services from "./Services";
import Footer from "./Footer";

const UserMain = () => {
   const location = useLocation();
  
    useEffect(() => {
      if (location.pathname === "/") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      }
    }, [location.pathname]);
  
  return (
    <>
      <div className="UserMain">
        <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden bg-black">
          <Header />
          <Hero />
          <Benefits />
          <DiscoverSuccess />
          <ForexBlueprint />
          <BlogSection />
          <Services />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default UserMain;
