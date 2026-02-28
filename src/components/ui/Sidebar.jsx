// import { useEffect, useState } from "react";
// import "../../styles/Sidebar.css";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { SidebarContent } from "../../constants/content/SidebarContent";
// import { Link, useLocation } from "react-router-dom";
// import { AuthenticatedRoutes } from "../../constants/Routes";
// import { RiLogoutCircleRLine } from "react-icons/ri";
// import { Accordion } from "react-bootstrap";
// import { FaCaretRight } from "react-icons/fa";
// // import navLogo from "../../assets/website/nexoLogo1.png";
// // import nexoLogo1 from "../../screens/assets/brandsLogo/nexoLogo1.png";
// import nexoLogo2 from "../../screens/assets/brandsLogo/nexoLogo2.png";

// const Sidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [sideMenuList, setSideMenuList] = useState([]);
//   const [activeLink, setActiveLink] = useState(SidebarContent?.userAdmin?.[0]?.id);
//   const [expandedSection, setExpandedSection] = useState(null);
//   const [newNotification, setNewNotification] = useState(false); // 🔔 Notification flag

//   const location = useLocation();

//   useEffect(() => {
//     const role = localStorage.getItem("role");
//     if (role === "Admin") {
//       setSideMenuList(SidebarContent?.admin);
//     } else if (role === "User") {
//       setSideMenuList(SidebarContent?.user);
//     }
//   }, []);

//   const logoutHandler = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     const currentPath = location.pathname;
//     const activeLink = SidebarContent?.userAdmin?.find(
//       (item) => item.link === currentPath
//     )?.id;
//     if (activeLink) {
//       setActiveLink(activeLink);
//     }
//   }, [location.pathname]);

//   const handleLinkClick = (link, itemName) => {
//     setActiveLink(link);
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }

//     if (itemName?.toLowerCase() === "news and notification") {
//       setNewNotification(false); // 🔕 Stop blink on open
//     }
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // 🔁 Dummy notification trigger every 10s (replace with real API or WebSocket)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setNewNotification(true);
//     }, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className={`Sidebar ss-card ${isSidebarOpen ? "show" : "hide"}`} id="navbar">
//       <nav className="nav">
//         <div>
//           <Link to={AuthenticatedRoutes.USER_DASHBOARD} className="nav-logo">
//             <img src={nexoLogo2} alt="logo" className="nav-logo-icon scale-150" />
//           </Link>

//           <div className="nav-toggle" onClick={toggleSidebar}>
//             {isSidebarOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
//           </div>

//           <ul className="nav-list">
//             {sideMenuList?.map((item) => (
//               <li key={item?.id} className="nav-item">
//                 {item?.options ? (
//                   <Accordion activeKey={expandedSection === item?.id ? item?.id : null}>
//                     <Accordion.Item eventKey={item?.id}>
//                       <Accordion.Header
//                         className="nav-link"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setExpandedSection((prev) => (prev === item?.id ? null : item?.id));
//                         }}
//                       >
//                         {item?.icon}
//                         {item?.name}
//                       </Accordion.Header>
//                       <Accordion.Body>
//                         <ul className="nested-options">
//                           {item?.options.map((option) => (
//                             <li key={option?.id} className="nav-item">
//                               <Link
//                                 to={option?.link}
//                                 className={`nav-link ${activeLink === option?.id ? "active" : ""
//                                   } ${option?.name?.toLowerCase() === "news and notification" &&
//                                     newNotification
//                                     ? "blink"
//                                     : ""
//                                   }`}
//                                 onClick={() => handleLinkClick(option?.id, option?.name)}
//                               >
//                                 <FaCaretRight />
//                                 <span>{option?.name}</span>
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </Accordion.Body>
//                     </Accordion.Item>
//                   </Accordion>
//                 ) : (
//                   <Link
//                     to={item?.link}
//                     className={`nav-link ${activeLink === item?.id ? "active" : ""
//                       } ${item?.name?.toLowerCase() === "news and notification" && newNotification
//                         ? "blink"
//                         : ""
//                       }`}
//                     onClick={() => handleLinkClick(item?.id, item?.name)}
//                   >
//                     {item?.icon}
//                     <span className="nav-text">
//                       {item?.name?.charAt(0)?.toUpperCase() + item?.name?.slice(1)}
//                     </span>
//                   </Link>
//                 )}
//               </li>
//             ))}

