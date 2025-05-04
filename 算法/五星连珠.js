(function () {
    const container = document.getElementById('wx-container');
    const images = container.querySelectorAll('.wximage');

    function randomizeImages() {
        images.forEach(image => {
            const maxX = container.offsetWidth - image.offsetWidth;
            const maxY = container.offsetHeight - image.offsetHeight;
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);
            image.style.left = randomX + 'px';
            image.style.top = randomY + 'px';
        });
    }

    function arrangeImages() {
        const containerWidth = container.offsetWidth;
        const imageWidth = images[0].offsetWidth;
        const spacing = (containerWidth - images.length * imageWidth) / (images.length - 1);
        let currentX = 0;

        images.forEach(image => {
            image.style.left = currentX + 'px';
            image.style.top = (container.offsetHeight - image.offsetHeight) / 2 + 'px';
            currentX += imageWidth + spacing;
        });
    }

    // 导出函数供外部使用
    window.arrangeImages = arrangeImages;

    // 初始化
    window.addEventListener('DOMContentLoaded', randomizeImages);
})();