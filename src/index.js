/*
 * @Descripttion: 
 * @version: 
 * @Author: aniu
 * @Date: 2021-04-14 10:01:50
 * @LastEditors: aniu
 * @LastEditTime: 2021-04-14 18:33:10
 */
// import React from "./kreact/";
// import ReactDOM from "./kreact/ReactDOM";
// import Component from "./kreact/Component";

import React from "./zreact/";
import ReactDOM from "./zreact/ReactDOM";
import Component from "./zreact/Component";

import "./index.css";

function FunctionComponent({name}) {
  return (
    <div className="border function">
      hello, {name}
      <button onClick={() => console.log("omg")}>click</button>
    </div>
  );
}

class ClassComponent extends Component {   
  render() {
    const {name} = this.props;    
    return <div className="border function" >hello, {name} {this.state.count}</div>;
  }
}

const jsx = (
  <div className="border">    
    <p>这是一个文本</p>
    <a href="https://kaikeba.com/">11222222</a>
    <div className="border">
      <h5>hello</h5>
    </div>
   
   <FunctionComponent name="function" />
   <ClassComponent name="class" />
   <>
      <h5>文本1</h5>
      <h5>文本2</h5>
   </>

     {[1, 2, 3].map(item => {
      return (
        <div className="border" key={item}>
          <p>{item}</p>
          <p>{item}</p>
        </div>
      );
    })}
  </div>
);

// element， container
// vnode->node , 把node渲染更新到container
ReactDOM.render(jsx, document.getElementById("root"));