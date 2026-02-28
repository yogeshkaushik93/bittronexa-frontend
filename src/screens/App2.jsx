import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";
import DiscoverSuccess from "./website/DiscoverSuccess";
import ForexBlueprint from "./website/ForexBlueprint";
import TestimonialSection from "./website/TestimonialSection";
import BlogSection from "./website/BlogSection";

const App2 = () => {
  const location = useLocation();

  useEffect(() => {
    // If user comes back to homepage `/`, then clear token
    if (location.pathname === "/") {
      console.log("Clearing token on homepage");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }, [location.pathname]);

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden bg-black">
        <Header />
        <Hero />
        <Benefits />
        <DiscoverSuccess/>
        <ForexBlueprint/>
        {/* <TestimonialSection/> */}
        <BlogSection/>
        <Services />
        {/* <Pricing />
        <Roadmap /> */}
        <Footer />
      </div>
      {/* <ButtonGradient /> */}
    </>
  );
};

export default App2;
