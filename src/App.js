import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './util/Yelp';


class App extends Component {

	/* TODO: 

	- Make addresses clickable and have them open the address in Google Maps in a new tab
	- Make images clickable and have them open the business' website in a new tab
	- Implement your own type of sort (for example, by entering a distance or radius from a central location)
	- Add autocompletion of addresses to the "Location" input

	*/

	constructor(props) {
		super(props);
		this.state = {
			businesses: []
		};
		this.searchYelp = this.searchYelp.bind(this);
	}

	searchYelp(term, location, sortBy) {
		Yelp.search(term, location, sortBy).then(businesses => {
			this.setState({businesses: businesses});
		});
	}

 	render() {
    	return (
      	<div className="App">
        	<h1>ravenous</h1>
          	<SearchBar searchYelp={this.searchYelp} />
          	<BusinessList businesses={this.state.businesses} />
      	</div>
		);
  	}
};

export default App;