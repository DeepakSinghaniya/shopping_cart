import React from 'react';
import './Loader.scss';

const loader = (props) => {
	
	const loaderElement = props.show?  <div className='backDrop'> <div className='loader'>Loading...</div> </div> : null;
	
	return loaderElement;
}

export default loader;