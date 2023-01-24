<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { reactive } from 'vue';


const user = reactive({
    username: '',
    password: ''
})

function onSubmit() {
    if (user.username != '' && user.password != '') {
      useAuthStore().login(user.username, user.password)
    }
}
</script>

<template>
    <form class="p-8 max-w-sm m-auto" @submit.prevent="onSubmit">
      <div class="mb-4">
        <label for="username" class="block text-gray-300 text-sm font-bold mb-4">Username</label>
        <input type="text" id="username" placeholder="Username" v-model="user.username"
          class="text-gray-300 border-4 py-2 px-3 border-solid
           border-gray-300 focus:border-blue-500 focus:outline-none
            bg-transparent focus:translate-x-4 transition duration-300
            w-full rounded shadow appearance-none focus:text-blue-500">
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-300 text-sm font-bold mb-4">Password</label>
        <input type="password" id="password" placeholder="Password" v-model="user.password"
          class="text-gray-300 border-4 py-2 px-3 border-solid
           border-gray-300 focus:border-blue-500 focus:outline-none
            bg-transparent focus:translate-x-4 transition duration-300
            w-full rounded shadow appearance-none focus:text-blue-500">
      </div>
      <div class="flex items mb-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
          Sign In
        </button>
      </div>
      <RouterLink to="/~s339112/lab4/register" class="hover:underline">Перейти к регистрации</RouterLink>
    </form>
  </template>