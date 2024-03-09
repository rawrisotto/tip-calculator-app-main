const billInput = document.querySelector("#bill-input");
const billError = document.querySelector("#bill-error");
const billAmountInput = document.querySelector("#bill-amount-input");
const numberOfPeopleInput = document.querySelector("#number-people-input");
const numberOfPeopleError = document.querySelector("#number-people-error");
const numberOfPeopleAmountInput = document.querySelector("#number-people-amount-input");
const customTip = document.querySelector("#tip-custom");
const tipButtons = document.querySelectorAll("input[name='tip']");
const tipAmount = document.querySelector("#tip-amount");
const totalAmount = document.querySelector("#total-amount");
const resetButton = document.querySelector("#reset-button");

let bill;
let total;
let numberOfPeople;
let tipPercentage = 0;
let tip;

// Handle calculate tip amount and total per person
const calculateTip = () => {
  tip = (bill * (tipPercentage / 100)) / numberOfPeople;
}

const amountTotal = () => {
  total = (bill / numberOfPeople) + tip; 
}

const renderAmounts = () => {
  if (bill && numberOfPeople) {
    calculateTip();
    amountTotal();
    tipAmount.textContent = `$${tip.toFixed(2)}`;
    totalAmount.textContent = `$${total.toFixed(2)}`;

    if (!resetButton.classList.contains("active")) {
      resetButton.classList.add("active");
    }
  } else {
    tipAmount.textContent = `$0.00`;
    totalAmount.textContent = `$0.00`;

    if (resetButton.classList.contains("active")) {
      resetButton.classList.remove("active");
    }
  }
}

// Handle bill input
billInput.addEventListener("input", () => {
  bill = billInput.value;

  // if bill is <= 0, display error message
  if (bill == 0) {
    billAmountInput.classList.add("error-border");
    billError.classList.add("error-message");
    billError.textContent = "Can't be zero";
  }

  if (billAmountInput.classList.contains("error-border") && bill > 0) {
    billAmountInput.classList.remove("error-border");
    billError.classList.remove("error-message");
  }

  renderAmounts();
})

// Handle number of people input
numberOfPeopleInput.addEventListener("input", () => {
  numberOfPeople = numberOfPeopleInput.value;

  // if number of people is <= 0, display error message
  if (numberOfPeople == 0) {
    numberOfPeopleAmountInput.classList.add("error-border");
    numberOfPeopleError.classList.add("error-message");
    numberOfPeopleError.textContent = "Can't be zero";
  }

  if (numberOfPeopleAmountInput.classList.contains("error-border") && numberOfPeople > 0) {
    numberOfPeopleAmountInput.classList.remove("error-border");
    numberOfPeopleError.classList.remove("error-message");
  }

  renderAmounts();
})

// Handle custom tip input
customTip.addEventListener("input", () => {
  // if custom tip entered, uncheck radio buttons
  if (document.querySelector("input[name='tip']:checked")) {
    document.querySelector("input[name='tip']:checked").checked = false;
  }

  tipPercentage = customTip.value;

  renderAmounts();
})

// Handle tip button click
tipButtons.forEach(button => {
  button.addEventListener("click", () => {
    // if radio button clicked, clear custom tip value
    customTip.value = "";

    tipPercentage = button.value;
    renderAmounts();
  })
})

resetButton.addEventListener("click", () => {
  billInput.value = "";
  bill = 0;
  billAmountInput.classList.remove("error-border");
  billError.classList.remove("error-message");
  billError.textContent = "";

  numberOfPeopleInput.value = "";
  numberOfPeople = 0;
  numberOfPeopleAmountInput.classList.remove("error-border");
  numberOfPeopleError.classList.remove("error-message");
  numberOfPeopleError.textContent = "";

  tipButtons.forEach(button => {
    button.checked = false;
  })

  customTip.value = "";
  tipPercentage = 0;

  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";

  if (resetButton.classList.contains("active")) {
    resetButton.classList.remove("active");
  }
})