import React from 'react';
import classes from './Loader.scss';

const loader = (props) => {
	
	const loaderElement = props.show?  <div className={classes.backDrop}> <div className={classes.loader}>Loading...</div> </div> : null;
	
	return loaderElement;
}

export default loader;