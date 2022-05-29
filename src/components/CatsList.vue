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
    <div v-if="isLoading" class="cats-loading">... загружаем еще котиков ...</div>
  </div>
</template>

<script>
import {getAllFavourites} from '@/assets/lib/favourite.js';

export default {
  props: ['cats', 'isLoading'],
  mounted() {
    const favourites = getAllFavourites();
    this.cats.forEach((item) => {
      (favourites.some(fav => fav.id === item.id)) ? item.isFavourite = true : item.isFavourite = false;
    })
  },
  methods: {
    changeFavourite(favouriteItem) {
      favouriteItem.isFavourite = !favouriteItem.isFavourite;
      this.$forceUpdate();
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
      margin-top: 70px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 30px;
      .cat-item {
        .cat-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        margin: 15px 0;
        padding: 0;
        &:hover { 
          transform: scale(1.5);
          .cat-img { 
            object-fit: contain;
          }
          .heart-img { 
            display: block; 
            color: red;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-right: -50%;
            transform: translate(-50%, -50%)
          }
        }
        .heart-img {
          display: none;
          font-size: 30px;
        }
      }
    }
    .cats-loading {
        margin: 48px 0 31px 0;
        width: 100%;
        text-align: center;
      }
 }
</style>