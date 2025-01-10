<script setup>
import { ref, computed } from "vue";
import axios from "axios";
const notification = ref({
  title: "",
  message: "",
  icon: "https://cdn.pushalert.co/icons/default_icon-76999_2.png",
  url: "https://dacn.pages.dev/ ",
  segmentId: "42973",
});

const hasContent = computed(() => {
  return notification.value.title || notification.value.message;
});

const sendNotification = async () => {
  try {
    const response = await axios.post(
      `https://manage-restaurant.minhquancao0.workers.dev/api/notification/SegmentSend`,
      notification.value,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      alert("Segment created successfully!");
      notification.value.title = "";
      notification.value.message = "";
    } else {
      alert(`Failed to create segment: ${response.data.message}`);
    }
  } catch (error) {
    console.error("Error creating segment:", error);
    alert("An error occurred while creating the segment");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="send-segment-container">
    <div class="notification-card">
      <div class="card-header">
        <h3>🔔 Send Push Notification</h3>
        <p class="subtitle">Create and send notifications to your segments</p>
      </div>

      <div class="card-body">
        <form @submit.prevent="sendNotification" class="notification-form">
          <div class="form-group">
            <div class="input-wrapper">
              <label>
                <i class="fas fa-heading"></i>
                Title
              </label>
              <input
                v-model="notification.title"
                type="text"
                placeholder="Enter an attention-grabbing title"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <div class="input-wrapper">
              <label>
                <i class="fas fa-comment-alt"></i>
                Message
              </label>
              <textarea
                v-model="notification.message"
                placeholder="Write your notification message"
                rows="4"
                required
              ></textarea>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group half">
              <div class="input-wrapper">
                <label>
                  <i class="fas fa-image"></i>
                  Icon URL
                </label>
                <input
                  v-model="notification.icon"
                  type="url"
                  placeholder="https://example.com/icon.png"
                />
              </div>
            </div>

            <div class="form-group half">
              <div class="input-wrapper">
                <label>
                  <i class="fas fa-link"></i>
                  Target URL
                </label>
                <input
                  v-model="notification.url"
                  type="url"
                  placeholder="https://example.com"
                  required
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="input-wrapper">
              <label>
                <i class="fas fa-users"></i>
                Segment ID
              </label>
              <input
                v-model="notification.segmentId"
                type="number"
                placeholder="Enter your segment ID"
                required
              />
            </div>
          </div>

          <button type="submit" class="submit-btn">
            <i class="fas fa-paper-plane"></i>
            Send Notification
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.send-segment-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

.notification-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.card-header h3 {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
}

.subtitle {
  margin: 0.5rem 0 0;
  opacity: 0.9;
  font-size: 1rem;
}

.card-body {
  padding: 2rem;
}

.notification-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

.half {
  flex: 1;
}

.input-wrapper {
  position: relative;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #444;
  font-weight: 500;
}

label i {
  margin-right: 0.5rem;
  color: #6b73ff;
}

input,
textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #6b73ff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(107, 115, 255, 0.2);
}

.preview-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 1.5rem 0;
}

.preview-section h4 {
  margin: 0 0 1rem;
  color: #444;
}

.notification-preview {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.preview-icon img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
}

.preview-content h5 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

.preview-content p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.submit-btn {
  background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(107, 115, 255, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 1rem;
  }

  .card-header {
    padding: 1.5rem;
  }

  .card-header h3 {
    font-size: 1.5rem;
  }

  .card-body {
    padding: 1.5rem;
  }
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notification-card {
  animation: fadeIn 0.5s ease-out;
}
</style>
