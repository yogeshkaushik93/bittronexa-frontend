// /* eslint-disable react/prop-types */
// import sideImg from "../../assets/auth/sideImg.png";
// import bgVideo from "../../assets/website/bgVideo.mp4";
// import bgImg from "../../assets/authh.png"
// import "../../styles/auth/AuthMain.css";
// import img from "../../assets/auth/bgfor.jpg"
// import cyber from "../../assets/auth/cyber.png"
// import royalLogo from "../../assets/bittronexaAsstes/logo.png"

// const AuthMain = ({ inner }) => {
//   return (
//     <div className="AuthMain1 bgColor ">
//       {/* <video autoPlay loop muted playsInline>
//         <source src={bgVideo} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video> */}
     
//       <div
//         data-aos="fade-right"
//         className="AuthMain"
//       style={{ backgroundImage: `url(${img}) ` }}
//       >
//         <div className="auth-inner md:px-10 ">
//           <div className="  hidden md:block items-center justify-center">
//             <img src={royalLogo} className="h-[40rem] w-[40rem]" alt="" />
//           </div>
//           <div className="md:ml-24 p-4">
//             {inner}
//             <div data-aos="fade-left" className="side-img">
//               {/* <img src={sideImg} alt="" /> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthMain;



/* eslint-disable react/prop-types */
import img from "../../assets/auth/bgfor.jpg";
import royalLogo from "../../assets/bittronexaAsstes/logo.png";
import "../../styles/auth/AuthMain.css";
import cloueFare from "../../screens/assets/cloudefarepng.png"
const AuthMain = ({ inner }) => {
  return (
    <div className="AuthMain1 bgColor">
      <div
        data-aos="fade-right"
        className="AuthMain"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="auth-inner md:px-10 flex flex-col md:flex-row items-center">
          
          {/* ✅ MOBILE LOGO (top) */}
          {/* <div className="md:hidden w-full flex justify-center mb-4">
            <img
              src={royalLogo}
              alt="logo"
              className="h-96 w-96 object-contain"
            />
          </div> */}

          {/* ✅ DESKTOP LOGO (left side, big) */}
          <div className="hidden md:flex items-center justify-center">
            <img
              src={royalLogo}
              alt="logo"
              className="h-[40rem] w-[40rem] object-contain"
            />
          </div>
{/* <img src={cloueFare} alt="" /> */}
          {/* ✅ FORM / INNER CONTENT */}
          <div className="md:ml-24 p-4 w-full md:w-auto">
            {inner}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthMain;
