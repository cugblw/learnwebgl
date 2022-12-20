// MultiAttributeSize_Interleaved.js
// 顶点着色器
var VSHADER_SOURCE =
"attribute vec4 a_Position;\n" +
"attribute float a_PointSize;\n" +
"void main() {\n" +
"  gl_Position = a_Position;\n" + // 设置坐标
"  gl_PointSize = a_PointSize;\n" +
"}\n";

// 片元着色器
var FSHADER_SOURCE =
'void main() {\n' +
'  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
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
  gl.drawArrays(gl.POINTS, 0, n); // n is 3
}

function initVertexBuffers(gl) { 
  var verticesSizes = new Float32Array([
      0.0, 0.5, 10.0, // 第一个点
      -0.5, -0.5, 20.0, // 第二个点
      0.5, -0.5,30.0 // 第三个点
  ]);
  var n = 3; // 点的个数

  var sizes = new Float32Array([
      10.0, 20.0, 30.0 // 点的尺寸
  ]);

  // 创建缓冲区对象
  var vertexSizeBuffer = gl.createBuffer();
//   var sizeBuffer = gl.createBuffer();
    if (!vertexSizeBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

  // 将缓冲区绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeBuffer);
  // 向缓冲区对象中写入数据
  gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);
  
  var FSIZE = verticesSizes.BYTES_PER_ELEMENT;

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // 将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*3, 0);

  // 连接a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position);


  
  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  if (a_PointSize < 0) {
      console.log('Failed to get the storage location of a_PointSize');
      return;
  }
  gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE*3, FSIZE*2);
  gl.enableVertexAttribArray(a_PointSize);

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;
}
