import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchForKey } from '../actions';
import { scrollToTop } from '../../../shared/util';
import SocialLinks from '../SocialLinks';

class AboutMe extends React.PureComponent {
  componentDidMount() {
    scrollToTop();
  }

  search = searchString => this.props.dispatch(searchForKey(searchString));

  render() {
    const { search } = this;

    return (
      <div id="about-me-page">
        <p>
          I work to create better softwares and a better experience of building
          softwares.
        </p>
        <p>
          I have{' '}
          <Link
            to="/portfolio?search=#development"
            onClick={() => search('#development')}
          >
            full-stack development
          </Link>{' '}
          experience, building RESTful services,{' '}
          <Link
            to="/portfolio?search=#testing"
            onClick={() => search('#testing')}
          >
            test automation
          </Link>{' '}
          suites using{' '}
          <Link to="/portfolio?search=#java" onClick={() => search('#java')}>
            Java
          </Link>
          ,{' '}
          <Link
            to="/portfolio?search=#javascript"
            onClick={() => search('#javascript')}
          >
            Javascript
          </Link>
          ,{' '}
          <Link to="/portfolio?search=#ruby" onClick={() => search('#ruby')}>
            Ruby
          </Link>
          ,{' '}
          <Link
            to="/portfolio?search=#nodejs"
            onClick={() => search('#nodejs')}
          >
            NodeJS
          </Link>
          ,{' '}
          <Link to="/work-history?search=#java" onClick={() => search('#java')}>
            Spring, Hibernate
          </Link>
          , and single page applications with{' '}
          <Link
            to="/portfolio?search=#frontend"
            onClick={() => search('#frontend')}
          >
            {' '}
            AngularJS and React + Redux
          </Link>
          .
        </p>
        <p>
          I have been a practitioner and coach of agile development techniques
          and an enthusiast in Design thinking.
        </p>
        <p>
          I love{' '}
          <Link
            to="/portfolio?search=development"
            onClick={() => search('development')}
          >
            programming
          </Link>
          ,{' '}
          <Link to="/portfolio?search=#design" onClick={() => search('design')}>
            designing
          </Link>
          ,{' '}
          <Link
            to="/portfolio?search=coaching"
            onClick={() => search('coaching')}
          >
            coaching{' '}
          </Link>{' '}
          and mentoring.
        </p>

        <div className="connect-with-me">
          <SocialLinks />
        </div>
      </div>
    );
  }
}

export default connect()(AboutMe);
