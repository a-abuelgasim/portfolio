import './sass/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  generateYearsOfExperience();
  observeTimelineStickyDotIntersection();
  observeTimelineCardIntersection();

  // Prevent flash of unstyled content (FOUC)
  document.getElementById('main').style.opacity = '';
});

function generateYearsOfExperience() {
  const YEARS_PLACEHOLDER = '%years';

  // Keep years of experience updated
  document
    .querySelectorAll('[replace-exp-years]')
    .forEach((elem) => {
      const newTextContent = elem.textContent.replace(YEARS_PLACEHOLDER, getYearsOfExperience());
      elem.textContent = newTextContent;
    });
}

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

function observeTimelineStickyDotIntersection() {
  const STICKY_DOT_CLASS_PREFIX = 'timeline__sticky-dot';
  const STICKY_DOT_FIXED_CLASS = `${STICKY_DOT_CLASS_PREFIX}--fixed`;
  const STICKY_DOT_END_CLASS = `${STICKY_DOT_CLASS_PREFIX}--end`;

  const stickyDot = document.querySelector(`.${STICKY_DOT_CLASS_PREFIX}`);
  const triggerEl = document.querySelector(`.timeline__trigger`);

  const triggerElObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio === 0) {
        stickyDot.classList.remove(`${STICKY_DOT_FIXED_CLASS}`);

        if (entry.boundingClientRect.top < 0) {
          stickyDot.classList.add(`${STICKY_DOT_END_CLASS}`);
        }
      } else {
        stickyDot.classList.remove(`${STICKY_DOT_END_CLASS}`);
        stickyDot.classList.add(`${STICKY_DOT_FIXED_CLASS}`);
      }
    },
    { root: null, threshold: 0 } // Observe in the viewport
  );

  triggerElObserver.observe(triggerEl);
}

function observeTimelineCardIntersection() {
  const TIMELINE_CARD_CLASS_PREFIX = 'timeline__card';
  const TIMELINE_CARD_MUTED_CLASS = `${TIMELINE_CARD_CLASS_PREFIX}--muted`;

  const timelineCardsExceptFirst = Array.from(document.querySelectorAll(`.${TIMELINE_CARD_CLASS_PREFIX}`)).slice(1);

  const timelineCardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(
        entry => entry.target.classList.toggle(TIMELINE_CARD_MUTED_CLASS, entry.intersectionRatio === 0)
      );
    },
    {
      root: null,
      rootMargin: `0px 0px -40% 0px`,
      threshold: 0,
    }
  );

  timelineCardsExceptFirst.forEach(timelineCard => timelineCardsObserver.observe(timelineCard));
}
