document.getElementById('input-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const A = parseFloat(document.getElementById('A').value);  // 回归年长度
    const B = parseFloat(document.getElementById('B').value);  // 朔望月长度
    const C = parseInt(document.getElementById('C').value);    // 干支周期
    const target_year = parseInt(document.getElementById('target_year').value); // 所求年份

    // 初始化变量
    let P = 0;
    let best_P = 0;
    let min_error = Infinity;
    const max_iterations = 1000000;

    // 计算目标年份的已知天文数据（这里需要替换为实际数据）
    // 这些应该是已知的目标年份天文数据
    const target_t1 = 0.25; // 示例：冬至时刻偏移量
    const target_t2 = 0.5;  // 示例：朔日时刻偏移量
    const target_t3 = 0.1;  // 示例：干支时刻偏移量

    // 上元积年搜索算法
    for (P = target_year - 10000; P < target_year + 10000; P++) {
        if (P <= 0) continue;

        // 计算各周期的时间差
        const delta_t1 = (P - Math.floor(P / A) * A) / A;
        const delta_t2 = (P - Math.floor(P / B) * B) / B;
        const delta_t3 = (P - Math.floor(P / C) * C) / C;

        // 计算与目标年份天文数据的误差
        const error = Math.abs(delta_t1 - target_t1) +
            Math.abs(delta_t2 - target_t2) +
            Math.abs(delta_t3 - target_t3);

        // 寻找误差最小的P值
        if (error < min_error) {
            min_error = error;
            best_P = P;
        }

        // 如果误差足够小，可以提前退出
        if (error < 0.0001) break;
    }

    // 计算最终结果
    const delta_t1 = (best_P - Math.floor(best_P / A) * A).toFixed(3);
    const delta_t2 = (best_P - Math.floor(best_P / B) * B).toFixed(3);
    const delta_t3 = (best_P - Math.floor(best_P / C) * C).toFixed(3);

    // 显示计算结果
    document.getElementById('shangyuan_years').textContent = best_P;
    document.getElementById('delta_t1').textContent = delta_t1;
    document.getElementById('delta_t2').textContent = delta_t2;
    document.getElementById('delta_t3').textContent = delta_t3;
});