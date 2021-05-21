// 实现插件own30
// 实现store
let Vue;
class Store {
  constructor(options) {
    this._mutations = options.mutations;
    this._actions = options.actions;
    this._wrappedGetters = options.getters;
    // 定义computed选项
    const computed = {}
    this.getters = {}
    // {doubleCounter(state){}}
    const store = this
    Object.keys(this._wrappedGetters).forEach(key => { // 此时的key为定义好的doubleCounter
      // 获取用户定义的getter
      const fn = store._wrappedGetters[key]
      // 转换为computed可以使用的无参数形式
      computed[key] = function() {
        return fn(store.state)
      }
      // 为getters定义只读属性
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key]
      })
    })
    // 响应式处理state
    // this.state = new Vue({
    //   data: options.state
    // })
    // setInterval(() => {
    //   this.state.counter++;
    // }, 1000);
    this._vm = new Vue({
      data: {
        // 添加 $$,Vue就不会代理
        $$state: options.state
      },
      computed
    })
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  get state() {
    return this._vm._data.$$state
  }
  set state(v) {
    console.error('请使用replaceState重置状态！')
  }

  // 修改状态，commit('add', payload)
  commit(type, payload) {
    // 1. 根据type获取mutation
    const mutation = this._mutations[type]
    if(!mutation) {
      console.error('mutation不存在');
    }
    mutation(this.state, payload)
  }
  // dispatch('add', payload)
  dispatch(type, payload) {
    const action = this._actions[type]
    if(!action) {
      console.error('action不存在');
      return
    }
    action(this, payload)
  }

}

function install(_Vue) {
  Vue = _Vue;
  // 注册$store
  Vue.mixin({
    beforeCreate() {
      if(this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// 现在导出的就是Vuex
export default { Store, install }