function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var searchCountry = function () {
    var countrySelect = document.getElementById("country");
    var value = countrySelect.value;
    var result = document.querySelector(".result");
    var status = result.querySelector(".status");
    var capitalElement = result.querySelector(".capital");
    var populationElement = result.querySelector(".population");
    var flagElement = result.querySelector(".flag");
    var name = result.querySelector(".name");
    status.textContent = "Searching.... ".concat(value);
    capitalElement.textContent = "";
    populationElement.textContent = "";
    flagElement.textContent = "";
    var endpoint = "https://restcountries.com/v3.1/name/".concat(value);
    fetch(endpoint)
        .then(function (data) { return data.json(); })
        .then(function (country) {
        var countrySource = {
            name: value,
            capital: country[0].capital[0],
            population: country[0].population,
        };
        var flag = country[0].flags.png;
        var flagImg = " <img src=\"".concat(flag, "\" alt=\"Flag of ").concat(countrySource.name, "\" width=\"100\">");
        status.textContent = "Found: ".concat(countrySource.name, ".");
        name.textContent = "Name: ".concat(countrySource.name, ".");
        capitalElement.textContent = "Capital: ".concat(countrySource.capital, ".");
        populationElement.textContent = "Population: ".concat(numberWithCommas(countrySource.population));
        flagElement.innerHTML = "Flag: ".concat(flagImg);
    })
        .catch(function (err) {
        status.textContent = "Country not found: ".concat(value);
        capitalElement.textContent = "";
        populationElement.textContent = "";
        flagElement.textContent = "";
    });
};
var data = function () {
    fetch("https://restcountries.com/v3.1/all")
        .then(function (res) { return res.json(); })
        .then(function (item) {
        item.forEach(function (country) {
            var countrySelect = document.getElementById("country");
            var option = document.createElement("option");
            option.value = country.name.common;
            option.textContent = country.name.common;
            countrySelect.appendChild(option);
        });
    });
};
var load = window;
load.addEventListener("load", data);
