interface countryData {
  name: string;
  capital: string;
  population: number;
}

const searchCountry = () => {
  let countrySelect = document.getElementById("country") as HTMLSelectElement;
  let value = countrySelect.value;
  const result = document.querySelector(".result");
  const status = result!.querySelector(".status");
  const capitalElement = result!.querySelector(".capital");
  const populationElement = result!.querySelector(".population");
  const flagElement = result!.querySelector(".flag");
  status!.textContent = `Searching.... ${value}`;
  capitalElement!.textContent = "";
  populationElement!.textContent = "";
  flagElement!.textContent = "";
  const endpoint = `https://restcountries.com/v3.1/name/${value}`;

  fetch(endpoint)
    .then((data) => data.json())
    .then((country) => {
      const countrySource: countryData = {
        name: value,
        capital: country[0].capital[0],
        population: country[0].population,
      };
      const flag = country[0].flags.png;
      const flagImg = ` <img src="${flag}" alt="Flag of ${countrySource.name}" width="100">`;
      status!.textContent = `Found: ${countrySource.name}`;
      capitalElement!.textContent = `Capital: ${countrySource.capital}`;
      populationElement!.textContent = `Population: ${countrySource.population}`;
      flagElement!.innerHTML = `Flag: ${flagImg}`;
    })
    .catch((err) => {
      status!.textContent = `Country not found: ${value}`;
      capitalElement!.textContent = "";
      populationElement!.textContent = "";
      flagElement!.textContent = "";
    });
};
const data = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((item) => {
      item.forEach((country) => {
        let countrySelect = document.getElementById(
          "country"
        ) as HTMLSelectElement;
        let option = document.createElement("option");
        option!.value = country.name.common;
        option.textContent = country.name.common;
        countrySelect.appendChild(option);
      });
    });
};
let load: Window = window;
load!.addEventListener("load", data);
