"use strict";

countries.slice(20);
// console.log(countries)

// ----------------------- NORMALIZE ALL MOVIES---------------------------->

const allCountries = countries.map((el) => {
  return {
    name: el.name,
    population: el.population,
    region: el.region,
    capital: el.capital,
    miniImg: el.flags.svg,
  };
});

// ----------------------- RENDER ALL MOVIES --------------------------->

function renderAllCountries(data) {
  if (data.length) {
    data.forEach((el) => {
      const div = createElement(
        "div","card rounded-lg shadow-xl border w-[350px] gap-2 bg-white p-4",
        ` <img class="w-[267px] h-[200xp]" src="${el.miniImg}" alt="${el.name}">
                <div class="card-body">
                    <ul class="mt-[24px] p-[24px] ">
                        <li><strong>Year:</strong>${el.name}</li>
                        <li><strong>Language:</strong> ${el.population}</li>
                        <li><strong>Runtime:</strong> ${el.region}</li>
                        <li><strong>Category:</strong> ${el.capital}</li>
                    </ul>
                </div>`
      );
      $(".country-wrapper").append(div);
    });
  }
}

renderAllCountries(allCountries);
