<script setup>
import Hearder from "@/components/header/Hearder.vue";
import Post from "./components/Post.vue";
import Footer from "@/components/footer/Footer.vue";
import { ref, onMounted } from "vue";
import { pushalertbyiw } from "./pushAler";

console.log("Kiểm tra nào", window.pushalertbyiw);
const isSubscribed = ref(false);

// Hàm toggle đăng ký
const toggleSubscription = () => {
  if (isSubscribed.value) {
    pushalertbyiw.unsubscribe(); // Hủy đăng ký
  } else {
    pushalertbyiw.subscribe(); // Đăng ký
  }
};

// Sử dụng onMounted callback của PushAlert
onMounted(() => {
  // Kiểm tra trạng thái đăng ký ban đầu
  isSubscribed.value = pushalertbyiw.isSubscribed();
  console.log("isSubscribed.value  :", isSubscribed.value);

  // Lắng nghe sự kiện onSubscribe và onUnsubscribe để cập nhật trạng thái
  pushalertbyiw.addEventListener("onSubscribe", () => {
    console.log("Subscribed2312323");
    isSubscribed.value = true;
  });

  pushalertbyiw.addEventListener("onUnsubscribe", () => {
    console.log("Unsubscribed2312323");
    isSubscribed.value = false;
  });
});
</script>

<template>
  <Hearder />
  <div class="notification-wrapper">
    <button
      @click="toggleSubscription"
      class="notification-btn"
      :class="{ subscribed: isSubscribed }"
    >
      <i class="fas fa-bell"></i>
      {{ isSubscribed ? "Hủy đăng ký thông báo" : "Đăng ký nhận thông báo" }}
    </button>
  </div>
  <Post />
  <Footer />
</template>

<style>
.notification-wrapper {
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 95px;
}

.notification-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  background-color: #3498db;
  color: white;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.notification-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  background-color: #2980b9;
}

.notification-btn.subscribed {
  background-color: #27ae60;
}

.notification-btn.subscribed:hover {
  background-color: #219a52;
}

.notification-btn i {
  font-size: 16px;
}
</style>
