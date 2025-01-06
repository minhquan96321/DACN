<script setup>
import Sidebar from '@/components/sidebar/Sidebar.vue';
import { useCategoriStore, useBlogStore } from "@/store/fecthAPI";
import { ref, onMounted, watchEffect } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const categoryStore = useCategoriStore();
const blogCreate = useBlogStore();
const category = ref([]);
const status = ref(null);
const errorMessages = ref("")
const imageSrc = ref(null);
const createBlog = ref({
    titleBlog: "",
    categori: "",
    image: [],
    content: ""
    // nameAuthor: "",
});
// const imageShow = ref([]);

console.log(createBlog)
watchEffect(() => {
    category.value = categoryStore.$state.dataCategory;
    status.value = blogCreate.$state.status;
    errorMessages.value = blogCreate.$state.message;
    // console.log(category.value)
})



onMounted(async () => {
    await categoryStore.getAllCategory()


    const inputFile = document.querySelector(".createPost");
    // console.log(inputFile)
    if (inputFile) {
        inputFile.addEventListener("keypress", (e) => {
            if (e.keyCode === 13) {
                CreatePost();
            }
        });
        inputFile.addEventListener("paste", (event) => {
            const items = (event.clipboardData || event.originalEvent.clipboardData)
                .items;
            let file = null;
            // console.log(imageShow.value)
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    file = items[i].getAsFile();
                    // comments.value.image.push(file);
                    base64Encoder(file)
                    if (file.type.startsWith("image/")) {
                        const imageURL = URL.createObjectURL(file);
                        // imageShow.value.push(imageURL);
                        imageSrc.value = imageURL;

                    }
                    break;
                }
            }
        });
    }

})

const handleFile = (event) => {

    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(file)
        base64Encoder(file)
        if (file.type.startsWith("image/")) {
            const imageURL = URL.createObjectURL(file);
            // imageShow.value.push(imageURL);
            imageSrc.value = imageURL;
            console.log("okokokokok")
            console.log('imageSrc.value  :', imageSrc.value);
        }
    }
};

const base64Encoder = (files) => {
    let reader = new FileReader()
    reader.onloadend = () => {
        createBlog.value.image.push(reader.result);
    }

    reader.readAsDataURL(files)
}

const handleclick = async () => {
    const formData = new FormData();
    formData.append("titleBlog", createBlog.value.titleBlog)
    formData.append("categori", createBlog.value.categori)
    formData.append("content", createBlog.value.content)
    // formData.append("nameAuthor", createBlog.value.nameAuthor)
    if (createBlog.value.image?.length > 0) {
        for (let i = 0; i < createBlog.value.image.length; i++) {
            // formData.append("image ", comments.value.image[i])
            formData.append("image", createBlog.value.image[i])
            // console.log("names : ", base64Encoder(comments.value.image[i]))

        }
    }


    await blogCreate.createBlog(formData)
    // imageShow.value = [];
    if (status.value) {
        createBlog.value = {
            titleBlog: "",
            categori: "",
            image: [],
            content: ""
        };
        imageSrc.value = null


        toast.success("New article created successfully", {
            autoClose: 2000,
        }); // Toas
    }
    if (status.value === false) {
        toast.error(errorMessages, {
            autoClose: 2000,
        });
    }

}

const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith('image/')) {
        previewImage(file);
    }
};

const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    base64Encoder(file)
    reader.onload = () => {
        imageSrc.value = reader.result;
    };
};

</script>

<template>
    <div class="background">
        <Sidebar />

        <div class="content-wrap">
            <div class="content-dh">
                <div class="post-table">
                    <div class="titile-post">Content</div>
                    <div class="post-body">
                        <div class="table-post">
                            <div class="input-form">
                                <div class="title-post">Title</div>
                                <input class="input-style" v-model="createBlog.titleBlog" type="text" value=""
                                    placeholder="Title">
                            </div>

                            <div class="input-form flex-form">
                                <div class="flex-left">
                                    <div class="title-post">Category</div>
                                    <select class="input-style" v-model="createBlog.categori">
                                        <option disabled value="">Please select one</option>
                                        <option v-for="data in category">{{ data?.title }}</option>

                                    </select>
                                </div>

                                <div class="flext-right">
                                    <div class="title-post">Name Author</div>
                                    <!-- <input class="input-style" v-model="createBlog.nameAuthor" type="text" value=""
                                        placeholder="Name"> -->
                                </div>
                            </div>

                            <div class="flex-img" style="display: flex;">
                                <div style="width: 50%; display: flex; align-items: center;">
                                    <div class="input-flex" style="width: 90%;">
                                        <div class="title-post">Image</div>
                                        <input @dragover.prevent @drop="handleDrop" class="input-style createPost"
                                            type="text" :value="imageSrc" placeholder="Image">
                                    </div>

                                    <input type="file" @change="handleFile" style="display: none; " id="file">
                                    <label class="file-img" for="file">
                                        <i class="fa-regular fa-circle-plus icon-size "></i>
                                    </label>
                                </div>

                                <!-- <show class="image" style="width: 50%; margin-right: 30px;">
                                    <div class="div-image" v-for="( img, key  ) of  imageShow ">
                                        <img class="imagePath" :src="img" alt="">
                                    </div>
                                </show> -->

                                <show class="image" style="width: 50%; margin-right: 30px;">
                                    <div v-if="imageSrc" class="div-image">
                                        <img class="imagePath" :src="imageSrc" alt="">
                                    </div>
                                </show>
                            </div>

                            <div class="input-form ">
                                <div class="title-post"> Describe </div>
                                <textarea v-model="createBlog.content" cols="120" class="form-control " name="describe"
                                    rows="5" placeholder="Describe"></textarea>

                            </div>
                        </div>
                    </div>

                    <div>
                        <button @click.prevent="handleclick" class="add-new">Add New</button>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<style scoped>
.background {
    background: #101010;
    width: 100%;
    height: 100vh;
    display: flex;
}

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
    font-size: 28px;
    line-height: 1.65;
    font-family: Poppins;
    color: #344767;
    margin-bottom: 8px;
    font-weight: 600;
    margin-bottom: 15px;
}

.input-form {
    width: 100%;
    margin-bottom: 15px;
}

.input-style {
    height: 45px;
    width: 100%;
    border-radius: 12px;
    border: 1px solid rgba(102, 102, 102, 0.35);
    padding: 0 10px 0 20px;
}

.input-select {
    border-radius: 12px;
    border: 1px solid rgba(102, 102, 102, 0.35);
    padding: 0 10px 0 20px;
    width: 50%;
    height: 45px;
}

.title-post {
    margin-bottom: 4px;
    padding-left: 10px;
    font-size: 18px;
    line-height: 1.65;
    font-family: Poppins;
    font-weight: 600;
}


.form-control {
    width: 100%;
    padding: 15px 14px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
}

.div-image {
    width: 150px;
    height: 150px;
}

.imagePath {
    width: 100%;
    object-fit: cover;
    height: 100%;
    border-radius: 10px;
}

.flex-form {
    display: flex;
    justify-content: space-between;
}

.flext-right,
.flex-left {
    width: 50%;
}

.flex-left {
    margin-right: 30px;
}

.add-new {
    border: 0;
    padding: 15px 30px;
    color: #fff;
    transition: 0.4s;
    cursor: pointer;
    background-color: #212529;
    border-radius: 5px;
}

.icon-size {
    font-size: 20px;
    margin-top: 25px;
    margin-left: 8px;
}
</style>