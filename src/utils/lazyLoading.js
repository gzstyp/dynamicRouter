export default (name) => () => import(`@/components/${name}.vue`);//指定组件vue页面名称
