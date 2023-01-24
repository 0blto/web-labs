<script lang="ts" setup>
import router from '@/router';
import Swal from 'sweetalert2';
import { onMounted } from 'vue';

    onMounted(() => {
        Swal.fire({
        title: 'Page not foung',
        text: 'Закрытие окна вернёт вас на основную страницу',
        imageUrl: 'https://i.gifer.com/3SfS.gif',
        padding: '3em',
        color: '#716add',
        timer: 10000,
        timerProgressBar: true,
        willClose: () => {
            setTimeout(() => {
                router.push('/~s339112/lab4/')
            }, 200)
        }
        })
    })
    
</script>




