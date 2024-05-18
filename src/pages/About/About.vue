<script setup>
import { ref, onMounted, watchEffect } from "vue";
import Hearder from "@/components/header/Hearder.vue";
import ListPostAbout from "../About/ListPostAbout.vue";
import Footer from "@/components/footer/Footer.vue";
import { useAboutStore } from "@/store/fecthAPI";

const aboutStore = useAboutStore();
const dataAbout = ref([]);

watchEffect(() => {
  dataAbout.value = aboutStore.$state.database;
})

onMounted(async () => {
  await aboutStore.getAbout()
  window.scrollTo(0, 0);
})

</script>

<template>
  <Hearder />
  <div class="about-container">
    <div class="container-body">
      <div class="about-past">
        <h1 class="page-title">About us</h1>
      </div>

      <ListPostAbout title="Company History"
        content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, perspiciatis repellat maxime, adipisci non ipsam at itaque rerum vitae, necessitatibus nulla animi expedita cumque provident inventore? Voluptatum in tempora earum deleniti, culpa odit veniam, ea reiciendis sunt ullam temporibus aut!
Fugit eaque illum blanditiis, quo exercitationem maiores autem laudantium unde excepturi dolores quasi eos vero harum ipsa quam laborum illo aut facere voluptates aliquam adipisci sapiente beatae ullam. Tempora culpa iusto illum accusantium cum hic quisquam dolor placeat officiis eligendi. "
        image="https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg" />

      <div class="our-team-about">
        <div class="our-team-title">
          <h1 class="team-title">Our Team</h1>
          <p class="content-title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil sint
            sed, fugit distinctio ad eius itaque deserunt doloribus harum
            excepturi laudantium sit officiis et eaque blanditiis. Dolore natus
            excepturi recusandae.
          </p>
        </div>
      </div>

      <div class="abou-author">

        <div class="author" v-for=" (data, index ) in dataAbout" :key="index">
          <div class="imager-about">
            <img :src="data.avatar" alt="" class="image-author" />
          </div>

          <div class="details-author">
            <h4 class="name-author">{{ data.author }}</h4>
            <h5 class="work-position-author">{{ data.position }}</h5>
            <p class="story-author">
              {{ data.story }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg -->

  <Footer />


</template>

<style scoped>
.about-container {
  margin-top: 90px;
  padding: 40px 0;
}

.container-body {
  margin-left: auto;
  margin-right: auto;
}

.about-past {
  text-align: center;
  margin-bottom: 3rem;
  width: 100%;
  flex: 0 0 auto;
}

.page-title {
  font-size: 70px;
  color: #000;
  width: 600;
}

.our-team-about {
  padding: 40px 0;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
}

.our-team-title {
  width: 50%;
}

.team-title {
  font-size: 52px;
  color: #212529;
  margin: 0 0 10px;
}

.content-title {
  color: #212529;
  font-size: 16px;
  line-height: 1.8;
}

.abou-author {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.imager-about {
  display: flex;
  justify-content: center;
}

.details-author {
  text-align: center;
}

.name-author {
  font-size: 20px;
  margin: 27px 0 15px;
  font-weight: 500;
  text-transform: uppercase !important;
}

.author {
  padding: 0 15px;
}

.work-position-author {
  font-size: 16px;
  font-weight: 200;
  text-transform: uppercase !important;
  margin-bottom: 15px;
}

.story-author {
  font-size: 16px;
  line-height: 1.8;
}

@media (min-width: 1400px) {
  .container-body {
    max-width: 1320px;
  }

  .image-author {
    width: 50%;
    height: 220px;
    border-radius: 50%;
  }
}

@media(max-width: 767px) {
  .our-team-title {
    width: 100%;
  }

  .our-team-about {
    padding-left: 12px;
    padding-right: 12px
  }

  .abou-author {
    display: block;
  }

  .image-author {
    border-radius: 50%;
  }

  .author {
    margin-bottom: 20px;
  }

  .name-author {
    font-size: 18px
  }
}
</style>