//             <li className="nav-item">
//               <Link className="nav-link logout" onClick={logoutHandler}>
//                 <RiLogoutCircleRLine />
//                 <span className="nav-text">Logout</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;




// import React, { useEffect, useState } from "react";
// import "../../styles/Sidebar.css";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { SidebarContent } from "../../constants/content/SidebarContent";
// import { Link, useLocation } from "react-router-dom";
// import { AuthenticatedRoutes } from "../../constants/Routes";
// import { RiLogoutCircleRLine } from "react-icons/ri";
// import { Accordion } from "react-bootstrap";
// import { FaCaretRight } from "react-icons/fa";
// // import navLogo from "../../assets/website/nexoLogo1.png";
// // import nexoLogo1 from "../../screens/assets/brandsLogo/nexoLogo1.png";
// import nexoLogo2 from "../../screens/assets/brandsLogo/nexoLogo2.png";
// import royalnav from "../../assets/app/royalLogo.png"
// const Sidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [sideMenuList, setSideMenuList] = useState([]);
//   const [activeLink, setActiveLink] = useState(SidebarContent?.userAdmin?.[0]?.id);
//   const [expandedSection, setExpandedSection] = useState(null);
//   const [newNotification, setNewNotification] = useState(false); // 🔔 Notification flag

//   const location = useLocation();

//   useEffect(() => {
//     const role = localStorage.getItem("role");
//     if (role === "Admin") {
//       setSideMenuList(SidebarContent?.admin);
//     } else if (role === "User") {
//       setSideMenuList(SidebarContent?.user);
//     }
//   }, []);

//   const logoutHandler = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     const currentPath = location.pathname;
//     const activeLink = SidebarContent?.userAdmin?.find(
//       (item) => item.link === currentPath
//     )?.id;
//     if (activeLink) {
//       setActiveLink(activeLink);
//     }
//   }, [location.pathname]);

//   const handleLinkClick = (link, itemName) => {
//     setActiveLink(link);
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }

//     if (itemName?.toLowerCase() === "news and notification") {
//       setNewNotification(false); // 🔕 Stop blink on open
//     }
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // 🔁 Dummy notification trigger every 10s (replace with real API or WebSocket)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setNewNotification(true);
//     }, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className={`Sidebar ss-card ${isSidebarOpen ? "show" : "hide"}`} id="navbar">
//       <nav className="nav">
//         <div>
//           <Link to={AuthenticatedRoutes.USER_DASHBOARD} className="nav-logo">
//             <img src={royalnav} alt="logo" className="h-40 w-40" />
//           </Link>

//           <div className="nav-toggle" onClick={toggleSidebar}>
//             {isSidebarOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
//           </div>

