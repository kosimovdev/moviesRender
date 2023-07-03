"use strict";

movies.slice(50);

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
    data.forEach((el) => {
      const div = createElement(
        "div",
        "card rounded-lg shadow-2xl w-[350px] gap-2 bg-white p-4",
        ` <img class="h-[250xp] w-full object-cover object-center" src="${el.miniImg}" alt="img">
                <div class="card-body">
                    <h1>${el.title}</h1>
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

                    <button class="bg-cyan-600 text-white rounded-xl mt-4  focus:ring-2 ring-cyan-500 px-3 py-1">Details</button>
                    <a href="${el.link}" class="bg-red-600 text-white rounded-xl mt-4  ms-4 focus:ring-2 ring-cyan-500 px-3 py-1">YouTube</a>
                </div>`
      );
      $(".movie-wrapper").append(div)
    });
  }
}

renderAllMovies(allMovies);
