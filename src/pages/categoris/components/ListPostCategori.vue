<script setup>
const { title, content, day, category, author, imgAuthor, small, imagePost, detaiId } =
  defineProps([
    "title",
    "content",
    "day",
    "category",
    "author",
    "imgAuthor",
    "small",
    "imagePost",
    "detaiId"
  ]);

console.log("Id : " + detaiId);

</script>

<template>


  <div :class="small === 'mall' ? 'boder-bottom' : 'list-pots-category'">
    <router-link :to="{
      name: 'DetailPage', params: { id: `${detaiId}` }
    }" class="list-post-image">
      <img :src="imagePost" alt="" class="list-post-img-category" />
    </router-link>

    <div class="category-post">
      <div class="post-meta">
        <span class="date">{{ category }}</span>
        <span class="mx-1">•</span>
        <span>{{ day }}</span>
      </div>

      <h3>
        <!-- <a href="" :class="small === 'mall' ? 'title-mall' : 'categori-title-post'">{{ title }}</a> -->
        <!-- <router-link :to="{ name: 'HomePage' }" :class="small === 'mall' ? 'title-mall' : 'categori-title-post'">{{
    title }}</router-link> -->
        <router-link :to="{
          name: 'DetailPage', params: { id: `${detaiId}` }
        }" :class="small === 'mall' ? 'title-mall' : 'categori-title-post'">{{ title }}</router-link>
      </h3>

      <p class=" list-content">
        {{ content }}
      </p>

      <div class="post-author">
        <img v-if="small !== 'mall'" :src="imgAuthor" alt="" class="img-author" />
        <span class="name-author" :class="small === 'mall' ? 'author-bottom' : ''">{{ author }}</span>
      </div>
    </div>
  </div>

</template>

<style scoped>
.categori-title {
  text-transform: uppercase;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 600;
  margin-bottom: 30px;
}

.list-pots-category {
  margin-bottom: 30px;
  display: flex;
}

.list-post-image {
  flex: 0 0 50%;
  margin-right: 24px;
}

.list-post-img-category {
  width: 100%;
  /* height: auto; */
  max-height: 100%;
  vertical-align: middle;
  border-radius: 5px;
}

.title-mall {
  font-size: 20px;
  text-decoration: none;
  color: #000000;
  line-height: 1.5;
}

/* .post-meta {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  color: #999994;
  margin-bottom: 10px;
  letter-spacing: 2px;
} */

.categori-title-post {
  text-decoration: none;
  font-size: 28px;
  color: #000000;
  line-height: 1.3;
}

.category-post h3 {
  margin-bottom: 10px;
}

.list-content {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.post-author {
  display: flex;
  align-items: center;
}

.img-author {
  width: 30px;
  border-radius: 50%;
  height: 30px;
  margin-right: 10px;
}

.name-author {
  font-size: 16px;
}

.author-bottom {
  margin-bottom: 16px;
}

.boder-bottom {
  margin-bottom: 30px;
  border-bottom: 1px solid #dee2e6;
}

.h3-hiden {
  display: none;
}

@media (max-width:767px) {
  .list-pots-category {
    display: flex;
    flex-wrap: wrap;
  }

  .list-post-image {
    width: 100%;
    flex: auto;
    margin: 10px 0;
  }

  .list-content {
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .list-post-img-category {
    border-radius: 10px
  }

  .post-comments {
    width: 90%;
  }
}
</style>
