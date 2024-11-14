// // // Get form elements
// // const imageUploadInput = document.getElementById('imageUpload');
// // const profileImage = document.getElementById('profileImage');
// // const form = document.getElementById('resumeForm');

// // // Check if there's an image base64 string in the URL and display it
// // function loadFromURL() {
// //   const queryParams = new URLSearchParams(window.location.search);
// //   const imageData = queryParams.get('image');
// //   const name = queryParams.get('name');
// //   const email = queryParams.get('email');
// //   const phone = queryParams.get('phone');

// //   if (imageData) profileImage.src = imageData;
// //   if (name) document.getElementById('name').value = name;
// //   if (email) document.getElementById('email').value = email;
// //   if (phone) document.getElementById('phone').value = phone;
// // }

// // // Handle image upload and convert it to Base64
// // imageUploadInput.addEventListener('change', () => {
// //   const file = imageUploadInput.files[0];
// //   if (file) {
// //     const reader = new FileReader();
// //     reader.onload = (e) => {
// //       profileImage.src = e.target.result;
// //       updateURLWithFormData(e.target.result);
// //     };
// //     reader.readAsDataURL(file);
// //   }
// // });

// // // Update the URL with form data and Base64 image data
// // function updateURLWithFormData(imageData) {
// //   const queryParams = new URLSearchParams();

// //   queryParams.set('name', document.getElementById('name').value);
// //   queryParams.set('email', document.getElementById('email').value);
// //   queryParams.set('phone', document.getElementById('phone').value);
// //   queryParams.set('image', imageData);

// //   // Update the URL without reloading the page
// //   history.replaceState(null, '', `${window.location.pathname}?${queryParams}`);
// // }

// // // Load data from URL if available on page load
// // window.addEventListener('DOMContentLoaded', loadFromURL);

// // // Update the URL when the form is submitted
// // form.addEventListener('submit', (event) => {
// //   event.preventDefault(); // Prevent traditional form submission
// //   updateURLWithFormData(profileImage.src); // Use the current profile image src
// // });

// // Get form elements
// const imageUploadInput = document.getElementById('imageUpload');
// const profileImage = document.getElementById('profileImage');
// const form = document.getElementById('resumeForm');

// // Load data from URL if available on page load
// function loadFromURL() {
//   const queryParams = new URLSearchParams(window.location.search);

//   // Fill form fields from URL
//   document.getElementById('name').value = queryParams.get('name') || '';
//   document.getElementById('email').value = queryParams.get('email') || '';
//   document.getElementById('phone').value = queryParams.get('phone') || '';
//   document.getElementById('address').value = queryParams.get('address') || '';
//   document.getElementById('summary').value = queryParams.get('summary') || '';
//   document.getElementById('education').value = queryParams.get('education') || '';
//   document.getElementById('experience').value = queryParams.get('experience') || '';
//   document.getElementById('skills').value = queryParams.get('skills') || '';

//   const imageData = queryParams.get('image');
//   if (imageData) profileImage.src = imageData;
// }

// // Handle image upload and convert it to Base64
// imageUploadInput.addEventListener('change', () => {
//   const file = imageUploadInput.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       profileImage.src = e.target.result;
//       updateURLWithFormData(e.target.result);
//     };
//     reader.readAsDataURL(file);
//   }
// });

// // Update the URL with form data and Base64 image data
// function updateURLWithFormData(imageData) {
//   const queryParams = new URLSearchParams();

//   queryParams.set('name', document.getElementById('name').value);
//   queryParams.set('email', document.getElementById('email').value);
//   queryParams.set('phone', document.getElementById('phone').value);
//   queryParams.set('address', document.getElementById('address').value);
//   queryParams.set('summary', document.getElementById('summary').value);
//   queryParams.set('education', document.getElementById('education').value);
//   queryParams.set('experience', document.getElementById('experience').value);
//   queryParams.set('skills', document.getElementById('skills').value);
//   if (imageData) queryParams.set('image', imageData);

//   // Update the URL without reloading the page
//   history.replaceState(null, '', `${window.location.pathname}?${queryParams}`);
// }

// // Load data from URL on page load
// window.addEventListener('DOMContentLoaded', loadFromURL);

// // Update the URL when the form is submitted
// form.addEventListener('submit', (event) => {
//   event.preventDefault(); // Prevent traditional form submission
//   updateURLWithFormData(profileImage.src); // Use the current profile image src
// });

// Get form elements
const imageUploadInput = document.getElementById("imageUpload");
const profileImage = document.getElementById("profileImage");
const form = document.getElementById("resumeForm");

// Load data from URL if available on page load
function loadFromURL() {
  const queryParams = new URLSearchParams(window.location.search);

  // Fill form fields from URL
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

  const imageData = queryParams.get("image");
  if (imageData) profileImage.src = imageData;
}

// Handle image upload and check size before converting to Base64
imageUploadInput.addEventListener("change", () => {
  const file = imageUploadInput.files[0];

  if (file) {
    const fileSizeInKB = file.size / 1024; // Convert file size to KB

    // Check if the file size exceeds .5MB
    if (fileSizeInKB > 500) {
      alert(
        "The image size is too large. Please upload an image smaller than 0.5MB."
      );
      imageUploadInput.value = ""; // Clear the input
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.src = e.target.result;
      updateURLWithFormData(e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// Update the URL with form data and Base64 image data
function updateURLWithFormData(imageData) {
  const queryParams = new URLSearchParams();

  queryParams.set("name", document.getElementById("name").value);
  queryParams.set("email", document.getElementById("email").value);
  queryParams.set("phone", document.getElementById("phone").value);
  queryParams.set("address", document.getElementById("address").value);
  queryParams.set("summary", document.getElementById("summary").value);
  queryParams.set("education", document.getElementById("education").value);
  queryParams.set("experience", document.getElementById("experience").value);
  queryParams.set("skills", document.getElementById("skills").value);
  if (imageData) queryParams.set("image", imageData);

  // Update the URL without reloading the page
  history.replaceState(null, "", `${window.location.pathname}?${queryParams}`);
}

// Load data from URL on page load
window.addEventListener("DOMContentLoaded", loadFromURL);

// Update the URL when the form is submitted
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent traditional form submission
  updateURLWithFormData(profileImage.src); // Use the current profile image src
});
