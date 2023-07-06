"use strict";

movies.splice(100);

// ----------------------- NORMALIZE ALL MOVIES---------------------------->

const allMovies = movies.map((el) => {
  return {
    title: el.title,
    year: el.year,
    category: el.categories,
    lang: el.language,
    duration: `${Math.round(el.runtime / 60)}h ${el.runtime % 60}m`,
    link: `https://youtube.com/embed/${el.youtubeId}`,
    summary: el.summary,
    rating: el.imdbRating,
    id: el.imdbId,
    miniImg: el.smallThumbnail,
    maxImg: el.bigThumbnail,
  };
});

// ----------------------- RENDER ALL MOVIES --------------------------->

function renderAllMovies(data) {
  if (data.length) {
    $("#res").textContent = data.length;
    data.forEach((el) => {
      const div = createElement(
        "div",
        "card rounded-lg shadow-2xl w-[350px] gap-2 bg-white p-4",
        ` <img class="h-[250xp] w-full object-cover object-center" src="${
          el.miniImg
        }" alt="img">
                <div class="card-body">
                    <h1><strong>Title: </strong>${el.title}</h1>
                    <ul>
                        <li class="text-yellow-400">
                            <strong class="text-black">Rating:</strong>
                            ${"<i class='bx bxs-star'></i>".repeat(
                              Math.ceil(el.rating / 2)
                            )}
                            
                        </li>
                        <li><strong>Year:</strong>${el.year}</li>
                        <li><strong>Language:</strong> ${el.lang}</li>
                        <li><strong>Runtime:</strong> ${el.duration}</li>
                        <li><strong>Category:</strong> ${el.categories}</li>
                    </ul>

                    <button class="bg-cyan-600 modal text-white rounded-xl mt-4  focus:ring-2 ring-cyan-500 px-3 py-1">Details</button>
                    <a href="${
                      el.link
                    }" class="bg-red-600 text-white rounded-xl mt-4  ms-4 focus:ring-2 ring-cyan-500 px-3 py-1">YouTube</a>
                </div>`
      );
      /// ADD DATA SET ATTRIBUTE
      div.dataset.movie = el.id;
      $(".movie-wrapper").append(div);
    });
  } else {
    $(".movie-wrapper").innerHTML =
      "<h1 class='text-center text-2xl text-red-400'>RESULT NOT FOUND";
  }
}

renderAllMovies(allMovies);

// ----------------------- RENDER ALL MOVIES --------------------------->

// <--------------- SORT BY RATING ------------->

let category = [];

function getCategory(data) {
  if (data.length) {
    data.forEach((el) => {
      el.category.forEach((item) => {
        category.push(item);
      });
    });
  }
}
getCategory(allMovies);

// <--------------- SORT BY RATING ------------->

// <--------------- GLOBAL SEARCH MOVIES ------------->

const uniqueCategory = Array.from(new Set(category));

uniqueCategory.sort().forEach((el) => {
  let option = createElement("option", "item", el);
  $("#category").append(option);
});

$("#globalSearch").addEventListener("keyup", (e) => {
  $("#res_block").classList.remove("hidden");
  $(".movie-wrapper").innerHTML = "";
  if (!e.target.value) {
    $("#res_block").classList.add("hidden");
  }
  const filterFilm = allMovies.filter((item) => {
    return item.title.toLowerCase().includes(e.target.value.toLowerCase());
  });

  renderAllMovies(filterFilm);
});

// <--------------- GLOBAL SEARCH MOVIES ------------->

// <--------------- FILTERED SEARCH MOVIES ------------->

function findMovies(title, rating, category) {
  console.log(title, rating, category);

  const filterFilm = allMovies.filter((item) => {
    return (
      item.title.toLowerCase().includes(title.toLowerCase()) &&
      item.rating >= rating &&
      item.category.includes(category)
    );
  });

  //  if (!(title || rating || category)) {
  //    $("#res_block").classList.remove("hidden");
  //    $("#res").textContent = filterFilm.length;
  //  } else {
  //    $("#res_block").classList.add("hidden");
  //  }
  renderAllMovies(filterFilm);
}

$("#search").addEventListener("click", () => {
  $("#res_block").classList.remove("hidden");
  $(".movie-wrapper").innerHTML = "";

  const searchStr = $("#title").value;
  const rating = $("#rating").value;
  const category = $("#category").value;

  findMovies(searchStr, rating, category);
});

// <-------------- EVENTS DELEGATION ------------------------->

function findElement(data, id) {
  return data.filter((item) => item.id === id);
}

$(".movie-wrapper").addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    const movieId = e.target.parentNode.parentNode.getAttribute("data-movie");
    // console.log(movieId);
  renderModal();
    const result = findElement(allMovies, movieId)[0];
    localStorage.setItem("movie", JSON.stringify(result));
    $(".wrapper-modal").classList.toggle("hidden");
  }
});

function renderModal() {
  let { title, year, category, summary, lang, duration, rating, miniImg } = JSON.parse(
    localStorage.getItem("movie")
  );

  let modalResult = "";
  modalResult += `
        <div class="grid grid-cols-2 p-4">
        <img class="cover rounded-lg" src="${miniImg}" alt="#" />

        <ul class="text-2xl">
          <li>
            <h1>
              <strong>Title:${title}
            </h1>
          </li>
          <li class="text-yellow-400">
            <strong class="text-black">Rating:</strong>
            ${'<i class="bx bxs-star"></i>'.repeat(Math.ceil(rating) / 2)}
          </li>
          <li><strong>Year:</strong>${year}</li>
          <li><strong>Language:</strong>${lang}</li>
          <li><strong>Runtime:</strong> ${duration}</li>
          <li><strong>Category:</strong> ${category}</li>
        </ul>
      </div>
      <div class="p-4">
        <div class="bg-slate-400">
          <p>
            ${summary}
          </p>
        </div>
      </div>`;

      $('.modal-center').innerHTML = modalResult;
}

$("#cancel").addEventListener("click", () => {
  $(".wrapper-modal").classList.remove("grid");
  $(".wrapper-modal").classList.add("hidden");
});

$("#close").addEventListener("click", () => {
  $(".wrapper-modal").classList.remove("grid");
  $(".wrapper-modal").classList.add("hidden");
});

// forEach (el, index, arr) => return el (undefined) // loop
// map. (el. index, arr)=> return el>2 ([4, undefined . . . . . .]) // modified
// filter (el. index, arr)=> return el>1. condition filter
// reduce (a,b)=> return a+b const number = [1,2,3,4,5,6,7,8,9,10]. let sum = number.reduce((a,b) {return a + b})

//// funksiya e'lon qilish turlari

// expression const app = function (){}
// declaration function name (params)
// arrow fnc const app=()=>{}
// IIFE (function(a) console.log()(1111))
// high order fnc function highOrder() {return function() }
// pipe fnc const funcC = a => a+10; funcD = a => a-2; funcE = a => a*4; console.log(funcC(funcD(funcS(10)))) value:48
// generator fnc function * letters(){yield "a"; yield "b", yield "c", yield "d",}
// pure / impure fnc
// curriyng fnc
// function funcA(a) {
//   return function (b) {
//     return function (c) {
//       return function (d) {
//         return a + b + c + d;
//       };
//     };
//   };
// }
// console.log(funcA(1)(2)(3)(4))

// Closure

// let num = 100;
// function ABC() {
//   let num = 100;
//   function a() {
//     console.log(num);
//   }
//   a();
// }

// ABC();
