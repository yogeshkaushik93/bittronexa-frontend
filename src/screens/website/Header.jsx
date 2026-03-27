import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import royalnav from "../../../src/assets/bittronexaAsstes/logo.png";

const Header = () => {
  const { hash } = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const navigation = [
    { id: 1, title: "Services", url: "#services" },
    { id: 2, title: "Products", url: "#products" },
    { id: 3, title: "Learn", url: "#learn" },
    { id: 4, title: "Proof", url: "#proof" },
    { id: 5, title: "Blog", url: "#blog" },
  ];

  const toggleNavigation = () => {
    const nextState = !openNavigation;
    setOpenNavigation(nextState);
    nextState ? disablePageScroll() : enablePageScroll();
  };

  const handleClick = (url) => {
    setOpenNavigation(false);
    enablePageScroll();
    navigate(url);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-gray-800 bg-black/90 backdrop-blur-md 
      ${openNavigation ? "bg-black/95" : ""}`}
    >
      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 h-32 lg:h-28 py-5">
        <a href="#hero" className="block">
          <img
            src={royalnav}
            alt="Company Logo"
            className="lg:h-32 lg:w-32 h-28 w-32"
          />
        </a>

        <nav
          className={`${openNavigation ? "flex" : "hidden"
            } fixed top-[9rem] left-0 right-0 bottom-0 bg-black/95 
          lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.url);
                }}
                className={`block relative font-code md:text-5xl text-2xl uppercase text-gray-300 
                transition-colors hover:text-white px-6 py-10 md:py-12 
                lg:mr-0.25 lg:text-xl lg:font-semibold lg:leading-7 xl:px-12 cursor-pointer 
                ${item.url === hash ? "text-white" : ""}`}
              >
                {item.title}
              </a>
            ))}
          </div>
        </nav>

        <button
          onClick={() => navigate(token ? "/dashboard" : "/login")}
          className="hidden lg:flex items-center justify-center px-8 py-3 
          bg-[#22C55E] text-green-950 font-bold rounded-lg transition-colors duration-300 text-xl"
        >
          {token ? "Dashboard" : "Login"}
        </button>

        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => navigate(token ? "/dashboard" : "/login")}
            className="px-5 py-3 bg-[#22C55E] text-green-950 font-bold rounded-lg text-2xl"
          >
            {token ? "Dashboard" : "Login"}
          </button>

          <button
            onClick={toggleNavigation}
            className="flex items-center justify-center w-20 h-20 rounded-lg hover:bg-gray-900"
          >
            <span className="text-white text-4xl leading-none">☰</span>
          </button>
        </div>
      </div>

      {openNavigation && (
        <div className="lg:hidden bg-black/95 border-t border-gray-800">
          <nav className="flex flex-col px-5 py-6 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.url);
                }}
                className={`block px-6 py-4 text-5xl font-code uppercase text-gray-300 
                hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors 
                duration-300 ${item.url === hash ? "text-white" : ""}`}
              >
                {item.title}
              </a>
            ))}

            <button
              onClick={() => {
                navigate(token ? "/dashboard" : "/login");
                setOpenNavigation(false);
                enablePageScroll();
              }}
              className="mt-6 w-full px-8 py-5 bg-[#22C55E] text-green-950 
              font-extrabold rounded-xl text-4xl md:text-5xl uppercase tracking-widest 
              transition-all duration-300 hover:bg-green-500 hover:scale-105 shadow-lg"
            >
              {token ? "Dashboard" : "Login"}
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
