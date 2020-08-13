import {VirtualDOM} from './virtualDOM'

/**
 * @name: diffProps
 * @description: 比较两个属性之间的差异 并且返回差异对象
 * @param {Object} oldNode  旧的虚拟DOM节点
 * @param {Object} newNode 新的虚拟DOM节点
 * @return {Object} 返回差异对象
 */
function diffProps(oldNode, newNode){
    const oldProps = oldNode.props;
    const newProps = newNode.props;
    let propPatches = {};
    for (const key in newProps) {
        if (!oldProps.hasOwnProperty(key) || oldProps[key] != newProps[key]) {
            propPatches[key] = newProps[key];          
        }
    }
    return propPatches;
}

/**
 * @name: diffText
 * @description: 比较文本节点的差异 如果有差异，返回新的文本节点内容；否则返回[]
 * @param {Object} oldNode  旧的虚拟DOM节点
 * @param {Object} newNode 新的虚拟DOM节点
 * @return {String/Array} 有差异，返回新的文本节点内容；否则返回[]
 */
function diffText(oldText, newText){
    if(oldText == newText){
        return true;
    }else{
        return false;
    }
}

/**
 * @name: traversal
 * @description: 深度优先遍历虚拟DOM,计算出patches
 * @param {type} 参数
 * @return {type} 返回值
 */
function traversal(oldNode, newNode, o, patches){
    let currentPatches = [];
    if(newNode == undefined){
        //节点被删除
        currentPatches.push({'type': 'remove'});
        patches[o.nid] = currentPatches;
    }else if(oldNode instanceof VirtualDOM && newNode instanceof VirtualDOM){
        // 如果是VirtualDOM类型
        if(oldNode.type != newNode.type){
            // 节点发生替换
            // 节点发生替换时 content字段的值为替换后的整个虚拟DOM节点，例如{type: 'h4', {}, children: ['内容']}
            // 这样在后面patch差异时使用就可以使用render函数将newNode转化为真实的dom节点，然后直接更新的文档中
            currentPatches.push({'type': 'replace', 'content': newNode})
            patches[o.nid] = currentPatches;
        }else{
            let resultDiff = diffProps(oldNode, newNode);
            // 属性存在差异
            if(Object.keys(resultDiff).length != 0){
                currentPatches.push({'type': 'props', 'props': resultDiff})
                patches[o.nid] = currentPatches;
            }
        }
        oldNode.children.forEach((element,index) => {
            o.nid++;
            traversal(element, newNode.children[index], o, patches);
        });
    }else{
        // 文本类型
        if(!diffText(oldNode, newNode)){
            currentPatches.push({'type': 'text', 'content': newNode});
            patches[o.nid] = currentPatches;
        }
    }
}
function diff(oldNode, newNode){
    let patches = {}; //旧节点和新节点之间的差异结果
    let o = {nid: 0};    // 节点的编号
    // 递归遍历oldNode、newNode 将差异结果保存到patches中
    traversal(oldNode, newNode, o, patches)
    return patches;
}

export {diff};