export const pushalertbyiw = {
  isUserSubscribed: false,

  subscribe: () => {
    console.log("Subscribed");
    pushalertbyiw.isUserSubscribed = true;
    pushalertbyiw.dispatchEvent("onSubscribe");
  },

  unsubscribe: () => {
    console.log("Unsubscribed");
    pushalertbyiw.isUserSubscribed = false;
    pushalertbyiw.dispatchEvent("onUnsubscribe");
  },

  isSubscribed: () => {
    return pushalertbyiw.isUserSubscribed;
  },

  dispatchEvent: (event) => {
    if (event === "onSubscribe") {
      if (pushalertbyiw.onSubscribeCallback) {
        pushalertbyiw.onSubscribeCallback();
      }
    } else if (event === "onUnsubscribe") {
      if (pushalertbyiw.onUnsubscribeCallback) {
        pushalertbyiw.onUnsubscribeCallback();
      }
    }
  },

  addEventListener: (event, callback) => {
    if (event === "onSubscribe") {
      pushalertbyiw.onSubscribeCallback = callback;
    } else if (event === "onUnsubscribe") {
      pushalertbyiw.onUnsubscribeCallback = callback;
    }
  },
};

// Kết hợp với mã của PushAlertCo
(function () {
  // Kiểm tra xem PushAlertCo đã sẵn sàng chưa
  window.pushalertbyiw = window.pushalertbyiw || [];
  window.pushalertbyiw.push(["onReady", onPAReady]);

  function onPAReady() {
    // Kiểm tra subs_id để biết người dùng có đăng ký không
    if (PushAlertCo.subs_id) {
      console.log("User is subscribed with ID:", PushAlertCo.subs_id);
      pushalertbyiw.isSubscribed = true; // Cập nhật trạng thái đăng ký
    } else {
      console.log("User is not subscribed");
      pushalertbyiw.isSubscribed = false; // Cập nhật trạng thái chưa đăng ký
    }

    // Gọi hàm cập nhật UI hoặc logic tùy theo trạng thái
    // Ví dụ: Cập nhật lại UI hoặc trigger các sự kiện
    pushalertbyiw.dispatchEvent(
      pushalertbyiw.isSubscribed ? "onSubscribe" : "onUnsubscribe"
    );
  }
})();
