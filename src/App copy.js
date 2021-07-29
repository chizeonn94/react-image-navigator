import logo from "./logo.svg";
import "./App.css";

import React, { useState, useEffect } from "react";

function App() {
  const dragElement = (elmnt) => {
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
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX; //이전 클릭했던 x좌표에서 현재 x좌표를 뺀 값으로 절대값의 크기가 클수록 드래그 속도가 빠르다는 것을 의미함.
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX; //클릭한곳의 x좌표 가져오기
      pos4 = e.clientY; //클릭한곳의 y좌표 가져오기
      console.log("pos", pos1, pos2, pos3, pos4);
      var offsetX;
      var offsetY;
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      // console.log("maxlimitx", maxLimitX);
      // console.log("offset", offsetX, offsetY);
      // if (offsetX > -maxLimitX && offsetX < 0) {
      //   console.log("ok");
      //   // set the element's new position:
      //   elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      // }
      if (offsetY < 0 && offsetY > -maxLimitY) {
        //console.log("y okay", offsetY);
        //elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      } else {
        //console.log("y not okay", offsetY);
      }

      offsetX = elmnt.getBoundingClientRect().left; // 화면의 x축으로부터 떨어진 거리
      offsetY = elmnt.getBoundingClientRect().top; // 화면의 y축으로부터 떨어진 거리
    };

    const closeDragElement = () => {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    };

    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0,
      maxLimitX = 0,
      maxLimitY = 0;
    var windowWidth = window.innerWidth; // 화면 너비
    var windowHeight = window.innerHeight; // 화면 높이
    var elementWidth = elmnt.offsetWidth; // image width
    var elementHeight = elmnt.offsetHeight; // image height
    //console.log(windowWidth, windowHeight);
    maxLimitX = elementWidth - windowWidth; // 드래그할 수 있는 최대 offsetX
    maxLimitY = elementHeight - windowHeight; // 드래그 할 수 있는 최대 offsetY

    console.log("max", maxLimitX, maxLimitY);
    //onsole.log("elemnt 크기", elmnt.offsetWidth, elmnt.offsetHeight);

    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  };
  useEffect(() => {
    dragElement(document.getElementById("mydiv"));
  });
  return (
    <div className="App">
      <div>
        <div id="mydiv">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgS6Uv3MQ0Qvnw8maY8Hu4mwsDBWLIHPs9wR3JTZCx88LBOABCAck4ygu_zdi2gJGpXZlyQptBGzAprQ&usqp=CAU"
            style={{ width: 3000 }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
