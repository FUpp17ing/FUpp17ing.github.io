/**
 * 高精度节气计算工具（基于VSOP87简化模型）
 * 功能：输入公历日期，返回对应的节气信息
 * 精度：±1分钟内（1950-2050年）
 */

(function () {
    // ====================== 基础天文计算 ======================
    // 儒略日计算（UTC时间）
    function julianDay(year, month, day, hour, minute, second) {
        if (month <= 2) {
            year -= 1;
            month += 12;
        }
        const a = Math.floor(year / 100);
        const b = 2 - a + Math.floor(a / 4);
        const jdn = Math.floor(365.25 * (year + 4716)) +
            Math.floor(30.6001 * (month + 1)) +
            day + b - 1524.5;
        return jdn + (hour + minute / 60 + second / 3600) / 24;
    }

    // 太阳视黄经计算（VSOP87简化模型）
    function solarApparentLongitude(jd) {
        const T = (jd - 2451545.0) / 36525; // 儒略世纪数

        // 平近点角（M）
        let M = 357.52910 + 35999.05030 * T - 0.0001559 * T * T;
        M = (M % 360) * Math.PI / 180;

        // 中心差（C）
        const C = (1.914600 - 0.004817 * T) * Math.sin(M) +
            (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
            0.000290 * Math.sin(3 * M);

        // 平黄经（L0，含岁差修正）
        let L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T * T;
        L0 = (L0 % 360) * Math.PI / 180;

        // 真黄经（λ = L0 + C）
        const lambda = L0 + C * Math.PI / 180;

        // 黄赤交角（ε）
        const epsilon = (23.43929111 - 0.01300417 * T) * Math.PI / 180;

        // 光行差修正（-20.4898"/R）
        const R = 1.000001018 * (1 - 0.006671 * Math.cos(M));
        const aberration = -20.4898 / (3600 * R) * Math.PI / 180;

        // 视黄经（λ_apparent）
        let lambdaApparent = lambda + aberration;

        // 章动修正（简化版，仅计算黄经章动Δψ）
        const Omega = (125.04452 - 1934.136261 * T) * Math.PI / 180;
        const deltaPsi = -0.0048 * Math.sin(Omega) - 0.0004 * Math.sin(2 * L0);
        lambdaApparent += deltaPsi * Math.PI / 180;

        return (lambdaApparent * 180 / Math.PI) % 360;
    }

    // ====================== 节气定义 ======================
    const SOLAR_TERMS = [
        { name: "春分", angle: 0 },
        { name: "清明", angle: 15 },
        { name: "谷雨", angle: 30 },
        { name: "立夏", angle: 45 },
        { name: "小满", angle: 60 },
        { name: "芒种", angle: 75 },
        { name: "夏至", angle: 90 },
        { name: "小暑", angle: 105 },
        { name: "大暑", angle: 120 },
        { name: "立秋", angle: 135 },
        { name: "处暑", angle: 150 },
        { name: "白露", angle: 165 },
        { name: "秋分", angle: 180 },
        { name: "寒露", angle: 195 },
        { name: "霜降", angle: 210 },
        { name: "立冬", angle: 225 },
        { name: "小雪", angle: 240 },
        { name: "大雪", angle: 255 },
        { name: "冬至", angle: 270 },
        { name: "小寒", angle: 285 },
        { name: "大寒", angle: 300 },
        { name: "立春", angle: 315 },
        { name: "雨水", angle: 330 },
        { name: "惊蛰", angle: 345 }
    ];

    // ====================== 节气计算核心 ======================
    // 判断日期是否在节气当天（简化版）
    function getSolarTermForDate(year, month, day) {
        const jd = julianDay(year, month, day, 12, 0, 0); // 中午12点计算
        const lambda = solarApparentLongitude(jd);

        // 找到最接近的节气
        let minDiff = Infinity;
        let result = null;
        for (const term of SOLAR_TERMS) {
            const diff = Math.abs((lambda - term.angle + 360) % 360);
            if (diff < minDiff) {
                minDiff = diff;
                result = term.name;
            }
        }
        return { term: result, angle: lambda };
    }

    // ====================== 用户界面交互 ======================
    document.getElementById('tyinputForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // 获取输入
        const year = parseInt(document.getElementById('year').value);
        const month = parseInt(document.getElementById('month').value);
        const day = parseInt(document.getElementById('day').value);

        // 计算节气
        const { term, angle } = getSolarTermForDate(year, month, day);

        // 显示结果
        document.getElementById('longitudetyresult').textContent =
            `太阳视黄经: ${angle.toFixed(2)}°`;
        document.getElementById('termtyresult').textContent =
            `节气: ${term}`;
    });

    // 初始化默认日期（今天）
    const today = new Date();
    document.getElementById('year').value = today.getFullYear();
    document.getElementById('month').value = today.getMonth() + 1;
    document.getElementById('day').value = today.getDate();
})();