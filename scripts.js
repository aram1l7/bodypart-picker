window.onload = addStyleToSvg;

const replacableBodyParts = [
  "bp-upper-limb-left-front",
  "bp-hand-left-palmar",
  "bp-lower-limb-left-front",
  "bp-foot-left-dorsal",
  "bp-great-toe-left-dorsal",
  "bp-second-toe-left-dorsal",
  "bp-third-toe-left-dorsal",
  "bp-fourth-toe-left-dorsal",
  "bp-fifth-toe-left-dorsal",
  "bp-thumb-left-palmar",
  "bp-little-finger-left-palmar",
  "bp-ring-finger-left-palmar",
  "bp-middle-finger-left-palmar",
  "bp-index-finger-left-palmar",
];

const nonSelectableBodyParts = [
  "lower-limb-right-front",
  "lower-limb-left-front",
  "head-front",
  "head-back",
  "pelvic-region-front",
  "foot-left-dorsal",
  "foot-right-dorsal",
  "upper-limb-right-front",
  "upper-limb-left-front",
  "thorax",
  "abdomen",
  "hand-right-palmar",
  "hand-left-palmar",
  "great-toe-left-dorsal",
  "second-toe-left-dorsal",
  "third-toe-left-dorsal",
  "fourth-toe-left-dorsal",
  "fifth-toe-left-dorsal",
  "great-toe-right-dorsal",
  "second-toe-right-dorsal",
  "third-toe-right-dorsal",
  "fourth-toe-right-dorsal",
  "fifth-toe-right-dorsal",
  "genital-organ-male",
  "genital-organ-female",
  "thumb-right-palmar",
  "little-finger-right-palmar",
  "ring-finger-right-palmar",
  "middle-finger-right-palmar",
  "index-finger-right-palmar",
  "thumb-left-palmar",
  "little-finger-left-palmar",
  "ring-finger-left-palmar",
  "middle-finger-left-palmar",
  "index-finger-left-palmar",
];

