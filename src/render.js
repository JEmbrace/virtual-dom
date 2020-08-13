// 代码位置：/virtual-dom/src/render.js

import { VirtualDOM } from './virtualDOM';

/*
*   将虚拟节点转化为真实的DOM节点并返回
*   @method render
*   @params {VirtualDOM}  vdom    虚拟DOM对象
*   @return {HMTLElement} element 返回真实的DOM节点 
*/
function render(vdom){
    let type = vdom.type;
    let props = vdom.props;
    let children = vdom.children;
    // 根据type属性创建节点
    let element = document.createElement(vdom.type);

    // 设置属性
    setProps(element, props);

    // 设置子节点
    children.forEach(child => {
        let childEle = null;
        // 子节点是虚拟VirtualDOM的实例 递归创建节点、设置属性
        if(child instanceof VirtualDOM){
            childEle = render(child);
        }else{
            // 子节点是文本
            childEle = document.createTextNode(child); 
        }
        // 添加子节点到父节点中
        element.appendChild(childEle);
    });
    return element;
}

/*  
*   为DOM节点设置属性
*   @method setProps
*   @params {HTMLElement} element  dom元素
*   @params {Object}      props    元素的属性
*/
function setProps(element, props){
    for (let key in props) {
        element.setAttribute(key,props[key]);
    }
}

export { render };

