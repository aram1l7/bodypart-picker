window.onload = addStyleToSvg;

const selectableBodyParts = [
  "chin",
  "eye-left",
  "eye-right",
  "ear-left",
  "ear-right",
  "nose",
  "tongue",
  "neck",
  "frontal-scalp-region",
  "cheek-left",
  "cheek-right",
  "forehead",
  "temple-region-right",
  "temple-region-left",
];

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

  if (!svgObject) {
    console.error("SVG object not found with id:", svgFilePrefix);
    return;
  }

  console.log("Initial SVG object found:", svgObject);

  // Function to apply event listeners to SVG elements
  function applyListeners(svgDocument, secondLayer) {
    if (!svgDocument) {
      console.error("SVG document is null");
      return;
    }

    let svgElements = svgDocument.getElementsByClassName("hover");

    if (svgElements.length === 0) {
      console.warn("No elements with class 'hover' found in the SVG document");
    }

    console.log(svgElements, "elems");

    for (let i = 0; i < svgElements.length; i++) {
      const svgElement = svgElements[i];

      const children = svgElement.children;

      const originalColors = [];

      for (let j = 0; j < children.length; j++) {
        originalColors[j] = children[j].style.fill;
      }

      // Add hover effect
      svgElement.addEventListener("mouseover", function () {
        svgElement.style.cursor = "pointer";
        if (secondLayer) {
          svgElement.style.fill = "#ed2b2b";
          svgElement.style.transition = "transform 0.3s ease";
          svgElement.style.transform = "translate(2px, -2px)";

          return;
        }
        for (let j = 0; j < children.length; j++) {
          const svgItem = children[j];
          svgItem.style.fill = "#ed2b2b";
          svgItem.style.transition = "transform 0.3s ease";
        }
      });

      svgElement.addEventListener("mouseout", function () {
        svgElement.style.cursor = "default";
        if (secondLayer) {
          svgElement.style.fill = "white";

          return;
        }
        for (let j = 0; j < children.length; j++) {
          const svgItem = children[j];
          svgItem.style.fill = originalColors[j];
          svgItem.style.transition = "transform 0.3s ease";
          svgItem.style.transform = "translate(0px, 0px)";
        } // Revert to original color on mouseout
      });

      svgElement.addEventListener("click", function (e) {
        console.log(e.target, "target");
        console.log(e.target.closest(`bp-head-${isFront ? "front" : "back"}`));
        if (
          selectableBodyParts.includes(
            e.target.id.substring(3, e.target.id.length)
          )
        ) {
          window.webkit.messageHandlers.observer.postMessage({
            bodypart: e.target.id.substring(3, svgElement.id.length),
          });
          return;
        }

        // Update the SVG file to show detailed view
        let newSvgFile = `./assets/${svgElement.id}.svg`;
        console.log("Loading new SVG file:", newSvgFile);
        svgObject.data = newSvgFile;

        svgObject.onload = function () {
          console.log("New SVG loaded:", newSvgFile);
          let newSvgDocument = svgObject.contentDocument;
          setTimeout(() => {
            applyListeners(newSvgDocument, true); // Apply listeners to the new SVG elements
          }, 500);
        };
      });
    }
  }

  svgObject.onload = function () {
    console.log("Initial SVG loaded");
    let svgDocument = svgObject.contentDocument;
    applyListeners(svgDocument);
  };

  if (svgObject.contentDocument) {
    // If the SVG is already loaded, apply listeners immediately
    let svgDocument = svgObject.contentDocument;
    applyListeners(svgDocument);
  }
}