//           <ul className="nav-list">
//             {sideMenuList?.map((item) => (
//               <li key={item?.id} className="nav-item">
//                 {item?.options ? (
//                   <Accordion activeKey={expandedSection === item?.id ? item?.id : null}>
//                     <Accordion.Item eventKey={item?.id}>
//                       <Accordion.Header
//                         className="nav-link"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setExpandedSection((prev) => (prev === item?.id ? null : item?.id));
//                         }}
//                       >
//                         <span style={{ display: 'inline-flex', alignItems: 'center' }}>
//                           {React.cloneElement(item?.icon, { style: { color: 'inherit', fill: 'currentColor' } })}
//                         </span>
//                         {item?.name}
//                       </Accordion.Header>
//                       <Accordion.Body>
//                         <ul className="nested-options">
//                           {item?.options.map((option) => (
//                             <li key={option?.id} className="nav-item !hover:text-black">
//                               <Link
//                                 to={option?.link}
//                                 className={`nav-link ${activeLink === option?.id ? "active" : ""
//                                   } ${option?.name?.toLowerCase() === "news and notification" &&
//                                     newNotification
//                                     ? "blink"
//                                     : ""
//                                   }`}
//                                 onClick={() => handleLinkClick(option?.id, option?.name)}
//                               >
//                                 <FaCaretRight />
//                                 <span>{option?.name}</span>
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </Accordion.Body>
//                     </Accordion.Item>
//                   </Accordion>
//                 ) : (
//                   <Link
//                     to={item?.link}
//                     className={`nav-link ${activeLink === item?.id ? "active" : ""
//                       } ${item?.name?.toLowerCase() === "news and notification" && newNotification
//                         ? "blink"
//                         : ""
//                       }`}
//                     onClick={() => handleLinkClick(item?.id, item?.name)}
//                   >
//                     <span style={{ display: 'inline-flex', alignItems: 'center' }}>
//                       {React.cloneElement(item?.icon, { style: { color: 'inherit', fill: 'currentColor' } })}
//                     </span>
//                     <span >
//                       {item?.name?.charAt(0)?.toUpperCase() + item?.name?.slice(1)}
//                     </span>
//                   </Link>
//                 )}
//               </li>
//             ))}

//             <li className="">
//               <Link className="flex items-center gap-3  text-2xl  !text-red-600 !hover:bg-red-500 p-2" onClick={logoutHandler}>
//                 <RiLogoutCircleRLine className="!text-red-600 text-3xl hover:!text-red-500" />
//                 <span>Logout</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;



// import React, { useEffect, useState } from "react";
// import "../../styles/Sidebar.css";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { SidebarContent } from "../../constants/content/SidebarContent";
// import { Link, useLocation } from "react-router-dom";
// import { AuthenticatedRoutes } from "../../constants/Routes";
// import { RiLogoutCircleRLine } from "react-icons/ri";
// import { Accordion } from "react-bootstrap";
// import royalnav from "../../assets/app/royalLogo.png";

// const Sidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [sideMenuList, setSideMenuList] = useState([]);
//   const [activeLink, setActiveLink] = useState(null);
//   const [expandedSection, setExpandedSection] = useState(null);
//   const [newNotification, setNewNotification] = useState(false);

//   const location = useLocation();

//   useEffect(() => {
//     const role = localStorage.getItem("role");
//     if (role === "Admin") {
//       setSideMenuList(SidebarContent?.admin);
//     } else if (role === "User") {
//       setSideMenuList(SidebarContent?.user);
//     }
//   }, []);

//   const logoutHandler = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     const currentPath = location.pathname;

//     // Find active link in main items or nested options
//     let foundActiveLink = null;
//     sideMenuList?.forEach((item) => {
//       if (item.link === currentPath) {
//         foundActiveLink = item.id;
//       } else if (item.options) {
//         item.options.forEach((option) => {
//           if (option.link === currentPath) {
//             foundActiveLink = option.id;
//             setExpandedSection(item.id);
//           }
//         });
//       }
//     });

//     if (foundActiveLink) {
//       setActiveLink(foundActiveLink);
//     }
//   }, [location.pathname, sideMenuList]);

//   const handleLinkClick = (linkId, itemName) => {
//     setActiveLink(linkId);
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }

//     if (itemName?.toLowerCase()?.includes("notification")) {
//       setNewNotification(false);
//     }
//   };

//   const handleAccordionClick = (itemId) => {
//     setExpandedSection((prev) => (prev === itemId ? null : itemId));
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Dummy notification trigger every 10s
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setNewNotification(true);
//     }, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   // Group menu items by section
//   const groupedMenuItems = {
//     main: sideMenuList?.slice(0, 5) || [],
//     components: sideMenuList?.slice(2, -1) || [],
//     others: sideMenuList?.slice(-1) || []
//   };

