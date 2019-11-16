import React from 'react';

import SearchTab from '../SearchTab';

import PortfolioCard from './PortfolioCard';
import data from '../../../config/PortofolioData.json';

const shouldShowCard = (card, searchString) => {
  const searchKey = searchString.toLowerCase(),
    showByTag = card.tags.filter(
      t => `#${t.name}` === searchKey || t.name === searchKey
    ).length
      ? 3
      : 0,
    showByDescriptoin =
      card.description.lead.toLowerCase().includes(searchKey) ||
      card.description.follow.toLowerCase().includes(searchKey),
    showByTitle = card.name.toLowerCase().includes(searchKey);

  return showByTag + showByDescriptoin + showByTitle;
};

const Portfolio = () => (
  <div id="portfolio-page">
    <SearchTab
      data={data}
      layout={{ maxWidth: 500, width: 350 }}
      CardComponent={PortfolioCard}
      shouldShowCard={shouldShowCard}
    />
  </div>
);

export default Portfolio;
