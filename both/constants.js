export const posts = new Mongo.Collection('posts');
export const maxDistance = 8047; // meters
export const postCharacterLimit = 160; // characters
export const postLife = 86400; // seconds
export const locationTimeout = 16384; // milliseconds
export const reconnectFrequency = 1024; // milliseconds
export const positionVariability = 0.0005;
export const units = {
	distance: [
		{
			short: 'ft',
			long: 'feet',
			value: 0.3048,
		}, {
			short: 'mi',
			long: 'miles',
			value: 804.67,
		}
	]
};
export const defaultSortMethod = 'age';
export const sortMethods = [
	{
		value: 'age',
		name:	'Age',
	}, {
		value: 'popularity',
		name:	'Popularity',
	}, {
		value: 'distance',
		name:	'Distance',
	}
];
