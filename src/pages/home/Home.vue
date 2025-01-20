<template>
  <div class="surface-ground h-screen flex align-items-center justify-content-center">
    <div class="surface-card p-4 shadow-2 border-round w-full md:w-6 lg:w-4">
      <div class="text-center mb-5">
        <div class="text-900 text-2xl font-medium mb-3">Welcome Back</div>
        <span class="text-600 font-medium">Sign in to continue</span>
      </div>

      <div class="flex flex-column gap-3">
        <!-- Custom Google Login Button -->
        <!-- <Button @click="handleGoogleLogin" class="google-btn p-3" severity="secondary">
          <i class="pi pi-google mr-2"></i>
          Sign in with Google
        </Button> -->
        <button @click="handleGoogleLogin"></button>
      </div>

      <div class="text-center mt-5">
        <span class="text-600 text-sm">
          By continuing, you agree to our
          <a href="#" class="text-primary no-underline">Terms of Service</a> and
          <a href="#" class="text-primary no-underline">Privacy Policy</a>
        </span>
      </div>
    </div>

    <!-- <Toast /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import { useToast } from 'primevue/usetoast';
import { googleConfig } from '../../helper/googleConfig';
// import Button from 'primevue/button';

const router = useRouter();
// const toast = useToast();
let googleClient = null;

const handleCredentialResponse = async (response) => {
  try {
    // Send credential to backend
    const result = await fetch('https://webapp.minhquancao0.workers.dev/api/login-google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        credential: response.credential
      })
    });

    const data = await result.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    // Save user data
    localStorage.setItem('user', JSON.stringify(data.data.user));

    // toast.add({
    //   severity: 'success',
    //   summary: 'Success',
    //   detail: 'Logged in successfully',
    //   life: 3000
    // });

    // Redirect to home
    router.push('/');
  } catch (error) {
    console.error('Login error:', error);
    // toast.add({
    //   severity: 'error',
    //   summary: 'Error',
    //   detail: error.message || 'Failed to login',
    //   life: 3000
    // });
  }
};

const handleGoogleLogin = () => {
  if (googleClient) {
    googleClient.requestAccessToken();
  }
};

onMounted(() => {
  // Load Google Sign In script
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  script.onload = () => {
    google.accounts.id.initialize({
      client_id: googleConfig.clientId,
      callback: handleCredentialResponse
    });

    googleClient = google.accounts.oauth2.initTokenClient({
      client_id: googleConfig.clientId,
      callback: handleCredentialResponse,
      scope: 'email profile'
    });
  };
});
</script>

<style scoped>
.google-btn {
  width: 100%;
}
</style>
