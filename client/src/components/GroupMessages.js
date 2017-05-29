import React, { Component } from 'react';
import { base, storageRef } from '../firebase';
import { connect } from 'react-redux';
import moment from 'moment';

import LoadingState from './LoadingState';
import SendingSVG from './SendingSVG';

class GroupMessages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			message: '',
			loaded: false,
			sending: false,
			imgSrc: '',
			uploadFile: null,
		};
	}
	componentWillMount() {
		base.bindToState(`groupMessages/${this.props.match.params.id}`, {
			context: this,
			state: 'messages',
			asArray: true,
			queries: {
				orderByKey: 'time',
				limitToLast: 50,
			}
		})

		setTimeout(() => {
			this.setState({
				loaded: true
			})
		}, 3000);
	}

	typeMessage = (e) => {
		this.setState({
			message: e.target.value
		});
		console.log(e.target.value);
	}

	sendMessage = () => {
		this.setState({
			message: '',
			sending: true
		});
		if (this.state.message) {
			base.push(`groupMessages/${this.props.match.params.id}`, {
				data: {
					time: Date.now(),
					image: this.props.user.profilePic,
					userName: this.props.user.userName,
					message: this.state.message,
					type: 'text',
					userID: this.props.user.userID
				}
			}).then(() => {
				this.setState({
					sending: false
				})
			}).catch((err) => {
				console.log(err);
			})
		}
	}

	sendMessageForm = (e) => {
		e.preventDefault();
		this.sendMessage();
		console.log('Send Message Form');
	}

	attachFile = (e) => {
		console.log('Attach File')
		console.info(e.target.files);
		var file = e.target.files[0];
		this.setState({
			uploadFile: file
		})
		var reader = new FileReader();
		reader.onload = (evt) => {
			this.setState({
				imgSrc: evt.target.result
			});
		}
		reader.readAsDataURL(file);
	}

	uploadImage = () => {
		this.setState({
			sending: true
		});
		var uploadTask = storageRef.child(`messages/${this.props.user.userID}/${Date.now()}`).put(this.state.uploadFile);
		console.log(uploadTask);
		uploadTask.on('state_changed', (snapshot) => {

		}, (err) => {

		}, () => {
			base.push(`groupMessages/${this.props.match.params.id}`, {
				data: {
					time: Date.now(),
					image: this.props.user.profilePic,
					userName: this.props.user.userName,
					message: uploadTask.snapshot.downloadURL,
					type: 'image',
					userID: this.props.user.userID
				}
			}).then(() => {
				this.setState({
					sending: false,
					imgSrc: '',
				})
			}).catch((err) => {
				console.log(err);
			})
		})
	}

	render() {
		var {messages, loaded, imgSrc} = this.state;
		return (
			<div>
     { /* Middle Column */ }
     <div className="w3-col m7">
       <div className="w3-row-padding">
         <div className="w3-col m12">
           <div className="w3-card-2 w3-round w3-white">
             <div className="w3-container w3-padding w3-col w3-card">
               <form onSubmit={ this.sendMessageForm }>
                 <div className="w3-row w3-section">
                   <div className="w3-col" style={ { width: '80%' } }>
                     <input onChange={ this.typeMessage } value={ this.state.message } className="w3-input w3-round" name="message" type="text" placeholder="Message..." />
                   </div>
                   <div className="w3-rest w3-center">
                     <input onChange={ this.attachFile } id='fileUpload' ref='fileUpload' style={ { display: 'none' } } type="file" />
                     { ' ' }<i onClick={ () => this.refs.fileUpload.click() } className="w3-xlarge fa fa-paperclip" />
                     { /*TODO: React Dropzone with preview?*/ }
                     { '  ' }<i onClick={ this.sendMessage } className="w3-xlarge fa fa-send-o" />
                   </div>
                 </div>
                 { imgSrc && (
                   <div>
                     <img src={ this.state.imgSrc } style={ { width: '50%' } } alt="" />
                     { '  ' }
                     <button className="w3-button w3-white w3-border w3-border-red w3-round-large" onClick={ this.uploadImage }>Send Image</button>
                   </div>
                   ) }
                 { this.state.sending && <div className='w3-center'>
                                           { SendingSVG() }
                                         </div> }
               </form>
             </div>
           </div>
         </div>
       </div>
       { !loaded && LoadingState() }
       { loaded && messages.slice(0).reverse().map((message, key) => {
         	if (message.type === 'image') {
         		return (
         			<div key={ key } className="w3-container w3-card-2 w3-white w3-round w3-margin">
              <br />
              <img src={ message.image } alt="Avatar" className="w3-left w3-circle w3-margin-right" style={ { width: 60 } } />
              <span className="w3-right w3-opacity">{ moment(message.time).fromNow() }</span>
              <h4>{ message.userName }</h4>
              <br />
              <hr className="w3-clear" />
              <div className="w3-row-padding" style={ { margin: '0 -16px' } }>
                <div className="w3-center">
                  <img src={message.message} style={ { width: '50%' } } alt="image" className="w3-margin-bottom" />
                </div>
              </div>
              { /*<span><i className={ 'fa fa-heart ' + message.likes ? 'redC' : '' }></i> { message.likes || '' }</span>*/ }
            </div>
         		)
         	} else {
         		return (
         			<div key={ key } className="w3-container w3-card-2 w3-white w3-round w3-margin">
              <br />
              <img src={ message.image } alt="Avatar" className="w3-left w3-circle w3-margin-right" style={ { width: 60 } } />
              <span className="w3-right w3-opacity">{ moment(message.time).fromNow() }</span>
              <h4>{ message.userName }</h4>
              <br />
              <hr className="w3-clear" />
              <p>
                { message.message }
              </p>
              { /*<span><i className={ 'fa fa-heart ' + message.likes ? 'redC' : '' }></i> { message.likes || '' }</span>*/ }
            </div>
         		)
         	}
         }) }
       { /* End Middle Column */ }
     </div>
   </div>
		)
	}
}

// export default GroupMessages;
const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}
export default connect(mapStateToProps)(GroupMessages);