/*
We usually receive this from an API
*/
const translations = {
  previewText: "Preview Black Friday now",
  learnMoreText: "Learn more",
};

document.getElementById("previewText").textContent = translations.previewText;
document.getElementById("learnMoreLink").textContent =
  translations.learnMoreText;
