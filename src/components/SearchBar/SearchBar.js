import React from 'react';
import './SearchBar.css';


let sortByOptions = {
	"Best Match": "best_match",
	"Highest Rated": "rating",
	"Most Reviewed": "review_count"
};

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			term: '',
			location: '',
			sortBy: 'best_match'
		};
		this.runYelpSearch = this.runYelpSearch.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	getSortByClass(sortByOption) {
		if (sortByOption === this.state.sortBy) {
			return 'active';
		} else {
			return '';
		}
	}	

	runYelpSearch() {
		if (this.state.term && this.state.location && this.state.sortBy) {
			this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
		}
	}

	handleSortByChange(sortByOption) {
		this.setState({
			sortBy: sortByOption
		});
		this.runYelpSearch();
	}

	handleTermChange(event) {
		this.setState({
			term: event.target.value
		});
	}

	handleLocationChange(event) {
		this.setState({
			location: event.target.value
		});
	}

	handleSearch(event) {
		this.runYelpSearch();
		event.preventDefault();
	}	

	handleKeyDown(event) {
		// 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
		console.log('woohoo');
		if (event.key === 'Enter') {
		  this.handleSearch(event);
		}
	 }

	renderSortByOptions() {
		return Object.keys(sortByOptions).map(sortByOption => {
			let sortByOptionValue = sortByOptions[sortByOption];
			return <li 
				className={this.getSortByClass(sortByOptionValue)} 
				key={"optionValue_" + sortByOptionValue}
				onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>;
		});
	}

	render() {
		return (
			<div className="SearchBar" onKeyDown={this.handleKeyDown}>
				<div className="SearchBar-sort-options">
					<ul>
						{this.renderSortByOptions()}
					</ul>
				</div>
				<div className="SearchBar-fields">
					<input placeholder="Search Businesses" onChange={this.handleTermChange} />
					<input placeholder="Where?" onChange={this.handleLocationChange} />
				</div>

				<a className="SearchBar-button" onClick={this.handleSearch}>
					<button type="submit">Let's Go</button>
				</a>
			</div>
		);
	}
};

export default SearchBar;