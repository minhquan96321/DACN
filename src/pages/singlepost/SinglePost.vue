<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, watchEffect, reactive } from "vue";
import Hearder from "@/components/header/Hearder.vue";
import Footer from "@/components/footer/Footer.vue";
import { userDetailsStore } from "@/store/fecthAPI"
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { getTimeAgo, } from "@/assets/js/dayTime.js"
import HederFooter from "@/layout/HederFooter.vue";


const detailStore = userDetailsStore();
const dataDetails = ref({});
const dataComents = ref([]);
const id = useRoute().params.id;
const imageShow = ref([]);
const comments = ref({
  postid: id,
  author: "",
  email: "",
  message: "  ",
  image: []
});
const status = ref(null);
const errorMessages = ref("")
const isActive = ref(false);
// const color = reactive({
//   color: "black",
// })

watchEffect(() => {
  dataDetails.value = detailStore.$state.database;
  dataComents.value = detailStore.$state.dataComent
  status.value = detailStore.$state.status;
  errorMessages.value = detailStore.$state.message;
})



onMounted(async () => {
  await detailStore.getDetailBlog(id)
  await detailStore.findComments(id)

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
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          file = items[i].getAsFile();
          // comments.value.image.push(file);
          base64Encoder(file)
          if (file.type.startsWith("image/")) {
            const imageURL = URL.createObjectURL(file);
            imageShow.value.push(imageURL);
          }
          break;
        }
      }
    });
  }

  window.scrollTo(0, 0);

})


const handleFile = (event) => {

  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    base64Encoder(file)
    if (file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      imageShow.value.push(imageURL);
    }
  }
};

const base64Encoder = (files) => {
  let reader = new FileReader()
  reader.onloadend = () => {
    comments.value.image.push(reader.result);
  }

  reader.readAsDataURL(files)
}


const handleclick = async () => {
  const formData = new FormData();
  formData.append("postid", id)
  formData.append("author", comments.value.author)
  formData.append("email", comments.value.email)
  formData.append("message", comments.value.message)
  if (comments.value.image?.length > 0) {
    for (let i = 0; i < comments.value.image.length; i++) {
      // formData.append("image ", comments.value.image[i])
      formData.append("image ", comments.value.image[i])
      // console.log("names : ", base64Encoder(comments.value.image[i]))

    }
  }

  await detailStore.postComents(formData)
  if (detailStore.$state.status) {
    comments.value = {}
    imageShow.value = []
    await detailStore.findComments(id)
  }
  if (status.value === false) {
    toast.error(errorMessages, {
      autoClose: 2000,
    });
  }
}

// const likeClick = (post) => {
//   post._id = !post._id;
//   if (post._id) {
//     console.log(post._id)
//     color.color = "red";
//   } else {
//     color.color = "black";
//   }
// }





console.log("DetailsData" + dataDetails.value)

</script>

<template>
  <!-- <Hearder /> -->

  <HederFooter>
    <div class="singlepost-container">
      <div class="singlepost-container-body">
        <div class="singlepost-content">
          <div class="post-meta">
            <span class="date">{{ dataDetails.categori?.title }}</span>
            <span class="mx-1">•</span>
            <span>{{ getTimeAgo(dataDetails?.createdAt) }}</span>
          </div>

          <h1 class="title-singlepost">
            {{ dataDetails?.titleBlog }}
          </h1>

          <figure class="figure-img">
            <img :src="dataDetails?.image?.blogUrl" alt="" class="img-fluid" />
          </figure>

          <p class="singlepost-content-image">
            {{ dataDetails?.content }}
          </p>

          <form class="comments" @submit.prevent="handleclick">
            <h5 class="comments-titile">{{ dataComents.length }} Comments</h5>

            <div class="author-comments" v-for="(coment, index) in dataComents ">

              <div class="avtar-author">
                <img src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-meo-con-khung-long.jpg" alt=""
                  class="avatar" />
              </div>

              <div class="post-comments">
                <h6 class="name-author">{{ coment.author }}</h6>
                <p class="review-comments">
                  {{ coment.message }}
                </p>

                <div v-if="coment.image" class="comment-photo">
                  <img :src="coment.image" class="photo-images">
                </div>

                <div class="like-comet">
                  <span class="day-time">
                    {{ getTimeAgo(coment.createdAt) }}
                  </span>

                  <span>
                    <i class="fa-light fa-thumbs-up like-icon"></i>
                  </span>
                </div>
              </div>
            </div>



            <div class=" post-coment-submit">
              <div class="leave-comment">
                <h5 class="comment-title">Leave a Comment</h5>

                <div class="row-submit">
                  <div class="form-input">
                    <input type="text" v-model="comments.author" name=" Name" placeholder="Your Name"
                      class="form-control" />
                  </div>

                  <div class="form-input">
                    <input type="text" v-model="comments.email" name="email" placeholder="Your Email"
                      class="form-control" />
                  </div>
                </div>

                <div class="form-input">
                  <div class="message">
                    <textarea cols="120" v-model="comments.message" class="form-control createPost" name="message"
                      rows="5" placeholder="Message"></textarea>
                    <div class="div-image" v-for="( img, key  ) of  imageShow ">
                      <img class="imagePath" :src="img" alt="">
                    </div>
                  </div>
                  <input type="file" @change="handleFile" style="display: none; " id="file">
                  <label class="file-img" for="file">
                    <i class="fa-regular fa-circle-plus icon-size "></i>
                  </label>
                </div>
                <input class="send-message" type="submit" value="Post comment " />
                <!-- <div class="button-submit"></div> -->
              </div>
            </div>
          </form>
        </div>
        <div class="singlepost-navbar"></div>
      </div>
    </div>
  </HederFooter>


  <!-- <Footer /> -->
