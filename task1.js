const loadButton = document.querySelector("#load");

const handleLoad = async () => {
  loadButton.disabled = true;
  // use innerText instead of textContent
  loadButton.innerText = "Loading images…";
  // use try/catch
  try {
    // use async/await instead of promise chains
    const response = await fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=3"
    );
    const { data } = await response.json();

    const imagePromises = data.map((item) =>
      loadImage(item.images.downsized.url)
    );
    await Promise.allSettled(imagePromises);

    loadButton.remove();
  } catch (error) {
    console.error("Failed to load imagees", error);
    loadButton.innerText = "Failed to load images, try again";
    loadButton.disabled = false;
  }
};
// append image after loading
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = resolve;
    image.onerror = reject;
    document.body.appendChild(image);
  });
};

loadButton.addEventListener("click", loadImages);
