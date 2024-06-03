<script setup>
import Hearder from "@/components/header/Hearder.vue";
import Post from "./components/Post.vue";
import Footer from "@/components/footer/Footer.vue";


</script>

<template>
  <Hearder />
  <Post />
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

.pagination {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
}

.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>
