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
  checkSubscriptionStatus().then((status) => {
    isSubscribed.value = status.isSubscribed;
    subsInfo.value = status;
  });
});

const handleSubscribe = () => {
  if (!isSubscribed.value) {
    subscribeToPushAlert(); // Manually trigger subscription dialog
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
/* Same styles as provided */
</style>
