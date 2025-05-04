(function () {
    // 《周髀算经》记载的二十四节气影长（单位：寸）
    const shadowLengths = [
        135, 125, 115.1, 115.2, 95.3, 85.4,
        75.5, 65.5, 55.6, 45.7, 35.8, 25.9,
        16, 25.9, 35.8, 45.7, 55.6, 65.5,
        75.5, 85.4, 95.3, 105.2, 115.1, 125
    ];

    // 二十四节气名称
    const solarTerms = [
        "冬至", "小寒", "大寒", "立春", "雨水", "惊蛰",
        "春分", "清明", "谷雨", "立夏", "小满", "芒种",
        "夏至", "小暑", "大暑", "立秋", "处暑", "白露",
        "秋分", "寒露", "霜降", "立冬", "小雪", "大雪"
    ];

    // 计算从冬至开始到指定日期的天数
    function daysSinceWinterSolstice(year, month, day) {
        const winterSolsticeDate = new Date(year, 11, 21);
        const targetDate = new Date(year, month - 1, day);
        const timeDiff = targetDate - winterSolsticeDate;
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    }

    // 根据影长计算节气
    function calculateSolarTerm(shadowLength) {
        let minDiff = Infinity;
        let closestIndex = 0;
        for (let i = 0; i < shadowLengths.length; i++) {
            const diff = Math.abs(shadowLength - shadowLengths[i]);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        }
        return solarTerms[closestIndex];
    }

    // 处理表单提交事件
    document.getElementById('input-form-2').addEventListener('submit', function (e) {
        e.preventDefault();
        const year = parseInt(document.getElementById('year').value);
        const month = parseInt(document.getElementById('month').value);
        const day = parseInt(document.getElementById('day').value);
        const gnomonHeight = parseFloat(document.getElementById('gnomon-height').value);

        // 计算从冬至开始的天数
        const days = daysSinceWinterSolstice(year, month, day);

        // 简单线性插值计算理论影长
        const termInterval = 365.25 / 24;
        const termIndex = Math.floor(days / termInterval);
        const nextTermIndex = (termIndex + 1) % 24;
        const ratio = (days % termInterval) / termInterval;
        const theoreticalShadowLength = shadowLengths[termIndex] + ratio * (shadowLengths[nextTermIndex] - shadowLengths[termIndex]);

        // 根据圭表高度调整影长
        const actualShadowLength = theoreticalShadowLength * (gnomonHeight / 10); // 假设原记载圭表高度为 10 寸

        // 计算节气
        const solarTerm = calculateSolarTerm(actualShadowLength);

        // 显示结果
        const resultElement = document.getElementById('result');
        resultElement.textContent = `在 ${year}-${month}-${day}，圭表高度为 ${gnomonHeight} 厘米时，对应的节气是 ${solarTerm}。`;
    });
})();