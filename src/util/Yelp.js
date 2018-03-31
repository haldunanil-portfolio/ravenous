const apiKey = 'Sdne6Luu9ls32OP0cvnre4cFv-FnW_h9mXEWPwK-wpM3A4E7KamzpcWD8GElZLvaxwxIiK4EQ3sEipBHLplL_Hf9RcnlDWxY9syaQcIN7i6vZFOtRSmbCRLjiFYfWnYx';

let Yelp = {

	search(term, location, sortBy) {
		return fetch(
			// include CORS Anywhere to ensure that CORS restrictions are bypassed
			`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
			// pass header for apiKey verification
			{
				headers: { Authorization: `Bearer ${apiKey}` }
			}
		).then(response => {
			return response.json();
		}).then(jsonResponse => {
			if (jsonResponse.businesses) {
				return jsonResponse.businesses.map(business => {
					return {
						id: business.id,
						imageSrc: business.image_url,
						name: business.name,
						address: business.location.address1,
						city: business.location.city,
						state: business.location.state,
						zipCode: business.location.zip_code,
						category: business.categories[0].title,
						rating: business.rating,
						reviewCount: business.review_count,
						url: business.url
					}
				});
			}
		});
	}

};

export default Yelp;