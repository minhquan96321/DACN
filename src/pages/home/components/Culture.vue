<script setup>
import { ref, computed, } from "vue";
import ListPost from "./ListPost.vue";
import ListTitle from "./ListTitle.vue";
import { getTimeAgo, } from "@/assets/js/dayTime.js"



const { culture } = defineProps({
  culture: {
    type: Array,
    required: true
  }
})



const itemtrending = computed(() => {
  return culture[0]
})

// console.log(itemtrending)

const items = computed(() => {
  return culture[1]
})

const outstanding = computed(() => {
  return culture[2]
})


</script>

<template>
  <section>
    <div class="blog">
      <div class="blog-culture blog-bottom">
        <ListTitle category="Culture" seeCategory="SEE ALL CULTURE" />

        <div class="blog-culture-emtry blog-emtry">
          <div class="clture-emtry-post blog-emtry-post">
            <div class="culture-outsanding outstanding">
              <ListPost :title="itemtrending?.titleBlog" :category="itemtrending?.categori.title"
                :day="getTimeAgo(itemtrending?.createdAt)" :author="itemtrending?.nameAuthor"
                :content="itemtrending?.content" imgAuthor="https://images2.alphacoders.com/795/thumb-1920-795750.jpg"
                big="trending" imgaeA="true" :imageTrending="itemtrending?.image?.blogUrl"
                :detaiId="itemtrending?._id" />
            </div>
            <!-- {{ items.titleBlog }} -->
            <div class="culture-list-post blog-post-emtry">
              <div class="culture-post-one list-post-one">
                <ListPost :title="items?.titleBlog"  :author="items?.nameAuthor" :content="items?.content"
                  :imageTrending="items?.image?.blogUrl" imgaeA="true" :category="items?.categori.title"
                  :day="getTimeAgo(items?.createdAt)" :detaiId="items?._id" />
              </div>
              <div class="culture-post-two list-post-two">
                <ListPost :day="getTimeAgo(outstanding?.createdAt)" :category="outstanding?.categori.title"
                  :content="outstanding?.content" :imageTrending="outstanding?.image?.blogUrl" imgaeA="true"
                  :title="outstanding?.titleBlog" :author="outstanding?.nameAuthor"
                  imgAuthor="https://e0.pxfuel.com/wallpapers/513/637/desktop-wallpaper-one-punch-man-saitama-8k-8k-japanese.jpg"
                  :detaiId="outstanding?._id" />
              </div>
            </div>
          </div>

          <div class="culture-navbar blog-navbar">
            <ListPost title="How to Avoid Distraction and Stay Focused During Video Calls?" author="Jenny Wilson"
              small="mall" category="CULTURE" day="MAR 19TH '24" />
            <ListPost title="How to Avoid Distraction and Stay Focused During Video Calls?" author="Jenny Wilson"
              small="mall" category="CULTURE" day="JUL 5TH '22" />

            <ListPost title="How to Avoid Distraction and Stay Focused During Video Calls?" author="Jenny Wilson"
              small="mall" category="CULTURE" day="JUL 5TH '22" />

            <ListPost title="How to Avoid Distraction and Stay Focused During Video Calls?" author="Jenny Wilson"
              small="mall" category="CULTURE" day="JUL 5TH '22" />

            <ListPost title="How to Avoid Distraction and Stay Focused During Video Calls?" author="Jenny Wilson"
              small="mall" category="CULTURE" day="JUL 5TH '22" />

            <ListPost title="How to Avoid Distraction and Stay Focused During Video Calls?" author="Jenny Wilson"
              small="mall" category="CULTURE" day="JUL 5TH '22" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.blog {
  margin-top: 30px;
}

.blog-bottom {
  margin-bottom: 50px;
}

.business-emtry,
.blog-emtry {
  display: flex;
  justify-content: space-between;
}

.blog-emtry-business,
.blog-emtry-post {
  width: 80%;
  padding: 0 12px;
}

.business-navbar,
.blog-navbar {
  width: 20%;
  padding: 0 12px;
}

.business-outstanding {
  display: flex;
}

.outstanding {
  display: flex;
  /* flex-wrap: wrap */
}

.blog-post-emtry {
  display: flex;
  margin-top: 30px;
}

.list-post-one {
  width: 30%;
  padding-right: 12px;
}

.list-post-two {
  width: 70%;
  padding-left: 12px;
}

@media (max-width:767px) {
  .blog-navbar {
    display: none;
  }

  .blog-post-emtry,
  .outstanding {
    display: flex;
    flex-wrap: wrap
  }

  .blog-emtry-post {
    width: 100%;
    margin-bottom: 10px;
  }

  .list-post-two,
  .list-post-one {
    width: 100%;
    padding-right: 0px;
    padding-left: 0px;
  }
}
</style>
