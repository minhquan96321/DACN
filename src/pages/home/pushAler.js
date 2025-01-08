export function initPushAlert() {
  console.log("Initializing PushAlert...");

  // Tùy chỉnh dialog

  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "configure",
    {
      dialog_title: "Nhận thông báo mới nhất",
      dialog_text: "Đăng ký để nhận thông báo về các bài viết mới",
      alert_sound: false,
      ask_after_page_load_delay: 5,
      popup_position: "center",
      allow_button_text: "Đồng ý",
      decline_button_text: "Để sau",
      block_message: "Bạn đã chặn thông báo...",
      auto_init: false, // Disable automatic initialization
    },
  ]);

  // Khởi tạo PushAlert
  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "onReady",
    onPAReady,
  ]);

  // Xử lý khi notification bị block
  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "onBlock",
    function () {
      console.log("Notifications are blocked");
      showBlockMessage();
    },
  ]);

  // Xử lý khi đăng ký thành công
  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "onSuccess",
    function (result) {
      console.log("Subscription Success:", result);
      hideBlockMessage();
      checkSubscriptionStatus();
    },
  ]);

  // Xử lý khi đăng ký thất bại
  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "onFailure",
    function (result) {
      console.log("Subscription Failed:", result);
      if (result.status == -1) {
        showBlockMessage();
      }
    },
  ]);
}

function showBlockMessage() {
  // Hiển thị thông báo hướng dẫn mở block
  const blockMessage = document.createElement("div");
  blockMessage.id = "notification-block-message";
  blockMessage.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 15px 20px;
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
      z-index: 9999;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  `;
  blockMessage.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
          <i class="fas fa-exclamation-triangle"></i>
          <span>Bạn đã chặn thông báo. Vui lòng click vào biểu tượng khóa trên thanh địa chỉ, 
          sau đó đặt quyền "Notifications" thành "Ask/Hỏi (mặc định)". Sau đó tải lại trang.</span>
      </div>
  `;
  document.body.appendChild(blockMessage);
}

function hideBlockMessage() {
  const blockMessage = document.getElementById("notification-block-message");
  if (blockMessage) {
    blockMessage.remove();
  }
}

function onPAReady() {
  console.log("PushAlert Ready");
  if (manualInit) {
    PushAlertCo.init(); // Manually trigger subscription box
  }
  checkSubscriptionStatus();
}

(window.pushalertbyiw = window.pushalertbyiw || []).push([
  "onReady",
  onPAReady,
]);

export function checkSubscriptionStatus() {
  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "getSubsInfo",
    function (result) {
      console.log("Subscription Info:", result);
      if (result.permission === "denied") {
        showBlockMessage();
      } else {
        hideBlockMessage();
      }
      return {
        isSubscribed: result.isPushEnabled,
        subscriberId: result.subId,
        browserType: result.browser_type,
        deviceType: result.device_type,
        permission: result.permission,
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
          hideBlockMessage();
          checkSubscriptionStatus();
        },
        errorCallback: function (error) {
          console.log("Subscribe callback error:", error);
          if (error.reason === "blocked") {
            showBlockMessage();
          }
        },
      },
    ]);
  }
}

export function initManualSubscription() {
  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "onReady",
    function () {
      if (window.PushAlertCo) {
        PushAlertCo.init();
      }
    },
  ]);
}
