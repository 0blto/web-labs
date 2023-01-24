<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { reactive } from 'vue';
import Swal from 'sweetalert2';

function info(msg: string) {
  Swal.fire({
    icon: 'info',
    title: 'Info',
    text: msg
  })
}

const user = reactive({
    username: '',
    password: ''
})

function onSubmit() {
  if (user.username.length < 4 || user.username.length > 16) {
      info('Длина логина должна быть в пределах от 4 до 16 символов включительно')
  } else if (user.username.match(/[^a-zA-Z0-9]/)) {
      info('Имя пользователя может состоять только из символов латиницы и цифр')
  } else if (user.password.length > 20 || user.password.length < 8) {
      info('Пароль должен быть в длину не менее 8 и не более 20 символов включительно')
  } else if (user.password.match(/[^!-~]/)) {
      info('Пароль может содержать только символы латиницы, цифры или спец. символы')
  } else {
      useAuthStore().register(user.username, user.password)
  }
}
</script>

<template>
    <form class="p-8 max-w-sm m-auto" @submit.prevent="onSubmit">
    <div class="mb-4">
        <label for="username" class="block text-gray-300 text-sm font-bold mb-4">Username</label>
        <input type="text" id="username" placeholder="Username" v-model="user.username"
          class="text-gray-300 border-4 py-2 px-3 border-solid
           border-gray-300 focus:border-green-500 focus:outline-none
            bg-transparent focus:translate-x-4 transition duration-300
            w-full rounded shadow appearance-none focus:text-green-500">
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-300 text-sm font-bold mb-4">Password</label>
        <input type="password" id="password" placeholder="Password" v-model="user.password"
          class="text-gray-300 border-4 py-2 px-3 border-solid
           border-gray-300 focus:border-green-500 focus:outline-none
            bg-transparent focus:translate-x-4 transition duration-300
            w-full rounded shadow appearance-none focus:text-green-500">
      </div>
      <div class="flex items mb-4">
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
          Sign Up
        </button>
      </div> 
      <RouterLink to="/~s339112/lab4/login" class="hover:underline">Перейти к странице входа</RouterLink>
    </form>
  </template>