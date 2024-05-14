<script setup>
const { title, content, image } = defineProps(["title", "content", "image"]);
</script>

<template>
  <div class="introduce-about">
    <div class="introduce-company">
      <a href="" class="company-imagge">
        <img :src="image" alt="" class="imga-full" />
      </a>

      <div class="introduce-content">
        <h3>
          <span class="about-content">{{ title }}</span>
        </h3>

        <h2 class="compony-title">{{ title }}</h2>

        <p class="conten-list">
          {{ content }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.introduce-about {
  margin-bottom: 3rem;
}

.introduce-company {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.imga-full {
  width: 100%;
  height: auto;
  vertical-align: middle;
}

.introduce-content {
  padding-left: 48px;
}

.about-content {
  margin: 24px 0 10px;
  color: #999994;
  font-weight: 600;
  font-size: 16px;
}

.introduce-content h3 {
  margin: 24px 0 10px;
}

.compony-title {
  color: #212529;
  font-size: 56px;
  margin: 0 0 24px;
}

.conten-list {
  color: #212529;
  font-size: 16px;
  line-height: 1.8;
}
</style>
