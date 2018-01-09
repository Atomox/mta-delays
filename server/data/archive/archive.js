let archive_status = {
	files: [
		'mta_status.07.Begins_XML_feed',
		'mta_status.08',
		'mta_status.09',
		'mta_status.10.times_sq_terror_attack',
		'mta_status.11.times_sq_terror_resumed_svc',
		'mta_status.12',
		'mta_status.13',
		'mta_status.14.trains_terminate',
		'mta_status.15.qns_blvd_-_running_local',
		'mta_status.16.lots_of_delays',
		'mta_status.17.stations_abnormality',
		'mta_status.18',
		'mta_status.19.ACDF_Rerouted',
		'mta_status.20.New_Years_Messaging',
		'mta_status.21.NYE_ended',
		'mta_status.22.all_reroutes',
		'mta_status.23.route_change',
		'mta_status.24',
		'mta_status.25',
		'mta_status.26',
		'mta_status.27',
		'mta_status.28.storm_prep',
		'mta_status.29.storm_prep_ended_early',
		'mta_status.30.storm_closing_msgs_like_crazy',
		'mta_status.31.bad_weather',
		'mta_status.32',
		'mta_status.33.weekend_complex_msgs',
		'mta_status.34.weekend_delays',
		'mta_status.35.complex_e_f_delays',
		'mta_status.36',
		'mta_status.37.f-over-g_23-reroute',
	],
	path: './data/archive/',
};

function build_archive_object () {
	let assembled = [];
	for (let i in archive_status.files) {
		let ex = archive_status.files[i].split('.');
		let r = {
			id: ex[1],
			description: null,
			date: null,
			request_key: i,
		};

		if (ex[2]) {
			r.description = ex[2];
		}

		assembled.push(r);
	}

	console.log('Assembles list: ', assembled);

	archive_status.list = assembled;

	return archive_status;
}


module.exports = {
	archive_status,
	get_archive_list: build_archive_object,
}
