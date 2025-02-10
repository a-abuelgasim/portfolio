import './sass/style.scss';


const YEARS_PLACEHOLDER = '%years';


function getYearsOfExperience() {
  const givenDate = new Date('2016-04-01');
  const today = new Date();

  const years = today.getFullYear() - givenDate.getFullYear();
  if (
    today.getMonth() < givenDate.getMonth() ||
    (today.getMonth() === givenDate.getMonth() && today.getDate() < givenDate.getDate())
  ) {
    return years - 1;
  }

  return years;
}


document.addEventListener('DOMContentLoaded', () => {
	// Keep years of experience updated
	document
		.querySelectorAll('[replace-exp-years]')
		.forEach((elem) => {
			const newTextContent = elem.textContent.replace(YEARS_PLACEHOLDER, getYearsOfExperience());
			elem.textContent = newTextContent;
		});

	// Prevent flash of unstyled content (FOUC)
	document.getElementById('main').style.display = '';
});
