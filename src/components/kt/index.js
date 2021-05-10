import React, { memo, useEffect, useState } from "react";
import "./style.css";
import audioClick from "../../assets/audio/click.mp3";
import audioWind from "../../assets/audio/wind.mp3";

/* 音效过渡 */
const playMusic = (src, isLoop = false) => {
  const audio = new Audio(src);
  if (isLoop) {
    audio.loop = true;
  }
  audio.autoplay = true;
  return audio;
};
const audio = playMusic(audioWind, true);

export default memo(function JKT() {
  const [data, setData] = useState({
    isOpen: false,
    mode: false, //true 制冷 false 制热
    temp: 24,
  });

  useEffect(() => {
    audio.volume = data.isOpen ? 1 : 0;
  }, [data.isOpen]);

  const handleOpen = () => {
    playMusic(audioClick);
    setData((data) => {
      return { ...data, isOpen: !data.isOpen };
    });
  };
  const handleCold = () => {
    playMusic(audioClick);
    if (!data.isOpen) return;
    setData((data) => ({ ...data, mode: true }));
  };
  const handleHot = () => {
    playMusic(audioClick);
    if (!data.isOpen) return;
    setData((data) => ({ ...data, mode: false }));
  };
  const handleUp = () => {
    playMusic(audioClick);
    if (!data.isOpen) return;
    setData((data) => ({ ...data, temp: data.temp + 1 }));
  };
  const handleDown = () => {
    playMusic(audioClick);
    if (!data.isOpen) return;
    setData((data) => ({ ...data, temp: data.temp - 1 }));
  };

  return (
    <div className="kt">
      <div className="kt-body">
        <div className="body mdui-shadow-6">
          <div className="left">
            {/* 中国能效标志 */}
            <div className="mark">
              <svg
                width="40"
                height="60"
                style={{
                  transform: "scale(0.8)",
                }}
              >
                <rect
                  rx="4"
                  ry="4"
                  width="40"
                  height="60"
                  fill="rgb(0,140,199)"
                />
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <rect
                    key={i}
                    x={1 + i * 5 + ""}
                    y="4"
                    rx="1"
                    ry="1"
                    width="2"
                    height="4"
                    fill="#fff"
                  />
                ))}
                <rect
                  x="4"
                  y="12"
                  ry="4"
                  rx="4"
                  width="32"
                  height="28"
                  fill="#fff"
                />
                {[
                  "rgb(57,106,82)",
                  "rgb(116,172,65)",
                  "rgb(238,229,0)",
                  "rgb(235,154,57)",
                  "rgb(216,43,36)",
                ].map((color, i) => (
                  <rect
                    key={i}
                    x="6"
                    y={i * 5 + 14}
                    width={10 + i * 2}
                    height="3"
                    fill={color}
                  />
                ))}
                <rect
                  rx="2"
                  x="24"
                  y="13"
                  width="8"
                  height="4"
                  fill="rgb(57,106,82)"
                />
                <rect
                  x="4"
                  y="44"
                  ry="4"
                  rx="4"
                  width="32"
                  height="12"
                  fill="#fff"
                />
                {[1, 2, 3, 4, 5].map((i) => (
                  <rect
                    key={i}
                    x={1 + i * 5 + ""}
                    y="46"
                    rx="1"
                    ry="1"
                    width="3"
                    height="2"
                    fill="#000"
                  />
                ))}
                {[1, 2, 3, 4].map((i) => (
                  <rect
                    key={i}
                    x={1 + i * 5 + ""}
                    y="52"
                    rx="1"
                    ry="1"
                    width="2"
                    height="2"
                    fill="#000"
                  />
                ))}
              </svg>
            </div>
          </div>
          <div className="right">
            <div
              className="status"
              style={{
                opacity: data.isOpen ? 1 : 0,
              }}
            >
              {/* 制冷/制热状态 */}
              {data.mode ? (
                <i className="mdui-icon material-icons cold">&#xeb3b;</i>
              ) : (
                <i className="mdui-icon material-icons hot">&#xe430;</i>
              )}

              <br />
              {/* 温度 */}
              <div className="temp">{data.temp}</div>
              <div className="temp">°C</div>
            </div>
          </div>
          <div className="foot">
            {/* 开关状态 */}
            <i
              className="mdui-icon material-icons"
              style={{ color: data.isOpen ? "#B2FF59" : "#9E9E9E" }}
            >
              &#xe8ac;
            </i>
          </div>
        </div>
        <div
          className="wind"
          style={{
            opacity: data.isOpen ? 1 : 0,
          }}
        >
          {/* 风 */}
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
      <div className="kt-control">
        <div className="control1">
          {/* 制冷 */}
          <button
            className="mdui-btn mdui-btn-icon mdui-btn-raised mdui-ripple"
            style={{ backgroundColor: "#673AB7" }}
            onClick={handleCold}
          >
            <i className="mdui-icon material-icons">&#xeb3b;</i>
          </button>
          {/* 开关 */}
          <button
            className="mdui-btn mdui-btn-icon mdui-btn-raised mdui-ripple"
            style={{ backgroundColor: data.isOpen ? "#4CAF50" : "#F44336" }}
            onClick={handleOpen}
          >
            <i className="mdui-icon material-icons">&#xe8ac;</i>
          </button>
          {/* 制热 */}
          <button
            className="mdui-btn mdui-btn-icon mdui-btn-raised mdui-ripple"
            style={{ backgroundColor: "#FFC107" }}
            onClick={handleHot}
          >
            <i className="mdui-icon material-icons">&#xe430;</i>
          </button>
        </div>
        <div className="control2">
          {/* + */}
          <button
            className="mdui-btn mdui-btn-icon mdui-btn-raised mdui-ripple"
            onClick={handleUp}
          >
            <i className="mdui-icon material-icons">&#xe316;</i>
          </button>
        </div>
        <div className="control3">
          {/* - */}
          <button
            className="mdui-btn mdui-btn-icon mdui-btn-raised mdui-ripple"
            onClick={handleDown}
          >
            <i className="mdui-icon material-icons">&#xe313;</i>
          </button>
        </div>
      </div>
      <div className="kt-github">
        <a href="https://github.com/jwjjgs/kt.jwjjgs.cn">Github</a>
      </div>
    </div>
  );
});
