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
		'mta_status.27.weekend_d_train_reroute_plus_typo',
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
		'mta_status.38.reroute_multiple_planned_svc',
		'mta_status.39.morning_route_changes_investigation',
		'mta_status.40.bdfq_reroute_rushhour',
		'mta_status.41.misidentified_47-50_st_station',
		'mta_status.42.morning_commute_major_reroute_plus_96-st_spelling_errors',
		'mta_status.43.complicated_D_line_reroute_planned',
		'mta_status.45.franklyn_St_shuttle_incident',
		'mta_status.46.a_e_single_status_major_reroute',
		'mta_status.47.womens_march_crowding',
		'mta_status.48.weekend_sunday',
		'mta_status.49.g_delays_weeknights',
		'mta_status.50.weekeday_morning',
		'mta_status.51.weekend',
		'mta_status.52.2018_Jan_29_Morning_Work',
		'mta_status.53.weeknight_2018-01-30',
		'mta_status.54.weekday_morning_A_S_delays',
		'mta_status.55.herald_sq_switch_problems',
		'mta_status.56.weeknight',
		'mta_status.57.2018-02-05_-_weeknight_planned_work',
		'mta_status.58.tuesday_morning_polic_activity',
		'mta_status.59.morning_snow_and_delays',
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
