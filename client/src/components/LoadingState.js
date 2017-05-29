import React from 'react';

import ReactSVG from 'react-svg';

const LoadingState = (props) => {
	return (
		<div className='w3-center' >
			<ReactSVG 
			path='/ringSVG.svg'
			className='loading'
			 />
		</div>
	)
}

export default LoadingState;