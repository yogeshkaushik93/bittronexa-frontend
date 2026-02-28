// import React, { useEffect, useRef, useState } from "react";
// import Tree from "react-d3-tree";
// import { getUserTreeData } from "../../api/user-api";
// import PageLoader from "../../components/ui/PageLoader";
// import { Link, Wallet, Zap } from "lucide-react";

// const defaultAvatar = "https://img.icons8.com/3d-fluency/94/guest-male--v2.png";

// const TeamTree = () => {
//   const treeContainer = useRef(null);
//   const treeRef = useRef(null);
//   const [hoveredNode, setHoveredNode] = useState(null);
//   const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [treeData, setTreeData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const touchStartRef = useRef(0);

//   // 🌳 Convert left/right backend structure into D3 format
//   const formatBinaryTree = (node) => {
//     if (!node) return null;
//     return {
//       id: node.id,
//       name: node.name || "N/A",
//       username: node.username || "N/A",
//       position: node.position || "N/A",
//       attributes: {
//         Referral: node.referralCode || "N/A",
//         Investment: node.investment || 0,
//         Status: node.status ? "Active" : "Inactive",
//         Earnings: node.totalEarnings || 0,
//       },
//       fullChildren: [node.left, node.right].filter(Boolean).map(formatBinaryTree),
//       children: [],
//       isExpanded: false,
//     };
//   };

//   // 🔥 Fetch real data from API
//   const fetchTeamTree = async () => {
//     try {
//       setLoading(true);
//       const response = await getUserTreeData();
//       if (response?.success && response?.tree) {
//         const formatted = formatBinaryTree(response.tree);
//         setTreeData(formatted);
//       }
//     } catch (error) {
//       console.error("Error fetching team tree:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTeamTree();
//   }, []);

//   useEffect(() => {
//     if (treeContainer.current) {
//       const { width } = treeContainer.current.getBoundingClientRect();
//       setTranslate({ x: width / 2, y: 100 });
//     }
//   }, [treeData]);

//   useEffect(() => {
//     const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
//     checkIsMobile();
//     window.addEventListener("resize", checkIsMobile);
//     return () => window.removeEventListener("resize", checkIsMobile);
//   }, []);

//   // 🧠 Node hover tooltip
//   const handleMouseEnter = (event, nodeDatum) => {
//     if (isMobile) return;
//     const bounds = event.target.getBoundingClientRect();
//     setTooltipPosition({
//       x: bounds.x + window.scrollX + 30,
//       y: bounds.y + window.scrollY - 80,
//     });
//     setHoveredNode(nodeDatum);
//   };

//   const handleMouseLeave = () => setHoveredNode(null);

//   // 🌿 Expand/collapse logic
//   const toggleNodeExpansion = (nodeId) => {
//     const newData = JSON.parse(JSON.stringify(treeData));

//     const toggleHelper = (node) => {
//       if (node.id === nodeId) {
//         node.isExpanded = !node.isExpanded;
//         node.children = node.isExpanded ? node.fullChildren : [];
//       } else {
//         node.children?.forEach(toggleHelper);
//         node.fullChildren?.forEach(toggleHelper);
//       }
//     };

//     toggleHelper(newData);
//     setTreeData(newData);
//   };

//   // 🌸 Custom node render with avatar + circle + info
//   const renderCustomNode = ({ nodeDatum }) => {
//     const isActive = nodeDatum.attributes?.Status === "Active";
//     const statusColor = isActive ? "#22c55e" : "#ef4444"; // green/red
//     const defaultAvatar =
//       nodeDatum.profileImage ||
//       "https://img.icons8.com/3d-fluency/94/guest-male--v2.png";

//     return (
//       <g
//         onTouchStart={() => (touchStartRef.current = Date.now())}
//         onClick={(e) => {
//           if (isMobile && Date.now() - touchStartRef.current < 300) return;
//           toggleNodeExpansion(nodeDatum.id);
//         }}
//         onMouseEnter={(e) => handleMouseEnter(e, nodeDatum)}
//         onMouseLeave={handleMouseLeave}
//         style={{ cursor: "pointer" }}
//       >
//         {/* Glow background */}
//         <circle
//           r={34}
//           fill="rgba(56,189,248,0.15)"
//         />

//         {/* Profile image circle */}
//         <defs>
//           <clipPath id={`clip-${nodeDatum.id}`}>
//             <circle r={26} cx={0} cy={0} />
//           </clipPath>
//         </defs>

