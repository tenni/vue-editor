import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    strict: true,// 严格模式
    state:{
        // 存储数据
        hideObj:{
            hide1: false,
            hide2: false// 没用到
        }
    },
    getters:{
        // 获取数据
    },
    mutations:{
        // 改变数据
        reducePrice: (state, payload) =>{
            state.hideObj.hide1 = !state.hideObj.hide1
            console.log(payload)
        }
    },
    actions:{
        // 异步和传参
        actionPrice: (context, payload) =>{
            setTimeout(function(){
                context.commit('reducePrice', payload)
            },0)
            
        }
    }
})