const bodyPartHierarchy = {
  "bp-head-front": [
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
  "bp-thorax": [
    "bp-sternum",
    "bp-side-of-chest-right",
    "bp-breast-right",
    "bp-breast-left",
    "bp-side-of-chest-left",
  ],
  "bp-head-back": [
    "bp-parietal-region",
    "bp-occipital-region",
    "bp-postauricular-region-left",
    "bp-ear-left",
    "bp-postauricular-region-right",
    "bp-ear-right",
  ],
  "bp-abdomen": [
    "bp-upper-left-quadrant-abdomen",
    "bp-upper-right-quadrant-abdomen",
    "bp-lower-right-quadrant-abdomen",
    "bp-lower-left-quadrant-abdomen",
    "bp-umbilical-region",
  ],
  "bp-pelvic-region-front": [
    "bp-hip-left",
    "bp-groin-left",
    "bp-hip-right",
    "bp-groin-right",
    "bp-mons-pubis",
    "bp-genital-organ",
  ],
  "bp-lower-limb-right-front": [
    "bp-lower-leg-tibial-anterior-right",
    "bp-thigh-medial-right-front",
    "bp-knee-right",
    "bp-thigh-lateral-right-front",
    "bp-trochanter-right",
    "bp-lower-leg-lateral-right-front",
    "bp-lower-leg-medial-right-front",
    "bp-foot-right-dorsal",
  ],
  "bp-upper-limb-right-front": [
    "bp-shoulder-right-front",
    "bp-armpit-right",
    "bp-elbow-right-front",
    "bp-upper-arm-right-front",
    "bp-forearm-right-front",
    "bp-hand-right-palmar",
  ],

  "bp-upper-limb-left-front": [
    "bp-shoulder-left-front",
    "bp-armpit-left",
    "bp-elbow-left-front",
    "bp-upper-arm-left-front",
    "bp-forearm-left-front",
    "bp-hand-left-palmar",
  ],

  "bp-lower-limb-left-front": [
    "bp-thigh-lateral-left-front",
    "bp-thigh-medial-left-front",
    "bp-trochanter-left",
    "bp-knee-left",
    "bp-lower-leg-medial-left-front",
    "bp-lower-leg-tibial-anterior-left",
    "bp-lower-leg-lateral-left-front",
    "bp-foot-left-dorsal",
  ],

  "bp-foot-left-dorsal": [
    "bp-ankle-lateral-left-front",
    "bp-ankle-medial-left-front",
    "bp-first-metatarsal-left-dorsal",
    "bp-second-metatarsal-left-dorsal",
    "bp-third-metatarsal-left-dorsal",
    "bp-fourth-metatarsal-left-dorsal",
    "bp-fifth-metatarsal-left-dorsal",
    "bp-metatarsophalangeal-joint-fifth-toe-left-dorsal",
    "bp-metatarsophalangeal-joint-fourth-toe-left-dorsal",
    "bp-metatarsophalangeal-joint-third-toe-left-dorsal",
    "bp-metatarsophalangeal-joint-second-toe-left-dorsal",
    "bp-metatarsophalangeal-joint-great-toe-left-dorsal",
    "bp-great-toe-left-dorsal",
    "bp-second-toe-left-dorsal",
    "bp-third-toe-left-dorsal",
    "bp-fourth-toe-left-dorsal",
    "bp-fifth-toe-left-dorsal",
  ],
  "bp-great-toe-left-dorsal": [
    "bp-proximal-phalanx-great-toe-left-dorsal",
    "bp-interphalangeal-joint-great-toe-left-dorsal",
    "bp-distal-phalanx-great-toe-left-dorsal",
    "bp-nail-of-great-toe-left",
  ],
  "bp-second-toe-left-dorsal": [
    "bp-proximal-phalanx-second-toe-left-dorsal",
    "bp-nail-of-second-toe-left",
    "bp-proximal-interphalangeal-joint-second-toe-left-dorsal",
    "bp-middle-phalanx-second-toe-left-dorsal",
    "bp-distal-interphalangeal-joint-second-toe-left-dorsal",
    "bp-distal-phalanx-second-toe-left-dorsal",
  ],
  "bp-third-toe-left-dorsal": [
    "bp-proximal-phalanx-third-toe-left-dorsal",
    "bp-nail-of-third-toe-left",
    "bp-proximal-interphalangeal-joint-third-toe-left-dorsal",
    "bp-middle-phalanx-third-toe-left-dorsal",
    "bp-distal-interphalangeal-joint-third-toe-left-dorsal",
    "bp-distal-phalanx-third-toe-left-dorsal",
  ],
  "bp-fourth-toe-left-dorsal": [
    "bp-proximal-phalanx-fourth-toe-left-dorsal",
    "bp-nail-of-fourth-toe-left",
    "bp-proximal-interphalangeal-joint-fourth-toe-left-dorsal",
    "bp-middle-phalanx-fourth-toe-left-dorsal",
    "bp-distal-interphalangeal-joint-fourth-toe-left-dorsal",
    "bp-distal-phalanx-fourth-toe-left-dorsal",
  ],
  "bp-fifth-toe-left-dorsal": [
    "bp-proximal-phalanx-fifth-toe-left-dorsal",
    "bp-nail-of-fifth-toe-left",
    "bp-proximal-interphalangeal-joint-fifth-toe-left-dorsal",
    "bp-middle-phalanx-fifth-toe-left-dorsal",
    "bp-distal-interphalangeal-joint-fifth-toe-left-dorsal",
    "bp-distal-phalanx-fifth-toe-left-dorsal",
  ],

  "bp-foot-right-dorsal": [
    "bp-ankle-lateral-right-front",
    "bp-ankle-medial-right-front",
    "bp-first-metatarsal-right-dorsal",
    "bp-second-metatarsal-right-dorsal",
    "bp-third-metatarsal-right-dorsal",
    "bp-fifth-metatarsal-right-dorsal",
    "bp-metatarsophalangeal-joint-great-toe-right-dorsal",
    "bp-fourth-metatarsal-right-dorsal",
    "bp-metatarsophalangeal-joint-second-toe-right-dorsal",
    "bp-metatarsophalangeal-joint-third-toe-right-dorsal",
    "bp-metatarsophalangeal-joint-fifth-toe-right-dorsal",
    "bp-metatarsophalangeal-joint-fourth-toe-right-dorsal",
    "bp-great-toe-right-dorsal",
    "bp-distal-phalanx-second-toe-right-dorsal",
    "bp-second-toe-right-dorsal",
    "bp-distal-phalanx-third-toe-right-dorsal",
    "bp-third-toe-right-dorsal",
    "bp-distal-phalanx-fourth-toe-right-dorsal",
    "bp-fourth-toe-right-dorsal",
    "bp-distal-phalanx-fifth-toe-right-dorsal",
    "bp-fifth-toe-right-dorsal",
  ],
  "bp-great-toe-right-dorsal": [
    "bp-proximal-phalanx-great-toe-right-dorsal",
    "bp-interphalangeal-joint-great-toe-right-dorsal",
    "bp-distal-phalanx-great-toe-right-dorsal",
    "bp-nail-of-great-toe-right",
  ],
  "bp-second-toe-right-dorsal": [
    "bp-proximal-phalanx-second-toe-right-dorsal",
    "bp-nail-of-second-toe-right",
    "bp-proximal-interphalangeal-joint-second-toe-right-dorsal",
    "bp-middle-phalanx-second-toe-right-dorsal",
    "bp-distal-interphalangeal-joint-second-toe-right-dorsal",
  ],
  "bp-third-toe-right-dorsal": [
    "bp-proximal-phalanx-third-toe-right-dorsal",
    "bp-nail-of-third-toe-right",
    "bp-proximal-interphalangeal-joint-third-toe-right-dorsal",
    "bp-middle-phalanx-third-toe-right-dorsal",
    "bp-distal-interphalangeal-joint-third-toe-right-dorsal",
  ],
  "bp-fourth-toe-right-dorsal": [
    "bp-proximal-phalanx-fourth-toe-right-dorsal",
    "bp-nail-of-fourth-toe-right",
    "bp-proximal-interphalangeal-joint-fourth-toe-right-dorsal",
    "bp-middle-phalanx-fourth-toe-right-dorsal",
    "bp-distal-interphalangeal-joint-fourth-toe-right-dorsal",
  ],
  "bp-fifth-toe-right-dorsal": [
    "bp-proximal-phalanx-fifth-toe-right-dorsal",
    "bp-nail-of-fifth-toe-right",
    "bp-proximal-interphalangeal-joint-fifth-toe-right-dorsal",
    "bp-middle-phalanx-fifth-toe-right-dorsal",
    "bp-distal-interphalangeal-joint-fifth-toe-right-dorsal",
  ],

  "bp-hand-left-palmar": [
    "bp-palm-left",
    "bp-wrist-left-palmar",
    "bp-little-finger-left-palmar",
    "bp-ring-finger-left-palmar",
    "bp-middle-finger-left-palmar",
    "bp-index-finger-left-palmar",
    "bp-thumb-left-palmar",
  ],

  "bp-thumb-left-palmar": [
    "bp-proximal-phalanx-thumb-left-palmar",
    "bp-interphalangeal-joint-thumb-left-palmar",
    "bp-distal-phalanx-thumb-left-palmar",
  ],
  "bp-little-finger-left-palmar": [
    "bp-proximal-phalanx-little-finger-left-palmar",
    "bp-proximal-interphalangeal-joint-little-finger-left-palmar",
    "bp-middle-phalanx-little-finger-left-palmar",
    "bp-distal-interphalangeal-joint-little-finger-left-palmar",
    "bp-distal-phalanx-little-finger-left-palmar",
  ],
  "bp-ring-finger-left-palmar": [
    "bp-proximal-phalanx-ring-finger-left-palmar",
    "bp-proximal-interphalangeal-joint-ring-finger-left-palmar",
    "bp-middle-phalanx-ring-finger-left-palmar",
    "bp-distal-interphalangeal-joint-ring-finger-left-palmar",
    "bp-distal-phalanx-ring-finger-left-palmar",
  ],
  "bp-middle-finger-left-palmar": [
    "bp-proximal-phalanx-middle-finger-left-palmar",
    "bp-proximal-interphalangeal-joint-middle-finger-left-palmar",
    "bp-middle-phalanx-middle-finger-left-palmar",
    "bp-distal-interphalangeal-joint-middle-finger-left-palmar",
    "bp-distal-phalanx-middle-finger-left-palmar",
  ],
  "bp-index-finger-left-palmar": [
    "bp-proximal-phalanx-index-finger-left-palmar",
    "bp-proximal-interphalangeal-joint-index-finger-left-palmar",
    "bp-middle-phalanx-index-finger-left-palmar",
    "bp-distal-interphalangeal-joint-index-finger-left-palmar",
    "bp-distal-phalanx-index-finger-left-palmar",
  ],

  "bp-hand-right-palmar": [
    "bp-palm-right",
    "bp-wrist-right-palmar",
    "bp-little-finger-right-palmar",
    "bp-ring-finger-right-palmar",
    "bp-middle-finger-right-palmar",
    "bp-index-finger-right-palmar",
    "bp-thumb-right-palmar",
  ],


  "bp-thumb-right-palmar": [
    "bp-proximal-phalanx-thumb-right-palmar",
    "bp-interphalangeal-joint-thumb-right-palmar",
    "bp-distal-phalanx-thumb-right-palmar",
  ],
  "bp-little-finger-right-palmar": [
    "bp-proximal-phalanx-little-finger-right-palmar",
    "bp-proximal-interphalangeal-joint-little-finger-right-palmar",
    "bp-middle-phalanx-little-finger-right-palmar",
    "bp-distal-interphalangeal-joint-little-finger-right-palmar",
    "bp-distal-phalanx-little-finger-right-palmar",
  ],
  "bp-ring-finger-right-palmar": [
    "bp-proximal-phalanx-ring-finger-right-palmar",
    "bp-proximal-interphalangeal-joint-ring-finger-right-palmar",
    "bp-middle-phalanx-ring-finger-right-palmar",
    "bp-distal-interphalangeal-joint-ring-finger-right-palmar",
    "bp-distal-phalanx-ring-finger-right-palmar",
  ],
  "bp-middle-finger-right-palmar": [
    "bp-proximal-phalanx-middle-finger-right-palmar",
    "bp-proximal-interphalangeal-joint-middle-finger-right-palmar",
    "bp-middle-phalanx-middle-finger-right-palmar",
    "bp-distal-interphalangeal-joint-middle-finger-right-palmar",
    "bp-distal-phalanx-middle-finger-right-palmar",
  ],
  "bp-index-finger-right-palmar": [
    "bp-proximal-phalanx-index-finger-right-palmar",
    "bp-proximal-interphalangeal-joint-index-finger-right-palmar",
    "bp-middle-phalanx-index-finger-right-palmar",
    "bp-distal-interphalangeal-joint-index-finger-right-palmar",
    "bp-distal-phalanx-index-finger-right-palmar",
  ],

};

function flipSVG(svgDoc) {
  const svg = svgDoc.querySelector("svg");
  svg.setAttribute("transform", "scale(-1, 1)");

  function updateIds(element) {
    if (element.hasAttribute("id")) {
      var id = element.getAttribute("id");
      if (id.includes("right")) {
        element.setAttribute("id", id.replace("right", "left"));
      }
    }
    Array.from(element.children).forEach(updateIds);
  }

  const gElements = svg.querySelectorAll("g");
  gElements.forEach(updateIds);

  gElements.forEach(function (g) {
    let pathElements = g.querySelectorAll("path");
    pathElements.forEach(updateIds);
  });
}

let isFront = true;
let selectedParts = [];
let navigationStack = [];

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
  console.log(selectedParts, "selectedparts");
}

