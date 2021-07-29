import logo from "./logo.svg";
import "./App.css";

import React, { useState, useEffect } from "react";

function App() {
  const dragElement = (elmnt) => {
    //좌표 정하기
    const setCoordinates = () => {
      setP1(elmnt.getBoundingClientRect().left);
      setP3(elmnt.getBoundingClientRect().top);
      setWidthRatio();
      console.log("*******", p1);
    };

    const dragMouseDown = (e) => {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    };

    const elementDrag = (e) => {
      e = e || window.event;
      e.preventDefault();
      setCoordinates();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX; //이전 클릭했던 x좌표에서 현재 x좌표를 뺀 값으로 절대값의 크기가 클수록 드래그 속도가 빠르다는 것을 의미함.
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      console.log(pos1, pos2);
      // set the element's new position:
      //elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      //elmnt.style.left = elmnt.offsetLeft - pos1 + "px";

      var offsetX = elmnt.getBoundingClientRect().left; // 화면의 x축으로부터 떨어진 거리
      var offsetY = elmnt.getBoundingClientRect().top; // 화면의 y축으로부터 떨어진 거리
      console.log("offset", offsetX, offsetY);

      // x축 왼쪽 방향으로 움직일때
      if (pos1 < 0) {
        console.log("왼쪽으로 움직이는중", offsetX);
        if (offsetX < 0) {
          //console.log("왼쪽으로 돌릴수 있는 조건 합");
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        } else {
          //console.log("왼쪽으로 돌릴 조건이 안됨");
          elmnt.style.left = 0 + "px";
        }
      } else {
        //console.log("오른쪽으로 움직이는중", offsetX);
        if (offsetX > -maxLimitX) {
          //console.log("오른쪽으로 돌릴수 있는 조건 합");
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        } else {
          //console.log("오른쪽으로 돌릴 조건이 안됨");
          elmnt.style.left = -maxLimitX + "px";
        }
      }
      if (pos2 < 0) {
        console.log("아래로 내리는중", offsetY);
        if (offsetY < 0 && offsetY > -maxLimitY) {
          console.log("아래쪽으로 돌릴수 있는 조건 합");
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        } else {
          console.log("아래로 돌릴 조건이 안됨");
          //elmnt.style.top = 0 + "px";
        }
      } else {
        console.log("위로 올리는 중", offsetY);
        if (offsetY > -maxLimitY) {
          console.log("위쪽으로 돌릴수 있는 조건 합");
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        } else {
          console.log("위로 돌릴 수 있는 조건이 안됨", offsetY);
          //elmnt.style.top = -maxLimitY + "px";
        }
      }
      // if (offsetX > -maxLimitX && offsetX < 0) {
      //   console.log("x ok");
      //   // set the element's new position:
      //   elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      // } else {
      //   console.log("x not okay");
      // }
      // if (offsetY <= 5 && offsetY >= -maxLimitY) {
      //   console.log("y okay", offsetY);
      //   elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      // } else {
      //   console.log("y not okay", offsetY);
      //   return;
      // }
    };

    const closeDragElement = () => {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    };

    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    var maxLimitX = elmnt.offsetWidth - window.screen.width;
    var maxLimitY = elmnt.offsetHeight - window.screen.height;

    console.log("max value", maxLimitX, maxLimitY);

    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  };

  useEffect(() => {
    const mydiv = document.getElementById("mydiv");
    dragElement(mydiv);
    setHeightRatio(mydiv.offsetHeight / mydiv.offsetWidth);
    console.log(heightRatio);
  });
  const [heightRatio, setHeightRatio] = useState(1);
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [p3, setP3] = useState(0);
  const [p4, setP4] = useState(0);
  const [widthRatio, setWidthRatio] = useState(1);
  return (
    <div className="App">
      <div>
        <div id="mydiv" style={{ position: "absolute" }}>
          <img
            src="202104161605598945900_20210416161331_01.jpeg"
            style={{ display: "block", width: 2880 }}
          />
        </div>
        <div
          id="overview"
          style={{
            position: "absolute",
            outline: "2px solid gold",
            width: 200,
            height: 200 * heightRatio,
            zIndex: 100000,
            left: 15,
            top: 15,
            backgroundImage: `url(202104161605598945900_20210416161331_01.jpeg)`,
            backgroundSize: "100%",
          }}
        >
          <div id="relativeView" />
        </div>
      </div>
    </div>
  );
}

export default App;
