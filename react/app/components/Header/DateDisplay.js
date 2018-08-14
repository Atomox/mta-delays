let React = require('react');
let moment = require('moment');

const DateDisplay = (props) => {

	return (
		<div className="DateHeader">
			<h5>{moment(props.age).format('dddd, MMMM Do')}</h5>
			<h1>{moment(props.age).format('h:mm A')}</h1>
			<h4><span className="station">Cathedral Pkwy</span> Release</h4>
		</div>
	);
}

export default DateDisplay;
