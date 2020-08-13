// 代码位置：/virtual-dom/index.js
import { create, VirtualDOM} from './src/virtualDOM'
import { render } from './src/render'
import {diff} from './src/diff'
import {walk} from './src/patch'

// 创建虚拟DOM
let vdom = create('div', {'class': 'content'}, [
    create('h3', {}, ['内容']),
    create('ul', { 'style': 'list-style-type: none;border: 1px solid;padding: 20px;'}, [
                create('li', {}, ['选项一']),
                create('li', {}, ['选项二'])
    ])
])

// 将虚拟DOM转化为真实DOM
let realdom = render(vdom);

// 将真实DOM插入body元素中
document.body.appendChild(realdom);

// 创建一个新的虚拟节点
let newNode = create('div', {'class': 'wapper', 'id': 'box'}, [
    create('h4', {}, ['内容']),
    create('ul', { 'style': 'list-style-type: none;border: 1px solid;padding: 20px;'}, [
                create('li', {}, ['内容一'])
    ])
])

// 进行dom-diff
let patches = diff(vdom, newNode)

// 将差异应用到真实的DOM节点上
walk(realdom,{nid: 0},patches)