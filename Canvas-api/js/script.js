const title = document.querySelector("head title");
const canvas = document.getElementById("my-canvas");
const shapes = document.querySelectorAll("ul li");

let w,
  h,
  x,
  y,
  isMousedown = false,
  toolType = null;

shapes.forEach((shape) => {
  shape.addEventListener("click", () => {
    if (shape.classList.contains("active")) {
      title.textContent = `Canvas api - draw and delete shape`;
      shape.classList.remove("active");
      toolType = null;
      return;
    }
    for (shapeElem of shapes) {
      shapeElem.classList.remove("active");
    }
    shape.classList.add("active");
    toolType = shape.id;
    canvas.style.cursor = "default";
    // add listener on click text tool. It remove when draw a shape
    if (toolType === "text") {
      canvas.style.cursor = "text";
      canvas.addEventListener("click", insertInput);
    }
    // update title
    title.textContent = `${toolType} - Canvas api`;
  });
});

const ctx = canvas.getContext("2d");
// draw rectangle
function drawRectangle(x, y, w, h) {
  ctx.strokeRect(x, y, w, h);
}
function drawFillRec(x, y, w, h) {
  ctx.fillRect(x, y, w, h);
}
// draw street line
function drawLine(startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.strokeStyle = "block";
  ctx.closePath();
}
// draw triangle
function drawTriangle(startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.lineTo(x, endY);
  ctx.closePath();
  ctx.stroke();
  ctx.strokeStyle = "black";
}

// draw circle
function drawCircle(x, y, endX) {
  let radius = Math.abs(x - endX) / 2;
  ctx.beginPath();
  ctx.arc(x + radius, y + radius, radius, 0, 360);
  ctx.stroke();
}
// insert text
function insertText(text, x, y) {
  ctx.font = "16px poppins";
  ctx.fillText(text, x, y + 5);
}
// write from cursor
function writeFromCursor(x, y, offsetX, offsetY) {
  if (!isMousedown || toolType !== "pen") return;
  drawLine(x, y, offsetX, offsetY);
}
// erase shape
function eraseShape({ offsetX, offsetY }) {
  if (!isMousedown || toolType !== "eraser") return;
  ctx.clearRect(offsetX, offsetY, 20, 20);
}

// draw shape
function drawShape(toolType, x, y, w, h, endX, endY) {
  if (!toolType) {
    alert("first choose a shape");
    return;
  }
  ctx.lineWidth = 3;
  if (toolType === "rect") {
    drawRectangle(x, y, w, h);
  } else if (toolType === "fill-rect") {
    drawFillRec(x, y, w, h);
  } else if (toolType === "line") {
    drawLine(x, y, endX, endY);
  } else if (toolType === "triangle") {
    drawTriangle(x, y, endX, endY);
  } else if (toolType === "circle") {
    drawCircle(x, y, endX, endY);
  }
}

const insertInput = ({ clientX, clientY, offsetX, offsetY }) => {
  if (!toolType) return;
  const textInput = document.createElement("input");
  textInput.classList.add("text-input");
  textInput.placeholder = "Enter text here...";
  textInput.style.top = clientY - 8 + "px";
  textInput.style.left = clientX + "px";
  textInput.addEventListener("blur", () => {
    textInput?.remove();
  });
  textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      let value = textInput.value;
      insertText(value, offsetX, offsetY);
      if (!textInput) return;
      textInput?.remove();
    }
  });
  document.body.append(textInput);
  textInput.focus();
};

// Event listeners to canvas

canvas.addEventListener("click", insertInput);

canvas.addEventListener("mousedown", (e) => {
  isMousedown = true;
  x = e.offsetX;
  y = e.offsetY;
  w = x;
  h = y;
});
canvas.addEventListener("mouseup", (e) => {
  isMousedown = false;
  w = e.offsetX - w;
  h = e.offsetY - h;
  if (!w && !h) return;
  drawShape(toolType, x, y, w, h, e.offsetX, e.offsetY);
  canvas.removeEventListener("click", insertInput);
});

canvas.addEventListener("mousemove", ({ offsetX, offsetY }) => {
  eraseShape({ offsetX, offsetY });
  if (toolType === "pen") {
    writeFromCursor(x, y, offsetX, offsetY);
    x = offsetX;
    y = offsetY;
  }
});
