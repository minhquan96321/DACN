export function initPushAlert() {
  console.log("Initializing PushAlert...");

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
