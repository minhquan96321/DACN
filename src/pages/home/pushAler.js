let pushAlertStatus = false;

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
      pushAlertStatus = true;
    },
  ]);

  // Xử lý khi đăng ký thất bại
  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "onFailure",
    function (result) {
      console.log("Subscription Failed:", result);
      pushAlertStatus = false;
    },
  ]);
}

function onPAReady() {
  console.log("PushAlert Ready");
  if (PushAlertCo && PushAlertCo.subs_id) {
    console.log("User is subscribed with ID:", PushAlertCo.subs_id);
    pushAlertStatus = true;
    return true;
  }
  console.log("User is not subscribed");
  pushAlertStatus = false;
  return false;
}

export function getSubscriptionStatus() {
  return pushAlertStatus;
}

export function subscribeToPushAlert() {
  if (window.pushalertbyiw) {
    window.pushalertbyiw.push(["subscribe", {}]);
  }
}
