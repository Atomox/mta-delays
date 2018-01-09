const taxonomy = {

	incident_types: {
		// Incidents
		'service_resumed': [
			'service has resumed',
			'following an earlier incident',
			'resumed service',
			'service resumed',
		],
		'delays': [
			'delays',
			'running with delays',
		],
		'illness': [
			'sick passenger',
			'medical attention',
			'medical assistance',
		],
		'injury': [
			'person struck by a train',
			'customer injury',
			'injured passenger',
		],
		'signal_problems': ['signal problems'],
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
		'rail_condition': [
			'rail condition',
			'track condition',
		],
		'switch_problems': ['switch problems'],


		// Diversions.
		'operate_sections': [
			'operates in two sections,'
		],
		'shuttle_bus': [
			'[SB]',
			'Shuttle Bus',
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
		],
		'alternate_trains': [
			'alternate trains',
			'some trains',
		],
		'no_trains': [
			'No trains running',
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
		],
		'platform_change' :[
			'trains board at',
			'trains baord on',
		],
		'running_express': [
			'running express',
			'trains run express',
		],
		'running_slow': [
			'running with slower speeds',
			'run at reduced speed',
			'run with reduced speed',
		],

		// Misc
		'additional_service': ['Additional service'],
		'bad_weather': [
			'weather conditions',
		],
		'event': [
			'New Year\'s Eve',
			'Celebrations',
		],


		// Construction
		'general_maintenance': [
			'PRIORITY REPAIRS',
			'SCHEDULED MAINTENANCE',
			'PREVENTIVE MAINTENANCE',
			'STRUCTURAL IMPROVEMENTS',
		],
		'signal_maintenance':[
			'SIGNAL MAINTENANCE',
			'SIGNAL IMPROVEMENTS',
		],
		'station_improvements': [
			'STATION IMPROVEMENTS',
			'STATION ENHANCEMENTS',
		],
		'electrical_improvements': ['ELECTRICAL IMPROVEMENTS'],
		'track_maintenance': [
			'TRACK MAINTENANCE',
			'TRACK REPLACEMENT',
			'TRACK PLATE INSTALLATION',
			'TRACK INSTALLATION',
			'REPLACEMENT OF POWER & COMMUNICATION CABLES',
		],
		'tunnel_maintenance': ['TUNNEL RECONSTRUCTION'],
	},
};

module.exports = taxonomy;
