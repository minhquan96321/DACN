export const pushalertbyiw = {
  isUserSubscribed: false, // Trạng thái đăng ký của người dùng

  subscribe: () => {
    console.log("Subscribed");
    pushalertbyiw.isUserSubscribed = true; // Cập nhật trạng thái
    pushalertbyiw.dispatchEvent("onSubscribe"); // Gọi sự kiện
  },

  unsubscribe: () => {
    console.log("Unsubscribed");
    pushalertbyiw.isUserSubscribed = false; // Cập nhật trạng thái
    pushalertbyiw.dispatchEvent("onUnsubscribe"); // Gọi sự kiện
  },

  isSubscribed: () => {
    return pushalertbyiw.isUserSubscribed; // Trả về trạng thái đăng ký
  },

  dispatchEvent: (event) => {
    if (event === "onSubscribe" && pushalertbyiw.onSubscribeCallback) {
      pushalertbyiw.onSubscribeCallback(); // Gọi callback khi đăng ký
    } else if (
      event === "onUnsubscribe" &&
      pushalertbyiw.onUnsubscribeCallback
    ) {
      pushalertbyiw.onUnsubscribeCallback(); // Gọi callback khi hủy đăng ký
    }
  },

  addEventListener: (event, callback) => {
    if (event === "onSubscribe") {
      pushalertbyiw.onSubscribeCallback = callback; // Lưu callback cho sự kiện đăng ký
    } else if (event === "onUnsubscribe") {
      pushalertbyiw.onUnsubscribeCallback = callback; // Lưu callback cho sự kiện hủy đăng ký
    }
  },
};

// Kết hợp với mã của PushAlertCo
(function () {
  // Đảm bảo biến `pushalertbyiw` tồn tại
  window.pushalertbyiw = pushalertbyiw;

  // Gắn sự kiện "onReady" cho PushAlert
  window.pushalertbyiw.push = window.pushalertbyiw.push || [];
  window.pushalertbyiw.push(["onReady", onPAReady]);

  function onPAReady() {
    console.log("PushAlert SDK Ready");

    // Kiểm tra trạng thái đăng ký dựa trên PushAlertCo.subs_id
    if (window.PushAlertCo?.subs_id) {
      console.log("User is subscribed with ID:", PushAlertCo.subs_id);
      pushalertbyiw.isUserSubscribed = true; // Cập nhật trạng thái đăng ký
    } else {
      console.log("User is not subscribed");
      pushalertbyiw.isUserSubscribed = false; // Cập nhật trạng thái chưa đăng ký
    }

    // Gọi sự kiện tương ứng
    pushalertbyiw.dispatchEvent(
      pushalertbyiw.isUserSubscribed ? "onSubscribe" : "onUnsubscribe"
    );
  }
})();
