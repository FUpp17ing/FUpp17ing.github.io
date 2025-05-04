// 判断某一年是否为闰年的函数
function isLeapYear(year) {
    const cycleYear = year % 391;
    const leapYearCount = 144;
    const leapYears = [];
    const step = 391 / leapYearCount;
    for (let i = 0; i < leapYearCount; i++) {
        leapYears.push(Math.floor(i * step));
    }
    return leapYears.includes(cycleYear);
}

// 判断特定年份是否为闰年的函数
function checkSingleYear() {
    const year = parseInt(document.getElementById('single-year').value);
    const resultElement = document.getElementById('single-year-result');
    if (isLeapYear(year)) {
        resultElement.textContent = `${year} 年是闰年。`;
    } else {
        resultElement.textContent = `${year} 年不是闰年。`;
    }
}

// 计算一段时间内闰年数量的函数
function countLeapYears() {
    const startYear = parseInt(document.getElementById('start-year').value);
    const endYear = parseInt(document.getElementById('end-year').value);
    const resultElement = document.getElementById('leap-year-count-result');
    let leapYearCount = 0;
    for (let year = startYear; year <= endYear; year++) {
        if (isLeapYear(year)) {
            leapYearCount++;
        }
    }
    resultElement.textContent = `从 ${startYear} 年到 ${endYear} 年共有 ${leapYearCount} 个闰年。`;
}

