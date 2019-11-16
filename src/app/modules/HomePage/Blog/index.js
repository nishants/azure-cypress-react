import React from 'react';

import SearchTab from '../SearchTab';

import BlogCard from './BlogCard';
import data from '../../../config/BlogData.json';

const shouldShowCard = (card, searchString) => {
  const searchKey = searchString.toLowerCase(),
    showByTag = card.tags.filter(t =>
      t.name.toLowerCase().startsWith(searchKey)
    ).length,
    showByHeading = card.heading.toLowerCase().includes(searchKey);

  return showByTag || showByHeading;
};

const Blog = () => (
  <div id="blog-page">
    <SearchTab
      data={data}
      CardComponent={BlogCard}
      shouldShowCard={shouldShowCard}
    />
  </div>
);

export default Blog;
