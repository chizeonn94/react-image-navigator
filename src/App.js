import logo from "./logo.svg";
import "./App.css";

import React, { useState, useEffect } from "react";

function App() {
  const dragElement = (elmnt) => {
    var relativeWidthRatio = window.screen.width / elmnt.offsetWidth;
    var relativeHeightRatio = window.screen.height / elmnt.offsetHeight;
    //console.log(relativeWidthRatio);
    //console.log(relativeHeightRatio);

    const overview = document.getElementById("overview");
    const relativeView = document.getElementById("relativeView");
    const widthReductionRatio = overview.offsetWidth / elmnt.offsetWidth;

    const heightReductionRatio = overview.offsetHeight / elmnt.offsetHeight;

    //좌표 정하기
    const setCoordinates = () => {
      setImgOffsetX(elmnt.getBoundingClientRect().left);
      setImgOffsetY(elmnt.getBoundingClientRect().top);

      setP1(elmnt.getBoundingClientRect().left);
      setP3(elmnt.getBoundingClientRect().top);

      //console.log(relativeView);
      relativeView.style.width =
        overview.offsetWidth * relativeWidthRatio + "px";
      //relativeView.style.height = relativeHeightRatio + "px";
      relativeView.style.height =
        overview.offsetWidth * relativeHeightRatio + "px";
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

      //console.log(pos1, pos2);
      // set the element's new position:
      //elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      //elmnt.style.left = elmnt.offsetLeft - pos1 + "px";

      var offsetX = elmnt.getBoundingClientRect().left; //큰 이미지가 화면의 x축으로부터 떨어진 거리 (x축을 기준으로 얼만큼 삐져나왔냐)
      var offsetY = elmnt.getBoundingClientRect().top; // 큰 이미지가 화면의 y축으로부터 떨어진 거리
      //console.log("offset", offsetX, offsetY);

      // x축 왼쪽 방향으로 움직일때
      if (pos1 < 0) {
        //console.log("왼쪽으로 움직이는중", offsetX);
        if (offsetX < 0) {
          //console.log("왼쪽으로 돌릴수 있는 조건 합");
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
          relativeView.style.left =
            -(elmnt.offsetLeft - pos1) * widthReductionRatio + "px";
        } else {
          //console.log("왼쪽으로 돌릴 조건이 안됨");
          elmnt.style.left = 0 + "px";
        }
      } else {
        //console.log("오른쪽으로 움직이는중", offsetX);
        if (offsetX > -maxLimitX) {
          //console.log("오른쪽으로 돌릴수 있는 조건 합");
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
          relativeView.style.left =
            -(elmnt.offsetLeft - pos1) * widthReductionRatio + "px";
        } else {
          //console.log("오른쪽으로 돌릴 조건이 안됨");
          elmnt.style.left = -maxLimitX + "px";
        }
      }
      if (pos2 < 0) {
        //console.log("아래로 내리는중", offsetY);
        if (offsetY < 0 && offsetY > -maxLimitY) {
          //console.log("아래쪽으로 돌릴수 있는 조건 합");
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
          relativeView.style.top =
            -(elmnt.offsetTop - pos1) * heightReductionRatio + "px";
        } else {
          //console.log("아래로 돌릴 조건이 안됨");
          //elmnt.style.top = 0 + "px";
        }
      } else {
        //console.log("위로 올리는 중", offsetY);
        if (offsetY > -maxLimitY) {
          //console.log("위쪽으로 돌릴수 있는 조건 합");
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
          relativeView.style.top =
            -(elmnt.offsetTop - pos1) * heightReductionRatio + "px";
        } else {
          //console.log("위로 돌릴 수 있는 조건이 안됨", offsetY);
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

    //console.log("max value", maxLimitX, maxLimitY);

    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  };

  // ***************** relative view move ******************
  const dragElement2 = (elmnt) => {
    //elmnt란 움직일 물체를 의미함.
    const dragMouseDown = (e) => {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      l3 = e.clientX;
      l4 = e.clientY;
      elmnt.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      elmnt.onmousemove = elementDrag;
    };

    const elementDrag = (e) => {
      //console.log("moving relative view");
      e = e || window.event;
      e.preventDefault();
      //setCoordinates();
      // calculate the new cursor position:
      l1 = l3 - e.clientX; //이전 클릭했던 x좌표에서 현재 x좌표를 뺀 값으로 절대값의 크기가 클수록 드래그 속도가 빠르다는 것을 의미함.
      l2 = l4 - e.clientY;
      l3 = e.clientX;
      l4 = e.clientY;

      // set the element's new position:
      //overview.style.top = overview.offsetTop - pos2 + "px";
      //overview.style.left = overview.offsetLeft - pos1 + "px";
      const relativeView = document.getElementById("relativeView");
      var smallViewOffsetX = relativeView.getBoundingClientRect().left; // 화면의 x축으로부터 떨어진 거리
      var smallViewOffsetY = relativeView.getBoundingClientRect().top; // 화면의 y축으로부터 떨어진 거리
      //console.log("offset", smallViewOffsetX, smallViewOffsetY);

      // elmnt.style.top = elmnt.offsetTop - l2 + "px";
      // elmnt.style.left = elmnt.offsetLeft - l1 + "px";
      var overviewOffsetX = document
        .getElementById("overview")
        .getBoundingClientRect().left;
      var overviewOffsetY = document
        .getElementById("overview")
        .getBoundingClientRect().top;
      var relativeViewWidth =
        document.getElementById("relativeView").offsetWidth;
      var relativeViewHeight =
        document.getElementById("relativeView").offsetHeight;
      var minX = overviewOffsetX;
      var maxX =
        overviewOffsetX +
        document.getElementById("overview").offsetWidth -
        document.getElementById("relativeView").offsetWidth;
      //console.log("min", minX, "max", maxX);
      // X축 방향으로 움직일때
      if (l1 < 0) {
        //console.log("right");
        if (smallViewOffsetX < maxX) {
          //elmnt.style.left = elmnt.offsetLeft - l1 + "px";
        } else {
          //console.log("cant move to right");
        }
      } else {
        //console.log("left");
        if (smallViewOffsetX > minX) {
          //elmnt.style.left = elmnt.offsetLeft - l1 + "px";
        } else {
          //console.log("cant move to left");
        }
      }

      //y축 방향으로 움직일때
      if (l2 < 0) {
        console.log("down");
        elmnt.style.top = elmnt.offsetTop - l2 + "px";
      } else {
        console.log("up");
        if (true) {
          elmnt.style.top = elmnt.offsetTop - l2 + "px";
        } else {
        }
      }
    };

    const closeDragElement = () => {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    };

    var l1 = 0,
      l2 = 0,
      l3 = 0,
      l4 = 0;
    var maxLimitX = elmnt.offsetWidth - window.screen.width;
    var maxLimitY = elmnt.offsetHeight - window.screen.height;

    // console.log("max value", maxLimitX, maxLimitY);

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
    const relativeView = document.getElementById("relativeView");
    dragElement(mydiv);
    dragElement2(relativeView);
    setImgRatio(mydiv.offsetHeight / mydiv.offsetWidth);
  });
  const [imgRatio, setImgRatio] = useState(1);
  const [imgOffsetX, setImgOffsetX] = useState(0);
  const [imgOffsetY, setImgOffsetY] = useState(0);
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [p3, setP3] = useState(0);
  const [p4, setP4] = useState(0);

  return (
    <div className="App">
      <div>
        <div id="mydiv" style={{ position: "absolute" }}>
          <img
            src="202104161605598945900_20210416161331_01.jpeg"
            style={{ display: "block", width: 5000 }}
          />
        </div>
        <div
          id="overview"
          style={{
            position: "absolute",
            outline: "2px solid gold",
            width: 300,
            height: 300 * imgRatio,
            zIndex: 100000,
            left: 15,
            top: 15,
            backgroundImage: `url(202104161605598945900_20210416161331_01.jpeg)`,
            backgroundSize: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              id="relativeView"
              style={{
                outline: "2px solid red",
                backgroundColor: "transparent",
                position: "absolute",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
