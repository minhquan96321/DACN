<script setup>
const { category, seeCategory } = defineProps(["category", "seeCategory"]);
</script>

<template>
  <div class="culture-seach">
    <h1 class="culture-title">{{ category }}</h1>
    <div class="see-culture">
      <a href="" class="more">{{ seeCategory }}</a>
    </div>
  </div>
</template>

<style scoped>
.culture-seach {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid black;
  margin-bottom: 40px;
}

.more {
  text-decoration: none;
  font-size: 12px;
  font-weight: 550;
  color: #000000;
  position: relative;
  display: inline-block;
  padding-bottom: 5px;
  text-transform: uppercase;
}

.more::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 20px;
  bottom: 0;
  height: 2px;
  background: #000000;
}

.culture-title {
  font-size: 50px;
  color: #000000;
  font-family: "EB Garamond", serif;
  margin: 0 0 8px 0;
}

.outstanding-title {
  width: 33.33333%;
}

@media (max-width: 767px) {
  .culture-seach {
    padding: 0 5px;
    margin-left: 8px;
    margin-right: 8px
  }
}
</style>
