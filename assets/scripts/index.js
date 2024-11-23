
// HTML Form Elements
var mainForm = document.getElementById('cv-form');
// User input elements
var firstnameElem = mainForm === null || mainForm === void 0 ? void 0 : mainForm.firstname;
var middlenameElem = mainForm === null || mainForm === void 0 ? void 0 : mainForm.middlename;
var lastnameElem = mainForm === null || mainForm === void 0 ? void 0 : mainForm.lastname;
var imageElem = mainForm === null || mainForm === void 0 ? void 0 : mainForm.image;
var designationElem = mainForm === null || mainForm === void 0 ? void 0 : mainForm.designation;
var addressElem = mainForm === null || mainForm === void 0 ? void 0 : mainForm.address;
var emailElem = mainForm === null || mainForm === void 0 ? void 0 : mainForm.email;
var phonenoElem = mainForm === null || mainForm === void 0 ? void 0 : mainForm.phoneno;
var summaryElem = mainForm === null || mainForm === void 0 ? void 0 : mainForm.summary;
// Display elements
var nameDsp = document.getElementById('fullname_dsp');
var imageDsp = document.getElementById('image_dsp');
var phonenoDsp = document.getElementById('phoneno_dsp');
var emailDsp = document.getElementById('email_dsp');
var addressDsp = document.getElementById('address_dsp');
var designationDsp = document.getElementById('designation_dsp');
var summaryDsp = document.getElementById('summary_dsp');
var projectsDsp = document.getElementById('projects_dsp');
var achievementsDsp = document.getElementById('achievements_dsp');
var skillsDsp = document.getElementById('skills_dsp');
var educationsDsp = document.getElementById('educations_dsp');
var experiencesDsp = document.getElementById('experiences_dsp');
// Function to fetch values
var fetchValues = function (attrs) {
    var nodeLists = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        nodeLists[_i - 1] = arguments[_i];
    }
    var elemsAttrsCount = nodeLists.length;
    var elemsDataCount = nodeLists[0].length;
    var tempDataArr = [];
    for (var i = 0; i < elemsDataCount; i++) {
        var dataObj = {};
        for (var j = 0; j < elemsAttrsCount; j++) {
            dataObj["".concat(attrs[j])] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }
    return tempDataArr;
};
// Function to get user inputs
var getUserInputs = function () {
    var achievementsTitleElem = document.querySelectorAll('.achieve_title');
    var achievementsDescriptionElem = document.querySelectorAll('.achieve_description');
    var expTitleElem = document.querySelectorAll('.exp_title');
    var expOrganizationElem = document.querySelectorAll('.exp_organization');
    var expLocationElem = document.querySelectorAll('.exp_location');
    var expStartDateElem = document.querySelectorAll('.exp_start_date');
    var expEndDateElem = document.querySelectorAll('.exp_end_date');
    var expDescriptionElem = document.querySelectorAll('.exp_description');
    var eduSchoolElem = document.querySelectorAll('.edu_school');
    var eduDegreeElem = document.querySelectorAll('.edu_degree');
    var eduCityElem = document.querySelectorAll('.edu_city');
    var eduStartDateElem = document.querySelectorAll('.edu_start_date');
    var eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date');
    var eduDescriptionElem = document.querySelectorAll('.edu_description');
    var projTitleElem = document.querySelectorAll('.proj_title');
    var projLinkElem = document.querySelectorAll('.proj_link');
    var projDescriptionElem = document.querySelectorAll('.proj_description');
    var skillElem = document.querySelectorAll('.skill');
    return {
        firstname: firstnameElem === null || firstnameElem === void 0 ? void 0 : firstnameElem.value,
        middlename: middlenameElem === null || middlenameElem === void 0 ? void 0 : middlenameElem.value,
        lastname: lastnameElem === null || lastnameElem === void 0 ? void 0 : lastnameElem.value,
        designation: designationElem === null || designationElem === void 0 ? void 0 : designationElem.value,
        address: addressElem === null || addressElem === void 0 ? void 0 : addressElem.value,
        email: emailElem === null || emailElem === void 0 ? void 0 : emailElem.value,
        phoneno: phonenoElem === null || phonenoElem === void 0 ? void 0 : phonenoElem.value,
        summary: summaryElem === null || summaryElem === void 0 ? void 0 : summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem),
    };
};
// Show the list data
var showListData = function (listData, listContainer) {
    listContainer.innerHTML = '';
    listData.forEach(function (listItem) {
        var itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        for (var key in listItem) {
            var subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = "".concat(listItem[key]);
            itemElem.appendChild(subItemElem);
        }
        listContainer.appendChild(itemElem);
    });
};
// Display the CV
var displayCV = function (userData) {
    nameDsp.innerHTML = "".concat(userData.firstname, " ").concat(userData.middlename, " ").concat(userData.lastname);
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
};
// generate CV
var generateCV = function () {
    var userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
};
function previewImage(){
    let oFReader = new FileReader();
    oFReader.readAsDataURL(imageElem.files[0]);
    oFReader.onload = function(ofEvent){
        imageDsp.src = ofEvent.target.result;
    }
}
// print CV
function printCV() {
    window.print();
}
