function getAllFavourites() {
    if (!localStorage["favourites"]) return [];
    return JSON.parse(localStorage["favourites"]);
}

function getFavourites(start, end) {
    console.log(JSON.parse(localStorage["favourites"]));
    if (!localStorage["favourites"]) return [];
    return JSON.parse(localStorage["favourites"]).splice(start, end);
}

module.exports.getFavourites = getFavourites;
module.exports.getAllFavourites = getAllFavourites;