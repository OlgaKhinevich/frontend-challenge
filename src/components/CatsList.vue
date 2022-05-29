<template>
  <div class="container">
    <div class="cats-grid">
      <figure v-for="cat in cats" :key="cat.id" class="cat-item">
          <img class="cat-img" :src="cat.url" />
          <font-awesome-icon 
            :icon="cat.isFavourite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
            class="heart-img" 
            @click="changeFavourite(cat)"
          />
      </figure>
      <div v-if="!cats">Нет фото котиков :(</div>
    </div>
  </div>
</template>

<script>
import {getAllFavourites} from '@/assets/lib/favourite.js';

export default {
  props: ['cats'],
  data() {
    return {
    }  
  },
  mounted() {
    const favourites = getAllFavourites();
    this.cats.forEach((item) => {
      (favourites.some(fav => fav.id === item.id)) ? item.isFavourite = true : item.isFavourite = false;
    })
    console.log(localStorage);
  },
  methods: {
    changeFavourite(favouriteItem) {
      favouriteItem.isFavourite = !favouriteItem.isFavourite;
      const favourites = getAllFavourites();
      if(!favourites.some(item => item.id === favouriteItem.id)) {
        favourites.push(favouriteItem);
      } else { 
        const index = favourites.findIndex(x => x.id === favouriteItem.id);
        favourites.splice(index, 1);
      }
      localStorage["favourites"] = JSON.stringify(favourites);
    }
  }
}
</script>

<style lang="scss">
 .container {
    padding: 0 62px;
    margin: auto;
    .cats-grid {
      // column-width: 200px;
      // column-gap: 30px;
      max-width: 1920px;
      margin-top: 70px;
      // display: grid;
      //grid-template-columns: repeat(5, 1fr);
      // gap: 30px;
      display: grid;
      grid-gap: 30px;
      grid-template-columns: repeat(5, 1fr);
      .cat-item {
        .cat-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        margin: 15px 0;
        padding: 0;
        &:hover { 
          transform: scale(1.1); 
          .heart-img { display: block; }
        }
        .heart-img {
          color: red;
          position: absolute;
          right: 25px;
          bottom: 15px;
          display: none;
          font-size: 30px;
        }
      }
    }
 }
</style>