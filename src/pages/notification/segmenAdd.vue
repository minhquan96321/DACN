<template>
  <div class="segment-add-container">
    <div class="card">
      <div class="card-header">
        <div class="header-content">
          <i class="fas fa-layer-group header-icon"></i>
          <h4>Add New Segment</h4>
        </div>
      </div>
      <div class="card-body">
        <form @submit.prevent="createSegment">
          <div class="form-group">
            <label for="segmentName">Segment Name</label>
            <div class="input-wrapper">
              <i class="fas fa-tag input-icon"></i>
              <input
                type="text"
                id="segmentName"
                v-model="body.segmentName"
                class="form-control"
                required
                placeholder="Enter segment name"
              />
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary mt-3"
            :disabled="loading"
          >
            <i class="fas fa-plus-circle"></i>
            {{ loading ? "Creating..." : "Create Segment" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// Script phần giữ nguyên
import { ref } from "vue";
import axios from "axios";

const body = ref({
  segmentName: "",
});
const loading = ref(false);

const createSegment = async () => {
  if (!body.value.segmentName.trim()) {
    alert("Please enter a segment name");
    return;
  }

  loading.value = true;

  try {
    const response = await axios.post(
      `https://manage-restaurant.minhquancao0.workers.dev/api/notification/addSegment`,
      body.value,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      alert("Segment created successfully!");
      body.value.segmentName = "";
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

<style scoped>
.segment-add-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.card {
  background: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  border: none;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-header {
  background: linear-gradient(45deg, #2196f3, #1976d2);
  padding: 20px;
  border-radius: 12px 12px 0 0;
  border: none;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  font-size: 1.5rem;
  color: white;
}

.card-header h4 {
  margin: 0;
  color: white;
  font-size: 1.35rem;
  font-weight: 600;
}

.card-body {
  padding: 30px;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #344767;
  font-size: 0.95rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
}

.form-control {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  outline: none;
}

.form-control::placeholder {
  color: #94a3b8;
}

.btn-primary {
  background: linear-gradient(45deg, #2196f3, #1976d2);
  color: white;
  padding: 0.85rem 1.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(45deg, #1976d2, #1565c0);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

.btn-primary:disabled {
  background: linear-gradient(45deg, #90caf9, #64b5f6);
  cursor: not-allowed;
  transform: none;
}

.btn-primary i {
  font-size: 1.1rem;
}

.mt-3 {
  margin-top: 1.5rem;
}

@media (max-width: 640px) {
  .segment-add-container {
    padding: 15px;
  }

  .card-body {
    padding: 20px;
  }

  .btn-primary {
    padding: 0.75rem 1.5rem;
  }
}
</style>
