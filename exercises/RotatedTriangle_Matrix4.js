// RaotatedTriangle_Matrix.js
// 顶点着色器
var VSHADER_SOURCE =
    "attribute vec4 a_Position;\n" +
    "uniform mat4 u_xformMatrix;\n" +
    "void main() {\n" +
    "  gl_Position = u_xformMatrix * a_Position;\n" + // 设置坐标
    "}\n";

// 片元着色器
var FSHADER_SOURCE =
    "void main() {\n" +
    "  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" + // 设置颜色
    "}\n";

// 设置旋转角度
var ANGLE = 90.0;

function main() {
    // 获取<canvas>元素
    var canvas = document.getElementById("webgl");

    //获取WebGL绘图上下文
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initialize shaders.");
        return;
    }

    // 设置顶点位置
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log("Failed to set the positions of the vertices");
        return;
    }

    // 创建旋转矩阵
    var radian = Math.PI * ANGLE / 180.0; // 角度转为弧度制
    var cosB = Math.cos(radian), sinB = Math.sin(radian);

    // 注意WebGL中的矩阵是列主序的
    var xformMatrix = new Matrix4();
    xformMatrix.setRotate(ANGLE, 0, 0, 1);

    // 将旋转矩阵传输给顶点着色器
    var u_xformMatrix = gl.getUniformLocation(gl.program, "u_xformMatrix");
    if (!u_xformMatrix) {
        console.log("Failed to get the storage location of u_xformMatrix");
        return;
    }
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    // 设置背景色并清空<canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);
    var n = 3; // 顶点的个数

    // 创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }
    // 将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // 连接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    return n;
}