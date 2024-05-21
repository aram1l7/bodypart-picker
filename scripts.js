window.onload = addStyleToSvg;

if (!window.webkit) {
  window.webkit = {
    messageHandlers: {
      observer: {
        postMessage: function (message) {
          console.log("Mock postMessage called with:", message);
          // You can add more logic here to simulate the mobile behavior.
        },
      },
    },
  };
}

let isFront = true;

function switchSVG() {
  const svgFront = document.getElementById("svg-front");
  const svgBack = document.getElementById("svg-back");

  if (isFront) {
    svgBack.classList.remove("hidden");
    svgFront.classList.add("hidden");
    setTimeout(() => {
      addStyleFor("svg-back");
    }, 500);
  } else {
    svgBack.classList.add("hidden");
    svgFront.classList.remove("hidden");
  }
  isFront = !isFront;
}

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    const svgFront = document.getElementById("svg-front");
    const svgBack = document.getElementById("svg-back");

    if (xDiff > 0) {
      if (isFront) {
        svgFront.classList.add("hidden");
        svgBack.classList.remove("hidden");
        addStyleFor("svg-back");

        isFront = false;
      }
    } else {
      if (!isFront) {
        svgFront.classList.remove("hidden");
        svgBack.classList.add("hidden");
        isFront = true;
      }
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

if (window.screenWidth >= 1300) {
  window.addEventListener("scroll", function () {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollHeight - clientHeight <= scrollTop) {
      // Scrolled to bottom
      switchSVG();
    } else {
      // Scrolled to top or middle
      switchSVG();
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("main")
    .addEventListener("touchstart", handleTouchStart, false);
  document
    .querySelector("main")
    .addEventListener("touchmove", handleTouchMove, false);

  document.getElementById("switch-btn").onclick = switchSVG;
});

function addStyleToSvg() {
  addStyleFor("svg-front");
}

function addStyleFor(svgFilePrefix) {
  let svgObject = document.getElementById(svgFilePrefix);
  let svgDocument = svgObject?.contentDocument;

  console.log(svgDocument, "doc");

  // Now you can manipulate the SVG elements within svgDocument
  let svgElements = svgDocument?.getElementsByClassName("hover") || [];

  for (let i = 0; i < svgElements.length; i++) {
    const svgElement = svgElements[i];
    const children = svgElement.children;

    const originalColors = [];

    for (let i = 0; i < children.length; i++) {
      originalColors[i] = children[i].style.fill;
    }

    // add hover effect
    svgElement.addEventListener("mouseover", function () {
      svgElement.style.cursor = "pointer";
      printBodyPart(svgElement.id);
      for (let i = 0; i < children.length; i++) {
        const svgItem = children[i];
        svgItem.style.fill = "#ed2b2b";
        svgItem.style.transition = "transform 0.3s ease";
        svgItem.style.transform = "translate(2px, -2px)";
      }
    });

    svgElement.addEventListener("mouseout", function () {
      svgElement.style.cursor = "default";
      printBodyPart("");
      for (let i = 0; i < children.length; i++) {
        const svgItem = children[i];
        svgItem.style.fill = originalColors[i];
        svgItem.style.transition = "transform 0.3s ease";
        svgItem.style.transform = "translate(0px, 0px)";
      } // Revert to original color on mouseout
    });

    svgElement.addEventListener("click", function (e) {
      console.log(e.target, "target");
      if (svgElement.id.includes("neck") || e.target.id.includes("neck")) {
        window.webkit.messageHandlers.observer.postMessage({
          bodypart: svgElement.id.substring(3, svgElement.id.length),
        });

        return;
      }
      svgObject.data = `./assets/${svgElement.id}.svg`;
    });
  }
}

function printBodyPart(bodyPartId) {
  const printElement = document.getElementById("body-part-print");
  // printElement.innerHTML = bodyPartId;
}
