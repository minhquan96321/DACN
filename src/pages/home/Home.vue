<script setup>
import Hearder from "@/components/header/Hearder.vue";
import Post from "./components/Post.vue";
import Footer from "@/components/footer/Footer.vue";
import { ref } from "vue";

const isSubscribed = ref(false);

const subscribePushAlert = () => {
  pushalertbyiw.subscribe();
};

// Sử dụng onReady callback của PushAlert
pushalertbyiw.onReady(function () {
  // Kiểm tra trạng thái đăng ký
  isSubscribed.value = pushalertbyiw.isSubscribed();
  const deviceId = pushalertbyiw.getUserId();
  console.log("Device ID của người dùng:", deviceId);
  // Thêm event listeners
  pushalertbyiw.addEventListener("onSubscribe", () => {
    isSubscribed.value = true;
  });

  pushalertbyiw.addEventListener("onUnsubscribe", () => {
    isSubscribed.value = false;
  });
});
</script>

<template>
  <Hearder />
  <div class="notification-wrapper">
    <button
      @click="subscribePushAlert"
      :class="['notification-btn', { subscribed: isSubscribed }]"
    >
      <i class="fas fa-bell"></i>
      {{ isSubscribed ? "Đã đăng ký thông báo" : "Đăng ký nhận thông báo" }}
    </button>
  </div>
  <Post />
  <Footer />
</template>

<style>
main {
  margin-top: 90px;
}

.post-meta {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  color: #999994;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.mx-1 {
  margin-right: 0.25rem !important;
  margin-left: 0.25rem !important;
}

.pagination {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
}

.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}

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

/* Giữ lại các styles hiện có */
.post-meta {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  color: #999994;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.mx-1 {
  margin-right: 0.25rem !important;
  margin-left: 0.25rem !important;
}

.pagination {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
}

.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>
