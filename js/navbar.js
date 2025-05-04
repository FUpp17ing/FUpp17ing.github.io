document.addEventListener('DOMContentLoaded', function() {
	const navbar = document.querySelector('.navbar');
	const topTrigger = document.querySelector('.top-trigger');
	const navlinks = document.querySelectorAll('.nav-link');
	let hideTimeout;
	const hideDelay = 3000; // 3秒后隐藏
	
	//修改点击事件
	navlinks.forEach(link => {
		link.addEventListener('click',function(){
			loading.in(this.getAttribute('href'));
		})
	});
	
	// 显示导航栏
	function showNavbar() {
		clearTimeout(hideTimeout);
		navbar.style.top = '0';
	}
	
	// 隐藏导航栏
	function hideNavbar() {
		hideTimeout = setTimeout(() => {
			navbar.style.top = '-55px';
		}, hideDelay);
	}
	
	// 鼠标进入顶部感应区域
	topTrigger.addEventListener('mouseenter', showNavbar);
	
	// 鼠标进入导航栏
	navbar.addEventListener('mouseenter', showNavbar);
	
	// 鼠标离开导航栏
	navbar.addEventListener('mouseleave', hideNavbar);
	
	// 鼠标离开顶部感应区域
	topTrigger.addEventListener('mouseleave', function() {
		// 检查鼠标是否进入了导航栏
		const isOverNavbar = navbar.matches(':hover');
		if (!isOverNavbar) {
			hideNavbar();
		}
	});
	
	// 页面加载后初始隐藏
	setTimeout(() => {
		if (!navbar.matches(':hover') && !topTrigger.matches(':hover')) {
			hideNavbar();
		}
	}, hideDelay);
});