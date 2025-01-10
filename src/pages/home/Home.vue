<script setup>
import Hearder from "@/components/header/Hearder.vue";
import Post from "./components/Post.vue";
import Footer from "@/components/footer/Footer.vue";
import { ref, onMounted } from "vue";
import { initPushAlert, showSubscriptionPrompt } from "./pushAler";
import { useRouter } from "vue-router";
function isRunningStandalone() {
  // Kiểm tra trên iOS
  if (window.navigator.standalone) {
    return true;
  }

  // Kiểm tra trên Android và trình duyệt hỗ trợ display-mode
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }

  return false;
}

if (isRunningStandalone()) {
  console.log('Ứng dụng đang chạy từ màn hình chính!');
} else {
  console.log('Ứng dụng không chạy từ màn hình chính.');
}
const router = useRouter();

const isSubscribed = ref(false);
const subsInfo = ref(null);
const isBlocked = ref(false);

onMounted(() => {
  initPushAlert(false);
  updateSubscriptionStatus();
});

const updateSubscriptionStatus = () => {
  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "getSubsInfo",
    function (result) {
      isSubscribed.value = result.isPushEnabled;
      isBlocked.value = result.permission === "denied";
      subsInfo.value = {
        deviceType: result.device_type,
        browserType: result.browser_type,
        subscriberId: result.subId,
      };
    },
  ]);
};

const handleSubscribe = () => {
  if (!isSubscribed.value) {
  }
};

const handleUnblock = () => {
  window.open("chrome://settings/content/notifications", "_blank");
};
</script>

<template>
  <div class="notification-wrapper">
    <!-- Subscribe Button -->
    <button v-if="!isBlocked" @click="handleSubscribe" :class="['notification-btn', { subscribed: isSubscribed }]">
      <i class="fas fa-bell"></i>
      <!-- {{ isSubscribed ? "Đã đăng ký thông báo" : "Đăng ký nhận thông báo" }} -->
      Chạy thử coi có được không
    </button>

    <button @click="router.push('/notification/send')" :class="['notification-btn', { subscribed: isSubscribed }]">
      <i class="fas fa-paper-plane"></i>
      Gửi thông báo
    </button>

    <button @click="router.push('/notification/segment')" :class="['notification-btn', { subscribed: isSubscribed }]">
      <i class="fas fa-plus-circle"></i>
      Tạo thể loại gửi
    </button>
    <!-- 
    <button
      @click="router.push('/notification/segment/send')"
      :class="['notification-btn', { subscribed: isSubscribed }]"
    >
      <i class="fas fa-bell"></i>
      Gửi theo thể loại
    </button> -->

    <!-- Unblock Button -->
    <button v-if="isBlocked" @click="handleUnblock" class="notification-btn blocked">
      <i class="fas fa-lock-open"></i>
      Mở khóa thông báo
    </button>

    <!-- Subscription Info -->
    <div v-if="subsInfo && isSubscribed" class="subscription-info">
      <p>Thiết bị: {{ subsInfo.deviceType }}</p>
      <p>Trình duyệt: {{ subsInfo.browserType }}</p>
      <p>ID: {{ subsInfo.subscriberId }}</p>
    </div>
  </div>
</template>

<style scoped>
.notification-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11);
  min-width: 200px;
  justify-content: center;
  margin-top: 10px;
}

.notification-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1);
  background-color: #2980b9;
}

.notification-btn.subscribed {
  background-color: #27ae60;
}

.notification-btn.blocked {
  background-color: #e74c3c;
}

.notification-btn.blocked:hover {
  background-color: #c0392b;
}

.subscription-info {
  margin-top: 15px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #666;
}

.subscription-info p {
  margin: 5px 0;
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
  .notification-wrapper {
    margin-top: 60px;
    padding: 15px;
  }

  .notification-btn {
    min-width: 160px;
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  .subscription-info {
    width: 90%;
    font-size: 0.8rem;
    padding: 8px;
  }
}

/* Small Mobile Devices */
@media screen and (max-width: 480px) {
  .notification-wrapper {
    margin-top: 40px;
    padding: 10px;
  }

  .notification-btn {
    min-width: 140px;
    padding: 8px 16px;
    font-size: 0.85rem;
  }

  .subscription-info {
    width: 95%;
    font-size: 0.75rem;
    padding: 6px;
  }
}
</style>
