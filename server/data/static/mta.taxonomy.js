export default {

	// Incidents
	incident_unplanned: {
		'service_resumed': [
			'resumed making stops',
			'service has resumed',
			'following an earlier incident',
			/resumed\s*(?:express|local)?\s*service/i,
			'service resumed',
		],
		'illness': [
			'sick passenger',
			'medical attention',
			'medical assistance',
			'EMS',
		],
		'injury': [
			'person struck by a train',
			'customer injury',
			'injured passenger',
		],
		'death': [
			'fatal injury',
		],
		'signal_problems': [
			'signal problems',
			'signal problem'
		],
		'power_loss': ['loss of power'],
		'unautherized_person': [
			'unauthorized person on the tracks',
		],
		'unruly_passenger': [
			'unruly passenger',
		],
		'police_request': [
			'NYPD request',
		],
		'police_activity': [
			'NYPD',
			'NYPD activity',
			'police activity',
			'investigation',
		],
		'fire_activity': [
			'FDNY activity',
		],
		'water condition': [
			'water condition',
		],
		'mechanical_problems': [
			'mechanical problems',
		],
		'train_breaks': [
			'train\'s brakes',
			'train brakes',
			'brakes activated',
			'emergency brakes',
			'brakes automatically activated',
		],
		'removed_train': [
			'moved a train',
			'removed a train',
		],
		'rail_condition': [
			'rail condition',
			'track condition',
		],
		'switch_problems': ['switch problems'],
	},



	incident_byproduct: {
		'delays': [
			'delays',
			'running with delays',
		],
	},


	// Diversions.
	incident_diversion: {
		'operate_sections': [
			'operates in two sections',
			'operate in two sections',
			'run in two sections',
		],
		'shuttle_bus': [
			'[SB]',
			'Shuttle Bus',
		],
		'bus_detour': [
			'buses are detoured',
			'buses rerouted',
		],
		'skip_stations': [
			'trains skip',
			'station closures',
			'trains are bypassing',
			'trains will bypass',
		],
		'service_ends_early': [
			'end early',
			'Service ends early',
			'service ends early',
		],
		'running_local': [
			'trains run local',
			'trains are running local',
			'trains make local stops',
			'local stops',
			'running local',
			'run local',
		],
		'route_change': [
			'trains are stopping on',
			'trains are stopping along',
			'route changes',
			'Trains are rerouted',
			/(?:via|over|along)\s*the\s*\[(?:[0-9]|[A-Z]|SF|SH)\]/i
		],
		'alternate_trains': [
			'alternate trains',
			'some trains',
		],
		'no_trains': [
			'No trains running',
			'Service is suspended',
		],
		'no_trains_partial': [
			'The last stop',
			'trains end at',
			'trains will end at',
			'No trains in',
			'No trains between',
			'No trains running between',
			'No service between',
			'No weekday service between',
			'Service is suspended',
			/No\s*(\[[A-z0-9]{1,2}\]\s*(?:,|and|or)?)+\s*(?:weekday|weekend|evening|late\s*night|overnight)?\s*(?:train[s]?|train\s*service|service)\s*(?:running\s*)?(between|in|along|to)/i
		],
		'platform_change' :[
			'trains board at',
			'trains baord on',
		],
		'running_express': [
			'running express',
			'trains run express',
		],
		'reduced_service': [
			'modified schedule',
			/trains\s*run\s*every\s*[0-9]+\s*minutes/i
		],
		'running_slow': [
			'running with slower speeds',
			'run at reduced speed',
			'run with reduced speed',
			'slow speed order',
			'slow speed'
		],
	},


	// Misc
	incident_misc: {
		'additional_service': [
			'Additional service',
			/Additional\s*(\[[A-Z0-9]{1,2}\])? service/i
		],
		'bad_weather': [
			'weather conditions',
		],
		'event': [
			'SPECIAL EVENT',
			'Women\'s March',
			'crowd conditions',
			'New Year\'s Eve',
			'Celebrations',
			'graduation ceremony',
			/West\s*Indian-American\s*(Carnival|Parade)?/i,
			'carnival',
			'marathon',
		],
		'crowded_trains': [
			'heavy ridership',
		],
		'exit_only': [
			'EXIT ONLY'
		],
	},


	// Construction
	incident_planned: {
		'general_maintenance': [
			'PRIORITY REPAIRS',
			'SCHEDULED MAINTENANCE',
			'PREVENTIVE MAINTENANCE',
			'STRUCTURAL IMPROVEMENTS',
		],
		'signal_maintenance':[
			'SIGNAL MAINTENANCE',
			'SIGNAL IMPROVEMENTS',
			'SIGNAL MODERNIZATON',
		],
		'station_improvements': [
			'STATION IMPROVEMENTS',
			'STATION ENHANCEMENTS',
		],
		'electrical_improvements': ['ELECTRICAL IMPROVEMENTS'],
		'electrical_repairs': [
			'electrical repairs'
		],
		'equipment_testing': [
			'EQUIPMENT TESTING',
		],
		'track_maintenance': [
			'TRACK MAINTENANCE',
			'TRACK REPLACEMENT',
			'TRACK PLATE INSTALLATION',
			'TRACK INSTALLATION',
			'REPLACEMENT OF POWER & COMMUNICATION CABLES',
		],
		'switch_maintenance': ['switch maintenance'],
		'tunnel_maintenance': ['TUNNEL RECONSTRUCTION'],
		'flood_proofing': [
			'Long-Term Flood Protection',
			'FLOOD PROTECTION'
		],
		'work_train': [
			'WORK TRAIN STAGING',
		]
	},

	date_tags: {
		'late_night': [
			'Late Nights',
			'Late Night'
		],
		'night': [
			'Late Evenings',
			'Late Evening',
			'Evenings',
			'Evening'
		],
		'day': [
			'days',
			'Rush Hours',
			'Rush Hour'
		],
		'morning': [

		],
		'weekend': [
			'Weekends',
			'Weekend'
		],
		'week_day': [
			'Mon to Fri',
		],
		'all_times': [
			'All Times'
		],

		// Jun 4 - 8 -- Jun 11 - 15, Mon to Fri, from 9:45 PM to 5 AM
		// Late Nights, 11 PM Fri, Jun 8 to 5 AM Mon, Jun 11
		// 9:45 PM Fri, Jun 8 to 5 AM Mon, Jun 11
		// Late Nights 10 PM Fri, Jun 8 to 5 AM Mon, Jun 11
		// Late Nights, 9:45 PM Fri, Jun 8 to 5 AM Mon, Jun 11
		// 9:30 PM Fri, Jun 8 to 5 AM Mon, Jun 11
	},
};
