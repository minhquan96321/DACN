<script setup>
// import { ref } from "vue";
import "vue-awesome-paginate/dist/style.css";
import { ref, onMounted, watchEffect } from "vue";
import { useBlogStore, useSingUpStore } from "@/store/fecthAPI";
import { getTimeAgo } from "@/assets/js/dayTime.js"
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const blogStore = useBlogStore();
const authorStore = useSingUpStore()
const dataBlog = ref([]);
const dataPage = ref([]);
const currentPage = ref(1);
const pagesShow = ref(1);
const itemsPerPage = ref(9)
const idBlog = ref(null);
const checkwarnings = ref(false)
const messagTitle = ref(null);


watchEffect(async () => {
    dataBlog.value = authorStore.$state.dataAdminPost;
    dataPage.value = authorStore.$state.pagedata;

})

onMounted(async () => {
    // await blogStore.getBlog()
    await authorStore.adminGetAllPost()
    await authorStore.adminPagePost(currentPage.value, itemsPerPage.value)
    // await blogStore.getPageBlog(currentPage.value, itemsPerPage.value);
    if (dataBlog.value.length > 0) {
        pagesShow.value = Math.ceil(dataBlog.value.length / itemsPerPage.value)
    }
})

const onClickHandlerPage = async (page) => {
    currentPage.value = page
    // await blogStore.getPageBlog(currentPage.value, itemsPerPage.value)
    await authorStore.adminPagePost(currentPage.value, itemsPerPage.value)
};

const onClickDelete = async (post) => {
    idBlog.value = post?._id;
    messagTitle.value = post?.titleBlog;
    checkwarnings.value = true;
}

const closeWarning = () => {
    checkwarnings.value = false;
}

const confirmAction = async () => {
    await blogStore.deleteBlog(idBlog.value)
    // await blogStore.getPageBlog(currentPage.value, itemsPerPage.value)
    // await blogStore.getBlog()
    await authorStore.adminPagePost(currentPage.value, itemsPerPage.value)
    await authorStore.adminGetAllPost()

    console.log(blogStore.$state.status)

    if (blogStore.$state.status) {
        checkwarnings.value = false;
        toast.success("The post has been successfully deleted", {
            autoClose: 2000,
        });
    }
}


</script>

<template>
    <div class="content-wrap">
        <div class="content-dh">
            <div class="post-table">
                <div class="titile-post">Post table</div>
                <div class="post-body">
                    <div class="table-post">
                        <table>
                            <tr>
                                <th>Author</th>
                                <th>Title</th>
                                <th>Satus</th>
                                <th>Date of writing</th>
                                <th>Toolbar</th>
                            </tr>
                            <tr v-for="(post, index) in dataPage" :key="index">
                                <td>
                                    <div class="author-pots">
                                        <div>
                                            <img class="imga-avarta"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9i9F4yWWphaZqNSGIZON7To_PwMDBZPEZPa3oG0qGfg&s">
                                        </div>
                                        <div class="name-author">{{ post?.nameAuthor }}</div>
                                    </div>
                                </td>
                                <td>
                                    <h3 class="title-post">
                                        {{ post?.titleBlog }}
                                    </h3>
                                </td>
                                <td class="backgroud-title">
                                    <span class="status-post">True</span>
                                </td>
                                <td class="time-post">
                                    {{ getTimeAgo(post?.updatedAt) }}
                                </td>
                                <td>
                                    <div class="icon-post">
                                        <div class="icon-delete" @click.prevent="onClickDelete(post)">
                                            <i class="fa-sharp fa-solid fa-trash-xmark icon-admin"></i>
                                        </div>

                                        <div class="icon-edit">
                                            <router-link class="link-action"
                                                :to="{ name: 'UpdatePage', params: { id: `${post?._id}` } }"><i
                                                    class="fa-solid fa-pen-to-square icon-admin"></i></router-link>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                        </table>
                    </div>
                </div>
            </div>

            <div class="pagination">
                <vue-awesome-paginate :total-items="dataBlog" :items-per-page="itemsPerPage"
                    :max-pages-shown="pagesShow" v-model="currentPage" :on-click="onClickHandlerPage"
                    :container-class="'pagination-container'" />

            </div>
        </div>
    </div>

    <div class="confirm-dialog" v-if="checkwarnings">
        <div class="dialog-content">
            <div class="statuesign"><i class="fa-solid fa-triangle-exclamation icon-warning"></i></div>
            <h2 class="notification">Delete Post</h2>
            <h3 class="warning"> You want to delete "{{ messagTitle }}" are you sure</h3>
            <div class="buttons">
                <button class="button-display display-cancel" @click="closeWarning">Hủy</button>
                <button class="button-display display-confirm" @click="confirmAction">Xác nhận</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content-wrap {
    width: 80%;
    height: 100%;
    margin-left: 50px;
    padding: 20px 20px 20px;
}

