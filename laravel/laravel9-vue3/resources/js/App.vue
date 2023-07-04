<template>
  <div>
    <h1>Laravel9集成Vue3组件</h1>
    <component-a></component-a>
    <component-b :user="user"></component-b>
  </div>
</template>

<script>
import ComponentA from './components/ComponentA.vue'
import ComponentB from './components/ComponentB.vue'

import axios from 'axios';


export default {
    name: 'app',
    data(){
        return {
            user: {
                name:''
            }
        }
    },
    components:{
        ComponentA,
        ComponentB
    },
    mounted() {
        axios.get('/author').then(res=>{
            console.log(res)
            this.user = res.data
        })
    },
    methods:{
        
    }
}
</script>

<style>
</style>