//   const renderMenuItem = (item) => {
//     const isNotificationItem = item?.name?.toLowerCase()?.includes("notification");
//     const hasNotification = isNotificationItem && newNotification;

//     if (item?.options) {
//       return (
//         <Accordion 
//           key={item?.id} 
//           activeKey={expandedSection === item?.id ? item?.id : null}
//         >
//           <Accordion.Item eventKey={item?.id}>
//             <Accordion.Header
//               onClick={() => handleAccordionClick(item?.id)}
//               className={expandedSection === item?.id ? "expanded" : ""}
//             >
//               {item?.icon}
//               <span className="nav-text">{item?.name}</span>
//             </Accordion.Header>
//             <Accordion.Body>
//               <ul className="nested-options">
//                 {item?.options.map((option) => {
//                   const isOptionNotification = option?.name?.toLowerCase()?.includes("notification");
//                   const hasOptionNotification = isOptionNotification && newNotification;

//                   return (
//                     <li key={option?.id} className="nav-item">
//                       <Link
//                         to={option?.link}
//                         className={`nav-link ${
//                           activeLink === option?.id ? "active" : ""
//                         } ${hasOptionNotification ? "blink" : ""}`}
//                         onClick={() => handleLinkClick(option?.id, option?.name)}
//                       >
//                         <span className="nav-text">{option?.name}</span>
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </Accordion.Body>
//           </Accordion.Item>
//         </Accordion>
//       );
//     }

//     return (
//       <li key={item?.id} className="nav-item">
//         <Link
//           to={item?.link}
//           className={`nav-link ${activeLink === item?.id ? "active" : ""} ${
//             hasNotification ? "blink" : ""
//           }`}
//           onClick={() => handleLinkClick(item?.id, item?.name)}
//         >
//           {item?.icon}
//           <span className="nav-text">{item?.name}</span>
//         </Link>
//       </li>
//     );
//   };

//   return (
//     <div className={`Sidebar  ${isSidebarOpen ? "show" : "hide"}`} id="navbar">
//       <nav className="nav">
//         <div>
//           <Link to={AuthenticatedRoutes.USER_DASHBOARD} className="nav-logo">
//             <img src={royalnav} alt="logo" className="h-40 w-40" />
//           </Link>

//           <div className="nav-toggle" onClick={toggleSidebar}>
//             {isSidebarOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
//           </div>

//           <div>
//             {/* Main Section */}
//             <div className="nav-section-title">Main</div>
//             <ul className="nav-list">
//               {groupedMenuItems.main.map((item) => renderMenuItem(item))}
//             </ul>

//             {/* Components Section */}
//             {groupedMenuItems.components.length > 0 && (
//               <>
//                 <div className="nav-section-title">Components</div>
//                 <ul className="nav-list">
//                   {groupedMenuItems.components.map((item) => renderMenuItem(item))}
//                 </ul>
//               </>
//             )}

