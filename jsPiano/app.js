document.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  const audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
  const boxElement = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!audioElement) return; //stop the function
  audioElement.currentTime = 0;
  audioElement.play();
  if (boxElement) {
    boxElement.classList.add("active");
    audioElement.addEventListener("ended", () => {
      boxElement.classList.remove("active");
    });
  }
});
