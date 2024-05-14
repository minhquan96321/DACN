<script setup>
const {
  title,
  content,
  day,
  category,
  author,
  imgAuthor,
  small,
  big,
  imgaeA,
  imageTrending,
  detaiId
} = defineProps([
  "title",
  "content",
  "day",
  "category",
  "author",
  "imgAuthor",
  "small",
  "big",
  "imgaeA",
  "imageTrending",
  "detaiId"
]);


</script>

<template>

  <router-link :to="{ name: 'DetailPage', params: { id: `${detaiId}` } }"
    :class="imgaeA === 'true' ? 'thumbnai' : 'thumbnaiA'">
    <img :src="imageTrending" alt="" class="full-img" />
  </router-link>



  <div :class="big === 'trending' ? 'outstanding-title' : ''">
    <div :class="small === 'mall' ? 'bottom' : ''">
      <div class="post-meta" style="margin-bottom: 15px">
        <span class="date">{{ category }}</span>
        <span class="date" style="margin-right: 0.25rem; margin-left: 0.25rem">•</span>
        <span class="date">{{ day }}</span>
      </div>
      <h3>
        <!-- <a href="" style="text-decoration: none; color: #000" :class="small === 'mall' ? 'small' : 'big'">
          {{ title }}
        </a> -->
        <router-link :to="{
    name: 'DetailPage', params: { id: `${detaiId}` }
  }" :class="small === 'mall' ? 'small' : 'big'" style="text-decoration: none; color: #000">{{
    title }}</router-link>
      </h3>
      <p>{{ content }}</p>
      <div class="author">
        <div class="photo">
          <img v-if="small !== 'mall'" :src="imgAuthor" class="img-full" />
        </div>
        <p :class="small === 'mall' ? 'author-name' : ''">{{ author }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .post-meta {
  font-size: 11px;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  font-weight: 600;
  font-family: var(--font-secondary);
  color: #999994;
  margin-bottom: 10px;
} */

.thumbnai {
  width: 66.6666%;
  margin-right: 25px;
}

.thumbnaiA {
  display: none;
}

.full-img {
  width: 100%;
  height: auto;
  vertical-align: middle;
  border-radius: 5px;
  image-rendering: pixelated;
}

.outstanding-title {
  width: 33.33333%;
}

.outstanding-title p {
  line-height: 1.5;
}

.bottom {
  margin-bottom: 30px;
  border-bottom: 1px solid #dee2e6;
}

h3 {
  margin-bottom: 10px;
  line-height: 1.2;
}

.big {
  font-size: 28px;
}

.small {
  font-size: 18px;
}

p {
  line-height: 1.5;
}

.author {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.photo {
  margin-right: 10px;
}

.img-full {
  width: 40px;
  border-radius: 50%;
  height: 40px;
}

.name {
  font-size: 15px;
  font-family: "Inter", sans-serif;
}

.author-name {
  margin-bottom: 16px;
}
</style>