//             {/* Others Section */}
//             {groupedMenuItems.others.length > 0 && (
//               <>
//                 <div className="nav-section-title">Others</div>
//                 <ul className="nav-list">
//                   {groupedMenuItems.others.map((item) => renderMenuItem(item))}
//                 </ul>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Logout Button */}
//         <div>
//           <Link to="#" className="logout-link" onClick={logoutHandler}>
//             <RiLogoutCircleRLine />
//             <span className="nav-text">Logout</span>
//           </Link>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useEffect, useState } from "react";
import "../../styles/Sidebar.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SidebarContent } from "../../constants/content/SidebarContent";
import { Link, useLocation } from "react-router-dom";
import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
import { RiLogoutCircleRLine } from "react-icons/ri";
import royalnav from "../../assets/bittronexaAsstes/logo.png";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sideMenuList, setSideMenuList] = useState([]);
  const [activeLink, setActiveLink] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [newNotification, setNewNotification] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem("role");
    setSideMenuList(
      role === "Admin" ? SidebarContent.admin : SidebarContent.user
    );
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;

    sideMenuList.forEach((section) => {
      section.items?.forEach((item) => {
        if (item.link === currentPath) {
          setActiveLink(item.id);
        }
        item.options?.forEach((opt) => {
          if (opt.link === currentPath) {
            setActiveLink(opt.id);
            setExpandedSection(item.id);
          }
        });
      });
    });
  }, [location.pathname, sideMenuList]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleAccordionClick = (id) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  const handleLinkClick = (id, name) => {
    setActiveLink(id);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
    if (name?.toLowerCase().includes("notification")) {
      setNewNotification(false);
    }
  };

  const logoutHandler = () => {
    const role = localStorage.getItem("role");
    if (role === "Admin") {
      localStorage.clear();
      navigate("/admin/gateway/secure/9f3a7c-admin/auth");
      window.location.reload();
    } else {
      localStorage.clear();
      navigate("/login");
      window.location.reload();
    }
  };

  useEffect(() => {
    const t = setInterval(() => setNewNotification(true), 10000);
    return () => clearInterval(t);
  }, []);

  const renderMenuItem = (item) => {
    const isOpen = expandedSection === item.id;
    const isNotification =
      item?.name?.toLowerCase()?.includes("notification") && newNotification;

    if (item.options) {
      return (
        <li key={item.id} className="nav-item">
          <div
            className={`nav-link ${isOpen ? "expanded" : ""}`}
            onClick={() => handleAccordionClick(item.id)}
          >
            {item.icon}
            <span className="nav-text">{item.name}</span>
            <span className="caret-icon">›</span>
          </div>

          <div className={`custom-accordion-body ${isOpen ? "open" : ""}`}>
            <ul className="nested-options">
              {item.options.map((opt) => (
                <li key={opt.id} className="nav-item">
                  <Link
                    to={opt.link}
                    className={`nav-link ${activeLink === opt.id ? "active" : ""
                      }`}
                    onClick={() => handleLinkClick(opt.id, opt.name)}
                  >
                    <span className="nav-text">{opt.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      );
    }

    return (
      <li key={item.id} className="nav-item">
        <Link
          to={item.link}
          className={`nav-link ${activeLink === item.id ? "active" : ""
            } ${isNotification ? "blink" : ""}`}
          onClick={() => handleLinkClick(item.id, item.name)}
        >
          {item.icon}
          <span className="nav-text">{item.name}</span>
        </Link>
      </li>
    );
  };



  const adminToken = localStorage.getItem("adminToken");
  const adminRole = localStorage.getItem("adminRole");
  const backToAdmin = () => {
    if (!adminToken || !adminRole) {
      alert("Admin session not found");
      return;
    }
    localStorage.clear();
    localStorage.setItem("token", adminToken);
    localStorage.setItem("role", adminRole);

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    localStorage.removeItem("isImpersonating");
    window.location.reload();
  };

  return (
    <div className={`Sidebar ${isSidebarOpen ? "show" : "hide"}`}>
      <nav className="nav">
        <div className="nav-scroll">
          <Link to={AuthenticatedRoutes.USER_DASHBOARD} className="nav-logo">
            <img src={royalnav} alt="logo" />
          </Link>

          <div className="nav-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </div>

          {sideMenuList.map((section) => (
            <React.Fragment key={section.title}>
              <div className="nav-section-title">{section.title}</div>
              <ul className="nav-list">
                {section.items.map((item) => renderMenuItem(item))}
              </ul>
            </React.Fragment>
          ))}
        </div>

        {
          adminRole === "Admin" && adminToken ? (
            <div>
              <Link to="#" className="logout-link" onClick={backToAdmin}>
                <RiLogoutCircleRLine size={20} />
                <span className="nav-text">Back To Admin</span>
              </Link>
            </div>
          ) : (
            <Link className="logout-link" onClick={logoutHandler}>
              <RiLogoutCircleRLine size={20} />
              <span className="nav-text">Logout</span>
            </Link>
          )
        }
      </nav>
    </div>
  );
};

export default Sidebar;
