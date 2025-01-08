<template>
  <div class="segment-add-container">
    <div class="card">
      <div class="card-header">
        <h4>Add New Segment</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="createSegment">
          <div class="form-group">
            <label for="segmentName">Segment Name</label>
            <input
              type="text"
              id="segmentName"
              v-model="body.segmentName"
              class="form-control"
              required
              placeholder="Enter segment name"
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary mt-3"
            :disabled="loading"
          >
            {{ loading ? "Creating..." : "Create Segment" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const body = ref({
  segmentName: "",
});
const loading = ref(false);

const createSegment = async () => {
  if (!segmentName.value.trim()) {
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
      body.value.segmentName = ""; // Reset form
    } else {
      alert(`Failed to create segment: ${data.message}`);
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid #eee;
}

.card-header {
  background-color: #f8f9fa;
  padding: 15px 20px;
  border-bottom: 1px solid #dee2e6;
  border-radius: 8px 8px 0 0;
}

.card-header h4 {
  margin: 0;
  color: #333;
  font-size: 1.25rem;
}

.card-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #444;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0069d9;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  background-color: #80bfff;
  cursor: not-allowed;
}

.mt-3 {
  margin-top: 1rem;
}

@media (max-width: 640px) {
  .segment-add-container {
    padding: 10px;
  }

  .card-body {
    padding: 15px;
  }

  .btn-primary {
    width: 100%;
  }
}
</style>