document.addEventListener("DOMContentLoaded", function () {
  const siemaInstance = new Siema({
    perPage: 1,
    onChange: (e) => {
      if (siemaInstance.currentSlide === 0) {
        document.querySelector(".prev").style.backgroundColor = "white";

        document.querySelector(".next").style.backgroundColor =
          "rgb(175, 175, 175)";

        isFront = true;
      } else {
        document.querySelector(".prev").style.backgroundColor =
          "rgb(175, 175, 175)";
        document.querySelector(".next").style.backgroundColor = "white";
        isFront = false;
      }
      addStyleToSvg();
    },
    selector: "#wrapper",
  });

  const svgElements = document.querySelectorAll("object.svg");

  svgElements.forEach((svg) => {
    svg.addEventListener("load", () => {
      const svgDoc = svg.contentDocument;
      const svgRoot = svgDoc.documentElement;

      const hammer = new Hammer(svgRoot);

      hammer.on("swipeleft", () => siemaInstance.next());
      hammer.on("swiperight", () => siemaInstance.prev());
    });
  });

  document.querySelector(".prev").style.backgroundColor =
    siemaInstance.currentSlide === 0 ? "white" : "rgb(175, 175, 175)";

  document.querySelector(".prev").onclick = function () {
    if (siemaInstance.currentSlide === 0) return;

    siemaInstance.prev();
  };

  document.querySelector(".next").onclick = function () {
    if (siemaInstance.currentSlide === 1) return;

    siemaInstance.next();
  };

  document.getElementById("back-btn").onclick = function () {
    navigateBack();
    sendSelectedParts();
  };
});

