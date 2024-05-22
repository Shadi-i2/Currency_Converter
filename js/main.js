let body = document.querySelector("body");
let wrapper = document.querySelector(".wrapper");
let PopUp = document.createElement("div");
PopUp.className = "PopUp";
PopUp.innerHTML = ` 
      <div class="header_PopUp">
        <h2>attention</h2>
        <i class="fa-solid fa-exclamation"></i>
      </div>
      <div class="content_PopUp">
        <p>If the key in the input does not work. Log in to the following website ↓</p>
        <a href="https://app.exchangerate-api.com/" target="_blank">https://app.exchangerate-api.com/</a>
        <p>Create an account and key Copy the key and paste it into the input and press the click button for the project to work perfectly.</p>
      </div>
      <form>
        <input type="text" value="5a1a2f2696feecc556828d6a"/>
        <button>click</button>
      </form>
  `;
body.insertBefore(PopUp, wrapper);
let buttonPopUp = document.querySelector(".PopUp form button");
let inputPopUp = document.querySelector(".PopUp form input");
let apiKey = "";
buttonPopUp.addEventListener("click", (event) => {
  event.preventDefault();
  if (inputPopUp.value != "") {
    PopUp.classList.add("remove-PopUp");
    apiKey = inputPopUp.value;
    getExchangeRate(apiKey)
    wrapper.classList.remove("Not-click")
  }
});

const dropList = document.querySelectorAll(".drop-list select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const button = document.querySelector(".wrapper .container form button");

for (let i = 0; i < dropList.length; i++) {
  for (currency_code in country_list) {
    let selected;
    if (i == 0) {
      selected = currency_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "SYP" ? "selected" : "";
    }
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].innerHTML += optionTag;
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for (code in country_list) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagsapi.com/${country_list[code]}/flat/64.png`;
    }
  }
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate(apiKey)
})

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
  [fromCurrency.value, toCurrency.value] = [
    toCurrency.value,
    fromCurrency.value
  ];
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate(apiKey);
});

function getExchangeRate(apiKey) {
  const amount = document.querySelector(".amount input");
  const exchangeRateTxt = document.querySelector(".exchange-rate");
  if (amount.value == "" || amount.value == "0") {
    amount.value = 1;
  }
  url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
  exchangeRateTxt.innerHTML = "Getting Exchange Rate...";
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExchangeRate = (+amount.value * exchangeRate).toFixed(2);
      exchangeRateTxt.innerHTML = `${amount.value} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangeRateTxt.innerHTML = "SomeThing Went Wrong";
    });
}