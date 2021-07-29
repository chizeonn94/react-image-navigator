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
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX; //get width
      pos4 = e.clientY; //get height

      maxLimitX = elmnt.offsetWidth - window.screen.width;
      maxLimitY = elmnt.offsetHeigh - window.screen.height;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
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
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Melbourne_Central_Station_1.JPG"
            style={{ width: 2880 }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
