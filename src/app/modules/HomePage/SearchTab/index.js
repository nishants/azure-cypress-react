import React from 'react';
import { connect } from 'react-redux';

import { searchForKey, setTags } from '../actions';
import { scrollToTop } from '../../../shared/util';
import VerticalDeck from '../../../shared/VerticalDeck';

class SearchTab extends React.PureComponent {
  // eslint-disable-next-line react/state-in-constructor
  state = { cards: [], lastSearchString: null };

  static getDerivedStateFromProps(
    { data, shouldShowCard, searchAndFilter: { searchString } },
    { lastSearchString }
  ) {
    return lastSearchString === searchString
      ? null
      : {
          searchString,
          cards: data.map(d => ({
            ...d,
            visible: shouldShowCard(d, searchString)
          }))
        };
  }

  componentDidMount() {
    const { data, dispatch } = this.props;
    const allTags = data
      .map(d => d.tags.reduce((all, tag) => all.concat(tag.name), []))
      .reduce((all, tags) => all.concat(tags), []);
    const uniqueTags = allTags.filter((tag, i) => allTags.indexOf(tag) === i);

    dispatch(setTags(uniqueTags));
    scrollToTop();
  }

  selectTag = searchString => {
    this.props.dispatch(searchForKey(searchString));
    scrollToTop();
  };

  render() {
    const { cards } = this.state;
    const {
      layout,
      CardComponent,
      searchAndFilter: { searchString },
      shouldShowCard
    } = this.props;
    const { selectTag } = this;
    const noneVisible = !cards.find(c => c.visible);

    const items = cards.map(d => ({
      id: d.name || d.company,
      visible: d.visible,
      data: d,
      Component: <CardComponent data={d} selectTag={selectTag} />
    }));
    const orderBy = (a, b) => shouldShowCard(b.data) > shouldShowCard(a.data);

    return (
      <div className="search-tab-items">
        <VerticalDeck layout={layout} items={items} orderBy={orderBy} />

        {noneVisible && (
          <span className="no-results-message">
            {' '}
            No results for {`"${searchString}"`}{' '}
          </span>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ home: { searchAndFilter } }) => ({
  searchAndFilter
});

export default connect(mapStateToProps)(SearchTab);
