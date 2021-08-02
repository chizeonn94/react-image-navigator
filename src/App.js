import logo from "./logo.svg";
import "./App.css";

import React, { useState, useEffect, useRef } from "react";

function App() {
  const mydivRef = useRef(null);
  const bigJennieRef = useRef(null);
  const relativeViewRef = useRef(null);
  const overviewRef = useRef(null);
  var relativeWidthRatio =
    window.screen.width / bigJennieRef.current?.clientWidth;
  var relativeHeightRatio =
    window.screen.height / bigJennieRef.current?.clientHeight;
  //console.log("/////////////", bigJennieRef.current?.clientHeight);
  const dragElement = (elmnt) => {
    //console.log(relativeWidthRatio);
    //console.log(relativeHeightRatio);

    const overview = document.getElementById("overview");
    const relativeView = document.getElementById("relativeView");
    const widthReductionRatio = overview.offsetWidth / elmnt.offsetWidth;

    const heightReductionRatio = overview.offsetHeight / elmnt.offsetHeight;

    //relativeView.style.left = 100 + "px";
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
        overview.offsetHeight * relativeHeightRatio + "px";
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
      //가져온것
      if (pos1 < 0) {
        //console.log("왼쪽");
        // x축 왼쪽 방향으로 움직일때
        if (
          document.getElementById("relativeView").getBoundingClientRect().left >
          document.getElementById("overview").getBoundingClientRect().left
        ) {
          //console.log("오른쪽으로 돌릴 조건");
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
          relativeView.style.left =
            -(elmnt.offsetLeft - pos1) * widthReductionRatio + "px";
        } else {
          //console.log("왼쪽으로 돌릴 조건 되지 않음.");
        }
      } else {
        // 오른쪽 방향으로 움직일때
        //console.log("오른쪽");
        if (
          document.getElementById("relativeView").getBoundingClientRect().left +
            relativeViewRef.current.clientWidth <
          document.getElementById("overview").getBoundingClientRect().left +
            overviewRef.current.clientWidth
        ) {
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
          relativeView.style.left =
            -(elmnt.offsetLeft - pos1) * widthReductionRatio + "px";
        } else {
        }
      }

      if (pos2 < 0) {
        //y축 방향으로 위로 내릴때
        console.log("up");

        if (
          document.getElementById("relativeView").getBoundingClientRect().top >
          document.getElementById("overview").getBoundingClientRect().top
        ) {
          //console.log("위쪽으로 돌릴 조ㅌㅌㅌㅌ건");
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
          relativeView.style.top =
            -(elmnt.offsetTop - pos1) * heightReductionRatio + "px";
        } else {
          console.log("아래쪽으로 돌릴 조건 되지 않음.");
        }
      } else {
        //y축방향으로 아래로 내릴때
        console.log("down**");
        console.log(
          document.getElementById("relativeView").getBoundingClientRect().top,
          document.getElementById("overview").getBoundingClientRect().top
        );
        if (
          document.getElementById("relativeView").getBoundingClientRect().top +
            relativeViewRef.current.clientHeight <
          document.getElementById("overview").getBoundingClientRect().top +
            overviewRef.current.clientHeight
        ) {
          //console.log("위쪽으로 돌릴 조ㅌㅌㅌㅌ건");
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
          relativeView.style.top =
            -(elmnt.offsetTop - pos1) * heightReductionRatio + "px";
        } else {
          //console.log("위쪽으로 돌릴 조건 되지 않음.");
        }
      }
      // if (pos1 < 0) {
      //   //console.log("왼쪽으로 움직이는중", offsetX);
      //   if (offsetX < 0) {
      //     //console.log("왼쪽으로 돌릴수 있는 조건 합");
      //     elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      //     relativeView.style.left =
      //       -(elmnt.offsetLeft - pos1) * widthReductionRatio + "px";
      //   } else {
      //     //console.log("왼쪽으로 돌릴 조건이 안됨");
      //     elmnt.style.left = 0 + "px";
      //   }
      // } else {
      //   //console.log("오른쪽으로 움직이는중", offsetX);
      //   if (offsetX > -maxLimitX) {
      //     //console.log("오른쪽으로 돌릴수 있는 조건 합");
      //     elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      //     relativeView.style.left =
      //       -(elmnt.offsetLeft - pos1) * widthReductionRatio + "px";
      //   } else {
      //     //console.log("오른쪽으로 돌릴 조건이 안됨");
      //     elmnt.style.left = -maxLimitX + "px";
      //   }
      // }
      // if (pos2 < 0) {
      //   //console.log("아래로 내리는중", offsetY);
      //   if (offsetY < 0 && offsetY > -maxLimitY) {
      //     //console.log("아래쪽으로 돌릴수 있는 조건 합");
      //     elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      //     relativeView.style.top =
      //       -(elmnt.offsetTop - pos1) * heightReductionRatio + "px";
      //   } else {
      //     //console.log("아래로 돌릴 조건이 안됨");
      //     //elmnt.style.top = 0 + "px";
      //   }
      // } else {
      //   //console.log("위로 올리는 중", offsetY);
      //   if (offsetY > -maxLimitY) {
      //     //console.log("위쪽으로 돌릴수 있는 조건 합");
      //     elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      //     relativeView.style.top =
      //       -(elmnt.offsetTop - pos1) * heightReductionRatio + "px";
      //   } else {
      //     //console.log("위로 돌릴 수 있는 조건이 안됨", offsetY);
      //     //elmnt.style.top = -maxLimitY + "px";
      //   }
      // }
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

  const dragElement3 = (elmnt) => {
    var s1 = 0,
      s2 = 0,
      s3 = 0,
      s4 = 0;

    const dragMouseDown = (e) => {
      console.log("dragMouseDown");
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      s3 = e.clientX;
      s4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    };

    const elementDrag = (e) => {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      s1 = s3 - e.clientX;
      s2 = s4 - e.clientY;
      s3 = e.clientX;
      s4 = e.clientY;

      // set the element's new position:
      // console.log(s1, s2, s3, s4);
      //elmnt.style.top = elmnt.offsetTop - s2 + "px";
      //elmnt.style.left = elmnt.offsetLeft - s1 + "px";

      // console.log(
      //   document.getElementById("relativeView").getBoundingClientRect().left +
      //     relativeViewRef.current.clientWidth,
      //   document.getElementById("overview").getBoundingClientRect().left +
      //     overviewRef.current.clientWidth
      // );

      if (s1 < 0) {
        // x축 오른쪽 방향으로 움직일때
        if (
          document.getElementById("relativeView").getBoundingClientRect().left +
            relativeViewRef.current.clientWidth <
          document.getElementById("overview").getBoundingClientRect().left +
            overviewRef.current.clientWidth
        ) {
          //console.log("오른쪽으로 돌릴 조건");
          elmnt.style.left = elmnt.offsetLeft - s1 + "px";
        } else {
          //console.log("오른쪽으로 돌릴 조건 되지 않음.");
        }
      } else {
        // x축 왼쪽 방향으로 움직일때
        //console.log("왼쪽으로 움직이는중");
        if (
          document.getElementById("relativeView").getBoundingClientRect().left >
          document.getElementById("overview").getBoundingClientRect().left
        ) {
          //console.log("왼쪽으로 돌릴 조건");
          elmnt.style.left = elmnt.offsetLeft - s1 + "px";
        } else {
          //console.log("왼쪽으로 돌릴 조건 되지 않음.");
        }
      }

      if (s2 < 0) {
        //y축 방향으로 아래로 내릴때
        //console.log("down");
        console.log(
          document.getElementById("relativeView").getBoundingClientRect().top +
            relativeViewRef.current.clientHeight,
          document.getElementById("overview").getBoundingClientRect().top +
            overviewRef.current.clientHeight
        );
        if (
          document.getElementById("relativeView").getBoundingClientRect().top +
            relativeViewRef.current.clientHeight <
          document.getElementById("overview").getBoundingClientRect().top +
            overviewRef.current.clientHeight
        ) {
          //console.log("아래쪽으로 돌릴 조건");
          elmnt.style.top = elmnt.offsetTop - s2 + "px";
        } else {
          //console.log("아래쪽으로 돌릴 조건 되지 않음.");
        }
      } else {
        //y축방향으로 위로 올릴때
        //console.log("up");

        if (
          document.getElementById("relativeView").getBoundingClientRect().top >
          document.getElementById("overview").getBoundingClientRect().top
        ) {
          //console.log("위쪽으로 돌릴 조건");
          elmnt.style.top = elmnt.offsetTop - s2 + "px";
        } else {
          //console.log("위쪽으로 돌릴 조건 되지 않음.");
        }
      }
    };

    const closeDragElement = () => {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    };

    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  };

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

      var minY = overviewOffsetY;
      var maxY =
        overviewOffsetY +
        document.getElementById("overview").offsetHeight -
        document.getElementById("relativeView").offsetHeight;

      var ratioHorizontal =
        (document.getElementById("relativeView").getBoundingClientRect().left -
          document.getElementById("overview").getBoundingClientRect().left) /
        document.getElementById("overview").offsetWidth;
      var ratioVertical =
        (document.getElementById("relativeView").getBoundingClientRect().top -
          document.getElementById("overview").getBoundingClientRect().top) /
        document.getElementById("overview").offsetHeight;
      console.log(ratioHorizontal, ratioVertical);
      //console.log("min", minX, "max", maxX);
      // X축 방향으로 움직일때
      if (l1 < 0) {
        //console.log("right");
        if (smallViewOffsetX < maxX) {
          elmnt.style.left = elmnt.offsetLeft - l1 + "px";
          document.getElementById("mydiv").style.left =
            document.getElementById("mydiv").offsetLeft -
            l1 *
              document.getElementById("mydiv").offsetWidth *
              ratioHorizontal +
            "px";
        } else {
          //console.log("cant move to right");
        }
      } else {
        //console.log("left");
        if (smallViewOffsetX > minX) {
          elmnt.style.left = elmnt.offsetLeft - l1 + "px";
          document.getElementById("mydiv").style.left =
            -(
              document.getElementById("mydiv").offsetLeft -
              l1 * document.getElementById("mydiv").offsetWidth * ratioVertical
            ) + "px";
        } else {
          //console.log("cant move to left");
        }
      }

      //y축 방향으로 움직일때
      if (l2 < 0) {
        console.log("down");
        if (smallViewOffsetY < maxY) {
          elmnt.style.top = elmnt.offsetTop - l2 + "px";
        } else {
          console.log("cant move to down");
        }
      } else {
        console.log("up");
        if (smallViewOffsetY > minY) {
          elmnt.style.top = elmnt.offsetTop - l2 + "px";
        } else {
          console.log("cant move to up");
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

    setImgRatio(
      bigJennieRef.current.clientHeight / bigJennieRef.current.clientWidth
    );

    dragElement(mydiv);
    dragElement3(relativeView);
    setRelativeWidth(overviewRef.current?.clientWidth * relativeWidthRatio);
    setRelativeHeight(overviewRef.current?.clientHeight * relativeHeightRatio);
  });
  const [imgRatio, setImgRatio] = useState(1);
  const [imgOffsetX, setImgOffsetX] = useState(0);
  const [imgOffsetY, setImgOffsetY] = useState(0);
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [p3, setP3] = useState(0);
  const [p4, setP4] = useState(0);
  const [relativeViewWidth, setRelativeWidth] = useState(100);
  const [relativeViewHeight, setRelativeHeight] = useState(100);

  return (
    <div className="App">
      <div>
        <div ref={mydivRef} id="mydiv" style={{ position: "absolute" }}>
          <img
            src="202104161605598945900_20210416161331_01.jpeg"
            style={{ display: "block", width: 5000, height: 7500 }}
            ref={bigJennieRef}
          />
        </div>
        <div
          ref={overviewRef}
          id="overview"
          style={{
            position: "fixed",
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
              ref={relativeViewRef}
              id="relativeView"
              style={{
                outline: "2px solid red",
                backgroundColor: "transparent",
                position: "absolute",
                zIndex: 10000000000,
                width: relativeViewWidth,
                height: relativeViewHeight,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
