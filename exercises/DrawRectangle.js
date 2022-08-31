// DrawRectangle.js
function main() {
    // 获取<canvas>画布
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    // 获取<canvas>画布的绘图上下文
    var ctx = canvas.getContext('2d');

    // 绘制蓝色矩形
    ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // 设置填充颜色为蓝色，透明度为0.51
    ctx.fillRect(120, 10, 150, 150); // 绘制矩形
}
 