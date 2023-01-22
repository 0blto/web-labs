<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
const store = useAuthStore();
const token = store.token;
const data = ref('');
onMounted(async () => {
  const response = await fetch('http://localhost:8080/api/points', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  data.value = await response.json();
});
</script>

<template>
        <div class="relative max-w-6xl m-auto p-8" style="height: 70vh">
          <div class="w-full h-full absolute top-0 left-0 overflow-y-auto" style="border: 3px solid black;">
            <table class="text-center border-collapse w-full">
                <thead>
                  <tr>
                      <th class="p-3 sticky top-0 bg-gray-500">X</th>
                      <th class="p-3 sticky top-0 bg-gray-500">Y</th>
                      <th class="p-3 sticky top-0 bg-gray-500">R</th>
                      <th class="p-3 sticky top-0 bg-gray-500">Результат</th>
                      <th class="p-3 sticky top-0 bg-gray-500">Текущее время</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(row) in data">
                    <td class="p-3">{{row.x}}</td>
                    <td class="p-3">{{row.y}}</td>
                    <td class="p-3">{{row.r}}</td>
                    <td class="p-3">{{ row.result }}</td>
                    <td class="p-3">{{ row.time }}</td>
                  </tr>
              </tbody>
          </table>
          </div>
        </div>
</template>

