<template>
  <div>
    <h1>我是Home页！！！</h1>
    <p @click="$store.commit('add')">{{ $store.state.counter }}</p>
    <p @click="$store.dispatch('add')">async: {{ $store.state.counter }}</p>
    <p>doubleCounter: {{ $store.getters.doubleCounter }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    
  }
</script>

<style lang="scss" scoped>

</style>