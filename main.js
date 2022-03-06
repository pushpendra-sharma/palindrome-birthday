const daysAndMonth = {
  January: 31,
  Febraury: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

const daysInMonth = Object.values(daysAndMonth);

const reverseString = (str) => {
  let charList = str.split('');
  let reverseCharList = charList.reverse();
  return reverseCharList.join('');
};

const isPalindrome = (str) => str === reverseString(str);

const convertDateToString = (dateObj) => {
  let stringDate = { day: '', month: '', year: '' };

  if (dateObj.day < 10) {
    stringDate.day = '0' + dateObj.day;
  } else {
    stringDate.day = dateObj.day.toString();
  }

  if (dateObj.month < 10) {
    stringDate.month = '0' + dateObj.month;
  } else {
    stringDate.month = dateObj.month.toString();
  }

  stringDate.year = dateObj.year.toString();
  return stringDate;
};

const getDateInAllFormats = (dateObj) => {
  let strDate = convertDateToString(dateObj);
  const dateInAllFormats = {
    'DD-MM-YYYY': strDate.day + strDate.month + strDate.year,
    'MM-DD-YYYY': strDate.month + strDate.day + strDate.year,
    'YYYY-MM-DD': strDate.year + strDate.month + strDate.day,
    'DD-MM-YY': strDate.day + strDate.month + strDate.year.slice(-2),
    'MM-DD-YY': strDate.month + strDate.day + strDate.year.slice(-2),
    'YY-MM-DD': strDate.year.slice(-2) + strDate.month + strDate.day,
  };
  const dateInAllFormatsArray = Object.values(dateInAllFormats);
  return dateInAllFormatsArray;
};

const checkPalindromeForAllDateFormats = (dateObj) => {
  let dateFormatList = getDateInAllFormats(dateObj);
  let isDatePalindorme = false;
  for (let formattedDate of dateFormatList) {
    if (isPalindrome(formattedDate)) {
      isDatePalindorme = true;
      break;
    }
  }
  return isDatePalindorme;
};

const isLeapYear = (year) => {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
};

const getNextdate = (dateObj) => {
  let day = dateObj.day + 1;
  let month = dateObj.month;
  let year = dateObj.year;

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

const getNextPalindromeDate = (dateObj) => {
  let nextDate = getNextdate(dateObj);

  let futureCounter = 0;
  while (1) {
    futureCounter++;
    if (checkPalindromeForAllDateFormats(nextDate)) break;
    nextDate = getNextdate(nextDate);
  }

  return [futureCounter, nextDate];
};

const getPreviousDate = (dateObj) => {
  let day = dateObj.day - 1;
  let month = dateObj.month;
  let year = dateObj.year;

  if (month === 3) {
    if (isLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month = 2;
      }
    } else {
      if (day < 1) {
        day = 28;
        month = 2;
      }
    }
  } else {
    if (day < 1) {
      if (month === 1) {
        day = 31;
        month = 12;
        year--;
      } else {
        day = daysInMonth[month - 2];
        month--;
      }
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

const getPreviousPalindromeDate = (dateObj) => {
  let previousDate = getPreviousDate(dateObj);
  let pastCounter = 0;
  while (1) {
    pastCounter++;
    if (checkPalindromeForAllDateFormats(previousDate)) break;
    previousDate = getPreviousDate(previousDate);
  }

  return [pastCounter, previousDate];
};

const getNearestPalindromeDate = (d) => {
  if (getNextPalindromeDate(d)[0] < getPreviousPalindromeDate(d)[0]) return getNextPalindromeDate(d);
  else return getPreviousPalindromeDate(d);
};

const dobInput = document.querySelector('#dob');
const checkPalindromeButton = document.querySelector('#btn-check-palindrome');
const output = document.querySelector('#result');
const msg = document.querySelector('.error-msg');

function clickHandler() {
  let bdayString = dobInput.value;

  if (bdayString !== '') {
    let date = bdayString.split('-');

    let newDate = {
      day: Number(date[2]),
      month: Number(date[1]),
      year: Number(date[0]),
    };

    if (checkPalindromeForAllDateFormats(newDate)) {
      output.innerText = 'Yay! Your birthday is palindrome!';
    } else {
      let [days, nearestDate] = getNearestPalindromeDate(newDate);
      output.innerText =
        'The nearest palindrome date is ' +
        +nearestDate.day +
        '-' +
        nearestDate.month +
        '-' +
        nearestDate.year +
        ', you missed by ' +
        days +
        ' days.';
    }
  } else {
    msg.innerText = 'enter date';
  }
}

checkPalindromeButton.addEventListener('click', clickHandler);
