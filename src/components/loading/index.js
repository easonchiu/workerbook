import './style'

class Loading {
	static show() {
		this.hide(false);

		let loading = document.createElement('div');
		loading.classList.add('x-loading');
		loading.id = 'j-x-loading';
		
		const spin = `<div class="x-loading__spin">
			<svg class="x-loading__spin_circular" viewBox="25 25 50 50">
				<circle class="x-loading__spin_path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
			</svg>
		</div>`

		loading.innerHTML = `${spin}`;

		document.body.appendChild(loading);

		const focusdom = document.querySelector(':focus')
		if (focusdom) {
			focusdom.blur()
		}
	}

	static hide() {
		let loading = document.getElementById('j-x-loading');
		if (loading) {
			document.body.removeChild(loading);
		}
	}
}

export default Loading