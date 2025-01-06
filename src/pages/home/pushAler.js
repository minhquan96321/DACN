export const pushalertbyiw = {
  // Biến lưu trạng thái đăng ký (chỉ dùng trong bộ nhớ)
  isUserSubscribed: false,

  // Hàm đăng ký
  subscribe: () => {
    console.log("Subscribed");
    // Giả sử bạn thực hiện đăng ký ở đây, ví dụ gửi yêu cầu đến API hoặc tích hợp dịch vụ
    pushalertbyiw.isUserSubscribed = true; // Cập nhật trạng thái đăng ký
    // Phát sự kiện onSubscribe
    pushalertbyiw.dispatchEvent("onSubscribe");
  },

  // Hàm hủy đăng ký
  unsubscribe: () => {
    console.log("Unsubscribed");
    // Giả sử bạn thực hiện hủy đăng ký ở đây
    pushalertbyiw.isUserSubscribed = false; // Cập nhật trạng thái hủy đăng ký
    // Phát sự kiện onUnsubscribe
    pushalertbyiw.dispatchEvent("onUnsubscribe");
  },

  // Hàm kiểm tra trạng thái đăng ký
  isSubscribed: () => {
    return pushalertbyiw.isUserSubscribed; // Trả về trạng thái đăng ký thực tế
  },

  // Hàm phát sự kiện
  dispatchEvent: (event) => {
    if (event === "onSubscribe") {
      // Gọi callback khi có sự kiện đăng ký
      if (pushalertbyiw.onSubscribeCallback) {
        pushalertbyiw.onSubscribeCallback();
      }
    } else if (event === "onUnsubscribe") {
      // Gọi callback khi có sự kiện hủy đăng ký
      if (pushalertbyiw.onUnsubscribeCallback) {
        pushalertbyiw.onUnsubscribeCallback();
      }
    }
  },

  // Hàm lắng nghe sự kiện
  addEventListener: (event, callback) => {
    if (event === "onSubscribe") {
      pushalertbyiw.onSubscribeCallback = callback; // Lưu callback khi đăng ký
    } else if (event === "onUnsubscribe") {
      pushalertbyiw.onUnsubscribeCallback = callback; // Lưu callback khi hủy đăng ký
    }
  },
};
