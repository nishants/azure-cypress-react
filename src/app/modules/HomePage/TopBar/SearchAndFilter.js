import React from 'react';

class SearchAndFilter extends React.Component {
  setActive = () => this.props.setActive(true);

  setInActive = () => this.props.setActive(false);

  resetSearch = e => {
    this.props.search('');
    e.preventDefault();
    // setTimeout(this.setInActive);
  };

  searchTag = tag => {
    this.props.search(tag);
    this.setInActive();
  };

  render() {
    const { setActive, setInActive, resetSearch, searchTag } = this;
    const {
      searchAndFilter: { searchString, tags, active: activated },
      search
    } = this.props;

    return (
      <>
        <div
          className={`search-and-input-backdrop ${
            activated ? 'show-backdrop' : ''
          }`}
          onClick={setInActive}
          onMouseEnter={setInActive}
        />
        <div
          className={`search-and-filter ${activated ? 'active' : ''}`}
          onMouseEnter={setActive}
        >
          <div className="search-and-filter-input">
            <span
              className={`search-indicator-icon ${
                searchString ? 'can-reset-search' : ''
              }`}
            >
              <i className="search-icon fas fa-search" />
              <i
                className="reset-search-icon fas fa-times"
                onClick={resetSearch}
              />
            </span>
            <input
              placeholder="search"
              value={searchString}
              onChange={e => search(e.target.value)}
            />
          </div>
          <div className="search-and-filter-dropdown">
            <div>
              {tags.map(t => (
                <span key={t} className="tag-link" onClick={() => searchTag(t)}>
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SearchAndFilter;
