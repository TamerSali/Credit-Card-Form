//////////////////////// FRONT SIDE /////////////////////////
let cardNameInput = document.querySelector(".card-name-field")
let fullname = document.querySelector(".card-name-text");
let cardNumberInput = document.querySelector(".card-number-field")
let cardNumberText = document.querySelector(".card-number-text");
let monthSelect = document.querySelector(".month")
let yearSelect = document.querySelector(".year")
let month = document.querySelector(".card-month")
let year = document.querySelector(".card-year")
//////////////////////// BACK SIDE /////////////////////////
let CVVinput = document.querySelector(".cvv-field");
let image = document.querySelector(".image");
let cvvCode = document.querySelector(".cvv-code");
let cardType = document.querySelectorAll("#cart-type-img");

//////////////////////// BORDERS /////////////////////////
let expires = document.querySelector(".expires");
let cardName = document.querySelector(".card-name");
let cardNumber = document.querySelector(".card-number");
/////////////////////////////////////////////////



cardNumberInput.addEventListener("focus", () => {
    setBorder(cardNumber);
    cardNumberInput.addEventListener("input", () => {
        cardNumberValidate(cardNumberInput.value);
        GetCardType(cardNumberInput.value);
    })

})
cardNumberInput.addEventListener("focusout", () => removeBorder(cardNumber));

//////////////////////////////////////////////
cardNameInput.addEventListener("focus", () => {
    setBorder(cardName);
    cardNameInput.addEventListener("input", () => {
        onlyAlphabet(cardNameInput.value, cardNameInput, fullname)
    })
})
cardNameInput.addEventListener("focusout", () => removeBorder(cardName))

//////////////////////////////////////////////
monthSelect.addEventListener("focus", () => {
    setBorder(expires);
    monthSelect.addEventListener("change", (e) => {
        month.innerText = e.target.value;
    });
});
monthSelect.addEventListener("focusout", () => removeBorder(expires))
//////////////////////////////////////////////

yearSelect.addEventListener("focus", () => {
    setBorder(expires);
    yearSelect.addEventListener("change", (e) => {
        year.innerText = e.target.value;
    })
})
yearSelect.addEventListener("focusout", () => removeBorder(expires))
//////////////////////////////////////////////

CVVinput.addEventListener("focus", () => {
    image.classList.add("flip");

    CVVinput.addEventListener("input", () => {
        CVVinput.value = CVVinput.value.replace(/\D/g, '');
        cvvCode.innerHTML = CVVinput.value;

    })
})
CVVinput.addEventListener("focusout", () => {
    image.classList.remove("flip");
})
//////////////////////////////////////////////

function setBorder(element) {
    element.style.border = "2px solid lightgray"
    element.style.padding = '5px';
    element.style.borderRadius = "10px"
}
function removeBorder(element) {
    element.style.border = "none"
    element.style.padding = 'none';
    element.style.borderRadius = "none"
}

function onlyAlphabet(inputVal, inputField, targetPlace) {
    let patt = /^[a-zA-Z ]+$/;
    if (patt.test(inputVal)) {
        inputField.value = inputVal;
        targetPlace.innerHTML = inputVal.toUpperCase();
        if (targetPlace.innerHTML == "") {
            targetPlace.innerHTML = "FULL NAME"
        }
    }
    else {
        let txt = inputVal.slice(0, -1);
        inputField.value = txt;
        if (txt.length == 0)
            targetPlace.innerHTML = "FULL NAME"
    }
}

function cardNumberValidate(value) {
    let formattedText = value;
    let regex = /^[0-9]+$/;

    if (formattedText.length <= 16) {
        if (formattedText.length > 0) {
            if (formattedText.match(regex)) {
                formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
                cardNumberText.innerHTML = formattedText;
            }
            else {
                let txt = value.slice(0, -1);
                cardNumberInput.value = txt;
            }
        }
        else {
            cardNumberText.innerHTML = "#### #### #### ####"
        }
    }
    else {
        return;
    }
}

function GetCardType(number) {

    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return `${cardType[0].src = "./resource/visa.png"}  ${cardType[1].src = "./resource/visa.png"}`

    // Mastercard 
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))

        return `${cardType[0].src = "./resource/mastercard.png"}  ${cardType[1].src = "./resource/mastercard.png"}`

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return `${cardType[0].src = "./resource/amex.png"}  ${cardType[1].src = "./resource/amex.png"}`

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return `${cardType[0].src = "./resource/discover.png"}  ${cardType[1].src = "./resource/discover.png"}`

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
        return `${cardType[0].src = "./resource/dinersclub.png"}  ${cardType[1].src = "./resource/dinersclub.png"}`


    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return `${cardType[0].src = "./resource/jcb.png"}    ${cardType[1].src = "./resource/jcb.png"}  `


    return `${cardType[0].src = ""} ${cardType[1].src = ""}`;
}


