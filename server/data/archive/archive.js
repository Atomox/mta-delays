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
		'mta_status.95.April_06_-_Weekend_Planned_work',
		'mta_status.96.Weekend_Planned_Work',
		'mta_status.97.April-09_-_Monday_Morning_Planned_work',
		'mta_status.98.Weeknight_Planned_work',
		'mta_status.99.Tuesday_Morning_Planned_work',
		'mta_status.100.Weekday_Major_reroute',
		'mta_status.101.Weeknight_Multiple_Reroutes',
		'mta_status.102.Weeknight_Planned_Work',
		'mta_status.103.Weekday_Morning_-_MTAD-057_examples',
		'mta_status.104.Evening_delay_7D',
		'mta_status.105.April_14_-_Sat_morning_planned_work',
		'mta_status.106.power_loss',
		'mta_status.107.weeknight_planned_work',
		'mta_status.108.April_22_-_Weekend_Planned_Work',
		'mta_status.109.Morning_Major_Delays_EFM',
		'mta_status.110.April_24_-_Weeknight_-_Monday_-_Planned_Work',
		'mta_status.111.April_27_-_Weekend_Planned_Work',
		'mta_status.112.Weekend_-_person_struck_by_train',
		'mta_status.113.April_30_-_Monday_Morning_Delays',
		'mta_status.114.April_30_-_Monday_Morning_-_Planned_Work',
		'mta_status.115.Weeknight_Planned_Work',
		'mta_status.116.weeknight_planned_work',
		'mta_status.117.May_05_-_Weekend_Planned_work',
		'mta_status.118.Weekend_Sunday_-_Delays_Planned_Work',
		'mta_status.119.Monday_Morning_Delays',
		'mta_status.120.Monday_Morning_More_Delays',
		'mta_status.121.Monday_Night_Planned_Work',
		'mta_status.122.Tuesday_Morning_Delays',
		'mta_status.123.Morning_Delays_and_Work',
		'mta_status.124.Week_Night_Planned_Work',
		'mta_status.125.Weeknight_Many_F_delays',
		'mta_status.126.Weekend_Planned_Work_-_Saturday_Latenight',
		'mta_status.127.Weeknight_Planned_Work',
		'mta_status.128.Friday_Morning_Delays',
		'mta_status.129.May_20_-_Weekend_Work',
		'mta_status.130.Weeknight_Planned_Work',
		'mta_status.131.Wednesday_Morning_Delays',
		'mta_status.132.Delays_Qns_Bnx',
		'mta_status.133.May_26_-_Weekend_Night_Planned_Work',
		'mta_status.134.Sat_Afternoon_Delays',
		'mta_status.135.Sunday_Evening_Planned_Work',
		'mta_status.136.Qns_Blvd_-_Person_Struck_By_Train_-_No_Trains',
		'mta_status.137.Monday_Morning_Delays',
		'mta_status.138.Weeknight_-_Planned_Work',
		'mta_status.139.June_02_-_Weekend_Late_Night_Planned_Work',
		'mta_status.140.Weekend_Saturday_Morning_Planned_Work',
		'mta_status.141.Weeknight_-_Service_neds_early',
		'mta_status.142.Weeknight_-_Planned_Work',
		'mta_status.143.Morning_-_BUG_-_Map_not_reflecting_all_changes',
		'mta_status.144.June-09_-_Weekend_Night_Work',
		'mta_status.145.Weekend_Sat_Morning_-_Planned_Work',
		'mta_status.145.Weekend_-_Planned_Work_Sunday_Afternoon',
		'mta_status.146.Weekend_Planned_Work_-_Sunday_Afternoon',
		'mta_status.147.Weeknight_-_9pm_Planned_Work',
		'mta_status.148.Weekday_Morning_-_Planned_Work',
		'mta_status.149.Weeknight_Planned_Work',
		'mta_status.150.Weekend_Latenight_-_Planned_Work',
		'mta_status.151.Weekday_Morning_Planned_Work',
		'mta_status.152.Service_Ends_Early',
		'mta_status.153.Weeknight_Evening_Planned_Work',
		'mta_status.154.Weekday_Delays',
		'mta_status.155.Weekday_Planned_Work',
		'mta_status.156.Weeknight_Planned_Work',
		'mta_status.157.Weekend_-_Planned_Work',
		'mta_status.158.Weekend_Day_-_Planned_Work',
		'mta_status.159.Monday_Morning_Delays_and_Work',
		'mta_status.159.Monday_Morning_Delays_and_Work',
		'mta_status.160.Weeknight_Planned_Work',
		'mta_status.161.Weekday_Evening',
		'mta_status.162.Morning_Power_Loss',
		'mta_status.163.Friday_Night_Delays',
		'mta_status.164.Morning_Work_Delays',
		'mta_status.165.Friday_Night_-_Planned_Work',
		'mta_status.166.Monday_Morning_Work',
		'mta_status.167.Weekday_Morning_Planned_Work',
		'mta_status.168.Weeknight_Planned_Work',
		'mta_status.169.Weekday_Morning_Delays',
		'mta_status.170.Weekend_Sat_Night_Work',
		'mta_status.171.Mond_Morning_Planned_Work',
		'mta_status.172.M_Service_Problems_Bus_url_bit.ly',
		'mta_status.173.Weekend_Night_Planned_Work',
		'mta_status.174.Saturday_Afternoon_Delays',
		'mta_status.175.Monday_Morning_Work',
		'mta_status.176.Weeknight_Delays',
		'mta_status.177.Evening_Delays_Post_Storm',
		'mta_status.178.Weekday_Morning_Delays',
		'mta_status.179.Weeknight_Delays',
		'mta_status.180.Weeknight_Planned_Work',
		'mta_status.181.Weekend_Fire_E_F_G',
		'mta_status.182.Weekend_R_via_F_to_179',
		'mta_status.183.Weeknight_-_Train_Staging',
		'mta_status.184.Weekend_Broken_Rail_Harold_sq',
		'mta_status.185.Weekend',
		'mta_status.186.2019-02-15_-_weekend_Planned_Work',
		'mta_status.187.02-25_-_Monday_Morning_Delays',
		'mta_status.188.03-02_-_Weekend_Sat_Morning',
		'mta_status.189.03-05_-_Tues_Morning_Delays',
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
