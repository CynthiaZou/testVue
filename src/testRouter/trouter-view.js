
/**
 * 实现嵌套路由
 */
export default {
  render(h) {
    // 1. 标记当前 router-view的深度
    this.$vnode.data.routerView = true;
    let depth = 0
    let parent = this.$parent
    while(parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data
      if(vnodeData) {
        if(vnodeData.routerView) {
          // 说明当前parent是一个router-view
          depth++
        }
      }
      parent = parent.$parent
    }
    
    // 获取path对应的component
    let component = null;
    console.log('父组件注册的router实例', this.$router)
    // ？ 2.路由匹配时，获取代表深度层级的matched数组
    const route = this.$router.matched[depth]
    if(route) {
      component =route.component
    }
    return h(component)
  }
}