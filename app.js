const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const button = document.querySelector("button");
const dropdowns = document.querySelectorAll(".dropdown select");
const from_curr = document.querySelector(".from select");
const to_curr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for(select of dropdowns)                                            //appending all options in dropdown list
{
    for(code in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let curr = element.value;
    let countryCode = countryList[curr];

    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

button.addEventListener("click",async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");

    const url = `${base_url}/${from_curr.value.toLowerCase()}/${to_curr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[to_curr.value.toLowerCase()];
    let final_amount = amount.value * rate;
    msg.innerText  = `${amount.value} ${from_curr.value}  = ${final_amount} ${to_curr.value}`;
});





