import React from 'react';

import SearchTab from '../SearchTab';

import WorkHistoryCard from './WorkHistoryCard';
import data from '../../../config/WorkHistoryData.json';

const shouldShowCard = (card, searchString) => {
  const searchKey = searchString.toLowerCase(),
    showByTag = card.tags.filter(t =>
      t.name.toLowerCase().startsWith(searchKey)
    ).length,
    showByDescription = card.description.toLowerCase().includes(searchKey);

  return showByTag || showByDescription;
};

const WorkHistory = () => (
  <div id="work-history-page">
    <SearchTab
      data={data}
      CardComponent={WorkHistoryCard}
      shouldShowCard={shouldShowCard}
    />
  </div>
);

export default WorkHistory;