function addStyleToSvg(isDeselect) {
  addStyleFor(isFront ? "svg-front" : "svg-back", isDeselect);
}

function transformAndScaleSvg(svgObject) {
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

    const viewBoxValue = `200 0 680 1460`;

    svg.setAttribute("viewBox", viewBoxValue);
  }
}

function applyListeners(svgDocument, secondLayer, isDeselect, svgObject) {
  if (!svgDocument) {
    console.error("SVG document is null");
    return;
  }

  let svgElements = svgDocument.getElementsByClassName("hover");

  if (svgElements.length === 0) {
    console.warn("No elements with class 'hover' found in the SVG document");
  }

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
        if (svgElement.nodeName === "path") {
          svgElement.style.fill = "#ed2b2b";
          svgElement.style.transition = "fill 0.3s ease";
        } else {
          for (let j = 0; j < children.length; j++) {
            const svgItem = children[j];
            svgItem.style.fill = "#ed2b2b";
            svgItem.style.transition = "fill 0.3s ease";
          }
        }

        return;
      }

      for (let j = 0; j < children.length; j++) {
        const svgItem = children[j];
        svgItem.style.fill = "#ed2b2b";
        svgItem.style.transition = "fill 0.3s ease";
      }
    });

    const parentId = svgElement.parentNode?.parentNode?.id;

    if (
      selectedParts.includes(svgElement.id) ||
      selectedParts.includes(parentId)
    ) {
      if (svgElement.nodeName === "path") {
        svgElement.style.fill = "#ed2b2b";
        svgElement.style.transition = "fill 0.3s ease";
      } else {
        for (let j = 0; j < children.length; j++) {
          const svgItem = children[j];
          svgItem.style.fill = "#ed2b2b";
          svgItem.style.transition = "fill 0.3s ease";
        }
      }
    }

    svgElement.addEventListener("mouseout", function () {
      svgElement.style.cursor = "default";

      if (secondLayer) {
        if (svgElement.nodeName === "path") {
          svgElement.style.fill =
            selectedParts.includes(svgElement.id) ||
            selectedParts.includes(parentId)
              ? "#ed2b2b"
              : "white";
        } else {
          for (let j = 0; j < children.length; j++) {
            const svgItem = children[j];
            svgItem.style.fill =
              selectedParts.includes(svgElement.id) ||
              selectedParts.includes(parentId)
                ? "#ed2b2b"
                : "white";
          }
        }

        return;
      }

      for (let j = 0; j < children.length; j++) {
        const svgItem = children[j];
        svgItem.style.fill = originalColors[j];
        svgItem.style.transition = "fill 0.3s ease";
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
        if (!nonSelectableBodyParts.includes(id.substring(3))) {
          selectedParts.push(id);
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

      if (nonSelectableBodyParts.includes(svgElement.id.substring(3))) {
        let newSvgFile = `./assets/${svgElement.id}.svg`;
        navigationStack.push(svgElement.id);

        if (replacableBodyParts.includes(svgElement.id)) {
          newSvgFile = `./assets/${svgElement.id.replace("left", "right")}.svg`;
        }

        svgObject.data = newSvgFile;

        if (navigationStack.length > 0) {
          document.getElementById("back-btn").style.display = "block";
        }

        svgObject.onload = function () {
          let newSvgDocument = svgObject.contentDocument;
          if (replacableBodyParts.includes(svgElement.id)) {
            flipSVG(newSvgDocument);
          }
          setTimeout(() => {
            applyListeners(newSvgDocument, true, isDeselect, svgObject);
          }, 500);
        };
      }
    });
  }
}

