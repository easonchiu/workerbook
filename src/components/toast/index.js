import './style'

class Toast {
	static show(val, duration = 2000, css) {
		this.hide(false);

		let toast = document.createElement('div');
		toast.classList.add('x-toast');
		if (css) {
			toast.classList.add('x-toast--' + css);
		}
		toast.id = 'j-x-toast';
		toast.innerHTML = `<div class="x-toast__inner"><p>${val}</p></div>`;

		document.body.appendChild(toast);

		setTimeout(function(){
			toast.classList.add('x-toast--show');
		});

		clearTimeout(this._t);
		this._t = setTimeout(this.hide, duration);


		const focusdom = document.querySelector(':focus')
		if (focusdom) {
			focusdom.blur()
		}
	}
	static success(val, duration) {
		this.show(val, duration, 'success')
	}
	static hide(animate = true) {
		let toast = document.getElementById('j-x-toast');
		if (toast) {
			if (animate) {
				toast.classList.remove('x-toast--show');
				toast.classList.add('x-toast--hide');
				this.timeout = setTimeout(function(){
					try {
						document.body.removeChild(toast);
					} catch(e) {}
				}, 200);
			} else {
				document.body.removeChild(toast);
			}
		}
	}
}

export default Toast