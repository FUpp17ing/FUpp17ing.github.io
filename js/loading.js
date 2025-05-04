// ====================加载动画部分======================
	const loading = {
		container:document.querySelector('.loading'),
		in(target){
			this.container.style.opacity = 1;
			this.container.classList.remove('loading-out');
			setTimeout(()=>{
				window.location.href = target;
			}, 2500)
		},
		out(){
			this.container.classList.add('loading-out');
			setTimeout(()=>{
				this.container.style.opacity = 0;
			}, 500)
		}
	}
	window.addEventListener('load',()=>{
		loading.out();
	})