//         {/* Avatar image */}
//         <image
//           href={defaultAvatar}
//           width={52}
//           height={52}
//           x={-26}
//           y={-26}
//           clipPath={`url(#clip-${nodeDatum.id})`}
//         />

//         {/* Name text */}
//         <text
//           textAnchor="middle"
//           y={50}
//           fontSize={13}
//           fill="#ffffff"
//           fontWeight="500"
//           stroke="none"
//         >
//           {nodeDatum.name || "N/A"} 
//         </text>

//         {/* Username text */}
//         <text
//           textAnchor="middle"
//           y={64}
//           fontSize={13}
//           fill="#ffffff"
//           fontWeight="600"
//           stroke="none"
//         >
//           {nodeDatum.username || "N/A"} ( {nodeDatum.position?.toUpperCase() || "N/A"} )
//         </text>


//         {/* Status text */}
//         <text
//           textAnchor="middle"
//           y={78}
//           fontSize={11}
//           fill={statusColor}
//           fontWeight="500"
//           stroke="none"
//         >
//           {nodeDatum.attributes?.Status || "Inactive"}
//         </text>
//       </g>
//     );
//   };


//   const findNode = (node, term) => {
//     if (node.name.toLowerCase().includes(term.toLowerCase())) return node;
//     for (let child of node.fullChildren || []) {
//       const res = findNode(child, term);
//       if (res) return res;
//     }
//     return null;
//   };


//   if (loading) return <PageLoader />;

//   if (!treeData) return <p className="text-center mt-6">No team data found.</p>;

//   return (
//     <div
//       // className="bg-gray-300 rounded-lg"
//       style={{ width: "100%", height: "100vh", position: "relative" }}
//       ref={treeContainer}
//     >
//       {/* Header Controls */}
//       <div className="flex flex-col lg:flex-row items-center justify-between text-xl gap-2 mt-5">
//         <h1></h1>
//       </div>

//       {/* Tooltip */}
//       {hoveredNode && (
//         <div
//           style={{
//             position: "absolute",
//             top: tooltipPosition.y,
//             left: tooltipPosition.x,
//             background: "white",
//             padding: "10px",
//             border: "1px solid #ccc",
//             borderRadius: "10px",
//             zIndex: 999,
//             boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//             width: "220px",
//           }}
//         >
//           <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
//             <div className="rounded-full border !border-gray-700 p-2 bg-gray-300">
//               <img
//                 src={defaultAvatar}
//                 className="h-32 w-32"
//                 alt="profile"
//               />
//             </div>
//             <strong className="text-black text-2xl">{hoveredNode.name}</strong>
//           </div>
//           <div className="text-center text-lg text-black">
//             <span className="flex items-center gap-2"><Link className="h-6 w-6 text-[var(--cyan-active)]" /> <strong>Referral Code:</strong> {hoveredNode.attributes?.Referral} <br /></span>
//             <span className="flex items-center gap-2"><Wallet className="h-6 w-6 text-[var(--cyan-active)]" /> <strong>Earnings:</strong> {hoveredNode.attributes?.Earnings} <br /></span>
//             <span className="flex items-center gap-2"><Zap className="h-6 w-6 text-[var(--cyan-active)]" /> <strong>Status:</strong> {hoveredNode.attributes?.Status}</span>
//           </div>
//         </div>
//       )}

//       {/* Tree */}
//       {treeData && (
//         <Tree
//           ref={treeRef}
//           data={treeData}
//           translate={translate}
//           zoom={zoom}
//           zoomable
//           orientation="vertical"
//           renderCustomNodeElement={renderCustomNode}
//           pathFunc="step"
//           separation={{ siblings: 1.5, nonSiblings: 2 }}
//           pathClassFunc={() => "custom-link"}
//         />
//       )}

//       <style jsx>
//         {`
//           .custom-link path {
//   stroke: #ffffff !important;   /* pure white */
//   stroke-width: 2px;
//   opacity: 0.9;
// }
//         `}
//       </style>
//     </div>
//   );
// };

// export default TeamTree;



