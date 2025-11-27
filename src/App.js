import React, { useState } from "react";
import {
  Dna,
  Zap,
  Circle,
  Shield,
  Box,
  Flower2,
  Layers,
  User,
  X,
  Heart,
  Link,
  Leaf,
  MousePointerClick,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

// --- 資料區 ---

const cellData = {
  animal: {
    name: "動物細胞",
    shape: "rounded-full",
    layers: [
      {
        id: "membrane",
        name: "細胞膜",
        color: "bg-blue-400 border-4 border-blue-500",
        z: 10,
        desc: "最外層的守門員！控制物質進出，保護細胞內部。",
      },
      {
        id: "cytoplasm",
        name: "細胞質",
        color: "bg-pink-100",
        z: 20,
        desc: "細胞內部的膠狀基質，許多化學反應都在這裡發生。",
      },
    ],
    organelles: [
      {
        id: "nucleus",
        name: "細胞核",
        icon: <Dna size={24} />,
        pos: { top: "35%", left: "35%" },
        color: "bg-purple-400",
        desc: "細胞的大腦！含有遺傳物質 DNA，控制細胞的所有活動。",
      },
      {
        id: "mitochondria",
        name: "粒線體",
        icon: <Zap size={20} />,
        pos: { bottom: "25%", left: "25%" },
        color: "bg-orange-400",
        desc: "細胞的發電廠！負責產生能量，讓細胞有活力。",
      },
      {
        id: "vacuole_small",
        name: "液泡 (小)",
        icon: <Box size={16} />,
        pos: { top: "25%", right: "25%" },
        color: "bg-blue-300",
        desc: "負責儲存水分和廢物。動物細胞的液泡比較小，而且有多個。",
      },
      {
        id: "vacuole_small_2",
        name: "液泡 (小)",
        icon: <Box size={12} />,
        pos: { bottom: "30%", right: "40%" },
        color: "bg-blue-300",
        desc: "另一個小液泡。",
      },
    ],
  },
  plant: {
    name: "植物細胞",
    shape: "rounded-3xl",
    layers: [
      {
        id: "wall",
        name: "細胞壁",
        color: "bg-green-700 border-4 border-green-800",
        z: 5,
        desc: "【植物專屬】最外層的堅硬盔甲！由纖維素組成，保護並支撐細胞形狀。",
      },
      {
        id: "membrane",
        name: "細胞膜",
        color: "bg-blue-400",
        z: 10,
        desc: "在細胞壁裡面，一樣負責控制物質進出喔！",
      },
      {
        id: "cytoplasm",
        name: "細胞質",
        color: "bg-green-100",
        z: 20,
        desc: "充滿葉綠體和水分的內部空間。",
      },
    ],
    organelles: [
      {
        id: "vacuole_large",
        name: "大液泡",
        icon: <Circle size={56} />,
        pos: { top: "15%", right: "15%" },
        color: "bg-blue-200/80",
        desc: "【植物專屬】超大儲水庫！充滿水分時可以支撐植物，讓它不會枯萎。常常把細胞核擠到旁邊。",
      },
      {
        id: "nucleus",
        name: "細胞核",
        icon: <Dna size={24} />,
        pos: { top: "20%", left: "15%" },
        color: "bg-purple-400",
        desc: "細胞的大腦！但在植物細胞中，常被大液泡擠到邊邊。",
      },
      {
        id: "chloroplast",
        name: "葉綠體",
        icon: <Flower2 size={20} />,
        pos: { bottom: "20%", right: "30%" },
        color: "bg-green-500",
        desc: "【植物專屬】植物的廚房！裡面有葉綠素，進行光合作用製造養分。",
      },
      {
        id: "chloroplast_2",
        name: "葉綠體",
        icon: <Flower2 size={18} />,
        pos: { bottom: "40%", left: "20%" },
        color: "bg-green-500",
        desc: "另一個葉綠體，努力工作中！",
      },
      {
        id: "mitochondria",
        name: "粒線體",
        icon: <Zap size={20} />,
        pos: { bottom: "15%", left: "50%" },
        color: "bg-orange-400",
        desc: "植物也要呼吸！粒線體負責提供能量。",
      },
    ],
  },
};

const hierarchyData = [
  {
    level: 1,
    title: "細胞 (Cell)",
    color: "bg-blue-100",
    animal: {
      example: "口腔皮膜細胞",
      icon: <Circle size={16} />,
      desc: "不規則形狀",
    },
    plant: {
      example: "葉表皮細胞",
      icon: <Box size={16} />,
      desc: "有細胞壁，形狀固定",
    },
  },
  {
    level: 2,
    title: "組織 (Tissue)",
    color: "bg-yellow-100",
    animal: {
      example: "皮膜組織",
      icon: <Layers size={16} />,
      desc: "保護功能",
    },
    plant: {
      example: "表皮組織",
      icon: <Layers size={16} />,
      desc: "保護植物體",
    },
  },
  {
    level: 3,
    title: "器官 (Organ)",
    color: "bg-orange-100",
    animal: {
      example: "胃 (Stomach)",
      icon: <Heart size={16} />,
      desc: "特定機能",
    },
    plant: { example: "葉 (Leaf)", icon: <Leaf size={16} />, desc: "營養器官" },
  },
  {
    level: 4,
    title: "器官系統 (System)",
    color: "bg-red-100",
    isSpecial: true,
    animal: { example: "消化系統", icon: <Link size={16} />, desc: "分工合作" },
    plant: {
      example: "無此層次！",
      icon: <X size={16} />,
      desc: "植物沒有系統",
      isMissing: true,
    },
  },
  {
    level: 5,
    title: "個體 (Organism)",
    color: "bg-green-100",
    animal: { example: "一隻狗", icon: <User size={16} />, desc: "獨立生命" },
    plant: { example: "向日葵", icon: <Flower2 size={16} />, desc: "獨立生命" },
  },
];

const storyData = [
  {
    page: 1,
    title: "歡迎來到細胞城",
    image: "/p1.jpg",
    bgColor: "bg-indigo-50",
    text: "很久很久以前，在一個小小的世界裡，有一座繁忙的「細胞城」。這裡住著各式各樣的小精靈，大家分工合作，維持著城市的運作。",
  },
  {
    page: 2,
    title: "堅固的城牆",
    image: "/p2.jpg",
    bgColor: "bg-green-50",
    text: "如果你來到植物區，會先看到一道厚厚的綠色城牆，叫做「細胞壁」。它保護著大家不受傷。但奇怪的是，動物區並沒有這道牆喔！",
  },
  {
    page: 3,
    title: "嚴格的守門員",
    image: "/p3.jpg",
    bgColor: "bg-blue-50",
    text: "再往裡面走，會遇到穿著藍色制服的「細胞膜」。他是守門員，嚴格檢查每一個進出的人，只讓好朋友進來，壞東西出去！",
  },
  {
    page: 4,
    title: "市長辦公室",
    image: "/p4.jpg",
    bgColor: "bg-purple-50",
    text: "城市的正中央是「細胞核」市長的辦公室。市長掌管著一本叫做 DNA 的祕密計畫書，指揮大家該做什麼工作。",
  },
  {
    page: 5,
    title: "活力發電廠",
    image: "/p5.jpg",
    bgColor: "bg-orange-50",
    text: "呼呼呼～「粒線體」工廠正在努力工作！他們把吃進來的食物變成能量，讓整個細胞城充滿活力，可以跑跑跳跳。",
  },
  {
    page: 6,
    title: "綠色小廚房",
    image: "/p6.jpg",
    bgColor: "bg-green-100",
    text: "植物區還有一個特別的地方，叫做「葉綠體」。只要太陽公公出來，他們就能變魔術，把陽光變成好吃的糖果（養分）！",
  },
  {
    page: 7,
    title: "超級大水庫",
    image: "/p7.jpg",
    bgColor: "bg-blue-100",
    text: "植物區還有一個超大的「液泡」水庫，存滿了水，讓植物看起來精神飽滿。動物區雖然也有液泡，但都小小的，像小水坑一樣。",
  },
  {
    page: 8,
    title: "大家在一起",
    image: "/p8.jpg",
    bgColor: "bg-pink-50",
    text: "就這樣，許許多多的細胞聚在一起變成了組織，組織變成了器官... 最後變成了你和我！生命是不是很神奇呢？",
  },
];

// --- 組件區 ---

const OrganelleButton = ({ part, onClick, isSelected }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick(part);
    }}
    className={`absolute p-2 rounded-full shadow-sm transform transition-all duration-300 hover:scale-110 flex items-center justify-center
      ${part.color} 
      ${
        isSelected
          ? "ring-4 ring-yellow-300 scale-125 z-50 shadow-xl"
          : "text-white shadow-md"
      }
    `}
    style={{ ...part.pos, zIndex: 30 }}
  >
    {part.icon}
  </button>
);

