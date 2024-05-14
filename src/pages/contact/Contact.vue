<script setup>
import { ref, onMounted } from "vue"
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import Hearder from "@/components/header/Hearder.vue";
import Footer from "@/components/footer/Footer.vue";
import { useFecthStore } from "@/store/fecthAPI.js";

const cactacts = ref({
  username: "",
  email: "",
  subject: "",
  message: ""
})
const contactStore = useFecthStore();

const handleConditions = async (e) => {

  // e.preventDefault();
  await contactStore.postContact(cactacts.value)
  const status = contactStore.$state.status;
  // console.log(status);
  // console.log(status)
  const errorMessage = contactStore.errorMessage
  if (status === true) {
    toast.success("Submitted successfully !", {
      autoClose: 2000,
    }); // ToastOptions
  } else {
    toast.error(errorMessage, {
      autoClose: 2000,
    }); // Toas
  }
  cactacts.value = {};
}

onMounted(() => {
  window.scrollTo(0, 0);
})


</script>

<template>
  <Hearder />

  <div class="contact-container">
    <div class="contact-body">
      <div class="contact-title">
        <h1 class="title-complain">Contact us</h1>
      </div>

      <div class="contact-method">
        <div class="addres-contact">
          <i class="fa-regular fa-location-dot icon-addres"></i>
          <h4 class="addres-method">ADDRESS</h4>
          <h6 class="addres-specifically">A108 Adam Street, NY 535022, USA</h6>
        </div>

        <div class="addres-contact item-boder">
          <i class="fa-light fa-mobile-screen-button icon-addres"></i>
          <h4 class="addres-method">PHONE NUMBER</h4>
          <h6 class="addres-specifically">+1 5589 55488 55</h6>
        </div>

        <div class="addres-contact">
          <i class="fa-regular fa-envelope icon-addres"></i>
          <h4 class="addres-method">EMAIL</h4>
          <h6 class="addres-specifically">info@example.com</h6>
        </div>
      </div>
      <div class="submit-message">
        <form class="form-submit">
          <div class="row-submit">
            <div class="form-input">
              <input type="text" v-model="cactacts.username" name=" Name" placeholder="Your Name"
                class="form-control" />
            </div>

            <div class="form-input">
              <input type="text" name="email" v-model="cactacts.email" placeholder="Your Email" class="form-control" />
            </div>
          </div>
          <div class="form-input">
            <input type="text" name="email" v-model="cactacts.subject" placeholder="Subject" class="form-control" />
          </div>

          <div class="form-input">
            <textarea cols="120" class="form-control" v-model="cactacts.message" name="message" rows="5"
              placeholder="Message" required=""></textarea>
          </div>

          <div class="button-submit">
            <button type="submit" @click.prevent="handleConditions" class="send-message">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
.contact-container {
  margin-top: 90px;
  padding: 40px 0;
}

.contact-body {
  margin-left: auto;
  margin-right: auto;
}

.contact-title {
  text-align: center;
}

.title-complain {
  font-size: 70px;
  width: 600;
  margin-bottom: 15px;
}

.contact-method {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.addres-contact {
  text-align: center;
  margin-top: 50px;
  padding: 0 12px;
}

.icon-addres {
  font-size: 48px;
  margin-bottom: 20px;
}

.addres-method {
  font-size: 16px;
  margin: 0 0 15px;
  font-weight: 500;
}

.item-boder {
  border-right: 1px solid rgb(89 109 128 / 20%);
  border-left: 1px solid rgb(89 109 128 / 20%);
}

.submit-message {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  margin-top: 3rem;
  border-radius: 10px;
}

.form-submit {
  padding: 30px;
  border-radius: 3px;
}

.row-submit {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.form-input {
  padding: 0 12px;
  margin-bottom: 20px;
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

@media (min-width: 1400px) {
  .contact-body {
    max-width: 1320px;
  }
}
</style>
@/store/fecthAPI