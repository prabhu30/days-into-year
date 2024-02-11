const daysLeftBox = document.querySelector('.days-left-box');
const daysMiddleBox = document.querySelector('.days-middle-box');
const daysRightBox = document.querySelector('.days-right-box');

const percentageLeftBox = document.querySelector('.percentage-left-box');
const percentageMiddleBox = document.querySelector('.percentage-middle-box');
const percentageRightBox = document.querySelector('.percentage-right-box');

const container = document.querySelector('.container');
const body = document.querySelector('body');
const btnChangeTheme = document.querySelector('.theme');
const boxes = document.querySelectorAll('.box');
const yearText = document.querySelectorAll('.year');

let totalDays = 365;

const monthsAndDays = {
    'jan': 31,
    'feb': 28,
    'mar': 31,
    'apr': 30,
    'may': 31,
    'jun': 30,
    'jul': 31,
    'aug': 31,
    'sep': 30,
    'oct': 31,
    'nov': 30,
    'dec': 31
}

const checkLeap = function (year) {

    let leapYear = false;
    
    if (year%4 == 0) {
        if (year%100 == 0) {
            if (year%400 == 0) {
                leapYear = true;
            } else {
                leapYear = false;
            }
        } else {
            leapYear = true;
        }
    } else {
        leapYear = false;
    }
    
    if (leapYear) {
        monthsAndDays['feb'] = 29;  
        totalDays = 366;
    }  
}

const date = new Date();

const year = date.getFullYear();
const currentMonth = date.toDateString().slice(4, 7).toLowerCase();
const currentMonthDays = date.getDate();

checkLeap(year);

let daysIntoYear = 0;

for ([month, days] of Object.entries(monthsAndDays)) {
    if (month !== currentMonth) {
        daysIntoYear += days;
    } else {
        daysIntoYear += currentMonthDays;
        break;
    }
}

daysIntoYear = `${daysIntoYear}`.padStart(3, 0);

daysLeftBox.innerText = daysIntoYear[0];
daysMiddleBox.innerText = daysIntoYear[1];
daysRightBox.innerText = daysIntoYear[2];

let percentageOfDays = Math.round((daysIntoYear / totalDays) * 100);
percentageOfDays = `${percentageOfDays}`.padStart(2, 0) + "%";

percentageLeftBox.innerText = percentageOfDays[0];
percentageMiddleBox.innerText = percentageOfDays[1];
percentageRightBox.innerText = percentageOfDays[2];

let currentTheme = 'dark';

const changeTheme = function(theme) {
    currentTheme = theme;

    body.style.backgroundColor = theme == 'dark' ? '#333' : '#ffefd5';
    container.style.backgroundColor = theme == 'dark' ? '#222' : '#fbfcf8';
    btnChangeTheme.style.backgroundColor = theme == 'dark' ? '#fff' : '#000';

    btnChangeTheme.style.color = theme == 'dark' ? '#000' : '#fff';
    container.style.color = theme == 'dark' ? '#fff' : '#000';
    
    boxes.forEach(box => {
        box.style.backgroundColor = theme == 'dark' ? '#111' : '#f0f8ff';
        box.style.border = theme == 'dark' ? '2px solid transparent' : '2px solid #555';
    });
    
    yearText.forEach(ele => {
        ele.style.color = theme == 'dark' ? '#7fffd4' : "#3cb0f3";
    })
}
btnChangeTheme.addEventListener('click', function() {
    if (currentTheme == 'dark') {
        changeTheme('light');
    } else {
        changeTheme('dark');
    }
})