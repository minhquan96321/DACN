<script setup>
import { ref } from "vue"
import { useSingUpStore } from "@/store/fecthAPI"
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const loginStore = useSingUpStore()
const router = useRouter()
const login = ref({
    email: null,
    password: null
})

const notification = ref(true)

const registerStore = useSingUpStore()
const register = ref({
    email: null,
    password: null,
    username: null,
})

const types = ref({
    type: "password",
    icon: "fa-solid fa-eye-slash",
    boolean: false
})

const booleans = ref(true)


const handleregister = async () => {
    // load.value = true
    // console.log("onMounted")
    // console.log(load.value)
    await registerStore.registerAdmin(register.value)
    const status = registerStore.$state.statusRegister;
    console.log(status)
    const errorMessage = registerStore.$state.messagStatus
    if (status === true) {
        toast.success("Submitted successfully !", {
            autoClose: 2000,
        }); // ToastOptions
    } else {
        toast.error(errorMessage, {
            autoClose: 2000,
        }); // Toas
    }

    register.value = {}
}


const handlelogin = async () => {
    // load.value = true
    // console.log("onMounted")
    // console.log(load.value)
    await loginStore.loginAdmin(login.value)
    if (loginStore.$state.statusLogin) {
        router.push({ name: "HomeAdminPage" })
        setTimeout(() => {
            window.location.reload()
        }, 200)
    }
    notification.value = loginStore.$state.statusLogin
    login.value = {}

}

const handleHide = () => {
    types.boolean = !types.boolean
    if (types.boolean) {
        types.value.type = "text"
        types.value.icon = "fa-solid fa-eye"
    } else {
        types.value.type = "password"
        types.value.icon = "fa-solid fa-eye-slash"

    }
}

const handleSingup = () => {
    // console.log("haahahaha")
    booleans.value = !booleans.value
    if (booleans.value) {
        booleans.value = true
        // console.log(booleans.value)
    } else {
        booleans.value = false
        // console.log(booleans.value)

    }
    login.value = {}
    register.value = {}
}

// const onchangeHandle = () => {
//     console.log("allll")
//     notification.value = true
// }



</script>

<template>
    <div class="background">
        <div class="wrap">
            <form v-if="booleans" class="form-login">
                <div class="form-header">
                    <h1 class="title-header">Log in</h1>
                    <span class="header-question">
                        You want to register?
                    </span>
                    <a class="sign-up" @click.prevent="handleSingup">Sign up</a>
                    <!-- <router-link class="sign-up" :to="{ name: 'RegisterPage' }">Sing up</router-link> -->
                </div>

                <div class="form-emai">
                    <div class="label">Email addres</div>
                    <input type="text" placeholder="Your email" v-model="login.email" class="input-login">
                </div>

                <div class="form-emai password">
                    <div class="label label-password">
                        <span>Password</span>
                        <span class="hide" @click.prevent="handleHide">
                            <i :class="types.icon"></i>
                            Hide
                        </span>
                    </div>
                    <input :type="types.type" placeholder="Your password" v-model="login.password"
                        class="input-login login-password">

                    <a href="" class="forget-password">Forget password?</a>

                    <div v-if="!notification" class="notification">
                        Incorrect password or email address, please re-enter
                    </div>
                </div>
                <button type="submit" @click.prevent="handlelogin" class="submit-login"> Log in
                </button>
            </form>

            <form v-else class="form-login">
                <div class="form-header">
                    <h1 class="title-header">Register</h1>
                    <span class="header-question">
                        Already have an count?
                    </span>
                    <a class="sign-up" @click.prevent="handleSingup">Log in</a>
                    <!-- <router-link class="sign-up" :to="{ name: 'LoginPage' }">Log in</router-link> -->
                </div>
                <div class="form-emai">
                    <div class="label">What's your name?</div>
                    <input type="text" v-model="register.username" placeholder="Your name" class="input-login">
                </div>

                <div class="form-emai">
                    <div class="label">What's your email?</div>
                    <input type="text" v-model="register.email" placeholder="Your email" class="input-login">
                </div>

                <div class="form-emai password">
                    <div class="label label-password">
                        <span>Create a password</span>
                        <span class="hide" @click.prevent="handleHide">
                            <i :class="types.icon"></i>
                            Hide
                        </span>
                    </div>
                    <input :type="types.type" placeholder="Your password" v-model="register.password"
                        class="input-login login-password">

                </div>
                <button type="submit" @click.prevent="handleregister" class="submit-login"> Create an account
                </button>


            </form>

        </div>
    </div>


</template>

<style scoped>
.background {
    height: 100vh;
    background: url("https://phongvu.vn/cong-nghe/wp-content/uploads/2020/11/119234579_169457918065236_755533166268046471_n-1.jpg") no-repeat center;

}

.wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

}

.form-login {
    padding: 42px;

    background-color: #fff;
    border-radius: 24px;
    width: 480px;
}

.form-header {
    margin-bottom: 32px;
    text-align: center;
}

.title-header {
    font-family: Poppins;
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 8px;
}

.header-question {
    color: rgba(102, 102, 102, 0.80);
    font-family: Poppins;
    font-size: 16px;
    font-weight: 400;
}

.sign-up {
    padding: 10px;
    font-size: 16px;
    font-family: Poppins;
    color: #111;
    text-decoration: none;
    cursor: pointer;
}

.form-emai {
    margin-bottom: 16px;
}

.label {
    margin-bottom: 4px;
    font-family: Poppins;
    font-weight: 400;
    color: #666;
}

.submit-login,
.input-login {
    height: 56px;
    width: 100%;
    border-radius: 12px;
    border: 1px solid rgba(102, 102, 102, 0.35);
    padding: 0 10px 0 20px;
}

/* .label-password {
    display: flex;
    justify-content: space-between;
} */

.hide {
    margin-right: 10px;
}

.label-password {
    color: rgba(102, 102, 102, 0.80);
    display: flex;
    justify-content: space-between;
}

.login-password {
    margin-bottom: 16px;
}

.forget-password {
    color: #111;
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
}

.submit-login {
    border-radius: 32px;
    padding: 12.5px 0 13.5px 0;
    color: #333;
    font-size: 20px;
    font-family: Poppins;
    font-weight: 500;
    background: blue;
    opacity: 0.65;
    color: #fff;
    cursor: pointer;
    margin-bottom: 16px;
}

/* .submit-login:hover {
    background: blue;
} */

.hide {
    cursor: pointer;
    user-select: none;
}

.notification {
    text-align: center;
    margin-top: 20px;
    font-family: Poppins;
    font-size: 12px;
    color: red;
}
</style>
