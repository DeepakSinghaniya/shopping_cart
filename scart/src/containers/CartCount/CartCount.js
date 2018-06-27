import React from 'react';
import { connect } from 'react-redux';

const cartCount = props => {
    if (Object.keys(props.cartItems).length > 0) {
        let count = 0;
        let price = 0;
        Object.keys(props.cartItems).forEach(item => {
            count += props.cartItems[item].count
            price += props.cartItems[item].product.regular_price * props.cartItems[item].count;
        });
        return <span>({count}Items, ₹{price})</span>;
    }
    return null;
}

const mapStoreToProps = store => {
    return {
        cartItems: store.cart.cartitems
    }
}
export default connect(mapStoreToProps)(cartCount);