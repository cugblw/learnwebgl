// MultiAttributeColor.js
// 顶点着色器
var VSHADER_SOURCE =
"attribute vec4 a_Position;\n" +
"attribute vec4 a_Color;\n" +
"varying vec4 v_Color;\n" + // varying变量
"void main() {\n" +
"  gl_Position = a_Position;\n" + // 设置坐标
"  gl_PointSize = 10.0;\n" +
"  v_Color = a_Color;\n" + // 将数据传给片元着色器
"}\n";

// 片元着色器
var FSHADER_SOURCE =
  'precision mediump float;\n' + // Precision qualifier (See Chapter 6)
  'varying vec4 v_Color;\n' +    // Receive the data from the vertex shader
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

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

  //设置顶点位置
  var n = initVertexBuffers(gl);
  if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
  }

  // 设置<canvas>的背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空<canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 绘制三个点
//   gl.drawArrays(gl.POINTS, 0, n); // n is 3
  gl.drawArrays(gl.TRIANGLES, 0, n); // n is 3
}

function initVertexBuffers(gl) { 
    var verticesColors = new Float32Array([
      // 顶点坐标和颜色
      0.0, 0.5, 1.0, 0.0, 0.0, // 第一个点
      -0.5, -0.5, 0.0, 1.0, 0.0, // 第二个点
      0.5, -0.5, 0.0, 0.0, 1.0 // 第三个点
  ]);
  var n = 3; // 点的个数

  // 创建缓冲区对象
  var vertexColorBuffer = gl.createBuffer();
    if (!vertexColorBuffer) {
        console.log('Failed to create the buffer object');
        return false;
    }

  // 将缓冲区绑定到目标,写入数据
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var FSIZE = verticesColors.BYTES_PER_ELEMENT;

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // 将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
  gl.enableVertexAttribArray(a_Position);

  // 获取a_Color的存储位置，分配缓冲区并开启
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if (a_Color < 0) {
      console.log('Failed to get the storage location of a_Color');
      return -1;
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
  gl.enableVertexAttribArray(a_Color);

  return n;
}
