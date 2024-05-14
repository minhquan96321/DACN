<script setup>
const { itemsPerPage, pagesShow, currentPage } = defineProps({
    itemsPerPage: {
        type: Number,
        required: true
    },
    pagesShow: {
        type: Number,
        required: true
    },
    currentPage: {
        type: Number,
        required: true,
    }
})
</script>


<template>
    <!-- <div class="pagination">
        <vue-awesome-paginate :total-items="dataBlog" :items-per-page="itemsPerPage" :max-pages-shown="pagesShow"
            v-model="currentPage" :on-click="onClickHandler" :container-class="'pagination-container'" />

    </div> -->
</template>

<style></style>