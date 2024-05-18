<script setup>
import Banner from "./Banner.vue";
import Culture from "./Culture.vue";
import Business from "./Business.vue";
import Lifestyle from "./Lifestyle.vue";
import { ref, onMounted, watchEffect, reactive } from "vue";
import { useBlogStore } from "@/store/fecthAPI";

const blogStore = useBlogStore();
const dataBlog = ref([])
const culture = ref([]);
const business = ref([]);;
const lifestyle = ref([]);


watchEffect(() => {
  dataBlog.value = blogStore.$state.blogdata;
  for (let i = 0; i < dataBlog.value.length; i++) {
    if (dataBlog.value[i].categori.title === "Culture") {
      culture.value.push(dataBlog.value[i]);
    } else if (dataBlog.value[i].categori.title === "Business") {
      business.value.push(dataBlog.value[i]);
    } else if (dataBlog.value[i].categori.title === "Lifestyle") {
      lifestyle.value.push(dataBlog.value[i])
    }
  }

})


onMounted(async () => {
  await blogStore.getBlog()
})

</script>

<template>
  <div class="blog">
    <div class="blog-post">
      <Banner />
      <Culture :culture="culture" />
      <Business :business="business" />
      <Lifestyle :lifestyle="lifestyle" />

    </div>
  </div>
</template>

<style scoped>
.blog {
  width: 100%;
  padding: 40px 0;
  margin-top: 90px;
}

.blog-post {
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 1400px) {
  .blog-post {
    max-width: 1320px;
  }

}

@media (max-width: 767px) {
  .blog {
    padding: 0px;
  }
}
</style>
