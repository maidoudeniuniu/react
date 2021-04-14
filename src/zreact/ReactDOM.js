/*
 * @Descripttion: 
 * @version: 
 * @Author: aniu
 * @Date: 2021-04-14 15:50:11
 * @LastEditors: aniu
 * @LastEditTime: 2021-04-14 18:57:32
 */
// 全局子任务
let nextUnitOfWork = null;
// work in Progress 工作中的fiber root
let wipRoot = null;
let currentRoot = null

function render(Vnode, content) {
  wipRoot = {
    node: content,
    props: {
      children: [Vnode]
    },
    base: currentRoot
  }
  // const node = createNode(Vnode)
  // //dom root 节点
  // content.appendChild(node)
}

// 分析节点
function createNode(Vnode) {
  const {
    type,
    props
  } = Vnode;
  let node;
  if (typeof type === "function") {
    console.log(Vnode)
    node = type.isReactiveComponent ? createClassFunction(Vnode) : createFunction(Vnode)
    // console.log("type",type)
    // console.log("props",props)
  } else if (type === "TEXT") {
    node = document.createTextNode("")
  } else if (type) {
    // 创建节点
    node = document.createElement(type)
  } else {
    node = document.createDocumentFragment();
    console.log(node)
  }

  updateNode(node, props)
  reconcilerChildren(props.children, node)

  return node
}

function reconcilerChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    // 判断当前值是否是数组还是对象
    const ChildItem = children[i];
    if (Array.isArray(ChildItem)) {
      for (let j = 0; j < ChildItem.length; j++) {
        render(ChildItem[j], node)
      }
    } else {
      render(children[i], node)
    }
  }
}

//更新一下，props 里面的子元素
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== 'children')
    .forEach(k => {
      //判断事件
      if (k.slice(0, 2) === "on") {
        const name = k.slice(2).toLocaleLowerCase()
        node.addEventListener(name, nextVal[k])
      } else {
        node[k] = nextVal[k];
      }
    })
}

// function 函数编译出来
function createFunction(node) {
  const {
    props,
    type
  } = node;
  const Vnode = type(props)
  const VVnode = createNode(Vnode)
  return VVnode
}


function createClassFunction(vnode) {
  const {
    props,
    type
  } = vnode;
  const cmp = new type(props)
  const vvnode = cmp.render();
  const node = createNode(vvnode)
  return node
}


function updateHostComponent(fiber) {
   

}

function performUniOfWork(fiber) {
  // 执行当前子任务
  updateHostComponent(fiber)
  // 返回下一任务
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber;

  while (nextFiber) {
    if (nextFiber.slbling) {
      return nextFiber.slbling
    }
    nextFiber = nextFiber.parent
  }


}

//任务队列
function workLoop(deadline) {
  // 执行子任务
  //返回下一个子任务 

  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    // 
    nextUnitOfWork = performUniOfWork(nextUnitOfWork)
  }

  // 没有子任务
  //提交

}

requestIdleCallback(workLoop)

export default {
  render
}