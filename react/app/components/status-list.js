let React = require('react');


class StatusList extends React.Component {

	render() {
		let hasMessages = (this.props.text.length > 0) ? true : false;
		let lineClass = (hasMessages) ? 'bad' : 'good';

		let list = '';
		if (hasMessages) {
			list = <ul> {
				this.props.text.map(i => 
					<StatusMessage {...i} />
				) } </ul>;
		}

		return (
			<div>
				<h2>{this.props.line}</h2>
				<span className={lineClass}>
					{
						(hasMessages) ? 'PROBLEMS' : 'GOOD SERVICE'
					}
				</span>
				
				{list}
			</div>
		);
	}
}


class StatusMessage extends React.Component {

	render() {

		let type = this.props.type;

		return (
			<li>
				{ (type == 'PlannedWork') ? type : '<!> ' + type } -- { this.props.message } -- ({this.props.time})
			</li>
		);
	}
}

module.exports = {
	StatusList
};