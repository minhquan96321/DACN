<script setup>
import { ref } from "vue";

// let navbarLists = ref(["Culture", "Business", "Lifestyle"]);

const sibarMenu = ref(false)
const seemore = ref(false)
const iconArrow = ref("fa-sharp fa-solid fa-angle-down")

const handlSibarModal = () => {
  sibarMenu.value = true
}

const handlCloseModal = () => {
  sibarMenu.value = false
}

const handSeeMore = () => {
  seemore.value != seemore.value
  if (!seemore.value) {
    seemore.value = true;
    iconArrow.value = "fa-sharp fa-solid fa-angle-up";
  } else {
    seemore.value = false;
    iconArrow.value = "fa-sharp fa-solid fa-angle-down"
  }
}
</script>

<template>
  <div class="header">
    <div class="container">
      <!-- <a href="" class="logo">
        <h1>ZenBlog</h1>
      </a> -->

      <router-link class="logo" :to="{ name: 'HomePage' }">
        <h1>ZenBlog</h1>
      </router-link>

      <navbar class="navbar">
        <ul class="navbar-ul">
          <li>
            <router-link :to="{ name: 'HomePage' }">Blog</router-link>
          </li>
          <!-- <li>
            <router-link :to="{ name: 'SinglePostPage' }">Single Post</router-link>
          </li> -->
          <li class="drop">
            <span>
              <router-link :to="{ name: 'CulturePage' }">Categori</router-link>
              <ul class="list">
                <li>
                  <router-link :to="{ name: 'CulturePage' }">Culture</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'BusinessPage' }">Business</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'LifestylePage' }">Lifestyle</router-link>
                </li>
              </ul>
            </span>
          </li>
          <li>
            <router-link :to="{ name: 'AboutPage' }">About</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'ContactPage' }">Contact</router-link>
          </li>
        </ul>
      </navbar>

      <div class="position-relative">
        <a href="">
          <span class="bi-facebook bi-icon"><i class="fa-brands fa-facebook"></i>
          </span>
        </a>
        <a href="">
          <span class="bi-twitter bi-icon"><i class="fa-brands fa-x-twitter"></i></span>
        </a>
        <a href="">
          <span class="bi-intagram bi-icon"><i class="fa-brands fa-instagram"></i></span>
        </a>
        <span class="bi-search bi-icon"><i class="fa-sharp fa-thin fa-magnifying-glass"></i></span>
        <span class="bi-menu bi-icon" @click.prevent="handlSibarModal"><i class="fa-solid fa-bars icon-menu"></i></span>
      </div>
    </div>
  </div>

  <!-- <ModalSidebar :boolModal="sibarMenu" /> -->
  <div class="confirm-dialog" v-if="sibarMenu">
    <div class="dialog-content">
      <div class="bi-xmark bi-icon" @click.prevent="handlCloseModal"><i class="fa-solid fa-xmark icon-xmark"></i></div>
      <ul class="sidebar-menu">
        <li class="sidebar-menu-child">
          <router-link :to="{ name: 'HomePage' }" class="link_foder">Blog</router-link>
        </li>
        <li class="sidebar-menu-child">
          <div class="sidebar-menu-child-categori" @click.prevent="handSeeMore">
            <span>Categories</span>
            <i :class="iconArrow"></i>
          </div>

          <ul class="categori_child" v-if="seemore">
            <li class="categoris_child_foder">
              <router-link :to="{ name: 'CulturePage' }" class="link_foder">Culture</router-link>
            </li>
            <li class="categoris_child_foder">
              <router-link :to="{ name: 'BusinessPage' }" class="link_foder">Business</router-link>
            </li>
            <li class="categoris_child_foder">
              <router-link :to="{ name: 'LifestylePage' }" class="link_foder">Lifestyle</router-link>
            </li>
          </ul>
        </li>
        <li class="sidebar-menu-child">
          <router-link :to="{ name: 'AboutPage' }" class="link_foder">About</router-link>
        </li>
        <li class="sidebar-menu-child">
          <router-link :to="{ name: 'ContactPage' }" class="link_foder">Contact</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
:root {
  --font-default: "EB Garamond", system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --color-default-rgb: 33, 37, 41;
}

.header {
  height: 90px;
  transform: all 0.5s;
  z-index: 997;
  background: #f2f2f2;
  align-items: center !important;
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}

.container {
  align-items: center !important;
  justify-content: space-between !important;
  display: flex;
  width: 100% !important;
  --bs-gutter: 1.5rem;
  margin-left: auto;
  margin-right: auto;
}

.header .logo {
  color: #212529;
  text-decoration: none;
}

.header h1 {
  font-size: 30px;
  font-weight: 700;
  font-family: "EB Garamond", serif;
}

.navbar {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.navbar .navbar-ul {
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  list-style: none;
}

.navbar a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 10px 30px;
  font-family: var(--font-default);
  font-size: 16px;
  font-weight: 500;
  color: rgba(var(--color-default-rgb), 1);
  white-space: nowrap;
  transition: 0.5s;
  text-decoration: none;
}

.drop {
  position: relative;
}

.list {
  position: absolute;
  list-style: none;
  width: 180px;
  background: #ffffff;
  padding: 10px 20px;
  margin-left: 20px;
  z-index: 99;
  box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
  display: none;
  opacity: 0;
  border-radius: 5px;
}

.list a {
  padding: 0;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 15px;
  font-size: 16px;
  color: #212529;
}

.drop:hover .list {
  display: block;
  opacity: 1;
}

.list li:hover {
  opacity: 0.9;
}

.bi-icon {
  color: #212529;
  padding: 0 5px;
  margin: 0 4px;
}

.icon-menu {
  display: none;
}

.confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  height: 80%;
}

.categori_child,
.sidebar-menu {
  list-style: none;
}

.sidebar-menu-child {
  font-size: 18px;
  font-family: 'Poppins';
  margin-bottom: 20px;
  padding: 5px
}

.sidebar-menu-child-categori {
  display: flex;
  justify-content: space-between;
}

.categori_child {
  margin: 0 10px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
}

.categoris_child_foder {
  font-size: 16px;
  margin: 15px 0;
  font-family: 'Poppins';
  padding: 10px 20px;
}

.link_foder {
  display: block;
  text-decoration: none;
  color: #212529;
}

.bi-xmark {
  text-align: right;
  font-size: 20px;
}

.icon-xmark {
  padding: 10px
}

@media (max-width: 1400px) {
  .container {
    max-width: 1320px;
  }


}

@media (max-width: 767px) {
  .navbar {
    display: none
  }

  .container {
    padding: 0 10px;
  }

  .icon-menu {
    font-size: 20px;
    display: inline-block;
  }
}
</style>
