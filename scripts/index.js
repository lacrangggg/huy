"use strict";

const resultWrapper = document.getElementById("result-wrapper");
const resultWrapper11 = document.getElementById("result-wrapper-11");
const resultWrapper12 = document.getElementById("result-wrapper-12");
const detailsWrapper = document.getElementById("id-details-wrapper");

let SEARCH_DEBOUNCE_FLAG = null;
let CURRENT_PAGE = 1;

window.onload = function onLoadDone() {
    document.body.classList.add("loaded");
};

document.addEventListener("DOMContentLoaded", () => {

    if (!resultWrapper || !resultWrapper11 || !resultWrapper12)
        throw new Error("Result wrapper is not exist");

    if (!detailsWrapper)
        throw new Error("Details wrapper is not exist");

    // init events list
    initialEventList();

    initListeners();
});

window.onresize = function () {
    calcItemsSize();
};

function initialEventList() {
    getEvents()
        .then(({ events = [], totalResult = 0 }) => {
            events.map(generateEventItem)
        });
}

function initListeners() {
    detailsWrapper.querySelector(".movie-details__close")
        .addEventListener("click", closeDetailsSection);
}

function generateEventItem(item) {
    let movieElm = document.createElement("div");
    movieElm.setAttribute("data-imdbid", item.imdbID);
    movieElm.classList.add("movie-item");

    movieElm.addEventListener("click", handleEventItemClick);

    movieElm.innerHTML = `
            <figure class="movie-item__poster"
                style="background-image: url('${item.Poster}')"></figure>
            <h2 class="movie-item__title">${item.Title}</h2>`;
    switch (item.Class) {
        case 10:
            resultWrapper.append(movieElm);
            break;
        case 11:
            resultWrapper11.append(movieElm)
            break;
        case 12:
            resultWrapper12.append(movieElm)
            break;
    }
}

function handleEventItemClick(e) {
    const movieItem = e.target.closest(".movie-item");
    const movieItemID = movieItem.getAttribute("data-imdbid");
    // handle class toggle
    removeDetailsClassFromItems();
    movieItem.classList.add("--in-details");

    
    getSingleEvent(movieItemID)
        .then(movieObj => {
            showEventInDetails(movieObj, movieItem)
        })
}

function calcItemsSize() {
    let columnsCount = Math.floor(resultWrapper.offsetWidth / 200) || 1;
    document.body.style.setProperty("--poster-height", (resultWrapper.offsetWidth / columnsCount) + "px");
    document.body.style.setProperty("--result-grid-column", columnsCount.toString());
}

function removeDetailsClassFromItems() {
    document.querySelectorAll(".movie-item").forEach(mi => {
        mi.classList.remove("--in-details");
    });
}

function closeDetailsSection() {
    detailsWrapper.classList.remove("--visible");
    removeDetailsClassFromItems();
    calcItemsSize();
}

function showEventInDetails(event, targetItem) {
    if (!detailsWrapper.classList.contains("--visible")) {
        detailsWrapper.classList.add("--visible");
    }

    calcItemsSize();

    // scroll to target movie element
    setTimeout(() => {
        window.scrollTo({
            top: targetItem.offsetTop - 20,
            behavior: 'smooth'
        })
    }, 50);

    let detailsElm = detailsWrapper.querySelector(".movie-details__inner");
    if (!detailsElm)
        detailsElm = document.createElement("div");

    detailsElm.classList.add("movie-details__inner");

    if (!event.Poster || event.Poster === "N/A")
        detailsElm.classList.add("--no-poster");
    else
        detailsElm.classList.remove("--no-poster");

    detailsElm.innerHTML = `<span class="loader"></span>`;

    if (event.ListInnerPoster) {
        event.ListInnerPoster.forEach(function (poster) {
            detailsElm.innerHTML += `
            <figure class="movie-details__poster" style="background-image: url('${poster}')"></figure>`;
        });
    }

    if (event.ListInnerVideo) {
        event.ListInnerVideo.forEach(function (video) {
            detailsElm.innerHTML += `
            <video class="movie-details__poster" controls> 
                <source src="${video}" type="video/mp4"> 
                Your browser does not support the video tag.
            </video>`;
        });
    }

   

    detailsElm.innerHTML += `
                    <div class="movie-details__title">
                        <h2>${event.Title}</h2>
                    </div>
                    <div class="movie-details__meta">
                        <span class="--label">Summary:</span>
                        <p>${event.Summary}</p>
                    </div>`;

    detailsWrapper.append(detailsElm);
}