function addStyleFor(svgFilePrefix, isDeselect) {
  let svgObject = document.getElementById(svgFilePrefix);

  if (!svgObject) {
    console.error("SVG object not found with id:", svgFilePrefix);
    return;
  }

  transformAndScaleSvg(svgObject);

  svgObject.onload = function () {
    let svgDocument = svgObject.contentDocument;

    applyListeners(svgDocument, false, isDeselect, svgObject);
  };

  if (svgObject.contentDocument) {
    let svgDocument = svgObject.contentDocument;
    applyListeners(svgDocument, false, isDeselect, svgObject);
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

function navigateBack() {
  if (navigationStack.length > 0) {
    navigationStack.pop();

    const svgElementId = navigationStack.at(-1);

    let previousSvgFile = `./assets/${svgElementId}.svg`;

    if (navigationStack.length === 0) {
      document.getElementById("back-btn").style.display = "none";
    }
    if (replacableBodyParts.includes(svgElementId)) {
      previousSvgFile = `./assets/${svgElementId.replace("left", "right")}.svg`;
    }

    const svgObject = isFront
      ? document.getElementById("svg-front")
      : document.getElementById("svg-back");

    if (navigationStack.length === 0) {
      if (isFront) {
        previousSvgFile = `./assets/whole-body-front.svg`;
      } else {
        previousSvgFile = `./assets/whole-body-back.svg`;
      }
    }

    svgObject.data = previousSvgFile;

    svgObject.onload = function () {
      let svgDocument = svgObject.contentDocument;
      if (replacableBodyParts.includes(svgElementId)) {
        flipSVG(svgDocument);
      }
      if (navigationStack.length === 0) {
        transformAndScaleSvg(svgObject);
      }
      applyListeners(svgDocument, true, false, svgObject);
    };

    if (svgObject.contentDocument) {
      let svgDocument = svgObject.contentDocument;
      applyListeners(svgDocument, true, false, svgObject);
    }
  }
}

function setLanguage(language) {
  console.log("Setting language to:", language);
}
