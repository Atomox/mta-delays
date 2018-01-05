let mtaSubway = (() => {

	function getlineById (id) {
		switch (id) {
			case 'MTA NYCT_6':
				return 6;
			case 'MTA NYCT_5':
				return 5;
			case 'MTA NYCT_4':
				return 4;

			case 'MTA NYCT_1':
				return 1;
			case 'MTA NYCT_2':
				return 2;
			case 'MTA NYCT_3':
				return 3;

			case 'MTA NYCT_7':
				return 7;

			case 'MTA NYCT_A':
				return 'A';
			case 'MTA NYCT_C':
				return 'C';
			case 'MTA NYCT_E':
				return 'E';
			
			case 'MTA NYCT_N':
				return 'N';
			case 'MTA NYCT_Q':
				return 'Q';
			case 'MTA NYCT_R':
				return 'R';
			case 'MTA NYCT_W':
				return 'W';


			case 'MTA NYCT_B':
				return 'B';
			case 'MTA NYCT_D':
				return 'D';
			case 'MTA NYCT_F':
				return 'F';
			case 'MTA NYCT_M':
				return 'M';

			case 'MTA NYCT_G':
				return 'G';
			case 'MTA NYCT_L':
				return 'L';

			case 'MTA NYCT_J':
				return 'J';
			case 'MTA NYCT_Z':
				return 'Z';

			case 'MTA NYCT_H':
			case 'MTA NYCT_GS':
			case 'MTA NYCT_FS':
				return 'S';
			
			case 'MTA NYCT_SI':
				return 'SIR';

			default:
				return id;
		}
	}

	function getlineDirectionByID(id) {
		if (id == 2) { return 'both'; }
		return (id == 0) ? 'northbound' : 'southbound';
	}


	return({
		getlineById: getlineById,
		getlineDirectionByID:getlineDirectionByID,
	});
})();

module.exports = {
	mtaSubway
};