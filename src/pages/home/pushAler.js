import axios from 'axios';

// URL server Hono
const SERVER_URL = 'https://manage-restaurant.minhquancao0.workers.dev/api/push';

// Hàm đăng ký Push Notifications
export async function subscribeToPush(registration) {
  // Lấy public key từ server
  const { data: { publicKey } } = await axios.get(`${SERVER_URL}/public-key`);

  // Đăng ký PushManager
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });

  // Gửi subscription lên server
  await axios.post(`${SERVER_URL}/subscribe`, subscription);

  return subscription;
}

// Chuyển đổi publicKey từ Base64 sang Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
