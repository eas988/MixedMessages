'use strict';

const pronounciations = require('cmu-pronouncing-dictionary');
const extractwords = require('extractwords');

const defaults = {
	multiple: false
};

module.exports = (word, options = {}) => {
	if (typeof word !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof word}`);
	}

	options = {
		...defaults,
		...options
	};

	const words = extractwords(word, {lowercase: true});
	const lastWord = words[words.length - 1] || '';
	const rhymingPart = getRhymingPart(lastWord);

	if (!options.multiple) {
		return rhymingPart;
	}

	if (!rhymingPart) {
		return [];
	}

	const rhymingParts = [rhymingPart];
	for (let i = 1; i < 10; i++) {
		const rhymingPart = getRhymingPart(`${lastWord}(${i})`);
		if (!rhymingPart) {
			break;
		}

		rhymingParts.push(rhymingPart);
	}

	const rhymingPartSet = new Set(rhymingParts);
	return [...rhymingPartSet];
};

const getRhymingPart = word => {
	const pronounciation = pronounciations[word] || '';
	const stresses = pronounciation.split(' ');
	const searchStress = pronounciation.includes('1') ? '1' : '2';

	for (let i = stresses.length - 1; i >= 0; i--) {
		if (stresses[i].includes(searchStress)) {
			return stresses.slice(i).join(' ');
		}
	}

	return '';
};
