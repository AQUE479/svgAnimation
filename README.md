# svgAnimation

该库提供了一个接口使传入的数据配置转换成svg图像对象。我们可以使用这些svg图像对象在配置后直接在网页上渲染图像并让每次添加的图像按路径走动，比每次都要设置属性要快得多，并且避免了代码冗余性的问题。另一方面，支持库具有一些强大的功能，如调整线条颜色、粗细、方向、速度等。

# 关于 
svgAnimation是一个支持库，用于在网页上显示svg图像的动画
- 能实时显示svg图像的路径动画
- 可以更好的表达和实现
- 可通过类型、方向、长度、起始点画出图形，进而进行样式的设置，比如线条颜色、粗细、速度等
- 其中传入的属性都是选填的，若什么都没有传的话就是按照全局的配置再画一次图形的动画

# 使用

## 在页面中创建容器div，其id为‘container’（可以自己定，但是之后的js文件中的id要一致）
```
<div id="container">
</div>
```

## 导入graph.js文件
```
import graph from "./js/graphs.js"
```

## 在init函数中传入配置参数（参数可有可无）
```
let mygraph = graph.init()
```
或
```
mygraph.init({
    svgid:"123",
    type:"path",
    direction: "DLDLDRR",
    style: {
        color: "red"
        }
    })
```

## 使用showGraph函数显示图形和动画
```
mygraph.showGraph()
```
# 代码

## svg对象及初始全局配置
```
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
```

## 创建实例init函数
```
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
        /** 若为第一次初始化，先创建新的<svg> */
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
    /** 自动生成id */
    let amount = document.getElementsByTagName(op.type).length
    let idString = op.type + amount + Math.floor(Math.random() * 100)
    op.id = idString
    element.setAttribute('id', op.id)
    svg.appendChild(element)
    return this
```

## 设置配置项以及数据setOpion函数
```
function setOption(option) {
/** 对传入的数据进行遍历，与svg对象属性名对应的就更新其配置，同时解决了不是所有的属性都传入的情况 */
    for (let item in option) {
    /** 如果对象的该属性也是一个对象时再对其中的子属性进行遍历 */
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
```
## 展示图形showGraph函数
```
function showGraph() {
    let op = this.option
    let graph = document.getElementById(op.id);
    /** 起点坐标数值化 */
    let startPointArr = op.startPoint.split(',')
    let x = parseInt(startPointArr[0])
    let y = parseInt(startPointArr[1])
    /** 参数数值化 */
    op.length = parseInt(op.length);
    /** 图形路径长度 */
    let length = 0
    /** 直线路径类型 */
    if (op.type == "path") {
        let directionArr = op.direction.split("");
        let directionString = "";
        /** 在已有路径上添加路径 */
        if (graph.getAttribute('d') !== null) {
            directionString += graph.getAttribute('d')
        }
        for (let i in directionArr) {
            /** 起点 */
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
    /** 圆形类型 */
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
```
