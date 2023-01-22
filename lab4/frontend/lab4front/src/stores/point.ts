import router from "@/router";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";



export const usePointStore = defineStore({
    id: 'point',
    state: () => {
        return {
            x: localStorage.getItem('lastResp') ?
             JSON.parse(localStorage.getItem('lastResp')!).x :
              '-',
              y: localStorage.getItem('lastResp') ?
             JSON.parse(localStorage.getItem('lastResp')!).y :
              '-',
              r: localStorage.getItem('lastResp') ?
             JSON.parse(localStorage.getItem('lastResp')!).r :
              '-',
              time: localStorage.getItem('lastResp') ?
             JSON.parse(localStorage.getItem('lastResp')!).time :
              '-',
              res: localStorage.getItem('lastResp') ?
             JSON.parse(localStorage.getItem('lastResp')!).answer :
              '-'
        }
    },
    actions: {
        async requestForm(x: string, y: string, r: string) {
            const response = await fetch(
                'http://localhost:8080/api/points',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    x, y, r
                })
            })
            if (response.status === 200) {
                response.json().then(data => {
                    localStorage.setItem('lastResp', JSON.stringify(data))
                    this.x = data.x
                    this.y = data.y
                    this.r = data.r
                    this.res = data.answer
                    this.time = data.time
                })
            } else {
                throw new Error('Some error')
            }
        }
    }


})