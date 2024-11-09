// Regular expressions for validation
const strRegex = /^[a-zA-Z\s]*$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const digitRegex = /^\d+$/;

type ValidType = 'text' | 'text_emp' | 'email' | 'digit' | 'phoneno' | 'any';

// User inputs
const mainForm = document.getElementById('cv-form') as HTMLFormElement;
const firstnameElem = mainForm.firstname as HTMLInputElement;
const middlenameElem = mainForm.middlename as HTMLInputElement;
const lastnameElem = mainForm.lastname as HTMLInputElement;
const imageElem = mainForm.image as HTMLInputElement;
const designationElem = mainForm.designation as HTMLInputElement;
const addressElem = mainForm.address as HTMLInputElement;
const emailElem = mainForm.email as HTMLInputElement;
const phonenoElem = mainForm.phoneno as HTMLInputElement;
const summaryElem = mainForm.summary as HTMLInputElement;

// Display elements
const nameDsp = document.getElementById('fullname_dsp')!;
const phonenoDsp = document.getElementById('phoneno_dsp')!;
const emailDsp = document.getElementById('email_dsp')!;
const addressDsp = document.getElementById('address_dsp')!;
const designationDsp = document.getElementById('designation_dsp')!;
const summaryDsp = document.getElementById('summary_dsp')!;

// Fetch values from form fields
function fetchValues(attrs: string[], ...nodeLists: NodeListOf<HTMLInputElement>[]): Record<string, string>[] {
    return Array.from({ length: nodeLists[0].length }, (_, i) => {
        const dataObj: Record<string, string> = {};
        attrs.forEach((attr, j) => {
            dataObj[attr] = nodeLists[j][i].value;
        });
        return dataObj;
    });
}

// Get user input data
function getUserInputs() {
    const achievementsTitleElem = document.querySelectorAll('.achieve_title') as NodeListOf<HTMLInputElement>;
    const achievementsDescriptionElem = document.querySelectorAll('.achieve_description') as NodeListOf<HTMLInputElement>;

    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem)
    };
}

// Validation function
function validateFormData(elem: HTMLInputElement, elemType: ValidType, elemName: string): void {
    const value = elem.value.trim();
    let isValid = true;

    switch (elemType) {
        case 'text':
            isValid = strRegex.test(value) && value.length > 0;
            break;
        case 'text_emp':
            isValid = strRegex.test(value);
            break;
        case 'email':
            isValid = emailRegex.test(value) && value.length > 0;
            break;
        case 'phoneno':
            isValid = phoneRegex.test(value) && value.length > 0;
            break;
        case 'any':
            isValid = value.length > 0;
            break;
    }

    isValid ? removeErrMsg(elem) : addErrMsg(elem, elemName);
}

// Add error message
function addErrMsg(formElem: HTMLInputElement, formElemName: string): void {
    formElem.nextElementSibling!.innerHTML = `${formElemName} is invalid`;
}

// Remove error message
function removeErrMsg(formElem: HTMLInputElement): void {
    formElem.nextElementSibling!.innerHTML = "";
}

// Add text function
function addText(): void {
    console.log("Text added");
}

// Remove text function
function removeText(): void {
    console.log("Text removed");
}

// Show list data
function showListData(listData: Record<string, string>[], listContainer: HTMLElement): void {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        const itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');

        Object.values(listItem).forEach(value => {
            const subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = value;
            itemElem.appendChild(subItemElem);
        });

        listContainer.appendChild(itemElem);
    });
}

// Display CV
function displayCV(userData: any): void {
    nameDsp.innerHTML = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
}

// Generate CV
function generateCV(): void {
    const userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
}

// Preview image
function previewImage(): void {
    const file = imageElem.files?.[0];
    if (file) {
        const oFReader = new FileReader();
        oFReader.readAsDataURL(file);
        oFReader.onload = ofEvent => {
            const imgElem = document.getElementById('image_dsp') as HTMLImageElement;
            imgElem.src = ofEvent.target!.result as string;
        };
    }
}

// Print CV
function printCV(): void {
    window.print();
}
