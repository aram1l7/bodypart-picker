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
  "upper-right-quadrant-adbomen",
  "upper-left-quadrant-adbomen",
  "lower-right-quadrant-adbomen",
  "lower-left-quadrant-adbomen",
  "umbilical-region",
];

const bodyPartHierarchy = {
  "head-front": [
    "bp-head-front",
    "bp-nose",
    "bp-mouth",
    "bp-cheek-right",
    "bp-cheek-left",
    "bp-chin",
    "bp-tongue",
    "bp-eye-right",
    "bp-ear-right",
    "bp-temple-region-right",
    "bp-forehead",
    "bp-frontal-scalp-region",
    "bp-temple-region-left",
    "bp-eye-left",
    "bp-ear-left",
  ],
  thorax: [
    "bp-sternum",
    "bp-side-of-chest-right",
    "bp-breast-right",
    "bp-breast-left",
    "bp-side-of-chest-left",
  ],
  "head-back": [
    "bp-head-back",
    "bp-parietal-region",
    "bp-occipital-region",
    "bp-postauricular-region-left",
    "bp-ear-left",
    "bp-postauricular-region-right",
    "bp-ear-right",
  ],
  abdomen: [
    "bp-upper-right-quadrant-adbomen",
    "bp-upper-left-quadrant-adbomen",
    "bp-lower-right-quadrant-adbomen",
    "bp-lower-left-quadrant-adbomen",
    "bp-umbilical-region",
  ],
  // Add other major body parts and their child parts here...
};

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

  if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.selectedBodyParts
  ) {
    window.webkit.messageHandlers.selectedBodyParts.postMessage(message);
  } else {
    console.error("WebKit message handler or selectedBodyParts is not defined");
  }
}

function updateSelection(id) {
  const parentPart = Object.keys(bodyPartHierarchy).find((parent) =>
    bodyPartHierarchy[parent].includes(id)
  );
  if (!parentPart) return;

  const siblings = bodyPartHierarchy[parentPart];
  const allSiblingsSelected = siblings.every((sibling) =>
    selectedParts.includes(sibling)
  );

  if (allSiblingsSelected) {
    selectedParts = selectedParts.filter((part) => !siblings.includes(part));
    if (!selectedParts.includes(parentPart)) {
      selectedParts.push(parentPart);
    }
  } else {
    selectedParts = selectedParts.filter((part) => part !== parentPart);
  }
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
  if (!xDown || yDown) {
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
  document.body.addEventListener("touchstart", handleTouchStart, false);
  document.body.addEventListener("touchmove", handleTouchMove, false);

  const siema = new Siema({ perPage: 1 });

  document.getElementById("switch-btn").onclick = () => {
    siema.next();
  };
});

function addStyleToSvg(isDeselect) {
  addStyleFor(isFront ? "svg-front" : "svg-back", isDeselect);
}

function addStyleFor(svgFilePrefix, isDeselect) {
  let svgObject = document.getElementById(svgFilePrefix);

  if (!svgObject) {
    console.error("SVG object not found with id:", svgFilePrefix);
    return;
  }

  console.log("Initial SVG object found:", svgObject);

  const svg = svgObject.contentDocument.querySelector("svg");

  const style = svgObject.contentDocument.createElementNS(
    "http://www.w3.org/2000/svg",
    "style"
  );

  style.textContent = `svg {
      transform: scale(1.25);
    }`;

  if (window.screen.width < 1200) {
    svg.insertBefore(style, svg.firstChild);
  }

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

      if (isDeselect) {
        svgElement.style.fill = "white";
      }

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
          svgItem.style.fill = selectedParts.includes(svgElement.id)
            ? "#ed2b2b"
            : "#ed2b2b";
          svgItem.style.transition = "transform 0.3s ease";
        }
      });

      svgElement.addEventListener("mouseout", function () {
        svgElement.style.cursor = "default";
        const parentId = svgElement.parentNode?.parentNode?.id;

        if (secondLayer) {
          svgElement.style.fill =
            selectedParts.includes(svgElement.id) ||
            selectedParts.includes(parentId?.substring(3))
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

        updateSelection(id);

        if (
          window.webkit &&
          window.webkit.messageHandlers &&
          window.webkit.messageHandlers.observer
        ) {
          window.webkit.messageHandlers.observer.postMessage({
            bodypart: id.substring(3),
          });
        } else {
          console.error(
            "WebKit message handler or selectedBodyParts is not defined"
          );
        }

        sendSelectedParts();

        if (!selectableBodyParts.includes(svgElement.id.substring(3))) {
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
  const isDeselect = true;
  addStyleToSvg(isDeselect);
}

function deselect(parts) {
  selectedParts = selectedParts.filter((part) => !parts.includes(part));
  sendSelectedParts();
  const isDeselect = true;
  addStyleToSvg(isDeselect);
}

function select(parts) {
  selectedParts = [...new Set([...selectedParts, ...parts])];
  sendSelectedParts();
  addStyleToSvg();
}

function setLanguage(language) {
  console.log("Setting language to:", language);
}
