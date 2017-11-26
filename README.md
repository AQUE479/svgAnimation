# svgAnimation

该库提供了一个接口使传入的数据配置转换成svg图像对象。我们可以使用这些svg图像对象在配置后直接在网页上渲染图像并让每次添加的图像按路径走动，比每次都要设置属性要快得多，并且避免了代码冗余性的问题。另一方面，支持库具有一些强大的功能，如调整线条颜色、粗细、方向、速度等。

# 关于 
svgAnimation是一个支持库，用于在网页上显示svg图像的动画
- 能实时显示svg图像的路径动画
- 可以更好的表达和实现
- 可通过类型、方向、长度、起始点画出图形，进而进行样式的设置，比如线条颜色、粗细、速度等
- 其中传入的属性都是选填的，若什么都没有传的话就是按照全局的配置再画一次图形的动画


|              | speed  | memory | compatible | scaleType | expression | multi-colors | shrink |
|:------------:|:------:|:------:|:----------:|:---------:|:----------:|:------------:|:------:|
| SVG-Android  | √      | √      | √          | √         | √          | √            | √      |
| Vector       | ×      | √      | x          | √         | √          | √            | ×      |
| Png          | √      | ×      | √          | √         | ×          | √            | ×      |
| Iconfont     | ×      | √      | √          | ×         | √          | ×            | √      |


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
