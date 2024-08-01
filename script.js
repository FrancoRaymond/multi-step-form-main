const stepBtn = document.querySelectorAll('.stepBtns');
const stepContainer = document.querySelectorAll('.stepContainer');
const stepDiv = document.querySelectorAll('.stepNumber');
const goBackBtn = document.querySelectorAll('.goBack');
const form = document.getElementById('form');
let divNumber = 1;


// --------------- LEFT CONTAINER ---------------------

updateSteps()

function updateSteps() {
    stepDiv.forEach(stepDiv => {
        if (stepDiv.dataset.num == divNumber) {
            stepDiv.classList.add('active');
        } else {
            stepDiv.classList.remove('active');
        }
    });

    stepContainer.forEach(stepContainer => {
        if (stepContainer.dataset.num == divNumber) {
            stepContainer.style.display = 'block';
            
        } else {
            stepContainer.style.display = 'none';
        }
    });
}

// --------------- NEXT STEP AND BACK BUTTONS -----------------

stepBtn.forEach(stepBtn => stepBtn.addEventListener('click', function(){

    if(this.classList.contains('stepOneBtn')){
        areStepOneInputsFilled()
    }
    if(this.classList.contains('stepTwo')){
        areStepTwoOptionsSelected()
    }
    if(this.classList.contains('stepThree')){
        selectedAddons()
        divNumber += 1;
        updateSteps();
    }
}));

goBackBtn.forEach(goBackBtn => goBackBtn.addEventListener('click', function () {
    if(goBackBtn.classList.contains('back4')){
        document.querySelector('.additionals').innerHTML = ''
    }
    divNumber -= 1;
    updateSteps();
}));


//---------------- STEP 1 ---------------------------

function areStepOneInputsFilled() {
    const step1 = document.getElementById('step1');
    const step1Inputs = step1.querySelectorAll('input');
    let isValid = true;

    if (step1.style.display === "block") {
        step1Inputs.forEach(input => {
            const errorMessage = input.parentElement.querySelector('.errorMessage');
            let inputValid = true;

            if (input.type === "text") {
                if (input.value === "") {
                    inputValid = false;
                }
            } else if (input.type === "email") {
                if (input.value === "" || !validateEmail(input.value)) {
                    inputValid = false;
                }
            } else if (input.type === "number") {
                if (input.value === "") {
                    inputValid = false;
                }
            }
            if (inputValid) {
                errorMessage.style.display = 'none';
            } else {
                errorMessage.style.display = 'flex';
                isValid = false;
            }
        });

        if (isValid) {
            divNumber += 1;
            updateSteps();
        }
    }
}

//------------ STEP 2 -------------------

const plan = document.querySelectorAll('.plan');
let chosenPlan
let term

function toggleActive(clickedPlan) {
    plan.forEach(planItem => {
        if (planItem === clickedPlan) {
            planItem.classList.toggle('active');
        } else {
            planItem.classList.remove('active');
        }
    });
}

plan.forEach(planItem => planItem.addEventListener('click', function() {
    toggleActive(planItem);
    const radio = planItem.querySelector('input[type="radio"]');
    if (radio) {
        radio.checked = !radio.checked;
    }
}));

const switchBtn = document.querySelector(".switch")
const monthly = document.querySelector(".monthly")
const toogleBtn = document.querySelector('.toogle')
const yearly = document.querySelector(".yearly")
const yearlyPrice = document.querySelectorAll('.yearlyPrice')
const monthlyPrice = document.querySelectorAll('.monthlyPrice')
const freePeriod = document.querySelectorAll('.freePeriod')

switchBtn.addEventListener('click', function(){

    toogleBtn.classList.toggle('active')
    monthly.classList.toggle('active')
    yearly.classList.toggle('active')
    yearlyPrice.forEach( yearlyPrice =>{
        yearlyPrice.classList.toggle('active')
    });
    monthlyPrice.forEach( monthlyPrice =>{
        monthlyPrice.classList.toggle('active')
    });
    freePeriod.forEach( freePeriod =>{
        freePeriod.classList.toggle('active')
    });
});

let totalAmount
let planPrice
let stepTwoTotal
const addonValue = document.querySelectorAll(".addonValue")
const duration = document.querySelectorAll('.duration')
const errorPopUp = document.querySelector('.errorPopUp')


