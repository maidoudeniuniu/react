/*
 * @Descripttion: 
 * @version: 
 * @Author: aniu
 * @Date: 2021-04-14 10:04:34
 * @LastEditors: aniu
 * @LastEditTime: 2021-04-14 15:28:53
 */

function render (vnode, container) {
  // console.log(vnode)
  // console.log(container)
  // 分解虚拟节点
  const node = createNode(vnode)
  console.log(node)
  //把node更新到container
  container.appendChild(node);
}

function createNode (vnode) {  
  let {type,props} = vnode;
  let node;  
  if(type === "TEXT"){
    //type 是否text类型
    node = document.createTextNode("");
  }else if (typeof type === 'function') {
    node = type.isReactComponent
    ? // node = type.prototype.isReactComponent
      updateClassComponent(vnode)
    : updateFunctionComponent(vnode);
  }else if (type){
    node = document.createElement(type);
  }else {
    node = document.createDocumentFragment();
  }
  updateNode(node, props);
  //判断一下是否还有子节点
  reconcilerChildren(props.children, node);
  return node;
}


function reconcilerChildren (children,node) {
  for (let i = 0; i < children.length; i++) {
    // console.log("children", children[i]); //sy-log
    let child = children[i];
    // 遍历 创建元素
    // 判读children[i]类型
    if (Array.isArray(child)) {
      for (let j = 0; j < child.length; j++) {
        render(child[j], node);
      }
    } else {
      render(children[i], node);
    }
  }
}

// 更新节点上属性，如className、nodeValue等
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      
      if (k.slice(0, 2) === "on") {
        // 以on开头，就认为是一个事件，源码处理复杂一些，
        // 源码里面有一张事件表对比
        let eventName = k.slice(2).toLocaleLowerCase();
        console.log(nextVal[k])
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
      console.log(node)
    });
}

// function组件，返回node
function updateFunctionComponent(vnode) {
  console.log("vnode",vnode)
  const {type, props} = vnode;
  const vvnode = type(props);
  const node = createNode(vvnode);
  return node;
}

function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const cmp = new type(props); //实例化
  const vvnode = cmp.render();
  const node = createNode(vvnode);
  return node;
}

export default{
  render
}