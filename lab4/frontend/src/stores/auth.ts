import router from "@/router";
import { defineStore } from "pinia";
import Swal from 'sweetalert2';

function err(msg: string) {
  Swal.fire({
    icon: 'error',
    title: 'Ошибка',
    text: msg
  })
}

function msg(msg: string) {
    Swal.fire({
      icon: 'success',
      text: msg,
      title: 'Успешно'
    })
  }


export const useAuthStore = defineStore({
    id: 'auth',
    state: () => {
        return {
            user: localStorage.getItem('user') ?
             JSON.parse(localStorage.getItem('user')!) :
              null,
            token: localStorage.getItem('token') ?
            JSON.parse(localStorage.getItem('token')!) :
             null,
            returnUrl: '/'
        }
    },
    actions: {
        async login(username: string, password: string) {
            const response = await fetch(
                'http://localhost:5100/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, password
                })
            })

            if (response.status === 200) {
                const data = await response.json();
                this.token = data.token;
                this.user = data.username;
                localStorage.setItem('token', JSON.stringify(data.token))
                localStorage.setItem('user', JSON.stringify(data.username))
                router.push('/~s339112/lab4/')
            } else {
                err('Неверный логин или пароль')
            }
        },
        async register(username: string, password: string) {
            const response = await fetch(
                'http://localhost:5100/api/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, password
                })
            })
            if (response.status === 200) {
                msg('Аккаунт успешно зарегистрирован')
            } else {
                err('Аккаунт с таким именем уже существует')
            }
        },
        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            localStorage.removeItem('lastResp')
            router.push('/~s339112/lab4/login')
        }
    }


})