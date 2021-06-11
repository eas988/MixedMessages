const defaults = {
	lowercase: false,
	punctuation: false
};

module.exports = (string, options = {}) => {
	options = {
		...defaults,
		...options
	};

	let words;
	if (options.punctuation) {
		words = string.match(/\S+/g) || [];
	} else {
		words = string.match(/[a-zA-Z]+('[a-zA-Z]+)?/g) || [];
	}

	if (options.lowercase) {
		words = words.map(string => string.toLowerCase());
	}

	return words;
};
