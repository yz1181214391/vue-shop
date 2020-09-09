<template>
  <div>Welcome
    <button @click="add">{{view}}</button>
  </div>
</template>
<script>
export default {
  data(){
    return{
      intCount:0,
      num:'ok',
      view:0
    }
  },
  created(){
      window.localStorage.setItem('num',this.num)
  },
  methods:{
    add(){
            this.intCount++
      window.localStorage.setItem('id',this.intCount)
      this.view = window.localStorage.getItem('id')
    }
  }
}
</script>

