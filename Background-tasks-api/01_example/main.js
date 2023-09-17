function loadImage(imgUrl) {
  const imgElem = document.getElementById("img-container");
  // Code to load and render the image
  const img = document.createElement("img");
  img.setAttribute("src", imgUrl);
  imgElem.insertAdjacentElement("afterbegin", img);
}

function loadImages(images) {
  images.forEach((imgUrl) => {
    // Enqueue image loading tasks using requestIdleCallback
    // loadImage(imgUrl);
    requestIdleCallback(() => {
      loadImage(imgUrl);
    });
  });
}

// generate img url
function getImgUrls() {
  const imgUrls = [];
  let imgCount = 1;
  while (imgCount <= 51) {
    imgUrls.push(`./img/img (${imgCount}).png`);
    imgCount++;
  }
  return imgUrls;
}
const imgUrls = getImgUrls();

// Load images using requestIdleCallback
// loadImages(imgUrls);

// const printNums = () => {
//   for (let i = 0; i <= 10; i++) {
//     console.log(i);
//   }
// };

// (function () {
//   console.log("before loop");
//   // requestIdleCallback(printNums);
//   printNums();
//   console.log("after loop");
// })();

console.log("before loop");
requestIdleCallback(() => {
  for (let i = 0; i <= 10; i++) {
    console.log(i);
  }
});
console.log("after loop");

//* expected result -> "before loop",  "after loop", print 1 to 10
//* If we don't use requestIdleCallback then expected result -> "before loop", print 1 to 10 "after loop"
//* The same result will come if we invoke IIFE
