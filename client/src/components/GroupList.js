import React, { Component } from 'react';
import { base } from '../firebase';
import { showError } from '../actions/actions';
import LoadingState from './LoadingState';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

class GroupList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			groups: [],
			loaded: false
		};
	}

	componentWillMount(nextProps) {
		base.fetch(`groups`, {
			context: this,
			asArray: true,
		}).then(groups => {
			this.setState({
				groups,
				loaded: true
			});
		}).catch((err) => {
			this.props.dispatch(showError(err));
		})
	}
	render() {
		var {groups, loaded} = this.state;
		return (
			<div className='w3-col m7'>
     <div className="w3-row-padding">
       <div className="w3-col m12">
         <div className="w3-card-2 w3-round w3-white">
           <div className="w3-container w3-padding w3-center">
             <h3>GROUPS</h3>
             { !loaded && LoadingState() }
             { loaded && groups.map((group, key) => {
               	return (
               		<div key={ key } className="w3-container w3-card-2 w3-white w3-round">
                   <br />
                   <img src={ group.image } alt="Avatar" className="w3-left w3-circle" style={ { width: 60 } } />
                   <h3>{ group.name }</h3>
                   <br />
                   <hr/>
                   <p>
                     { group.description }
                   </p>
                   <button onClick={ () => this.props.dispatch(push(`/dashboard/group/${group.id}`)) } type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment" /> Join Group</button>
                 </div>
               	)
               }) }
           </div>
         </div>
       </div>
     </div>
   </div>
		)
	}
}

// export default GroupList;
export default connect()(GroupList)