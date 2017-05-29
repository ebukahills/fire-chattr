import React from 'react';

import ReactSVG from 'react-svg';

const SendingSVG = (props) => {
	return (
		<div className='w3-center' >
			<ReactSVG 
			path='/sendingSVG.svg'
			className='loading'
			 />
		</div>
	)
}

export default SendingSVG;