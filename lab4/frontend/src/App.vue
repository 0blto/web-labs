<script setup lang="ts">
import { reactive } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import Swal from 'sweetalert2'

const auth = useAuthStore()

function logout() {
  auth.logout()
}

function header() {
  Swal.fire({
    title: 'Об авторе',
    imageUrl: 'https://i.gifer.com/3uG2.gif',
    padding: '3em',
    color: '#716add',
    text: 'Погрибняк Иван P32131 Вариант: 13100'
  })
}

</script>

<template>
  
      <header>
        <nav class="p-4 w-screen mb-8 text-right">
          <button @click="header" class="float-left">Об авторе</button>
          <RouterLink class="text-2xl hover:underline" to="/~s339112/lab4/">График</RouterLink>
          <RouterLink class="text-2xl ml-4 hover:underline" to="/~s339112/lab4/table">Таблица</RouterLink>
          <a href="#" class="test-indigo-400 hover:underline ml-4 mr-4"
          @click="logout()">Logout</a>    
      </nav>
      </header>
      <main class="p-8">
        <RouterView />
      </main>
    
</template>

<style>
body {
  background-color: #1a202c;
  color: white;
  min-height: 100vh;
  width: 100%;
}
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background-color: rgb(29, 29, 29);
}

::-webkit-scrollbar-thumb {
    background-color: rgb(68, 68, 68);
    border-radius: 5px;
    width: 10px;
    border: 2px solid rgb(235, 235, 235);
}
</style>

