import React, {Component} from 'react';

export default class Header extends Component {

	render() {
		return (
			<div className="header">

{/**
				<Archive archive={this.props.archive} stats={this.props.summary}/>
*/}
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
