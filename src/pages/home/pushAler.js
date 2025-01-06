export function initPushAlert() {
  console.log("Initializing PushAlert...");

  // Tùy chỉnh dialog
  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "configure",
    {
      dialog_title: "Nhận thông báo mới nhất",
      dialog_text: "Đăng ký để nhận thông báo về các bài viết mới",
      alert_sound: false,
      notification_image: "URL_của_ảnh_thông_báo", // Tùy chọn
      ask_after_page_load_delay: 5, // Delay 5 giây trước khi hiện dialog
      popup_position: "center", // center, left, right
      allow_button_text: "Đồng ý",
      decline_button_text: "Để sau",
      auto_hide_message_after: 5, // Tự động ẩn sau 5 giây
    },
  ]);

  // Khởi tạo PushAlert
  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "onReady",
    onPAReady,
  ]);

  // Xử lý khi đăng ký thành công
  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "onSuccess",
    function (result) {
      console.log("Subscription Success:", result);
      checkSubscriptionStatus();
    },
  ]);

  // Xử lý khi đăng ký thất bại
  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "onFailure",
    function (result) {
      console.log("Subscription Failed:", result);
    },
  ]);
}

function onPAReady() {
  console.log("PushAlert Ready");
  checkSubscriptionStatus();
}

export function checkSubscriptionStatus() {
  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "getSubsInfo",
    function (result) {
      console.log("Subscription Info:", result);
      return {
        isSubscribed: result.isPushEnabled,
        subscriberId: result.subId,
        browserType: result.browser_type,
        deviceType: result.device_type,
      };
    },
  ]);
}

export function subscribeToPushAlert() {
  if (window.pushalertbyiw) {
    window.pushalertbyiw.push([
      "subscribe",
      {
        successCallback: function () {
          console.log("Subscribe callback success");
          checkSubscriptionStatus();
        },
        errorCallback: function () {
          console.log("Subscribe callback error");
        },
      },
    ]);
  }
}
