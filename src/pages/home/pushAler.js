export function initPushAlert() {
  // Kiểm tra trạng thái đăng ký khi PushAlert đã sẵn sàng
  pushalertbyiw.onReady(function () {
    // Kiểm tra ID đăng ký
    console.log(pushalertbyiw.subs_id); // In ra ID đăng ký hoặc trống nếu chưa đăng ký

    // Nếu chưa đăng ký, thực hiện đăng ký
    if (!pushalertbyiw.subs_id) {
      pushalertbyiw.subscribe();
    }
  });

  // Lắng nghe sự kiện đăng ký và hủy đăng ký
  pushalertbyiw.addEventListener("onSubscribe", function () {
    console.log("Người dùng đã đăng ký thông báo");
  });

  pushalertbyiw.addEventListener("onUnsubscribe", function () {
    console.log("Người dùng đã hủy đăng ký thông báo");
  });
}
