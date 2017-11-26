let option = {
    /** SVGid */
    svgid: 'svg',
    /** 图形id */
    id: '',
    /** 图形类型 */
    type: 'path',
    /** 图形起点 */
    startPoint: '200,50',
    /** 长度（type为circle时为半径） */
    length: 30,
    /** 路径方向 */
    direction: 'DRR',
    /** 图形样式 */
    style: {
        /** 线条颜色 */
        color: 'grey',
        /** 填充样式 */
        fill: 'none',
        /** 线条粗细 */
        strokeWidth: 2,
        /** 动画速度 */
        speed: 2
    }
}
// 创建实例
function init(option) {
    let op = this.option
    let container = document.getElementById('container')
    let svg
    /** 创建元素 */
    /** 有配置参数时 */
    if (option) {
        /** 有SVGid但是和原来的不同，创建新的<svg> */
        if (option.svgid && option.svgid !== op.svgid) {
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            svg.setAttribute('id', option.svgid)
            container.appendChild(svg)
        }
        /** 有SVGid但和原来的相同或没有SVGid */
        else {
            svg = document.getElementById(op.svgid)
        }
    }
    /** 没有配置参数值 */
    else {
        // 若为第一次初始化，先创建新的<svg>
        if (document.getElementsByTagName('svg').length == 0) {
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            svg.setAttribute('id', op.svgid)
            container.appendChild(svg)
        } else {
            svg = document.getElementById(op.svgid)
        }
    }
    this.setOption(option)
    this.showOption(op)
    let element = document.createElementNS('http://www.w3.org/2000/svg', op.type)
    // 自动生成id
    let amount = document.getElementsByTagName(op.type).length
    let idString = op.type + amount + Math.floor(Math.random() * 100)
    op.id = idString
    element.setAttribute('id', op.id)
    svg.appendChild(element)
    return this
}
// 设置配置项以及数据
function setOption(option) {
    for (let item in option) {
        if (typeof (option[item]) == "object") {
            this.setOption(option[item])
        } else {
            for (let ops in this.option) {
                if (typeof (this.option[ops]) == "object") {
                    for (let op in this.option[ops]) {
                        if (item == op) {
                            this.option[ops][op] = option[item]
                        }
                    }
                } else {
                    if (item == ops) {
                        this.option[ops] = option[item]
                    }
                }
            }
        }
    }
}
// 展示属性
function showOption(option) {
    let tip = document.getElementById('tip')
    if (document.getElementById('table')) {
        let table = document.getElementById('table')
        tip.removeChild(table)
    }
    let table = document.createElement('table')
    table.setAttribute('id', 'table')
    // table.setAttribute('displ')
    // table.setAttribute('border','1px dashed grey')
    let tableCode = '<tr><th>属性</th><th>参数</th></tr>'
    tableCode += this.getOption(option)
    table.innerHTML = tableCode
    tip.appendChild(table)
}
function getOption(option) {
    let code = ''
    for (let item in option) {
        if (typeof option[item] !== 'object') {
            code += '<tr><td>' + item + '</td>' + '<td>' + option[item] + '</td></tr>'
        }
        else {
            code += this.getOption(option[item])
        }
    }
    return code
}
// 展示图形
function showGraph() {
    let op = this.option
    // console.log(op)
    let graph = document.getElementById(op.id);
    // 起点坐标数值化
    let startPointArr = op.startPoint.split(',')
    let x = parseInt(startPointArr[0])
    let y = parseInt(startPointArr[1])
    // 参数数值化
    op.length = parseInt(op.length);
    // 图形路径长度
    let length = 0
    // 直线路径类型
    if (op.type == "path") {
        let directionArr = op.direction.split("");
        let directionString = "";
        // 在已有路径上添加路径
        if (graph.getAttribute('d') !== null) {
            directionString += graph.getAttribute('d')
        }
        for (let i in directionArr) {
            // 起点
            if (directionString.length == 0) {
                directionString += "M" + x + " " + y;
            }
            switch (directionArr[i]) {
                case "U":
                    y -= op.length;
                    break;
                case "D":
                    y += op.length;
                    break;
                case "L":
                    x -= op.length;
                    break;
                case "R":
                    x += op.length;
                    break;
                default:
                    break;
            }
            directionString += " L" + x + " " + y;
        }
        graph.setAttribute("d", directionString);
        length = directionArr.length * op.length
        op.startPoint = x.toString() + "," + y.toString()
    }
    // 圆形类型
    if (op.type == "circle") {
        graph.setAttribute("cx", x - op.length);
        graph.setAttribute("cy", y);
        graph.setAttribute("r", op.length);
        length = 2 * 3.14 * op.length
    }
    graph.setAttribute('stroke', op.style.color)
    graph.setAttribute('stoke-width', op.style.strokeWidth)
    graph.setAttribute('fill', op.style.fill)
    graph.style.trsansition = graph.style.webkitTransform = "none";
    graph.style.strokeDasharray = length + " " + length;
    graph.style.strokeDashoffset = length;
    graph.getBoundingClientRect();
    graph.style.transition = graph.style.webkitTransition =
        `stroke-dashoffset ${op.style.speed}s ease-in-out`;
    graph.style.strokeDashoffset = "0";
}
// 鼠标单击事件
function on(target) {
    
}
function remove(event) {
    let element = event.target
    element.parentNode.removeChild(element)
}
// 销毁
function dispose() {

}
export default {
    option,
    init,
    setOption,
    getOption,
    showOption,
    showGraph,
    on,
    remove
}