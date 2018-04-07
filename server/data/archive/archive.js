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
		'mta_status.60.weekend_-_fire_activty_and_route_change',
		'mta_status.61.wednesday_morning_delays',
		'mta_status.62.thursday_night-no_trains_between_qns_plza_jackson_hts',
		'mta_status.63.saturday-planned-work',
		'mta_status.64.holiday_weeknight',
		'mta_status.65.weekday_morning_problems',
		'mta_status.66.weeknight_work_multiple_sections',
		'mta_status.67.friday_afternoon_planned_work',
		'mta_status.68.friday_night_planned_work',
		'mta_status.69.thursday_morning_planned_work',
		'mta_status.70.weeknight_planned_work',
		'mta_status.71.friday_morning_reroutes',
		'mta_status.72.March-03-weekend_planned_work',
		'mta_status.73.sunday_night_-_person_struck_by_train',
		'mta_status.74.March_5_-_monday_morning_interruptions_and_planned_work',
		'mta_status.75.Monday_Weeknight_-_Planned_Work',
		'mta_status.76.winter_weather',
		'mta_status.77.morning_-_ice-on-tracks',
		'mta_status.78.rushhour_7D_work',
		'mta_status.78.rushhour_7D_work',
		'mta_status.80.Monday_-_morning_planned_work_-_E_via_G',
		'mta_status.81.March-13_-_weeknight_planned_work',
		'mta_status.82.March_17_-_Weekend_-_Planned_Work_and_Delays',
		'mta_status.83.sunday_night',
		'mta_status.84.March_20_-_Tuesday_Morning_Delays',
		'mta_status.85.Tuesday_morning_planned_work',
		'mta_status.86.SNOW_Wednesday_March_21_-_Winter_Weather_Plan',
		'mta_status.87.Sunday_weekend_work',
		'mta_status.88.wednesday_morning_delays',
		'mta_status.89.Thursday_morning_delays',
		'mta_status.90.March_29_-_Weekday_Morning_Planned_Work',
		'mta_status.91.Weeknight_Planned_Work',
		'mta_status.92.March_31_Weekend_Planned_Work',
		'mta_status.93.April-02_Snow_Delays',
		'mta_status.94.Tuesday_Morning_Delays',
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
