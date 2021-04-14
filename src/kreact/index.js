/*
 * @Descripttion: 
 * @version: 
 * @Author: aniu
 * @Date: 2021-04-14 10:04:34
 * @LastEditors: aniu
 * @LastEditTime: 2021-04-14 14:46:45
 */

// 接收type, props, children， 返回一个vnode
function createElement (type,props,...children) {  
  console.log(children)
  //删除一些没有用的属性，便以观察
  if(props){
    delete props.__self
    delete props.__source
  }  
  return {
    type: type,
    props: {
      ...props,
      //!这里的处理与源码稍有不同，源里的话，只有一个元素，children是对象，多于一个的时候，是数组
      children: children.map(child =>
        typeof child === "object" ? child : createTextNode(child)
      )
    }
  };  
}

function createTextNode(text) {
  return {
    type: "TEXT",
    props: {
      children: [],
      nodeValue: text
    }
  };
}
export default{
  createElement
}