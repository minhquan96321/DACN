export function initPushAlert(manualInit = false) {
  console.log("Initializing PushAlert...");

  (pushalertbyiw = window.pushalertbyiw || []).push(["onReady", onPAReady]);

  function onPAReady() {
    console.log(PushAlertCo.subs_id); //if empty then user is not subscribed

    //YOUR CODE
  }

  // (window.pushalertbyiw = window.pushalertbyiw || []).push([
  //   "configure",
  //   {
  //     dialog_title: "Nhận thông báo mới nhất",
  //     dialog_text: "Đăng ký để nhận thông báo về các bài viết mới",
  //     alert_sound: false,
  //     ask_after_page_load_delay: -1,
  //     popup_position: "center",
  //     allow_button_text: "Đồng ý",
  //     decline_button_text: "Để sau",
  //     block_message: "Bạn đã chặn thông báo...",
  //     auto_init: false, // Disable automatic initialization
  //   },
  // ]);

  // (window.pushalertbyiw = window.pushalertbyiw || []).push([
  //   "onReady",
  //   function () {
  //     console.log("PushAlert Ready");
  //     if (manualInit && window.PushAlertCo) {
  //       PushAlertCo.init(); // Manually trigger subscription box
  //     }
  //     // checkSubscriptionStatus();
  //   },
  // ]);

  // (window.pushalertbyiw = window.pushalertbyiw || []).push([
  //   "onBlock",
  //   function () {
  //     console.log("Notifications are blocked");
  //     showBlockMessage();
  //   },
  // ]);

  // (window.pushalertbyiw = window.pushalertbyiw || []).push([
  //   "onSuccess",
  //   function (result) {
  //     console.log("Subscription Success:", result);
  //     hideBlockMessage();
  //     // checkSubscriptionStatus();
  //   },
  // ]);

  // (window.pushalertbyiw = window.pushalertbyiw || []).push([
  //   "onFailure",
  //   function (result) {
  //     console.log("Subscription Failed:", result);
  //     if (result.status === -1) {
  //       showBlockMessage();
  //     }
  //   },
  // ]);
}

function showBlockMessage() {
  const blockMessage = document.createElement("div");
  blockMessage.id = "notification-block-message";

  // Kiểm tra thiết bị
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Điều chỉnh style dựa trên thiết bị
  blockMessage.style.cssText = `
      position: fixed;
      ${isMobile ? "bottom: 20px" : "top: 20px"};
      left: 50%;
      transform: translateX(-50%);
      padding: ${isMobile ? "12px 15px" : "15px 20px"};
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
      z-index: 9999;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      max-width: ${isMobile ? "90%" : "400px"};
      width: ${isMobile ? "90%" : "auto"};
      font-size: ${isMobile ? "14px" : "16px"};
  `;

  // Điều chỉnh nội dung thông báo dựa trên thiết bị
  const message = isMobile
    ? "Bạn đã chặn thông báo. Vui lòng vào Cài đặt trình duyệt > Quyền > Thông báo và cho phép thông báo."
    : 'Bạn đã chặn thông báo. Vui lòng click vào biểu tượng khóa trên thanh địa chỉ, sau đó đặt quyền "Notifications" thành "Ask/Hỏi (mặc định)". Sau đó tải lại trang.';

  blockMessage.innerHTML = `
      <div style="display: flex; align-items: center; gap: ${
        isMobile ? "8px" : "10px"
      };">
          <i class="fas fa-exclamation-triangle"></i>
          <span>${message}</span>
      </div>
  `;

  document.body.appendChild(blockMessage);

  // Tự động ẩn thông báo sau 5 giây trên mobile
  if (isMobile) {
    setTimeout(() => {
      hideBlockMessage();
    }, 5000);
  }
}

function hideBlockMessage() {
  const blockMessage = document.getElementById("notification-block-message");
  if (blockMessage) {
    blockMessage.remove();
  }
}

// export function checkSubscriptionStatus() {
//   (window.pushalertbyiw = window.pushalertbyiw || []).push([
//     "getSubsInfo",
//     function (result) {
//       console.log("Subscription Info:", result);
//       if (result.permission === "denied") {
//         showBlockMessage();
//       } else {
//         hideBlockMessage();
//       }
//       return {
//         isSubscribed: result.isPushEnabled,
//         subscriberId: result.subId,
//         browserType: result.browser_type,
//         deviceType: result.device_type,
//         permission: result.permission,
//       };
//     },
//   ]);
// }

// export function subscribeToPushAlert() {
//   if (window.pushalertbyiw) {
//     window.pushalertbyiw.push([
//       "subscribe",
//       {
//         successCallback: function () {
//           console.log("Subscribe callback success");
//           hideBlockMessage();
//           checkSubscriptionStatus();
//         },
//         errorCallback: function (error) {
//           console.log("Subscribe callback error:", error);
//           if (error.reason === "blocked") {
//             showBlockMessage();
//           }
//         },
//       },
//     ]);
//   }
// }

export function initManualSubscription() {
  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "onReady",
    function () {
      if (window.PushAlertCo) {
        PushAlertCo.init(); // Manually trigger subscription box
      }
    },
  ]);
}

export function showSubscriptionPrompt() {
  if (window.PushAlertCo) {
    console.log("Showing subscription prompt");
    window.PushAlertCo.init();
  } else {
    console.log("PushAlertCo not available");
  }
}
