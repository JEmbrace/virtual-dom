import {render} from './render'
/**
 * @name: walk
 * @description: 遍历patches 将差异应用到真实的DOM节点上
 * @param {HTMLElement} 真实的DOM节点
 * @param {Object} 虚拟节点的编号 编号从0开始，从patches中获取编号为o.nid的虚拟DOM的差异
 * @param {Object}  使用diff算法比较出来新的虚拟节点和旧的虚拟节点的差异
 */
function walk(realdom, o, patchs){
    // 获取当前节点的差异
    const currentPatch = patchs[o.nid];
    // 对当前节点进行DOM操作
    if (currentPatch) {
        applyPatch(realdom, currentPatch)
    }
    for(let i=0; i < realdom.childNodes.length; i++){
        let childNode = realdom.childNodes[i];
        o.nid++;
        walk(childNode, o, patchs); 
    }
}

/**
 * @name: applyPatch
 * @description: 应用差异到真实节点上
 * @param {HTMLElement} 需要更新的真实DOM节点
 * @param {Array}       节点需要更新的内容
 */
function applyPatch(currentRealNode, currentPatch){
    currentPatch.forEach(patch => {
        const type = patch['type'];
        switch(type){
            case 'props':
                const props = patch['props'];
                for(const propKey in props){
                    currentRealNode.setAttribute(propKey, props[propKey])
                }
                break;
            case 'replace':
                let content = patch['content'];
                let newEle = null;
                if(typeof(content) == "string"){
                    newEle = document.createTextNode(content);
                }else{
                    // 调用render将替换的节点渲染成真实的dom
                    newEle = render(content);
                }
                currentRealNode.parentNode.replaceChild(newEle, currentRealNode);
                break;
            case 'text':
                currentRealNode.textContent = patch['content']
                break;
            case 'remove':
                currentRealNode.parentNode.removeChild(currentRealNode)
        }
    });
}

export {walk};