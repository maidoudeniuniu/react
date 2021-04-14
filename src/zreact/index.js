/*
 * @Descripttion: 
 * @version: 
 * @Author: aniu
 * @Date: 2021-04-14 15:50:01
 * @LastEditors: aniu
 * @LastEditTime: 2021-04-14 17:14:41
 */
// type 是类型， props 参数， children 是子类型
function createElement (type,props,...children) { 
  if(props){
    delete props.__self;
    delete props.__source
  }
  return {
    type:type,
    props:{
      ...props,
      children:children.map(child=>typeof child === 'object'?child:createNode(child))
    }
  }
}
// vnode 是虚拟dom 节点
function createNode (vnode) {
    return {
      props:{
        children:[],
        nodeValue:vnode
      },
      type:"TEXT",
      
    }
}

export default { 
  createElement
}