const HandDrawnDefs = () => (
  <defs>
    <filter id="wiggle" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.03"
        numOctaves="2"
        result="noise"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="3"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </defs>
);

const DualVisualizer = ({ level }) => {
  const showSystem = level >= 3;
  const showOrgan = level >= 2;
  const showZoom = level <= 1;

  const colors = {
    dog: "#E8B67C",
    dogEar: "#C28E5B",
    flowerCenter: "#8B4513",
    flowerPetal: "#FFD700",
    leaf: "#90BE6D",
    stem: "#4D908E",
    bgAnimal: "#FFF7ED",
    bgPlant: "#F0FDF4",
    stroke: "#5D4037",
    organFill: "#F87171",
    systemStroke: "#DC2626",
    bodyGray: "#E2E8F0",
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border-2 border-indigo-100 overflow-hidden mb-4 sticky top-16 z-40">
      <div className="flex bg-indigo-50 border-b border-indigo-100">
        <div className="flex-1 text-center py-2 text-indigo-600 font-bold text-sm border-r border-indigo-100">
          🐶 動物 (小狗)
        </div>
        <div className="flex-1 text-center py-2 text-green-600 font-bold text-sm">
          🌻 植物 (向日葵)
        </div>
      </div>
      <div className="flex h-56">
        <div
          className="flex-1 relative flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: colors.bgAnimal }}
        >
          {showZoom && (
            <div className="absolute top-2 right-2 z-20 animate-bounce-slow">
              <svg width="80" height="80" viewBox="0 0 100 100">
                <HandDrawnDefs />
                <g filter="url(#wiggle)">
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    fill="white"
                    stroke={colors.stroke}
                    strokeWidth="3"
                  />
                  <rect
                    x="60"
                    y="60"
                    width="10"
                    height="30"
                    fill={colors.stroke}
                    transform="rotate(-45 65 60)"
                    rx="5"
                  />
                  {level === 0 ? (
                    <circle
                      cx="40"
                      cy="40"
                      r="10"
                      fill="#FBCFE8"
                      stroke={colors.stroke}
                      strokeWidth="2"
                    />
                  ) : (
                    <g>
                      <circle
                        cx="30"
                        cy="30"
                        r="8"
                        fill="#FBCFE8"
                        stroke={colors.stroke}
                        strokeWidth="1"
                      />
                      <circle
                        cx="50"
                        cy="30"
                        r="8"
                        fill="#FBCFE8"
                        stroke={colors.stroke}
                        strokeWidth="1"
                      />
                      <circle
                        cx="40"
                        cy="50"
                        r="8"
                        fill="#FBCFE8"
                        stroke={colors.stroke}
                        strokeWidth="1"
                      />
                    </g>
                  )}
                </g>
              </svg>
            </div>
          )}
          <svg viewBox="0 0 200 200" className="w-40 h-40">
            <HandDrawnDefs />
            <g filter="url(#wiggle)">
              <path
                d="M 160 120 Q 170 100 180 110"
                stroke={colors.dogEar}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                className={level === 4 ? "animate-wag origin-bottom-left" : ""}
              />
              <path
                d="M 130 150 L 130 170 Q 130 180 140 180 L 145 180"
                stroke={colors.stroke}
                strokeWidth="3"
                fill={level === 4 ? colors.dog : colors.bodyGray}
              />
              <path
                d="M 70 150 L 70 170 Q 70 180 60 180 L 55 180"
                stroke={colors.stroke}
                strokeWidth="3"
                fill={level === 4 ? colors.dog : colors.bodyGray}
              />
              <ellipse
                cx="100"
                cy="130"
                rx="55"
                ry="35"
                fill={level === 4 ? colors.dog : colors.bodyGray}
                stroke={colors.stroke}
                strokeWidth="3"
              />
              <circle
                cx="60"
                cy="80"
                r="35"
                fill={level === 4 ? colors.dog : colors.bodyGray}
                stroke={colors.stroke}
                strokeWidth="3"
              />
              <path
                d="M 30 60 Q 10 90 30 100 Q 40 80 50 70"
                fill={colors.dogEar}
                stroke={colors.stroke}
                strokeWidth="2"
              />
              <path
                d="M 90 60 Q 110 90 90 100 Q 80 80 70 70"
                fill={colors.dogEar}
                stroke={colors.stroke}
                strokeWidth="2"
              />
              <g className={level === 4 ? "opacity-100" : "opacity-10"}>
                <circle cx="50" cy="75" r="3" fill={colors.stroke} />
                <circle cx="70" cy="75" r="3" fill={colors.stroke} />
                <path
                  d="M 55 85 Q 60 90 65 85"
                  fill="none"
                  stroke={colors.stroke}
                  strokeWidth="2"
                />
              </g>
            </g>
            {showSystem && (
              <g className="animate-pulse">
                <path
                  d="M 75 95 Q 85 110 90 120"
                  stroke={colors.systemStroke}
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                <path
                  d="M 110 145 Q 125 160 145 140 Q 155 125 135 120"
                  stroke={colors.systemStroke}
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </g>
            )}
            {showOrgan && (
              <g className="animate-pulse">
                <path
                  d="M 90 120 C 75 120, 75 150, 105 150 C 125 150, 130 130, 110 125 Z"
                  fill={colors.organFill}
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x="88"
                  y="115"
                  fontSize="16"
                  fill="#991B1B"
                  fontWeight="900"
                  style={{ textShadow: "1px 1px 0px white" }}
                >
                  胃
                </text>
              </g>
            )}
          </svg>
        </div>
        <div
          className="flex-1 relative flex items-center justify-center border-l border-indigo-100"
          style={{ backgroundColor: colors.bgPlant }}
        >
          {showZoom && (
            <div
              className="absolute top-2 left-2 z-20 animate-bounce-slow"
              style={{ animationDelay: "0.5s" }}
            >
              <svg width="80" height="80" viewBox="0 0 100 100">
                <g filter="url(#wiggle)">
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    fill="white"
                    stroke={colors.stroke}
                    strokeWidth="3"
                  />
                  <rect
                    x="0"
                    y="60"
                    width="10"
                    height="30"
                    fill={colors.stroke}
                    transform="rotate(45 35 60)"
                    rx="5"
                  />
                  {level === 0 ? (
                    <rect
                      x="30"
                      y="30"
                      width="20"
                      height="20"
                      fill="#BBF7D0"
                      stroke={colors.stroke}
                      strokeWidth="2"
                    />
                  ) : (
                    <g>
                      <rect
                        x="25"
                        y="25"
                        width="15"
                        height="15"
                        fill="#BBF7D0"
                        stroke={colors.stroke}
                        strokeWidth="1"
                      />
                      <rect
                        x="40"
                        y="25"
                        width="15"
                        height="15"
                        fill="#BBF7D0"
                        stroke={colors.stroke}
                        strokeWidth="1"
                      />
                      <rect
                        x="25"
                        y="40"
                        width="15"
                        height="15"
                        fill="#BBF7D0"
                        stroke={colors.stroke}
                        strokeWidth="1"
                      />
                      <rect
                        x="40"
                        y="40"
                        width="15"
                        height="15"
                        fill="#BBF7D0"
                        stroke={colors.stroke}
                        strokeWidth="1"
                      />
                    </g>
                  )}
                </g>
              </svg>
            </div>
          )}
          {level === 3 && (
            <div className="absolute inset-0 bg-gray-900/10 z-30 flex items-center justify-center backdrop-blur-[1px]">
              <div className="bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center animate-bounce-in border-4 border-red-200">
                <X size={40} className="text-red-500" strokeWidth={3} />
                <span className="text-red-600 font-bold text-sm mt-1">
                  植物沒有系統！
                </span>
              </div>
            </div>
          )}
          <svg viewBox="0 0 200 200" className="w-40 h-40">
            <g filter="url(#wiggle)">
              <path
                d="M 100 180 Q 95 140 100 100"
                stroke={colors.stem}
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
              <g
                className={`transition-all duration-500 origin-center ${
                  showOrgan || level === 4
                    ? "opacity-100 scale-100"
                    : "opacity-30 scale-90"
                }`}
              >
                <path
                  d="M 100 150 Q 60 130 60 150 Q 70 170 100 160"
                  fill={colors.leaf}
                  stroke={colors.stroke}
                  strokeWidth="2"
                />
                <path
                  d="M 100 130 Q 140 110 140 130 Q 130 150 100 140"
                  fill={colors.leaf}
                  stroke={colors.stroke}
                  strokeWidth="2"
                />
                {level >= 2 && (
                  <text
                    x="130"
                    y="115"
                    fontSize="14"
                    fill="#15803D"
                    fontWeight="bold"
                  >
                    葉
                  </text>
                )}
              </g>
              <g
                className={`transition-all duration-500 origin-top ${
                  level === 4 ? "opacity-100 scale-100" : "opacity-40 scale-75"
                }`}
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                  <ellipse
                    key={i}
                    cx="100"
                    cy="80"
                    rx="12"
                    ry="30"
                    fill={colors.flowerPetal}
                    stroke={colors.stroke}
                    strokeWidth="1"
                    transform={`rotate(${deg} 100 80)`}
                  />
                ))}
                <circle
                  cx="100"
                  cy="80"
                  r="20"
                  fill={colors.flowerCenter}
                  stroke={colors.stroke}
                  strokeWidth="2"
                />
                <circle cx="95" cy="75" r="2" fill="#D97706" />
                <circle cx="105" cy="75" r="2" fill="#D97706" />
                <circle cx="100" cy="85" r="2" fill="#D97706" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

