import './sass/style.scss';

document.addEventListener('DOMContentLoaded', () => {
	// Prevent flash of unstyled content (FOUC)
	document.getElementById('main').style.display = '';

	// Keep 'years of experience' in profile updated
	document
		.getElementById('years')
		.textContent = new Date().getFullYear() - 2016;
});