</template>

<style scoped>
.singlepost-container {
  margin-top: 90px;
  padding: 40px 0;
}

.singlepost-container-body {
  display: flex;
  margin-left: auto;
  margin-right: auto;
}

.singlepost-content {
  padding: 0 135px;
}

.title-singlepost {
  font-size: 2.5rem;
  margin-bottom: 3rem !important;
  width: 800;
}

.singlepost-content-image {
  text-transform: capitalize;
  font-size: 16px;
  line-height: 1.8;
  margin-top: 20px;
}

.comments-titile {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-size: 1.25rem;
}

.avatar {
  border-radius: 50%;
}

.author-comments {
  display: flex;
  margin-bottom: 20px;

}

.name-author {
  font-size: 20px;
  margin-bottom: 15px;
  text-transform: capitalize;
}

.review-comments {
  line-height: 1.5;
  font-size: 16px;
  margin-bottom: 2px;
}

.comment-title {
  font-size: 20px;
  font-weight: 500;
  margin: 40px 0 20px;
}

.row-submit {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.form-input {
  padding: 0 12px;
  margin-bottom: 20px;
  display: flex
}

.form-control {
  width: 100%;
  padding: 15px 14px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
}

.button-submit {
  text-align: center;
}

.send-message {
  border: 0;
  padding: 15px 30px;
  color: #fff;
  transition: 0.4s;
  cursor: pointer;
  background-color: #212529;
  border-radius: 5px;
}

.file-img {
  text-align: right;
  cursor: pointer;
}

.message {
  margin-right: 10px;
}

.icon-size {
  font-size: 20px;
}

.photo-images {
  border-radius: 8px;
  flex-shrink: 0;
}

.day-time {
  font-size: 13px;
  margin-right: 10px;

}

.like-icon {
  font-size: 14px;
  cursor: pointer;
}

.img-fluid {
  border-radius: 10px;
}


@media (min-width: 1400px) {
  .singlepost-container-body {
    max-width: 1320px;
  }

  .singlepost-navbar {
    width: 25%;
  }

  .avatar {
    width: 40px;
    height: 40px;
  }

  .img-fluid {
    width: 100%;
    height: auto;
    vertical-align: middle;
    border-radius: 5px;
  }

  .singlepost-content {
    width: 75%;
  }

  .avtar-author {
    width: 10%;
  }

  .post-comments {
    width: 90%;
  }

  .comment-photo,
  .div-image {
    width: 200px;
    height: 200px;
  }

  .photo-images,
  .imagePath {
    width: 100%;
    object-fit: cover;
    height: 100%
  }
}

@media (max-width: 767px) {
  .singlepost-content {
    padding: 0 12px;
  }

  .title-singlepost {
    font-size: 28px;
  }


  .post-meta {
    margin-bottom: 25px
  }

  .avtar-author {
    width: 10%;
    margin-right: 12px;
  }

  .avatar {
    width: 100%;
  }

  .name-author {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .row-submit {
    display: block;
  }

  .send-message {
    padding: 15px
  }

  .div-image {
    width: 50%;
  }

  .img-fluid {
    border-radius: 10px;
    width: 100%;
  }

  .singlepost-content-image {
    font-size: 14px;
  }
}
</style>
