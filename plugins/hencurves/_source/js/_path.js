function getOffsetFromAncestor(element, ancestor) {
  let offsetLeft = 0;
  let offsetTop = 0;
  let current = element;

  while (current && current !== ancestor) {
    offsetLeft += current.offsetLeft;
    offsetTop += current.offsetTop;
    current = current.offsetParent;
  }

  return { left: offsetLeft, top: offsetTop };
}
//
//
export default class Path {
  // Object Variables
  startY;
  endY;
  width;
  height;
  strokeWidth;
  pathData = "";
  /**
   * Description
   * @param {any} w
   * @param {any} h
   * @returns {any}
   */
  constructor(w, h, strokeWidth) {
    this.width = w;
    this.height = h;

    this.strokeWidth = strokeWidth;

    this.startY = 0;
    this.endY = this.startY;

    this.pathData = `M 0,${this.startY} `;
  }
 
  generateFlipShape(startY, endY, direction, close, closeTop) {

    let radius = (this.height / 2);

    // let pivot = this.width / 2;
    let pivot = this.width * 0.4;

    let path = `M 32,${direction ? startY : endY}\n`;
    path += `h ${pivot - radius}\n`;

    // draw curve in direction of y
    path += `a ${radius} ${radius} 90 0 ${
      direction ? "1" : "0"
    } ${radius}, ${direction ? radius : -radius} \n`;
    path += `a ${radius} ${radius} 90 0 ${
      direction ? "0" : "1"
    } ${radius}, ${direction ? radius : -radius} \n`;
  
    // draw horizontal line to last y
    path += `H ${this.width} \n`;

    if (close) {
      if (closeTop) {
        path += `V 0 H 32 Z`;
      } else {
        path += `V ${this.height} H 32 Z`;
      }
    }
    return path;
  }

  getMaskFlipSVG() {
    // ? wtf ?
    $ = jQuery;
    //
    // Adjust css to center pairing
    let columnsInitial;
    let columnsFinal;
    columnsInitial = [$(".hencurve.flip .textContainer #el1"), $(".hencurve.flip .textContainer #el2")];
    columnsFinal = [$(".hencurve.flip .textContainer #el3"), $(".hencurve.flip .textContainer #el4")];
   
    let startY = 0;
    let endY = this.height;

    let path1 = this.generateFlipShape(startY, endY, 1, 1, 1);
    let path1Flipped = this.generateFlipShape(startY, endY, 0, 1, 1);

    // create the same paths but don't close them
    let path1Stroke = this.generateFlipShape(startY, endY, 1, 0, 1);
    let path1StrokeFlipped = this.generateFlipShape(startY, endY, 0, 0, 1);
    
    let basePath1 = `<clipPath id="clipFlip">
                      <path class='curvePath' d="${path1}" fill="red" stroke="none" />
                    </clipPath>
                    <path class='curvePath' d="${path1}" stroke="none" fill="red"/>
                    <path class='strokePath' id="blurStroke" d="${path1Stroke}"
                        stroke="none"
                        fill="none"
                        stroke-width="${this.strokeWidth}"/>
                    <path class='strokePath' d="${path1Stroke}"
                        stroke="none"
                        fill="none"                                        
                        stroke-width="${this.strokeWidth}"/>`;

    
    let basePath1Flipped = `<clipPath>
                              <path class='curvePath' d="${path1Flipped}" fill="none" stroke="none"/>
                            </clipPath>
                            <path class='curvePath' d="${path1Flipped}" stroke="none" fill="none"/>
                            <path class='strokePath' d="${path1StrokeFlipped}"
                                stroke="none"
                                fill="none"                                        
                                stroke-width="${this.strokeWidth}"/>`;

    let path2 = this.generateFlipShape(startY, endY, 1, 1, 0);
    let path2Flipped = this.generateFlipShape(startY, endY, 0, 1, 0);

    let basePath2 = `<clipPath id="clipInverse">
                      <path class='curvePath' d="${path2}"/>
                    </clipPath>
                    <path class='curvePath' d="${path2}" stroke="none" fill="blue"/>`;
// 
    let basePath2Flipped = `<clipPath>
                              <path class='curvePath' d="${path2Flipped}" fill="none"/>
                            </clipPath>
                            <path class='curvePath' d="${path2Flipped}" stroke="none" fill="none"/>`;

    return `<svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 ${this.width + this.strokeWidth} ${this.height}"
                width="${this.width + this.strokeWidth}px" height="${this.height + this.strokeWidth}px">
              <g id="flip">
                ${basePath1}
              </g>
              <g id="unflip">
                ${basePath1Flipped}
              </g>
              <g id="flipInverse">
                ${basePath2}
              </g>
              <g id="unflipInverse">
                ${basePath2Flipped}
              </g>
            </svg>`;
  }
}
