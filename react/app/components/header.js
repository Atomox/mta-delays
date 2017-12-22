let React = require('react');
let Card = require('./card');
let moment = require('moment');


class Header extends React.Component {

	render() {
		return (
			<div className="text-center">
				<h1>{moment(this.props.age).format('h:mm A')}</h1>
				<h6>{moment(this.props.age).format('dddd, MMMM Do')}</h6>
				{(this.props.status == 'initializing' || this.props.status === false) 
					? <StateMessage status={this.props.status} />
					: (this.props.numEvents === 0) 
						? <AllClear />
						: null
				}
			</div>
		);
	}
}



class AllClear extends React.Component {
	render() {
		return(
			<Card id={'all-clear'} header={''} headerClass={''}>
				<div>All Good in the 'hood</div>
			</Card>
		);
	}
}

class StateMessage extends React.Component {
	render() {
		let message = '';

		switch (this.props.status) {
			case 'initializing': 
				message = 'Initializing System...';
				break;

			case false:
				message = 'Error talking to Server.';
				break;
		}

		return(
			<Card id={'state-message'} header={''} headerClass={''}>
				<div>{message}</div>
			</Card>
		);
	}
}

module.exports = {
	Header,
	AllClear,
};