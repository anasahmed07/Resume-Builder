// Define an interface for user data
interface UserData {
    firstname: string;
    middlename: string;
    lastname: string;
    designation: string;
    address: string;
    email: string;
    phoneno: string;
    summary: string;
    achievements: { achieve_title: string; achieve_description: string }[];
    experiences: {
        exp_title: string;
        exp_organization: string;
        exp_location: string;
        exp_start_date: string;
        exp_end_date: string;
        exp_description: string;
    }[];
    educations: {
        edu_school: string;
        edu_degree: string;
        edu_city: string;
        edu_start_date: string;
        edu_graduation_date: string;
        edu_description: string;
    }[];
    projects: { proj_title: string; proj_link: string; proj_description: string }[];
    skills: { skill: string }[];
}

// Fetch form element safely
function getFormElement<T extends HTMLElement>(id: string): T | null {
    return document.getElementById(id) as T | null;
}

// Function to fetch values from multiple NodeLists
function fetchValues(attrs: string[], ...nodeLists: NodeListOf<HTMLInputElement | HTMLTextAreaElement>[]): object[] {
    const elemDataCount = nodeLists[0].length;
    const dataArr: object[] = [];

    for (let i = 0; i < elemDataCount; i++) {
        const dataObj: { [key: string]: string } = {};
        nodeLists.forEach((list, j) => {
            dataObj[attrs[j]] = list[i].value;
        });
        dataArr.push(dataObj);
    }

    return dataArr;
}

// Function to get user input data from the form
function getUserInputs(): UserData | null {
    const mainForm = getFormElement<HTMLFormElement>('cv-form');
    if (!mainForm) return null;

    const firstname = (mainForm.firstname as HTMLInputElement)?.value;
    const middlename = (mainForm.middlename as HTMLInputElement)?.value;
    const lastname = (mainForm.lastname as HTMLInputElement)?.value;
    const designation = (mainForm.designation as HTMLInputElement)?.value;
    const address = (mainForm.address as HTMLInputElement)?.value;
    const email = (mainForm.email as HTMLInputElement)?.value;
    const phoneno = (mainForm.phoneno as HTMLInputElement)?.value;
    const summary = (mainForm.summary as HTMLTextAreaElement)?.value;

    const achievements = fetchValues(
        ['achieve_title', 'achieve_description'],
        document.querySelectorAll('.achieve_title'),
        document.querySelectorAll('.achieve_description')
    );

    const experiences = fetchValues(
        ['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'],
        document.querySelectorAll('.exp_title'),
        document.querySelectorAll('.exp_organization'),
        document.querySelectorAll('.exp_location'),
        document.querySelectorAll('.exp_start_date'),
        document.querySelectorAll('.exp_end_date'),
        document.querySelectorAll('.exp_description')
    );

    const educations = fetchValues(
        ['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'],
        document.querySelectorAll('.edu_school'),
        document.querySelectorAll('.edu_degree'),
        document.querySelectorAll('.edu_city'),
        document.querySelectorAll('.edu_start_date'),
        document.querySelectorAll('.edu_graduation_date'),
        document.querySelectorAll('.edu_description')
    );

    const projects = fetchValues(
        ['proj_title', 'proj_link', 'proj_description'],
        document.querySelectorAll('.proj_title'),
        document.querySelectorAll('.proj_link'),
        document.querySelectorAll('.proj_description')
    );

    const skills = fetchValues(
        ['skill'],
        document.querySelectorAll('.skill')
    );

    return {
        firstname,
        middlename,
        lastname,
        designation,
        address,
        email,
        phoneno,
        summary,
        achievements,
        experiences,
        educations,
        projects,
        skills,
    };
}

// Function to show the list data in the display section
function showListData(listData: object[], listContainer: HTMLElement): void {
    listContainer.innerHTML = ''; // Clear the container first
    listData.forEach(item => {
        const itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');

        Object.values(item).forEach(value => {
            const subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.textContent = value;
            itemElem.appendChild(subItemElem);
        });

        listContainer.appendChild(itemElem);
    });
}

// Function to display the user data on the CV
function displayCV(userData: UserData): void {
    const nameDsp = getFormElement<HTMLElement>('fullname_dsp');
    const phonenoDsp = getFormElement<HTMLElement>('phoneno_dsp');
    const emailDsp = getFormElement<HTMLElement>('email_dsp');
    const addressDsp = getFormElement<HTMLElement>('address_dsp');
    const designationDsp = getFormElement<HTMLElement>('designation_dsp');
    const summaryDsp = getFormElement<HTMLElement>('summary_dsp');

    const projectsDsp = getFormElement<HTMLElement>('projects_dsp');
    const achievementsDsp = getFormElement<HTMLElement>('achievements_dsp');
    const skillsDsp = getFormElement<HTMLElement>('skills_dsp');
    const educationsDsp = getFormElement<HTMLElement>('educations_dsp');
    const experiencesDsp = getFormElement<HTMLElement>('experiences_dsp');

    if (nameDsp && phonenoDsp && emailDsp && addressDsp && designationDsp && summaryDsp) {
        nameDsp.textContent = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
        phonenoDsp.textContent = userData.phoneno;
        emailDsp.textContent = userData.email;
        addressDsp.textContent = userData.address;
        designationDsp.textContent = userData.designation;
        summaryDsp.textContent = userData.summary;

        showListData(userData.projects, projectsDsp!);
        showListData(userData.achievements, achievementsDsp!);
        showListData(userData.skills, skillsDsp!);
        showListData(userData.educations, educationsDsp!);
        showListData(userData.experiences, experiencesDsp!);
    }
}

// Generate CV
function generateCV(): void {
    const userData = getUserInputs();
    if (userData) {
        displayCV(userData);
        console.log(userData); // Log the data for debugging
    } else {
        console.error('Form not found or incomplete!');
    }
}

// Preview uploaded image
function previewImage(): void {
    const imageElem = getFormElement<HTMLInputElement>('image');
    const imageDsp = getFormElement<HTMLImageElement>('image_dsp');

    if (imageElem && imageElem.files && imageElem.files[0] && imageDsp) {
        const reader = new FileReader();
        reader.readAsDataURL(imageElem.files[0]);
        reader.onload = (event: ProgressEvent<FileReader>) => {
            if (event.target?.result) {
                imageDsp.src = event.target.result as string;
            }
        };
    }
}

// Print the CV
function printCV(): void {
    window.print();
}

// Initialize event listeners or DOM loaded actions
window.addEventListener('DOMContentLoaded', () => {
    const generateBtn = getFormElement<HTMLButtonElement>('generateBtn');
    generateBtn?.addEventListener('click', generateCV);

    const printBtn = getFormElement<HTMLButtonElement>('printBtn');
    printBtn?.addEventListener('click', printCV);

    const imageElem = getFormElement<HTMLInputElement>('image');
    imageElem?.addEventListener('change', previewImage);
});
