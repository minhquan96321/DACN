<template>
  <div class="admin-container">
    <div class="notification-card">
      <div class="card-title">
        <span class="bell-icon">🔔</span>
        <h2>Gửi thông báo</h2>
      </div>

      <form @submit.prevent="sendNotification">
        <div class="input-group">
          <input
            v-model="notification.title"
            type="text"
            placeholder="Tiêu đề thông báo"
            required
          />
        </div>

        <div class="input-group">
          <textarea
            v-model="notification.message"
            placeholder="Nội dung thông báo"
            required
          ></textarea>
        </div>

        <div class="input-row">
          <div class="input-group">
            <input
              v-model="notification.url"
              type="url"
              placeholder="URL (Tùy chọn)"
            />
          </div>

          <div class="input-group">
            <input
              v-model="notification.icon"
              type="url"
              placeholder="Icon URL (Tùy chọn)"
            />
          </div>
        </div>

        <button type="submit" :disabled="loading">
          <span v-if="!loading">Gửi thông báo</span>
          <span v-else>Đang gửi...</span>
        </button>
      </form>

      <div v-if="status.show" :class="['status-message', status.type]">
        {{ status.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";

const loading = ref(false);
const status = reactive({
  show: false,
  type: "",
  message: "",
});

const notification = reactive({
  title: "",
  message: "",
  url: "https://dacn.pages.dev/",
  icon: "https://cdn.pushalert.co/icons/default_icon-76999_2.png",
});

const showStatus = (type, message) => {
  status.type = type;
  status.message = message;
  status.show = true;
  setTimeout(() => {
    status.show = false;
  }, 3000);
};

const sendNotification = async () => {
  loading.value = true;
  try {
    const response = await axios.post(
      `https://manage-restaurant.minhquancao0.workers.dev/api/notification`,
      notification,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status == "success") {
      showStatus("success", "Gửi thông báo thành công!");
      notification.title = "";
      notification.message = "";
    } else {
      showStatus("error", "Không thể gửi thông báo");
    }
  } catch (error) {
    showStatus("error", "Đã xảy ra lỗi khi gửi thông báo");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.admin-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.notification-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.bell-icon {
  font-size: 1.5rem;
}

.card-title h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input-group textarea {
  height: 120px;
  resize: none;
}

.input-group input:focus,
.input-group textarea:focus {
  outline: none;
  border-color: #2196f3;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

button {
  width: 100%;
  padding: 1rem;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #1976d2;
}

button:disabled {
  background: #90caf9;
  cursor: not-allowed;
}

.status-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  animation: fadeIn 0.3s;
}

.status-message.success {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-message.error {
  background: #ffebee;
  color: #c62828;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .admin-container {
    margin: 1rem auto;
    padding: 0 0.5rem;
  }

  .notification-card {
    padding: 1rem;
    border-radius: 12px;
  }

  .card-title {
    margin-bottom: 1.5rem;
  }

  .card-title h2 {
    font-size: 1.25rem;
  }

  .bell-icon {
    font-size: 1.25rem;
  }

  .input-row {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .input-group {
    margin-bottom: 1rem;
  }

  .input-group input,
  .input-group textarea {
    padding: 0.7rem;
    font-size: 0.95rem;
  }

  .input-group textarea {
    height: 100px;
  }

  button {
    padding: 0.8rem;
    font-size: 0.95rem;
  }

  .status-message {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
}

/* Thêm breakpoint cho màn hình cực nhỏ */
@media (max-width: 320px) {
  .notification-card {
    padding: 0.8rem;
  }

  .card-title h2 {
    font-size: 1.1rem;
  }

  .bell-icon {
    font-size: 1.1rem;
  }

  .input-group input,
  .input-group textarea {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
}
</style>
