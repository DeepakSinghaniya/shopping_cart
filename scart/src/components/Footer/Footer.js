import React from 'react';
import classes from './Footer.scss';
import bootstrap from '../../assets/scss/bootstrap.scss';

const footer = props => (
    <footer>

        <p className={[classes.copyright, bootstrap['text-center']].join(' ')}>
            &copy; 2018 React Shop
        </p>

    </footer>
);

export default footer;