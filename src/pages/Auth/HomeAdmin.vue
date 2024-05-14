<script setup>
import Sidebar from "@/components/sidebar/Sidebar.vue"
import Content from "../Auth/components/Content.vue"
</script>

<template>
    <div class="background">
        <Sidebar />
        <Content />
    </div>
</template>

<style scoped>

.background {
    background: #101010;
    /* border-radius: 30px; */
    width: 100%;
    height: 100vh;
    /* height: 100%; */
    display: flex;
}
</style>