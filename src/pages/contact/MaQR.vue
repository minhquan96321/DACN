<template>
    <div>
        <input type="file" @change="handleFile" placeholder="file">

    </div>

    <button @click="clickfile">Gửi ảnh</button>
    <img :src="img" alt="">
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const imageDriver = ref({
    frontdrivinglicense: '',
    backdrivinglicense: '',
    Faceimage: '',
    IDcardfront: '',
    IDcarback: ''
})
const img = ref('')




const handleFile = (event) => {

    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        base64Encoder(file)
    }
};

const base64Encoder = (files) => {
    let reader = new FileReader()
    reader.onloadend = () => {
        imageDriver.value.frontdrivinglicense = reader.result
        console.log('imageDriver :', imageDriver.value);
    }

    reader.readAsDataURL(files)
}

const clickfile = async () => {
    const file = await axios.post("http://127.0.0.1:8787/api/driver/create-driver", imageDriver, {
        headers: {
            "Content-Type": "application/json "
        }
    })


}

</script>

<style lang="scss" scoped></style>