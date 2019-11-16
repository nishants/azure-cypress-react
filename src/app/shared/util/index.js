export const scrollToTop = () =>
  document
    .querySelector(
      '#homepage .homepage-content .fixed-to-page .navigation .navigation-links'
    )
    .scrollIntoView({ behavior: 'smooth' });

export const scrolledReached = (selector, offset = 0) => {
  const clientRect = document.querySelector(selector).getBoundingClientRect(),
    position =
      typeof clientRect.y === 'undefined' ? clientRect.top : clientRect.y;
  return position <= -offset;
};

export const getScrollPosition = () => window.pageYOffset;
