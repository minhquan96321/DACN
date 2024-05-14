<script setup>
import ListPostCategori from "../components/ListPostCategori.vue";
</script>

<template>
  <section>
    <div class="post-categori">
      <div class="row-categori">
        <div class="row-categori-lispost">
          <ListPostCategori
            title="What is the son of Football Coach John Gruden, Deuce Gruden doing Now?"
            imagePost="https://www.nawpic.com/media/2020/one-punch-man-nawpic.jpg"
            category="BUSINESS"
            day="21/03/2024"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio placeat exercitationem magni voluptates dolore. Tenetur fugiat voluptates quas, nobis error deserunt aliquam temporibus sapiente, laudantium dolorum itaque libero eos deleniti?"
            imgAuthor="https://www.nawpic.com/media/2020/one-punch-man-nawpic.jpg"
            author="Quân Cao"
          />
        </div>
        <div class="row-categori-navbar">
          <ListPostCategori
            small="mall"
            title="How to Avoid Distraction and Stay Focused During Video Calls?"
            author="Quân Cao Nè"
            category="SPORT"
            day="21/3/2024"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.post-categori {
  margin-left: auto;
  margin-right: auto;
  padding: 40px 0;
  margin-top: 90px;
}

@media (min-width: 1400px) {
  .post-categori {
    max-width: 1320px;
  }

  .row-categori {
    display: flex;
  }

  .row-categori-lispost {
    width: 75%;
    padding: 0 12px;
  }

  .row-categori-navbar {
    width: 25%;
    padding: 0 12px;
  }
}
</style>
