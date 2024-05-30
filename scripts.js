window.onload = addStyleToSvg;

const selectableBodyParts = [
  "chin",
  "eye-right",
  "eye-left",
  "ear-left",
  "ear-right",
  "nose",
  "tongue",
  "neck-front",
  "neck-back",
  "frontal-scalp-region",
  "cheek-left",
  "cheek-right",
  "forehead",
  "temple-region-right",
  "temple-region-left",
  "mouth",
  "postauricular-region-left",
  "postauricular-region-right",
  "parietal-region",
  "occipital-region",
  "thorax",
  "breast-left",
  "breast-right",
  "side-of-chest-left",
  "side-of-chest-right",
];

if (!window.webkit) {
  window.webkit = {
    messageHandlers: {
      observer: {
        postMessage: function (message) {
          console.log("Mock postMessage called with:", message);
        },
      },
      selectAllOptions: {
        postMessage: function (message) {
          console.log(
            "Mock selectAllOptions postMessage called with:",
            message
          );
        },
      },
      selectedBodyParts: {
        postMessage: function (message) {
          console.log(
            "Mock selectedBodyParts postMessage called with:",
            message
          );
        },
      },
    },
  };
}

let isFront = true;
let selectedParts = [];

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
  sendSelectedParts();
}

function sendSelectedParts() {
  const message = JSON.stringify(selectedParts);
  window.webkit.messageHandlers.selectedBodyParts.postMessage(message);
}

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches || evt.originalEvent.touches;
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
  xDown = null;
  yDown = null;
}

if (window.screenWidth >= 1300) {
  window.addEventListener("scroll", function () {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollHeight - clientHeight <= scrollTop) {
      switchSVG();
    } else {
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
  addStyleFor(isFront ? "svg-front" : "svg-back");
}

function addStyleFor(svgFilePrefix) {
  let svgObject = document.getElementById(svgFilePrefix);

  if (!svgObject) {
    console.error("SVG object not found with id:", svgFilePrefix);
    return;
  }

  console.log("Initial SVG object found:", svgObject);

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

      svgElement.addEventListener("mouseover", function () {
        svgElement.style.cursor = "pointer";
        if (secondLayer) {
          svgElement.style.fill = "#ed2b2b";
          svgElement.style.transition = "transform 0.3s ease";
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
          svgElement.style.fill = selectedParts.includes(svgElement.id)
            ? "#ed2b2b"
            : "white";
          return;
        }
        for (let j = 0; j < children.length; j++) {
          const svgItem = children[j];
          svgItem.style.fill = selectedParts.includes(svgElement.id)
            ? "#ed2b2b"
            : originalColors[j];
          svgItem.style.transition = "transform 0.3s ease";
        }
      });

      svgElement.addEventListener("click", function (e) {
        const id = e.target.id || svgElement.id;
        if (selectedParts.includes(id)) {
          selectedParts = selectedParts.filter((part) => part !== id);
          if (secondLayer) {
            svgElement.style.fill = "white";
          } else {
            for (let j = 0; j < children.length; j++) {
              children[j].style.fill = originalColors[j];
            }
          }
        } else {
          selectedParts.push(id);
          if (secondLayer) {
            svgElement.style.fill = "#ed2b2b";
          } else {
            for (let j = 0; j < children.length; j++) {
              children[j].style.fill = "#ed2b2b";
            }
          }
        }

        window.webkit.messageHandlers.observer.postMessage({
          bodypart: id.substring(3),
        });

        sendSelectedParts();

        if (!selectableBodyParts.includes(id.substring(3))) {
          let newSvgFile = `./assets/${svgElement.id}.svg`;
          console.log("Loading new SVG file:", newSvgFile);
          svgObject.data = newSvgFile;

          svgObject.onload = function () {
            console.log("New SVG loaded:", newSvgFile);

            let newSvgDocument = svgObject.contentDocument;
            setTimeout(() => {
              applyListeners(newSvgDocument, true);
            }, 500);
          };
        }
      });
    }
  }

  svgObject.onload = function () {
    console.log("Initial SVG loaded");
    let svgDocument = svgObject.contentDocument;
    applyListeners(svgDocument);
  };

  if (svgObject.contentDocument) {
    let svgDocument = svgObject.contentDocument;
    applyListeners(svgDocument);
  }
}

function deselectAll() {
  selectedParts = [];
  sendSelectedParts();
  addStyleToSvg();
}

function deselect(parts) {
  selectedParts = selectedParts.filter((part) => !parts.includes(part));
  sendSelectedParts();
  addStyleToSvg();
}

function select(parts) {
  selectedParts = [...new Set([...selectedParts, ...parts])];
  sendSelectedParts();
  addStyleToSvg();
}

function setLanguage(language) {
  console.log("Setting language to:", language);
}
