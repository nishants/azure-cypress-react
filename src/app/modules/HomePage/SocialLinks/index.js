import React from 'react';

const SocialLinks = () => {
  return (
    <ul className="social-links">
      <li className="github">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nishants"
        >
          <i className="fab fa-github" />
          Github
        </a>
      </li>
      <li className="stack-overflow">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://stackoverflow.com/users/1065020/dawn"
        >
          <i className="fab fa-stack-overflow" />
          StackOveflow
        </a>
      </li>
      <li className="twitter">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/nshnt_sng"
        >
          <i className="fab fa-twitter" />
          Twitter
        </a>
      </li>
      <li className="linkedin">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/nishant-singh-b2420946"
        >
          <i className="fab fa-linkedin" />
          Linkedin
        </a>
      </li>
    </ul>
  );
};

export default SocialLinks;