const CellView = ({ type, onSelectPart, selectedPartId }) => {
  const data = cellData[type];
  const getLayerStyle = (index) => {
    const inset = type === "plant" ? index * 16 : index * 12;
    return {
      position: "absolute",
      top: `${inset}px`,
      bottom: `${inset}px`,
      left: `${inset}px`,
      right: `${inset}px`,
      borderRadius:
        type === "plant"
          ? index === 0
            ? "24px"
            : index === 1
            ? "20px"
            : "16px"
          : "9999px",
    };
  };

  return (
    <div className="relative w-full aspect-square mx-auto my-4 max-w-[320px]">
      {data.layers.map((layer, index) => (
        <div
          key={layer.id}
          onClick={(e) => {
            e.stopPropagation();
            onSelectPart(layer);
          }}
          className={`transition-all duration-300 cursor-pointer shadow-inner ${
            layer.color
          } ${
            selectedPartId === layer.id
              ? "ring-4 ring-yellow-300 brightness-110"
              : "hover:brightness-95"
          }`}
          style={{ ...getLayerStyle(index), zIndex: layer.z }}
        >
          {index === 0 && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800/80 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
              {data.name}
            </div>
          )}
        </div>
      ))}
      <div
        style={{
          ...getLayerStyle(data.layers.length - 1),
          zIndex: 40,
          pointerEvents: "none",
        }}
      >
        <div className="relative w-full h-full pointer-events-auto">
          {data.organelles.map((part) => (
            <OrganelleButton
              key={part.id}
              part={part}
              onClick={onSelectPart}
              isSelected={selectedPartId === part.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ selectedPart, onClose }) => {
  if (!selectedPart)
    return (
      <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-indigo-50 text-center min-h-[150px] flex flex-col justify-center items-center">
        <p className="text-indigo-400 font-bold text-lg mb-1">
          👆 點擊細胞構造
        </p>
        <p className="text-gray-400 text-sm">看看它是做什麼的！</p>
      </div>
    );

  return (
    <div className="bg-white p-5 rounded-2xl shadow-xl border-t-4 border-indigo-400 animate-fade-in-up relative overflow-hidden">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-indigo-800 flex items-center gap-2">
          {selectedPart.name}
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">{selectedPart.desc}</p>
    </div>
  );
};

// --- 純淨版故事模式 (保留大圖) ---
const StoryView = ({ page, setPage }) => {
  const currentStory = storyData[page];

  return (
    <div className="flex flex-col h-full">
      {/* 進度條 */}
      <div className="flex justify-between items-center mb-2 px-2">
        <span className="text-xs font-bold text-slate-400">
          Page {page + 1} / {storyData.length}
        </span>
        <div className="flex gap-1">
          {storyData.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === page ? "bg-indigo-500 w-4" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 繪本卡片 */}
      <div className="bg-white p-4 rounded-3xl shadow-xl border-2 border-indigo-100 flex-1 flex flex-col relative overflow-hidden h-full">
        {/* 圖片顯示區：保持 4:3 比例，填滿且不裁切 (object-cover) */}
        <div
          className={`w-full aspect-[4/3] rounded-2xl ${currentStory.bgColor} flex items-center justify-center relative overflow-hidden border-4 border-white shadow-sm mb-3 shrink-0`}
        >
          {currentStory.image ? (
            <img
              src={currentStory.image}
              alt={currentStory.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative z-10 p-8 bg-white/60 rounded-full shadow-lg backdrop-blur-sm animate-float">
              <User size={60} className="text-slate-400" />
            </div>
          )}
        </div>

        <h2 className="text-lg font-bold text-slate-800 mb-1 shrink-0">
          {currentStory.title}
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed overflow-y-auto">
          {currentStory.text}
        </p>
      </div>

      {/* 翻頁控制 */}
      <div className="flex justify-between items-center mt-4 px-4">
        <button
          onClick={() => {
            setPage((p) => Math.max(0, p - 1));
          }}
          disabled={page === 0}
          className="p-3 rounded-full bg-white shadow-md text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>

        <span className="text-sm font-bold text-indigo-400">翻頁</span>

        <button
          onClick={() => {
            setPage((p) => Math.min(storyData.length - 1, p + 1));
          }}
          disabled={page === storyData.length - 1}
          className="p-3 rounded-full bg-indigo-500 shadow-lg text-white disabled:opacity-30 hover:bg-indigo-600 transition-all active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [mode, setMode] = useState("structure");
  const [currentCellType, setCurrentCellType] = useState("plant");
  const [selectedPart, setSelectedPart] = useState(null);
  const [hierarchyStep, setHierarchyStep] = useState(0);
  const [storyPage, setStoryPage] = useState(0);

  const handleSelectPart = (part) => {
    setSelectedPart(part);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      <header className="bg-indigo-600 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            🧬 細胞探險家
          </h1>
          <div className="flex bg-indigo-700/50 p-1 rounded-full gap-1">
            <button
              onClick={() => setMode("structure")}
              className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
                mode === "structure"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-indigo-200 hover:text-white"
              }`}
            >
              構造
            </button>
            <button
              onClick={() => setMode("hierarchy")}
              className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
                mode === "hierarchy"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-indigo-200 hover:text-white"
              }`}
            >
              層次
            </button>
            <button
              onClick={() => setMode("story")}
              className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all flex items-center gap-1 ${
                mode === "story"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-indigo-200 hover:text-white"
              }`}
            >
              <BookOpen size={14} /> 故事
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 h-[calc(100vh-80px)]">
        {mode === "structure" && (
          <div className="animate-fade-in pb-20">
            <div className="flex bg-white p-1 rounded-xl shadow-sm mb-2 border border-slate-200">
              <button
                onClick={() => {
                  setCurrentCellType("animal");
                  setSelectedPart(null);
                }}
                className={`flex-1 py-2 rounded-lg text-center font-bold text-sm transition ${
                  currentCellType === "animal"
                    ? "bg-pink-100 text-pink-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                🐱 動物細胞
              </button>
              <button
                onClick={() => {
                  setCurrentCellType("plant");
                  setSelectedPart(null);
                }}
                className={`flex-1 py-2 rounded-lg text-center font-bold text-sm transition ${
                  currentCellType === "plant"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                🌿 植物細胞
              </button>
            </div>
            <CellView
              type={currentCellType}
              onSelectPart={handleSelectPart}
              selectedPartId={selectedPart?.id}
            />
            <InfoCard
              selectedPart={selectedPart}
              onClose={() => {
                setSelectedPart(null);
              }}
            />
          </div>
        )}

        {mode === "hierarchy" && (
          <div className="flex flex-col gap-4 animate-fade-in pb-20">
            <DualVisualizer level={hierarchyStep} />
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-400 p-3 rounded-r-xl shadow-sm">
              <p className="text-indigo-900 text-xs font-medium flex items-center gap-2">
                <MousePointerClick size={16} /> 點擊下方的卡片來切換不同層次喔！
              </p>
            </div>
            <div className="flex flex-col gap-3 pb-10">
              {hierarchyData.map((item, index) => {
                const isActive = index === hierarchyStep;
                return (
                  <div
                    key={index}
                    onClick={() => setHierarchyStep(index)}
                    className={`transition-all duration-300 transform cursor-pointer ${
                      isActive
                        ? "scale-100"
                        : "scale-[0.98] opacity-60 hover:opacity-80"
                    }`}
                  >
                    <div
                      className={`rounded-2xl border-2 relative overflow-hidden transition-all ${
                        isActive
                          ? "bg-white border-indigo-500 shadow-xl ring-2 ring-indigo-100 z-10"
                          : "bg-slate-50 border-slate-200 text-slate-400"
                      }`}
                    >
                      <div
                        className={`p-2 flex justify-between items-center border-b ${
                          isActive
                            ? "bg-indigo-50 text-indigo-700"
                            : "bg-slate-100"
                        }`}
                      >
                        <span className="font-bold text-sm">
                          Lv.{item.level} {item.title}
                        </span>
                        {!isActive && (
                          <span className="text-xs border border-slate-300 px-2 rounded-full">
                            點我查看
                          </span>
                        )}
                      </div>
                      <div
                        className={`grid grid-cols-2 divide-x divide-slate-100 ${
                          isActive ? "opacity-100" : "opacity-50 grayscale"
                        }`}
                      >
                        <div className="p-3 flex flex-col items-center text-center gap-1">
                          <div
                            className={`p-2 rounded-full ${
                              isActive
                                ? "bg-pink-100 text-pink-600"
                                : "bg-slate-200"
                            }`}
                          >
                            {item.animal.icon}
                          </div>
                          <span className="text-xs font-bold text-slate-700">
                            {item.animal.example}
                          </span>
                          {isActive && (
                            <span className="text-[10px] text-slate-500 leading-tight">
                              {item.animal.desc}
                            </span>
                          )}
                        </div>
                        <div
                          className={`p-3 flex flex-col items-center text-center gap-1 ${
                            item.plant.isMissing ? "bg-red-50" : ""
                          }`}
                        >
                          <div
                            className={`p-2 rounded-full ${
                              isActive
                                ? item.plant.isMissing
                                  ? "bg-red-100 text-red-500"
                                  : "bg-green-100 text-green-600"
                                : "bg-slate-200"
                            }`}
                          >
                            {item.plant.icon}
                          </div>
                          <span
                            className={`text-xs font-bold ${
                              item.plant.isMissing
                                ? "text-red-600"
                                : "text-slate-700"
                            }`}
                          >
                            {item.plant.example}
                          </span>
                          {isActive && (
                            <span className="text-[10px] text-slate-500 leading-tight">
                              {item.plant.desc}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {mode === "story" && (
          <div className="animate-fade-in h-full">
            <StoryView page={storyPage} setPage={setStoryPage} />
          </div>
        )}
      </main>
    </div>
  );
}
