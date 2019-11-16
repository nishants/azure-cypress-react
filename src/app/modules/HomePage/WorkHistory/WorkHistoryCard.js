/* eslint-disable react/no-danger */
import React from 'react';

const WorkHistoryCard = ({
  data: {
    position,
    company,
    image,
    fromDate,
    toDate,
    location,
    description,
    tags
  },
  selectTag
}) => (
  <div className="work-history-card">
    <img className="work-history-card-image" src={image} alt={position} />
    <div className="work-history-details">
      <div className="work-history-position">{position}</div>
      <label className="work-history-company">{company}</label>
      <label className="work-history-period">
        {fromDate} - {toDate}
      </label>
      <label className="work-history-location">{location}</label>
      <div
        className="work-history-description"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <ul className="tags">
        {tags.map(t => (
          <li key={t.name} onClick={() => selectTag(t.name)}>
            #{t.name}{' '}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default WorkHistoryCard;
