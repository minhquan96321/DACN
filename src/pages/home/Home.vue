<script setup>
import Hearder from "@/components/header/Hearder.vue";
import Post from "./components/Post.vue";
import Footer from "@/components/footer/Footer.vue";
import { ref, onMounted } from "vue";
import {
  initPushAlert,
  checkSubscriptionStatus,
  subscribeToPushAlert,
  initManualSubscription,
} from "./pushAler";

const isSubscribed = ref(false);
const subsInfo = ref(null);

onMounted(() => {
  initPushAlert(false); // Initialize without automatic dialog
  // checkSubscriptionStatus().then((status) => {
  //   isSubscribed.value = status.isSubscribed;
  //   subsInfo.value = status;
  // });
});

const handleSubscribe = () => {
  if (!isSubscribed.value) {
    subscribeToPushAlert(); // Manually trigger subscription dialog
    // PushAlertCo.forceSubscribe();
  }
};
</script>
<template>
  <div class="notification-wrapper">
    <button
      @click="handleSubscribe"
      :class="['notification-btn', { subscribed: isSubscribed }]"
    >
      <i class="fas fa-bell"></i>
      {{ isSubscribed ? "Đã đăng ký thông báo" : "Đăng ký nhận thông báo" }}
    </button>

    <!-- Subscription info (optional, for debugging or displaying details) -->
    <div v-if="subsInfo" class="subscription-info">
      <p>Device: {{ subsInfo.deviceType }}</p>
      <p>Browser: {{ subsInfo.browserType }}</p>
      <p>ID: {{ subsInfo.subscriberId }}</p>
    </div>
  </div>
</template>

<style>
.notification-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 95px;
}

.subscription-info {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
  text-align: center;
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
