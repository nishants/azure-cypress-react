import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Splash from './Splash';
import ScrollListener from '../../shared/ScrollListener';
import ProfileImg from './profile.jpg';
import Navigation from './TopBar/Navigation';

import SideBar from './SideBar';
import Portfolio from './Portfolio';
import Blog from './Blog';
import WorkHistory from './WorkHistory';
import AboutMe from './AboutMe';

import { searchForKey } from './actions';
import { scrolledReached, getScrollPosition } from '../../shared/util';

class HomePage extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    splashScrollState: '',
    profileReached: false,
    stickNavigation: false
  };

  componentDidMount() {
    let lastScrollPositoin = 0;
    const onWindowScroll = () => {
      const profileReached = scrolledReached(
        '#homepage .homepage-content .fixed-to-page .profile-image-container'
      );
      const stickNavigation = scrolledReached(
        '#homepage .homepage-content .fixed-to-page .navigation .navigation-links'
      );

      let splashScrollState = '';

      if (!profileReached) {
        splashScrollState = scrolledReached(
          '#homepage ul.splash-scroll-monitor > li:nth-child(4)'
        )
          ? 'four'
          : scrolledReached(
              '#homepage ul.splash-scroll-monitor > li:nth-child(3)'
            )
          ? 'three'
          : scrolledReached(
              '#homepage ul.splash-scroll-monitor > li:nth-child(2)'
            )
          ? 'two'
          : scrolledReached(
              '#homepage ul.splash-scroll-monitor > li:nth-child(1)',
              5
            )
          ? 'one'
          : '';
      }
      const scrollPosition = getScrollPosition(),
        scrollingUp = scrollPosition < lastScrollPositoin;

      this.setState({
        profileReached,
        splashScrollState,
        stickNavigation,
        scrollingUp
      });
      lastScrollPositoin = scrollPosition;
    };
    this.search(window.location.hash.split('search=')[1] || '');
    this.scrollListener = ScrollListener.$window(onWindowScroll);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      // scrollToTop();
    }
  }

  search = searchString => this.props.dispatch(searchForKey(searchString));

  render() {
    const {
      splashScrollState,
      profileReached,
      stickNavigation,
      scrollingUp
    } = this.state;
    const { search } = this;

    const {
      searchAndFilter,
      dispatch,
      match: {
        params: { tab_id: selectedNavigationLink }
      }
    } = this.props;

    return (
      <article
        id="homepage"
        className={`${profileReached ? 'profile-reached' : ''} ${
          scrollingUp ? 'scrolling-up' : ''
        } ${selectedNavigationLink}-page ${
          stickNavigation ? 'stick-navigation' : ''
        }`}
      >
        <section className="homepage-splash">
          <Splash splashState={splashScrollState} />
        </section>
        <section className="homepage-content-container">
          <section className="homepage-splash-tint">
            <ul className="splash-scroll-monitor">
              <li />
              <li />
              <li />
              <li />
            </ul>
          </section>
          <section className="homepage-content">
            <div id="top-bar">
              <div className="profile-bar fixed-to-page">
                <div className="profile">
                  <div className="slope-bg" />
                  <span className="work-credits">
                    Designed and Developed by Nishant Singh.
                  </span>
                  <div className="profile-image-container">
                    <img src={ProfileImg} alt="Nishant Singh" />
                  </div>
                </div>
                <Navigation
                  selectedLink={selectedNavigationLink}
                  searchAndFilter={searchAndFilter}
                  search={search}
                  dispatch={dispatch}
                />
              </div>
              <div className="fixed-to-window">
                <Navigation
                  selectedLink={selectedNavigationLink}
                  searchAndFilter={searchAndFilter}
                  search={search}
                  dispatch={dispatch}
                />
                <SideBar search={search} />
              </div>
            </div>
            <section className="tab-view-container">
              <SideBar search={search} />
              <div className="route-view-container">
                <Switch>
                  <Route path="/portfolio/" component={Portfolio} />
                  <Route path="/blog/" component={Blog} />
                  <Route path="/work-history" component={WorkHistory} />
                  <Route path="/about-me" component={AboutMe} />
                  <Redirect to="/portfolio" />
                </Switch>
              </div>
            </section>
          </section>
        </section>
      </article>
    );
  }
}

const mapStateToProps = ({ home: { searchAndFilter } }) => ({
  searchAndFilter
});

export default withRouter(connect(mapStateToProps)(HomePage));
