const dropList=document.querySelectorAll(".dropdown select");
fromCurrency= document.querySelector(".from select");
toCurrency= document.querySelector(".to select");
getButton= document.querySelector("button");
let amountval;

for (let i = 0; i < dropList.length; i++) {
  for(country_code in countryList){
    let selected;
    if(i==0){
      selected= country_code == "USD" ? "selected" : "";
    }else if(i==1){
      selected= country_code == "INR" ? "selected" : "";
    }
    let optionTag= `<option value="${country_code}"${selected}>${country_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend",optionTag);
    
  }
  dropList[i].addEventListener("change", e =>{
    loadFlag(e.target);
  });
}

function loadFlag(element){
  console.log(10);
  for(code in countryList){
    if(code == element.value){
      let imgTag=element.parentElement.querySelector("img");
      imgTag.src =`https://flagsapi.com/${countryList[code]}/flat/64.png`;
    }
  }
}
window.addEventListener("load",e =>{
  getExchangeRate();
});

getButton.addEventListener("click",e =>{
  e.preventDefault();
  getExchangeRate();
});

const exchangeIcon =document.querySelector(".dropdown .icon");
exchangeIcon.addEventListener("click", ()=>{
  let tempCode = fromCurrency.value;
  fromCurrency.value =toCurrency.value;
  toCurrency.value =tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

function getExchangeRate(){
  const amount= document.querySelector(".amount input");
  const exchangeRateTxt =document.querySelector(".msg");
  amountval=amount.value;
  if(amountval == ""|| amountval =="0"){
    amount.value= "1";
    amountval=1;
  }
  exchangeRateTxt.innerHTML ="Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/883cf23ea9e4b516e5d75b75/latest/${fromCurrency.value}`;
  fetch(url).then(respose => respose.json()).then(result=>{
    let exchangeRate= result.conversion_rates[toCurrency.value];
 
    let totalexchangeRate = (amountval*exchangeRate).toFixed(2); 
    console.log(totalexchangeRate);
    exchangeRateTxt.innerHTML =`${amountval} ${fromCurrency.value}=${totalexchangeRate} ${toCurrency.value}`;
  });
}