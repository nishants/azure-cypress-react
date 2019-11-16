import React from 'react';
import { Link } from 'react-router-dom';

import { scrollToTop } from '../../../shared/util';
import SocialLinks from '../SocialLinks';

const SieBar = ({ search }) => {
  const gotToSection = section => {
    search(section);
    scrollToTop();
  };

  return (
    <div className="side-bar">
      <ul className="demo-links">
        <li onClick={() => gotToSection('#coaching')}>
          <Link to="/portfolio?search=#coaching">Coaching/Consulting</Link>
        </li>
        <li onClick={() => gotToSection('#development')}>
          <Link to="/portfolio?search=#development">Fullstack Development</Link>
        </li>
        <li onClick={() => gotToSection('#open-source')}>
          <Link to="/portfolio?search=#open-source">Open Source</Link>
        </li>
        <li onClick={() => gotToSection('#testing')}>
          <Link to="/portfolio?search=#testing">Test Automation </Link>
        </li>
        <li onClick={() => gotToSection('#tdd')}>
          <Link to="/portfolio?search=#tdd">Test Driven Development</Link>
        </li>
        <li onClick={() => gotToSection('#frontend')}>
          <Link to="/portfolio?search=#frontend">Frontend Development</Link>
        </li>
        <li onClick={() => gotToSection('#design')}>
          <Link to="/portfolio?search=#design">Designs</Link>
        </li>
      </ul>

      <label>Previous</label>
      <ul className="previous-links">
        <li>
          <Link to="/work-history/xyz">ThoughtWorks</Link>
        </li>
        <li>
          <Link to="/work-history/xyz"> Oracle</Link>
        </li>
        <li>
          <Link to="/work-history/xyz"> Infosys</Link>
        </li>
      </ul>

      <label>Connect</label>
      <SocialLinks />
    </div>
  );
};

export default SieBar;
