// 黄道与赤道的交角（弧度制）
const epsilon = 23.439281 * (Math.PI / 180);

// 角度转弧度
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// 弧度转角度
function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}

// 计算赤道坐标
function calculateEquatorialCoordinates(lambda, beta) {
    // 将输入的黄经和黄纬转换为弧度
    lambda = degreesToRadians(lambda);
    beta = degreesToRadians(beta);

    // 计算赤纬
    const sinDelta = Math.sin(epsilon) * Math.sin(lambda) * Math.cos(beta) + Math.cos(epsilon) * Math.sin(beta);
    const delta = Math.asin(sinDelta);

    // 计算赤经
    const cosAlphaCosDelta = Math.cos(lambda) * Math.cos(beta);
    const sinAlphaCosDelta = Math.cos(epsilon) * Math.sin(lambda) * Math.cos(beta) - Math.sin(epsilon) * Math.sin(beta);
    const alpha = Math.atan2(sinAlphaCosDelta, cosAlphaCosDelta);

    // 将结果转换为角度
    const alphaDegrees = radiansToDegrees(alpha);
    const deltaDegrees = radiansToDegrees(delta);

    return { alpha: alphaDegrees, delta: deltaDegrees };
}

// 处理表单提交
document.getElementById('hjinputForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const lambda = parseFloat(document.getElementById('lambda').value);
    const beta = parseFloat(document.getElementById('beta').value);

    const result = calculateEquatorialCoordinates(lambda, beta);

    document.getElementById('alphaResult').textContent = `赤经：${result.alpha.toFixed(2)} 度`;
    document.getElementById('deltaResult').textContent = `赤纬：${result.delta.toFixed(2)} 度`;
});