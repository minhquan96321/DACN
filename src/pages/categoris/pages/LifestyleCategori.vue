<script setup>
import { ref, onMounted, watchEffect } from "vue";

import ListPostCategori from "../components/ListPostCategori.vue";
import Hearder from "@/components/header/Hearder.vue";
import Footer from "@/components/footer/Footer.vue";
import { useCategoriStore } from "@/store/fecthAPI"
import { getTimeAgo, } from "@/assets/js/dayTime.js"

let titleCategori = ref("Lifestyle")
const categoriStore = useCategoriStore()
const currentPage = ref(1);
const itemsPerPage = ref(4)
const pagesShow = ref(1);
const dataCategori = ref([])



watchEffect(() => {
    dataCategori.value = categoriStore.$state.database;
})

console.log(dataCategori.value)

onMounted(async () => {
    // data.titleCategori = titleCategori.value

    await categoriStore.getCategori(titleCategori.value, currentPage.value, itemsPerPage.value)
    window.scrollTo(0, 0);
    if (dataCategori.value.length > 0) {
        pagesShow.value = await Math.ceil(dataCategori.value.length / itemsPerPage.value)
    }
})

const onClickHandler = async (page) => {
    currentPage.value = page
    await categoriStore.getCategori(titleCategori.value, currentPage.value, itemsPerPage.value)
};
</script>

<template>
    <Hearder />
    <section>
        <div class="post-categori">
            <div class="row-categori">
                <div class="row-categori-lispost">
                    <h3 :class="small === 'mall' ? 'h3-hiden' : 'categori-title'">
                        Category: {{ titleCategori }}
                    </h3>
                    <ListPostCategori v-for="(data, index) in dataCategori" :title="data?.titleBlog"
                        :imagePost="data?.image?.blogUrl" :category="data.categori?.title"
                        :day="getTimeAgo(data?.createdAt)" :content="data?.content" :imgAuthor="data?.avatar"
                        :author="data?.nameAuthor" :detaiId="data?._id" />
                </div>
                <div class="row-categori-navbar">
                    <ListPostCategori small="mall" title="How to Avoid Distraction and Stay Focused During Video Calls?"
                        author="Quân Cao Nè" category="SPORT" day="21/3/2024" />
                </div>
            </div>
        </div>
        <div class="pagination">
            <vue-awesome-paginate :total-items="dataCategori" :items-per-page="itemsPerPage"
                :max-pages-shown="pagesShow" v-model="currentPage" :on-click="onClickHandler"
                :container-class="'pagination-container'" />

        </div>
    </section>
    <Footer />
</template>

<style scoped>
.post-categori {
    margin-left: auto;
    margin-right: auto;
    padding: 40px 0;
    margin-top: 90px;
}

.categori-title {
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: 1px;
    font-weight: 600;
    margin-bottom: 30px;
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

@media (max-width: 767px) {
    .row-categori {
        padding: 0 12px
    }
}
</style>
