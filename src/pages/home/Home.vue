<script setup>
import Hearder from "@/components/header/Hearder.vue";
import Post from "./components/Post.vue";
import Footer from "@/components/footer/Footer.vue";
// import Blog from "./components/Blog.vue";
</script>

<template>
  <Hearder />
  <Post />
  <!-- <Blog /> -->
  <Footer />
</template>

<style>
main {
  margin-top: 90px;
}

.post-meta {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  color: #999994;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.mx-1 {
  margin-right: 0.25rem !important;
  margin-left: 0.25rem !important;

}
</style>
