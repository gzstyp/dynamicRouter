import lazyLoading from './lazyLoading'
export default (routers,data) => {
  //这里之所以要重新遍历一下，是因为，通常我们动态路由的时候，是获取服务端数据，这个component属性是一个字符串，或者可能连字段名都是其他的key
  //所以这里要做一些转换
  generaMenu(routers,data)
}
function generaMenu(routers,data){
  data.forEach((item)=>{
    let menu = Object.assign({},item);//用于将所有可枚举属性的值从一个或多个源对象[item]复制到目标对象。它将返回目标对象 menu
    menu.component = lazyLoading(menu.component);
    if(!item.leaf){//如果不是叶子节点,说明还有子页面!!!
      menu.children = [];
      generaMenu(menu.children,item.children);
    }
    routers.push(menu);
  })
}
