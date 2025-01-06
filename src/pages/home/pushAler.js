// pushAlert.js
export const pushalertbyiw = {
  subscribe: () => {
    console.log("Subscribed");
    // Thực hiện đăng ký ở đây
  },
  unsubscribe: () => {
    console.log("Unsubscribed");
    // Thực hiện hủy đăng ký ở đây
  },
  isSubscribed: () => {
    return false; // Trả về trạng thái đăng ký (true/false)
  },
  addEventListener: (event, callback) => {
    if (event === "onSubscribe") {
      callback(); // Giả sử sự kiện onSubscribe
    } else if (event === "onUnsubscribe") {
      callback(); // Giả sử sự kiện onUnsubscribe
    }
  },
};
