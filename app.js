// Add API key
const OPENAI_API_KEY = "";

const submitIcon = document.querySelector("#submit-icon");
const prompt = document.querySelector("#prompt");
const imagesSection = document.querySelector(".images-section");

const generateImages = async () => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt.value,
      n: 4,
      size: "1024x1024",
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      options
    );
    const data = response.json();
    console.log(data);
    data?.data.forEach((imageObj) => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      const image = document.createElement("img");
      image.setAttribute("src", imageObj.url);

      imageContainer.append(image);
      imagesSection.append(imageContainer);
    });
  } catch (error) {
    console.log(error);
  }
};

submitIcon.addEventListener("click", generateImages);
