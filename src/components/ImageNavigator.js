import React, { useState, useEffect, useRef } from "react";

function ImageNavigator() {
  const mydivRef = useRef(null);
  const bigImgRef = useRef(null);
  const relativeViewRef = useRef(null);
  const overviewRef = useRef(null);
  var relativeWidthRatio = window.screen.width / bigImgRef.current?.clientWidth;
  var relativeHeightRatio =
    window.screen.height / bigImgRef.current?.clientHeight;

  const dragElement = (elmnt) => {
    const overview = document.getElementById("overview");
    const relativeView = document.getElementById("relativeView");
    const widthReductionRatio = overview.offsetWidth / elmnt.offsetWidth;

    const heightReductionRatio = overview.offsetHeight / elmnt.offsetHeight;

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
      pos3 = e.clientX;
      pos4 = e.clientY;

      var offsetX = elmnt.getBoundingClientRect().left; //큰 이미지가 화면의 x축으로부터 떨어진 거리
      var offsetY = elmnt.getBoundingClientRect().top; // 큰 이미지가 화면의 y축으로부터 떨어진 거리

      // x축 왼쪽 방향으로 움직일때
      if (pos1 < 0) {
        // x축 왼쪽 방향으로 움직일때
        if (
          document.getElementById("relativeView").getBoundingClientRect().left >
          document.getElementById("overview").getBoundingClientRect().left
        ) {
          //console.log("오른쪽으로 돌릴 조건");
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
          relativeView.style.left =
            -(elmnt.offsetLeft - pos1) * widthReductionRatio + "px";
        }
      } else {
        // 오른쪽 방향으로 움직일때
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
        //console.log("up");

        if (
          document.getElementById("relativeView").getBoundingClientRect().top >
          document.getElementById("overview").getBoundingClientRect().top
        ) {
          //console.log("위쪽으로 돌릴 조건");
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
          relativeView.style.top =
            -(elmnt.offsetTop - pos1) * heightReductionRatio + "px";
        }
      } else {
        //y축방향으로 아래로 내릴때

        if (
          document.getElementById("relativeView").getBoundingClientRect().top +
            relativeViewRef.current.clientHeight <
          document.getElementById("overview").getBoundingClientRect().top +
            overviewRef.current.clientHeight
        ) {
          //console.log("위쪽으로 돌릴 조건");
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
          relativeView.style.top =
            -(elmnt.offsetTop - pos1) * heightReductionRatio + "px";
        }
      }
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

    elmnt.onmousedown = dragMouseDown;
  };

  // ***************** relative view move ******************

  const dragElement2 = (elmnt) => {
    var s1 = 0,
      s2 = 0,
      s3 = 0,
      s4 = 0;

    const dragMouseDown = (e) => {
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

      if (s1 < 0) {
        // x축 오른쪽 방향으로 움직일때
        if (
          document.getElementById("relativeView").getBoundingClientRect().left +
            relativeViewRef.current.clientWidth <
          document.getElementById("overview").getBoundingClientRect().left +
            overviewRef.current.clientWidth
        ) {
          //console.log("오른쪽으로 돌릴 조건");
          var b1 =
            (document.getElementById("mydiv").offsetWidth * s1) /
            document.getElementById("overview").offsetWidth;

          elmnt.style.left = elmnt.offsetLeft - s1 + "px";
          document.getElementById("mydiv").style.left =
            document.getElementById("mydiv").offsetLeft + b1 + "px";
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

          var b1 =
            (document.getElementById("mydiv").offsetWidth * s1) /
            document.getElementById("overview").offsetWidth;

          document.getElementById("mydiv").style.left =
            document.getElementById("mydiv").offsetLeft + b1 + "px";
        }
      }

      if (s2 < 0) {
        //y축 방향으로 아래로 내릴때

        if (
          document.getElementById("relativeView").getBoundingClientRect().top +
            relativeViewRef.current.clientHeight <
          document.getElementById("overview").getBoundingClientRect().top +
            overviewRef.current.clientHeight
        ) {
          //console.log("아래쪽으로 돌릴 조건");
          elmnt.style.top = elmnt.offsetTop - s2 + "px";

          var b2 =
            (document.getElementById("mydiv").offsetHeight * s2) /
            document.getElementById("overview").offsetHeight;

          document.getElementById("mydiv").style.top =
            document.getElementById("mydiv").offsetTop + b2 + "px";
        }
      } else {
        //y축방향으로 위로 올릴때

        if (
          document.getElementById("relativeView").getBoundingClientRect().top >
          document.getElementById("overview").getBoundingClientRect().top
        ) {
          //console.log("위쪽으로 돌릴 조건");
          elmnt.style.top = elmnt.offsetTop - s2 + "px";

          var b2 =
            (document.getElementById("mydiv").offsetHeight * s2) /
            document.getElementById("overview").offsetHeight;

          document.getElementById("mydiv").style.top =
            document.getElementById("mydiv").offsetTop + b2 + "px";
        }
      }
    };

    const closeDragElement = () => {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    };

    elmnt.onmousedown = dragMouseDown;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const mydiv = document.getElementById("mydiv");
    const relativeView = document.getElementById("relativeView");

    setImgRatio(bigImgRef.current.clientHeight / bigImgRef.current.clientWidth);

    dragElement(mydiv);
    dragElement2(relativeView);
    setRelativeWidth(overviewRef.current?.clientWidth * relativeWidthRatio);
    setRelativeHeight(overviewRef.current?.clientHeight * relativeHeightRatio);
  });
  const [imgRatio, setImgRatio] = useState(1);

  const [relativeViewWidth, setRelativeWidth] = useState(100);
  const [relativeViewHeight, setRelativeHeight] = useState(100);

  return (
    <div className="App">
      <div>
        <div ref={mydivRef} id="mydiv" style={{ position: "absolute" }}>
          <img
            src="optimize.jpeg"
            style={{ display: "block", width: 5000, height: 3405 }}
            ref={bigImgRef}
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
            zIndex: 10,
            left: 15,
            top: 15,
            backgroundImage: `url(optimize.jpeg)`,
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
                zIndex: 15,
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

export default ImageNavigator;
