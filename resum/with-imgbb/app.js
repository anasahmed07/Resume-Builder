const imageUploadInput = document.getElementById("imageUpload");
const profileImage = document.getElementById("profileImage");
const form = document.getElementById("resumeForm");

const imgBBAPIKey = "aeddca2feda0d67f36a761852643695d"; // Replace with your ImgBB API Key

imageUploadInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];

  if (file) {
    const formData = new FormData();
    formData.append("image", file);

    // Upload image to ImgBB API
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgBBAPIKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {
      // Image uploaded successfully
      const imageUrl = data.data.url;
      profileImage.src = imageUrl;
      profileImage.style.display = "block";

      // Update URL with image URL
      updateURLWithImage(imageUrl);
    } else {
      alert("Image upload failed. Please try again.");
    }
  }
});

// Function to update the URL with form data and the image URL
function updateURLWithImage(imageUrl) {
  const queryParams = new URLSearchParams();
  queryParams.set("name", document.getElementById("name").value);
  queryParams.set("email", document.getElementById("email").value);
  queryParams.set("phone", document.getElementById("phone").value);
  queryParams.set("address", document.getElementById("address").value);
  queryParams.set("summary", document.getElementById("summary").value);
  queryParams.set("education", document.getElementById("education").value);
  queryParams.set("experience", document.getElementById("experience").value);
  queryParams.set("skills", document.getElementById("skills").value);
  if (imageUrl) queryParams.set("image", imageUrl); // Add image URL to query parameters

  // Update the URL with the new query parameters
  history.replaceState(null, "", `${window.location.pathname}?${queryParams}`);
}

// Load data from URL
function loadFromURL() {
  const queryParams = new URLSearchParams(window.location.search);
  document.getElementById("name").value = queryParams.get("name") || "";
  document.getElementById("email").value = queryParams.get("email") || "";
  document.getElementById("phone").value = queryParams.get("phone") || "";
  document.getElementById("address").value = queryParams.get("address") || "";
  document.getElementById("summary").value = queryParams.get("summary") || "";
  document.getElementById("education").value =
    queryParams.get("education") || "";
  document.getElementById("experience").value =
    queryParams.get("experience") || "";
  document.getElementById("skills").value = queryParams.get("skills") || "";

  const imageUrl = queryParams.get("image");
  if (imageUrl) {
    profileImage.src = imageUrl;
    profileImage.style.display = "block";
  }
}

window.addEventListener("DOMContentLoaded", loadFromURL);
