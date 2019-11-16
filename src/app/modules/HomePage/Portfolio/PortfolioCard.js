import React from 'react';

const PortfolioCard = ({
  data: { name, src, demo, tags, image, description },
  selectTag
}) => (
  <div className="portfolio-card">
    <div className="portfolio-card-title">{name}</div>
    {image && <img className="portfolio-card-image" src={image} alt={name} />}
    <p>
      <span className="portfolio-car-desc-lead">{description.lead}</span>{' '}
      {description.follow}
    </p>

    <div>
      {demo && (
        <a className="portfolio-card-demo" href={demo}>
          Demo
        </a>
      )}

      {src && (
        <a
          className="portfolio-card-src"
          href={src}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-link" />
          src
        </a>
      )}
    </div>

    <div className="tag-links">
      {tags.map(t => (
        <span
          className="tag-link"
          key={t.name}
          onClick={() => selectTag(t.name)}
        >
          #{t.name}{' '}
        </span>
      ))}
    </div>
  </div>
);

export default PortfolioCard;
