import React from 'react';

const BlogCard = ({
  data: { heading, link, previewText, tags, image, subHeading },
  selectTag
}) => (
  <div className="blog-card">
    <div className="blog-card-title">{heading}</div>
    <label>{subHeading}</label>
    <p>{previewText}</p>
    {image && <img className="blog-card-image" src={image} alt={heading} />}

    {link && (
      <a
        className="blog-external-link"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fas fa-external-link-alt" />
        Read
      </a>
    )}

    <ul className="tag-links">
      {tags.map(t => (
        <li key={t.name} onClick={() => selectTag(t.name)}>
          #{t.name}{' '}
        </li>
      ))}
    </ul>
  </div>
);

export default BlogCard;
