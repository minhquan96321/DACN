<script setup>
import { ref, computed, } from "vue";
import ListPost from './ListPost.vue';
import ListTitle from './ListTitle.vue';
import { getTimeAgo, } from "@/assets/js/dayTime.js"


const { business } = defineProps({
    business: {
        type: Array,
        required: true
    }
})

const itemtrending = computed(() => {
    return business[0]
})

const items = computed(() => {
    return business[1]
})

const outstanding = computed(() => {
    return business[2]
})



</script>

<template>
    <div class="blog-business blog-bottom">
        <ListTitle category="Business" seeCategory="SEE ALL Business" />
        
        <div class="business-emtry">
            <div class="blog-emtry-business">
                <div class="business-outstanding">
                    <ListPost :title="itemtrending?.titleBlog" :category="itemtrending?.categori.title"
                        :day="getTimeAgo(itemtrending?.createdAt)" :author="itemtrending?.nameAuthor"
                        :content="itemtrending?.content" :detaiId="itemtrending?._id"
                        imgAuthor="https://th.bing.com/th/id/OIF.3puWKaXg0MiY432EsXUTFA?rs=1&pid=ImgDetMain"
                        big="trending" imgaeA="true" :imageTrending="itemtrending?.image?.blogUrl" />
                </div>

                <div class="business-list-post blog-post-emtry">
                    <div class="business-list-one list-post-one">
                        <ListPost :title="items?.titleBlog" :author="items?.nameAuthor" :content="items?.content"
                            :imageTrending="items?.image?.blogUrl" imgaeA="true" :category="items?.categori.title"
                            :day="getTimeAgo(items?.createdAt)" :detaiId="items?._id" />
                    </div>

                    <div class="business-list-two list-post-two">
                        <ListPost :day="getTimeAgo(outstanding?.createdAt)" :category="outstanding?.categori.title"
                            :content="outstanding?.content" :imageTrending="outstanding?.image?.blogUrl" imgaeA="true"
                            :title="outstanding?.titleBlog" :author="outstanding?.nameAuthor"
                            imgAuthor="https://e0.pxfuel.com/wallpapers/513/637/desktop-wallpaper-one-punch-man-saitama-8k-8k-japanese.jpg"
                            :detaiId="outstanding?._id" />
                    </div>
                </div>
            </div>

            <div class="business-navbar">
                <ListPost title="How to Avoid Distraction and Stay Focused During Video Calls?" author="Jenny Wilson"
                    small="mall" category="CULTURE" day="MAR 19TH '24" />
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (max-width:767px) {
    .business-navbar {
        display: none;
    }

    .blog-navbar {
        display: none;
    }

    .blog-emtry-business {
        width: 100%;
    }

    .blog-post-emtry,
    .outstanding {
        display: flex;
        flex-wrap: wrap
    }

    .business-outstanding {
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
