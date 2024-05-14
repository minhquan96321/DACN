<script setup>
import { ref, computed, } from "vue";
import ListPost from './ListPost.vue';
import ListTitle from './ListTitle.vue';
import { getTimeAgo, } from "@/assets/js/dayTime.js"

const { lifestyle } = defineProps({
    lifestyle: {
        type: Array,
        required: true
    }
})

const itemtrending = computed(() => {
    return lifestyle[0]
})

const items = computed(() => {
    return lifestyle[1]
})

const outstanding = computed(() => {
    return lifestyle[2]
})



</script>

<template>

    <div class="blog-lifestyle blog-bottom">
        <ListTitle :category="itemtrending?.categori.title" seeCategory="SEE ALL LIFESTYLE" />
        <div class="lifestyle-emtry blog-emtry">
            <div class="blog-emtry-lifestyle blog-emtry-post">
                <div class="lifestyle-outstanding outstanding">
                    <ListPost :title="itemtrending?.titleBlog" :category="itemtrending?.categori.title"
                        :day="getTimeAgo(itemtrending?.createdAt)" :author="itemtrending?.nameAuthor"
                        :content="itemtrending?.content"
                        imgAuthor="https://i.ytimg.com/vi/4OJoLn4AWDg/maxresdefault.jpg" big="trending" imgaeA="true"
                        :imageTrending="itemtrending?.image?.blogUrl" :detaiId="itemtrending?._id" />
                </div>

                <div class="lifestyle-list-post blog-post-emtry">
                    <div class="lifestyle-list-one list-post-one">
                        <ListPost :title="items?.titleBlog" small="mall" :author="items?.nameAuthor"
                            :content="items?.content" :imageTrending="items?.image?.blogUrl" imgaeA="true"
                            :category="items?.categori.title" :day="getTimeAgo(items?.createdAt)"
                            :detaiId="items?._id" />
                    </div>

                    <div class="lifestyle-list-two list-post-two">
                        <ListPost :day="getTimeAgo(outstanding?.createdAt)" :category="outstanding?.categori.title"
                            :content="outstanding?.content"
                            :imageTrending="outstanding?.image?.blogUrl"
                            imgaeA="true" title="How to Avoid Distraction and Stay Focused During Video Calls?"
                            :author="outstanding?.nameAuthor"
                            imgAuthor="https://e0.pxfuel.com/wallpapers/513/637/desktop-wallpaper-one-punch-man-saitama-8k-8k-japanese.jpg"
                            :detaiId="outstanding?._id" />
                    </div>
                </div>
            </div>

            <div class="lifestyle-navbar blog-navbar">
                <ListPost title="How to Avoid Distraction and Stay Focused During Video Calls?" author="Jenny Wilson"
                    small="mall" category="CULTURE" day="MAR 19TH '24" />
            </div>
        </div>
    </div>
</template>


<style scoped></style>