function areStepTwoOptionsSelected() {
    const step2 = document.getElementById('step2');
    const stepTwoInputs = step2.querySelectorAll('input[type="radio"]');
    const isActive = toogleBtn.classList.contains('active');
    let isAnyRadioChecked = false;
    
    stepTwoInputs.forEach(radio => {
        if (radio.checked) {
            isAnyRadioChecked = true;
            chosenPlan = radio.dataset.name;
            const chosenPlanPrice = parseFloat(radio.parentElement.querySelector('.monthlyPrice span').innerText);        
            term = isActive ? 'Yearly' : 'Monthly';
            planPrice = isActive ? chosenPlanPrice * 10 : chosenPlanPrice;
            stepTwoTotal = planPrice;
            divNumber += 1;
            updateSteps();
        }
        
    });

    if (!isAnyRadioChecked) {
        errorPopUp.classList.add('active');
        setTimeout(function() {
            errorPopUp.classList.remove('active'); 
        }, 3000);
    }

    addonValue.forEach(item => {
        const value = parseFloat(item.dataset.value);
        item.innerText = isActive ? value * 10 : value;
    });

    duration.forEach(item => {
        item.innerText = isActive ? 'yr' : 'mo';
    });

    document.querySelector('.finalPlan').innerText = chosenPlan;
    document.querySelector('.chosenDuration').innerText = term;
    document.querySelector('.finalPlanPrice').innerText = planPrice;
}

function validateEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
};

//------------- STEP 3  --------------------

const addon = document.querySelectorAll('.addon')
addon.forEach(addon => addon.addEventListener('click',function(){
    this.classList.toggle('active')
    const checkBox = addon.querySelector('input[type="checkbox"]');
    if (checkBox) {
        checkBox.checked = !checkBox.checked;
    }
}));

const step3 = document.getElementById('step3')
const chosenAddons = document.querySelector('.additionals')
const step3Inputs = step3.querySelectorAll('input')
let addonsTotal

function selectedAddons(){
    if(divNumber == 3){
        addonsTotal = 0
        chosenAddons.innerHTML = ''
    }
    step3Inputs.forEach(input =>{
        const plusSign = document.createTextNode('+');
        const dollaSign = document.createTextNode('$');
        const fowardSlash = document.createTextNode('/');

        if(input.checked){
  
        const addonDiv = document.createElement('div')
        addonDiv.classList.add('chosenAdds')

        const addonName = document.createElement('p')
        addonName.innerText = input.name

        const addonAmount = document.createElement('p')
        addonAmount.classList.add('addonPrice')

        const addonFirstSpan = document.createElement('span')
        addonFirstSpan.classList.add('addonTotal')

        const  addonSecondSpan = document.createElement('span')
        addonSecondSpan.classList.add('duration')

        if(toogleBtn.classList.contains('active')){
            addonSecondSpan.innerText = 'yr'
            addonFirstSpan.innerText = input.value * 10
            addonsTotal += parseInt(input.value) * 10
        }else{
            addonSecondSpan.innerText = 'mo'
            addonFirstSpan.innerText = input.value
            addonsTotal += parseInt(input.value)
        }
        addonAmount.append(plusSign,dollaSign,addonFirstSpan,fowardSlash,addonSecondSpan)
        addonDiv.append(addonName, addonAmount)
        chosenAddons.append(addonDiv)
        }
    });

    const planAndAddonsTotal = document.querySelector('.planAndAddonsTotal')
    planAndAddonsTotal.innerText = addonsTotal + stepTwoTotal

    const totalDuration = document.querySelector('.total .duration')
    totalDuration.innerText = toogleBtn.classList.contains('active') ? 'yr' : 'mo'
}

//------------- STEP 4 ----------------

const changeSubscribtionBtn = document.querySelector('.subs a')
changeSubscribtionBtn.addEventListener('click', function(){
    divNumber -= 2;
    updateSteps();
});

//--------------- SUBMISSION STEP --------------------

const thankYouContainer = document.querySelector('.thankYouContainer')

form.addEventListener('submit', function(e) {
    e.preventDefault();
    form.style.display = 'none'
    thankYouContainer.classList.add('active')

    setTimeout(function(){
        const activeElements = form.querySelectorAll('.active');
        divNumber = 1
        form.reset()
        thankYouContainer.classList.remove('active')
        form.style.display = 'block'
        chosenAddons.innerHTML = ''
        activeElements.forEach(element => {
            element.classList.remove('active');
        });
        updateSteps();

    }, 5000)
});

