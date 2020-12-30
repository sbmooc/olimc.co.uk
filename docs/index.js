let rotateSpeed = 0;

const setRotateSpeedDesktop = (event) => {
  rotateSpeed = event.x;
  rotateDiv()
};

const setRotateSpeedMobile = (event) => {
  rotateSpeed = event.gamma;
  rotateDiv()
};

const rotateDiv = () => {
  let div = document.getElementById("rotateMe");
  div.style.mozTransform = "rotate(" + rotateSpeed/2 + "deg)";
  div.style.msTransform = "rotate(" + rotateSpeed/2 + "deg)";
  div.style.oTransform = "rotate(" + rotateSpeed/2 + "deg)";
  div.style.transform = "rotate(" + rotateSpeed/2 + "deg)";
};

document.addEventListener("mousemove", setRotateSpeedDesktop);
window.addEventListener("deviceorientation", setRotateSpeedMobile, true);
