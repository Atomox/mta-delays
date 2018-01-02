'use strict';

let root_resp = {
		title: 'Ladies and Gentleman, after an earlier incident...',
		author: {
			name: 'Ben Helmer',
			www: {
				mta: 'nyc.bhelmer.com',
				related: 'subway.bhelmer.com',
				photography: 'benhelmer.com',
				github: 'https://github.com/Atomox',
			},
		},
		project: {
			title: 'MTA Smart-ish Status',
			description: 'Parsed data, combined with custom-created data, to generate better status updates.',
			repo: 'https://github.com/Atomox/mta-delays',
			license: 'Use of the status app is free. Use of these APIs is forbidden without express written permission from Ben Helmer. Not for commercial use.',
			disclaimer: 'This app is automated, heavily parsed data. It is based partly on the offical MTA feeds, but no longer official data. It may not always be accurate, but I am working on it! Do not stake your monitary, health or well being on the accuracy of this app!',
			contact: 'atomox@gmail.com',
			note: 'I want this app to help people, and am open to helping for-the-greater-good causes and developers. Reach out if that might be you!',
		},
		status: true,
		endpoints: {

			'/subway/status': {
				type: 'parsed data from mta.info interruption feeds.',
				frequency: 'upon request, but updated no more than once per minute.',
			},
			'/subway/stations/::boro::': {
				type: 'Station info, optionally per boro',
				frequency: 'static',
				values: 'see boros below',
			},
			'/subway/lines/boro/::boro::': {
				type: 'Stations, ordered by branch (named stretch of track)',
				examples: 'Astoria (Qs), Broadway - Brighton (Mn & Bk), 8th Av - Fulton St (Mn), Concourse (Mn & Bx)',
				frequency: 'static',
				values: 'see boros below',
			},
			'/subway/lines/train/::train::': {
				type: 'Stations, ordered by branch (named stretch of track), for ONLY the requested train.',
				examples: 'N, Q, R, T',
				values: 'see trains below',
			},
			'/subway/lines/::train::/route': {
				type: 'Stations for ONLY the requested train, in order from North to South, or Outter to Manhattan (SIR, L, 7, J, Z)',
				examples: 'A, D, L, Z',
				values: 'see trains below',
			},
			'/subway/lines/::train::/route/array': {
				type: 'BASIC Key/Value OBJECT of Stations for ONLY the requested train, like above, but only KEY => Name. In train order, meaning the next item in the list will be the next station for that line, with rare exceptions for branch lines (I\'m looking at you, A-line!)',
				examples: 'A, D, L, Z',
				values: 'see trains below',
			},
		},
		trains: [
			'1', '2', '3', '4', '5', '6', '7', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'L', 'M', 'N', 'Q', 'R', 'S', 'T', 'W', 'Z', 'SIR'
		],
		boros: [
			'Mn', 'Qs', 'Bk', 'Bx', 'SI'
		],
	};

module.exports = root_resp;