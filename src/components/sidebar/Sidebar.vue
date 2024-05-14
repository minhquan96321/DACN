<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, watchEffect } from "vue"
import { useSingUpStore } from "@/store/fecthAPI";

const authorStore = useSingUpStore()
const authorPost = ref({});
const router = useRouter()
const token = localStorage.getItem("Token");
const currentTime = new Date().getTime() / 1000;

const listSidebar = ref([
    {
        id: 1,
        name: "Dashboard",
        link: "HomeAdminPage"
    },
    {
        id: 2,
        name: "Add new",
        link: "AddArticlePage"
    },
])


const removeExpiredTokeb = () => {
    if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log(payload.exp)
        if (currentTime > payload.exp) {
            localStorage.removeItem("Token");
            router.push({ name: "LoginPage" })
            setTimeout(() => {
                window.location.reload()
            }, 200)
        }
    }
}


const logout = () => {
    localStorage.removeItem("Token");
    router.push({ name: "LoginPage" })
    setTimeout(() => {
        window.location.reload()
    }, 200)
}

watchEffect(() => {
    authorPost.value = authorStore.$state.author
    console.log('authorPost :', authorPost.value);
})

onMounted(async () => {
    removeExpiredTokeb()
    await authorStore.adminGetAuthor()
})

</script>

<template>
    <div class="siderbar">
        <div class="siderbar-wap">
            <div class="profile">
                <img src="https://i.pinimg.com/736x/b7/91/44/b79144e03dc4996ce319ff59118caf65.jpg"
                    class="avatar-siderbar" alt="">
                <div class="name-author">{{ authorPost?.username }}</div>
                <div class="email-author">{{ authorPost?.email }}</div>
            </div>

            <div class="menu-sidebar">
                <ul class="menu-list">
                    <li class="link-router" v-for="(list) of listSidebar ">
                        <router-link class="router-link" style="color: #fff; text-decoration: none; "
                            :to="{ name: list.link }">
                            {{ list.name }} </router-link>
                    </li>

                    <li class="sidebar-logout" @click.prevent="logout">
                        LogOut
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.siderbar {
    /* height: 100%; */
    padding: 80px 0 0 80px;
    width: 20%;
    /* background: red; */
}

.siderbar-wap {
    /* background: blue; */
    width: 197px;
    height: 530px;
    /* margin: 65px; */
    /* text-align: center; */
}

.avatar-siderbar {
    border-radius: 10px;
    margin-bottom: 20px;
}

.name-author {
    color: #fff;
    font-size: 20px;
    font-family: Poppins;
    font-weight: 600;
    line-height: 35px;
    margin-bottom: 5px;
}

.email-author {
    font-size: 16px;
    color: #fff;
    font-family: Poppins;
    font-weight: 100;
}

.menu-sidebar {
    margin-top: 50px;
    width: 100%;
}

.menu-list {
    list-style: none;
    color: #fff;
    font-size: 18px;
    font-family: Poppins;
    /* width: 600px; */
    line-height: 35px;
}


.router-link-exact-active {
    background-color: #4e5d78 !important;
    border-radius: 10px !important;
    padding: 8px 60px 8px 10px !important;
}

.link-router {
    padding-left: 10px;
    margin-top: 30px;
    cursor: pointer;
    max-width: 100%;

}

.sidebar-logout {
    margin-top: 30px;
    cursor: pointer;
    max-width: 100%;
    padding-left: 20px;
}

.router-link {
    padding: 8px 60px 10px 10px;
    max-width: 100%;
}


@media(min-width: 1400px) {
    .avatar-siderbar {
        width: 65px;
        height: 65px;
    }
}
</style>