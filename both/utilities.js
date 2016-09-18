import constants from '/both/constants';

export function format (x, units, long) {
	let correct = units[0];
	let index = units.length;
	while (index -= 1) {
		if (x >= units[index].value) {
			correct = units[index];
			break;
		}
	}
	return Math.round(x / correct.value)
		+ (long ? ' ' + correct.long : correct.short);
}
export function checkPost (content) {
	const length = Match.Where((string) => {
		check(string, String);
		return 0 < string.length && string.length <= constants.postCharacterLimit;
	});
	return Match.test(content, length);
}
export const checkComment = checkPost;

export function findPosts (position) {
	return constants.posts.find({
		'location': {
			'$near': {
				'$geometry': {
					'type': 'Point',
					'coordinates': [position.longitude, position.latitude],
				},
				'$maxDistance': constants.maxDistance,
			},
		},
	});
}
export function getPost (id) {
	return constants.posts.find({ id: id });
}

export function reload () {
	window.location.reload(false);
}
