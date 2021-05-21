/** 需求分析
 * 一、spa页面不能刷新
 *    1.hash
 *    2.history api
 * 
 * 二、根据url变化显示对应内容
 *    1.router-view 占位容器
 *    2.数据响应式：current变量持有url地址，一旦变化，动态重新执行render
 */

/** 任务
 * 一、实现VueRouter类
 *    1.处理路由选项
 *    2.监控url变化，hashchange
 *    3.响应这个变化
 * 
 * 二、实现install方法
 *    1. $router注册
 *    2. 注册两个全局组件 router-view router-link
 */
 import tView from './trouter-view'
 let Vue;

//  1。实现插件
 class VueRouter {
  constructor(options) {
    console.log(options)
    this.$options = options // 保存选项

    /** 数据响应式--current必须是响应式的，这样他变化，使用它的组件就会重新render
     * 那么，如何造一个响应式的数据呢？
     *  方法1：借鸡生蛋--new Vue({data: {current: '/'}})
     *  方法2：Vue.util.defineReactive(obj, 'current', '/')
     * Vue.set(this) 不能用这个，$set只对响应式对象有用，用于设置对象中的属性
     * Vue.set(obj, 'key', 'val')
     */
    // Vue.util.defineReactive(this, 'current', window.location.hash.slice(1) || '/') // 非嵌套路由，将current在此设置成响应式；嵌套路由则不需要在此操作。详看代码
    this.current = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'matched', []) // 定义响应式的matched数组,挂载到Vue实例上
    // match方法可以递归的遍历路由表，获取匹配关系数组
    this.match()
    // 监听url变化
    window.addEventListener("hashchange", () => {
      this.current = window.location.hash.slice(1);
      this.matched = []
      this.match()
    })
    // window.addEventListener("hashchange", this.onHashChange.bind(this))
    // window.addEventListener("load", this.onHashChange.bind(this))

  }
  // onHashChange() {
  //   this.current = window.location.hash.slice(1);
  //   this.matched = []
  //   this.match()
  // }
  match(routes) {
    routes = routes || this.$options.routes 
    // 递归遍历
    for(const route of routes) {
      if(route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      //  /about/info
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        if(route.children) {
          this.match(route.children)
        }
        return
      }
    }
  }
}
 
//  插件要实现一个install方法
VueRouter.install = function(_Vue) {
  Vue = _Vue
  // 注册router实例：通过全局混入 Vue.mixin({beforeCreate})
  // 注册router实例目的：使用this.$router
  Vue.mixin({
    beforeCreate() {
      // 仅在根组件创建时执行一次
      if(this.$options.router) Vue.prototype.$router = this.$options.router;
      console.log(this.$router)
    }
  });

  // 注册router-view和router-link
  Vue.component('router-view', tView)
  // Vue.component('router-view', {
  //   render(h) {
  //     let component = null
  //     const { current, options } = this.$router
  //     const route = options.routes.find(item => item.path === current)
  //     if(route) component = route.component;
  //     console.log(current, options)
  //     return h(component)
  //   }
  // });
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      }
    },
    render(h) {
      // <router-link to="/about">XXXX</router-link>
      // <a href="#/about">xxxx</a>
    // return <a href={"#" + this.to}>{this.$slots.default}</a>
    return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
    },
  });
};

export default VueRouter;