import React, { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { getUserTreeData } from "../../api/user-api";
import PageLoader from "../../components/ui/PageLoader";
import { Link, Wallet, Zap } from "lucide-react";

const defaultAvatar = "https://img.icons8.com/3d-fluency/94/guest-male--v2.png";

const TeamTree = () => {
  const treeContainer = useRef(null);
  const treeRef = useRef(null);

  const [hoveredNode, setHoveredNode] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const initialTranslateRef = useRef({ x: 0, y: 0 }); // for reset
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartRef = useRef(0);

  // 🌳 Convert left/right backend structure into D3 format
  const formatBinaryTree = (node) => {
    if (!node) return null;
    return {
      id: node.id,
      name: node.name || "N/A",
      username: node.username || "N/A",
      position: node.position || "N/A",
      attributes: {
        Referral: node.referralCode || "N/A",
        Investment: node.investment || 0,
        Status: node.isVerified ? "Active" : "Inactive",
        Earnings: node.totalEarnings || 0,
      },
      fullChildren: [node.left, node.right].filter(Boolean).map(formatBinaryTree),
      children: [],
      isExpanded: false,
    };
  };

  // 🔥 Fetch real data from API
  const fetchTeamTree = async () => {
    try {
      setLoading(true);
      const response = await getUserTreeData();
      if (response?.success && response?.tree) {
        const formatted = formatBinaryTree(response.tree);
        setTreeData(formatted);
      }
    } catch (error) {
      console.error("Error fetching team tree:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamTree();
  }, []);

  // center translate after data mount/resize
  useEffect(() => {
    const setCenterTranslate = () => {
      if (!treeContainer.current || !treeData) return;
      const { width } = treeContainer.current.getBoundingClientRect();
      const next = {
        x: width / 2,     // ← Ye change kiya (pehle shayad width/4 tha ya galat)
        y: 120            // ← Top se perfect distance
      };
      setTranslate(next);
      initialTranslateRef.current = next;
    };
    setCenterTranslate();
    window.addEventListener("resize", setCenterTranslate);
    return () => window.removeEventListener("resize", setCenterTranslate);
  }, [treeData]);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // 🧠 Node hover tooltip
  const handleMouseEnter = (event, nodeDatum) => {
    if (isMobile) return;
    const bounds = event.target.getBoundingClientRect();
    setTooltipPosition({
      x: bounds.x + window.scrollX + 30,
      y: bounds.y + window.scrollY - 80,
    });
    setHoveredNode(nodeDatum);
  };
  const handleMouseLeave = () => setHoveredNode(null);

  // 🌿 Expand/collapse logic
  const toggleNodeExpansion = (nodeId) => {
    const newData = JSON.parse(JSON.stringify(treeData));
    const toggleHelper = (node) => {
      if (node.id === nodeId) {
        node.isExpanded = !node.isExpanded;
        node.children = node.isExpanded ? node.fullChildren : [];
      } else {
        node.children?.forEach(toggleHelper);
        node.fullChildren?.forEach(toggleHelper);
      }
    };
    toggleHelper(newData);
    setTreeData(newData);
  };

  // 🌸 Custom node render with avatar + circle + info (UI unchanged)
  const renderCustomNode = ({ nodeDatum }) => {
    console.log("avatar", nodeDatum)
    const isActive = nodeDatum?.attributes?.Status == "Active" ? true : false;
    const statusColor = isActive ? "#22c55e" : "#ef4444"; // green/red
    const avatar =
      nodeDatum.profileImage ||
      "https://img.icons8.com/3d-fluency/94/guest-male--v2.png";

    return (
      <g
        onTouchStart={() => (touchStartRef.current = Date.now())}
        onClick={() => {
          if (isMobile && Date.now() - touchStartRef.current < 300) return;
          toggleNodeExpansion(nodeDatum.id);
        }}
        onMouseEnter={(e) => handleMouseEnter(e, nodeDatum)}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: "pointer" }}
      >
        {/* Glow background */}
        <circle r={34} fill="rgba(56,189,248,0.15)" />
        {/* Profile image circle */}
        <defs>
          <clipPath id={`clip-${nodeDatum.id}`}>
            <circle r={26} cx={0} cy={0} />
          </clipPath>
        </defs>
        {/* Avatar image */}
        <image
          href={avatar}
          width={52}
          height={52}
          x={-26}
          y={-26}
          clipPath={`url(#clip-${nodeDatum.id})`}
        />
        {/* Name text */}
        <text textAnchor="middle" y={50} fontSize={13} fill="#ffffff" fontWeight="500" stroke="none">
          {nodeDatum.name || "N/A"}
        </text>
        {/* Username text */}
        <text textAnchor="middle" y={64} fontSize={13} fill="#ffffff" fontWeight="600" stroke="none">
          {nodeDatum.username || "N/A"} ( {nodeDatum.position?.toUpperCase() || "N/A"} )
        </text>
        {/* Status text */}
        <text textAnchor="middle" y={78} fontSize={11} fill={statusColor} fontWeight="500" stroke="none">
          {nodeDatum.attributes?.Status || "Inactive"}
        </text>
      </g>
    );
  };

  const findNode = (node, term) => {
    if (node.name.toLowerCase().includes(term.toLowerCase())) return node;
    for (let child of node.fullChildren || []) {
      const res = findNode(child, term);
      if (res) return res;
    }
    return null;
  };

  // 🔄 Reset zoom/pan
  const resetView = () => {
    setZoom(1);
    setTranslate(initialTranslateRef.current);
  };

  // show reset button only when moved from initial
  const isMovedFromInitial =
    Math.abs(zoom - 1) > 0.0001 ||
    Math.abs(translate.x - initialTranslateRef.current.x) > 0.5 ||
    Math.abs(translate.y - initialTranslateRef.current.y) > 0.5;

  if (loading) return <PageLoader />;
  if (!treeData) return <p className="text-center mt-6">No team data found.</p>;

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden", // prevent screen from "struct"/shifting during zoom/pan
      }}
      ref={treeContainer}
    >
      {/* Header Controls (left empty to keep UI same) */}
      <div className="flex flex-col lg:flex-row items-center justify-between text-xl gap-2 mt-5">
        <h1></h1>
      </div>

      {/* Tooltip */}
      {hoveredNode && (
        <div
          style={{
            position: "absolute",
            top: tooltipPosition.y,
            left: tooltipPosition.x,
            background: "white",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            zIndex: 999,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            width: "220px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
            <div className="rounded-full border !border-gray-700 p-2 bg-gray-300">
              <img src={defaultAvatar} className="h-32 w-32" alt="profile" />
            </div>
            <strong className="text-black text-2xl">{hoveredNode.name}</strong>
          </div>
          <div className="text-center text-lg text-black">
            <span className="flex items-center gap-2">
              <Link className="h-6 w-6 text-[var(--cyan-active)]" /> <strong>Referral Code:</strong>{" "}
              {hoveredNode.attributes?.Referral} <br />
            </span>
            <span className="flex items-center gap-2">
              <Wallet className="h-6 w-6 text-[var(--cyan-active)]" /> <strong>Earnings:</strong>{" "}
              {hoveredNode.attributes?.Earnings} <br />
            </span>
            <span className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-[var(--cyan-active)]" /> <strong>Status:</strong>{" "}
              {hoveredNode.attributes?.Status}
            </span>
          </div>
        </div>
      )}

      {/* 🔍 Absolute reset button (appears only when zoom/pan changed) */}
      {isMovedFromInitial && (
        <button
          onClick={resetView}
          aria-label="Reset zoom"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 1000,
            width: 36,
            height: 36,
            lineHeight: "36px",
            textAlign: "center",
            borderRadius: "9999px",
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)",
            cursor: "pointer",
            userSelect: "none",
          }}
          title="Reset zoom"
          className="text-4xl"
        >
          ×
        </button>
      )}

      {/* Tree */}
      {treeData && (
        <Tree
          ref={treeRef}
          data={treeData}
          translate={translate}
          zoom={zoom}
          zoomable
          orientation="vertical"
          renderCustomNodeElement={renderCustomNode}
          pathFunc="step"
          separation={{ siblings: 1.5, nonSiblings: 2 }}
          pathClassFunc={() => "custom-link"}
          // ✅ Limit zoom range to avoid layout breaking
          scaleExtent={{ min: 0.4, max: 2.5 }}
          // ✅ Keep React state in sync with internal pan/zoom — prevents "struct"
          onUpdate={(treeState) => {
            // treeState = { translate: {x,y}, zoom, ... }
            if (treeState?.translate) setTranslate(treeState.translate);
            if (typeof treeState?.zoom === "number") setZoom(treeState.zoom);
          }}
        />
      )}

      <style jsx>{`
        .custom-link path {
          stroke: #ffffff !important; /* pure white */
          stroke-width: 2px;
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default TeamTree;