.content-dh {
    background: #fff;
    height: 100%;
    fill: #f9fafc;
    border-radius: 20px;
}

.post-table {
    padding: 1.5rem;
}

.titile-post {
    font-size: 16px;
    line-height: 1.65;
    font-family: Poppins;
    color: #344767;
    margin-bottom: 8px;
    font-weight: 600;
}

/* Table */

table {
    font-family: Poppins;
    border-collapse: collapse;
    width: 100%;
}

td {
    border-bottom: 1px solid #e9ecef;
    text-align: left;
    padding: 10px;
    font-size: 13px;
    font-family: Poppins;

}

th {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #e9ecef;
    font-size: 14px;
    color: #344767;
    font-weight: 700;
}

.time-post {
    text-align: center;
}

.link-action {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
}

/* tr:nth-child(even) {
    background-color: #dddddd;
} */

.author-pots {
    /* padding: 0.25rem 0.5rem 0.25rem 0.5rem; */
    display: flex;
    align-items: center;
}

.imga-avarta {
    width: 36px;
    height: 36px;
    margin-right: 16px;
    border-radius: 8px;
}

.name-author {
    font-family: Poppins;
    /* font-size: 0.875rem; */
    line-height: 1.5;
}

.title-post {
    font-family: Poppins;
    /* font-size: 15px; */
}

.status-post {
    /* background-image: linear-gradient(310deg, #17ad37 0%, #98ec2d 100); */
    padding: 2px 15px;
    line-height: 1.5;
    color: #fff;
    /* font-size: 15px; */
    background: #17ad37;
    border-radius: 8px;
}

.icon-post {
    display: flex;
    justify-content: space-around;
    gap: 5px;
}

.icon-delete {
    background-color: #ff0000a3;


}

.icon-edit {
    background-color: #0000ff94;


}

.icon-delete,
.icon-edit {
    border-radius: 10px;
    cursor: pointer;
    width: 50%;
    padding: 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon-admin {
    font-size: 13px;
    color: #fff;

}

/* Chạy xem sao hahaa */


.display {
    color: rebeccapurple;
    position: fixed;
    background-color: rgba(33, 40, 48, 0.8);
    z-index: 1000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
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
}

.dialog-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.statuesign {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ffebed;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.icon-warning {
    color: #FF3F56;
}

.notification {
    text-align: center;
    margin-bottom: 15px;
    font-size: 30px;
    font-family: Poppins;
}

.buttons {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 16px 20px 0 20px;
}


.button-display {
    margin-left: 10px;
    cursor: pointer;
    font-size: 16px;
    border: 1px solid #D4D4D4;
    font-weight: 500;
    border-radius: 10px;
    padding: 12px;
}

.display-cancel,
.display-confirm {
    width: 150px;

}

.display-confirm {
    background-color: #FF3F56;
    color: #fff;
}

.warning {
    text-align: center;
    font-family: Poppins;
    font-size: 15px;
    padding: 10px 20px;
    line-height: 1.5;
    color: #32414A
}
</style>