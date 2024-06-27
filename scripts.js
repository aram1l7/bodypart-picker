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
];

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
  "sternum",
  "hip-left",
  "groin-left",
  "hip-right",
  "groin-right",
  "mons-pubis",
  "genital-organ",
  "lower-leg-tibial-anterior-right",
  "thigh-medial-right-front",
  "knee-right",
  "thigh-lateral-right-front",
  "trochanter-right",
  "lower-leg-lateral-right-front",
  "lower-leg-medial-right-front",
  "shoulder-right-front",
  "elbow-right-front",
  "armpit-right",
  "upper-arm-right-front",
  "forearm-right-front",
  "shoulder-left-front",
  "elbow-left-front",
  "armpit-left",
  "upper-arm-left-front",
  "forearm-left-front",
  "thigh-lateral-left-front",
  "thigh-medial-left-front",
  "trochanter-left",
  "knee-left",
  "lower-leg-medial-left-front",
  "lower-leg-tibial-anterior-left",
  "lower-leg-lateral-left-front",
  "ankle-lateral-left-front",
  "ankle-medial-left-front",
  "fifth-metatarsal-left-dorsal",
  "fourth-metatarsal-left-dorsal",
  "third-metatarsal-left-dorsal",
  "second-metatarsal-left-dorsal",
  "first-metatarsal-left-dorsal",
  "metatarsophalangeal-joint-great-toe-left-dorsal",
  "metatarsophalangeal-joint-second-toe-left-dorsal",
  "metatarsophalangeal-joint-third-toe-left-dorsal",
  "metatarsophalangeal-joint-fourth-toe-left-dorsal",
  "metatarsophalangeal-joint-fifth-toe-left-dorsal",
  "proximal-phalanx-great-toe-left-dorsal",
  "interphalangeal-joint-great-toe-left-dorsal",
  "distal-phalanx-great-toe-left-dorsal",
  "nail-of-great-toe-left",
  "proximal-phalanx-second-toe-left-dorsal",
  "nail-of-second-toe-left",
  "proximal-interphalangeal-joint-second-toe-left-dorsal",
  "middle-phalanx-second-toe-left-dorsal",
  "distal-interphalangeal-joint-second-toe-left-dorsal",
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
    "bp-upper-right-quadrant-adbomen",
    "bp-upper-left-quadrant-adbomen",
    "bp-lower-right-quadrant-adbomen",
    "bp-lower-left-quadrant-adbomen",
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
  "bp-foot-right-dorsal": [
    "bp-metatarsophalangeal-joint-great-toe-right-dorsal",
    "bp-ankle-medial-right-front",
    "bp-ankle-lateral-right-front",
    "bp-first-metatarsal-right-dorsal",
    "bp-second-metatarsal-right-dorsal",
    "bp-third-metatarsal-right-dorsal",
    "bp-fourth-metatarsal-right-dorsal",
    "bp-fifth-metatarsal-right-dorsal",
    "bp-metatarsophalangeal-joint-great-toe-right-dorsal",
    "bp-metatarsophalangeal-joint-second-toe-right-dorsal",
    "bp-metatarsophalangeal-joint-third-toe-right-dorsal",
    "bp-metatarsophalangeal-joint-fifth-toe-right-dorsal",
  ],
  "bp-upper-limb-right-front": [
    "bp-shoulder-right-front",
    "bp-armpit-right",
    "bp-elbow-right-front",
    "bp-upper-arm-right-front",
    "bp-forearm-right-front",
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
    "bp-metatarsophalangeal-joint-great-toe-left-dorsal",
    "bp-ankle-medial-left-front",
    "bp-ankle-lateral-left-front",
    "bp-first-metatarsal-left-dorsal",
    "bp-second-metatarsal-left-dorsal",
    "bp-third-metatarsal-left-dorsal",
    "bp-fourth-metatarsal-left-dorsal",
    "bp-fifth-metatarsal-left-dorsal",
    "bp-metatarsophalangeal-joint-great-toe-left-dorsal",
    "bp-metatarsophalangeal-joint-second-toe-left-dorsal",
    "bp-metatarsophalangeal-joint-third-toe-left-dorsal",
    "bp-metatarsophalangeal-joint-fifth-toe-left-dorsal",
    "bp-great-toe-left-dorsal",
  ],
  "bp-great-toe-left-dorsal": [
    "bp-proximal-phalanx-great-toe-left-dorsal",
    "bp-interphalangeal-joint-great-toe-left-dorsal",
    "bp-distal-phalanx-great-toe-left-dorsal",
    "bp-nail-of-great-toe-left",
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
  console.log(parentPart, "parentPart");
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
        if (selectableBodyParts.includes(id.substring(3))) {
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

      if (!selectableBodyParts.includes(svgElement.id.substring(3))) {
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
