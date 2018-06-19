import React from 'react';
import './Footer.scss';

const footer = props => (
    <footer>

        <p className={['copyright', 'text-center'].join(' ')}>
            &copy; 2018 React Shop
        </p>

    </footer>
);

export default footer;