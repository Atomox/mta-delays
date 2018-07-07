const mtaTaxonomy = require('./data/static/mta.taxonomy');

/**
 * Parse the event message for any keywords we can use to tag the event.
 *
 * @param [string] text
 *   The event message.
 * @param [string] action
 * 	 If present, we'll only check for these actions.
 * @param [object|null] external_library.
 *   (optional) Pass an external source instead of using the taxonomy file.
 *   Mostly for testing.
 *
 * @return [array|null]
 *   An array of matched tags (DISTINCT). Otherwise, [null].
 */
function getMessageAction(text, action, external_library) {

	let my_status = getWeightedMessageTaxonomy(text, action, external_library);

	return my_status.tags;
}


function getWeightedMessageTaxonomy(text, action, external_library) {

		let my_status = [],
			my_status_detailed = {},
			source = (external_library)
				? external_library
				: mtaTaxonomy;

		// Adding layer for external libraries, due to boject structure change for
		// main taxonomy file.
		if (external_library) {
			external_library = {
				padding_layer: external_library
			};
		}

		text = text.toUpperCase();

		for (let group in source) {
			for (let type in source[group]) {
				if (action && action.indexOf(type) === -1) { continue; }

				for (let variation in source[group][type]) {

					if (!source[group][type][variation]) {
						continue;
					}
					else if (!(source[group][type][variation] instanceof RegExp)
						&& typeof source[group][type][variation] !== 'string') {
						continue;
					}

					try {
						let inSource = ((source[group][type][variation] instanceof RegExp))
							? text.match(source[group][type][variation])
							: (text.indexOf(source[group][type][variation].toUpperCase()) !== -1)

						if (inSource) {
							my_status.push(type);
							if (!my_status_detailed[group]) {
								my_status_detailed[group] = [];
							}
							my_status_detailed[group].push(type);
							break;
						}
					}
					catch (err) {
						console.log('getMessageAction(): failed to execute a regex taxonomy. -- ', err);
					}
				}
			}
		}

		return {
			tags: (my_status.length > 0) ? my_status : [],
			tags_detailed: (my_status_detailed) ? my_status_detailed : []
		};
}

function getTagWeight(tag, tag_group) {
	switch (tag_group) {
		case 'incident_unplanned':
			return 1;

		case 'incident_byproduct':
			return 5;

		case 'incident_diversion':
			return 2;

		case 'incident_misc':
		case 'incident_planned':
			return 4;

		default:
			return 5;
	}
}

function getPrimaryTag(weighted_tags) {
	let first_key = Object.keys(weighted_tags)[0],
		first = weighted_tags[first_key],
		tag = (first && first.length > 0) ? first[0] : null,
		weight = getTagWeight(tag, first_key);

	return {
		tag: tag,
		weight: weight
	}
}

module.exports = {
  getMessageAction,
  getWeightedMessageTaxonomy,
  getPrimaryTag,
};
