import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Input, Button } from 'reactstrap';
import { removeCartItem, changeNumberOfItems } from '../../Store/Actions';

class Cart extends Component {
    goToShop = () => {
        this.props.history.push('/');
    }
    render() {
        if (Object.keys(this.props.cartItems).length > 0) {
            let totalPrice = 0;
            Object.keys(this.props.cartItems).forEach(item => {
                totalPrice = totalPrice + (+this.props.cartItems[item].product.regular_price * this.props.cartItems[item].count);
            })
            return (
                <Fragment>
                    <Row>
                        <Col md={12}>
                            <h1>Cart</h1>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th></th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(this.props.cartItems).map(item => {

                                        return (
                                            <tr key={item}>
                                                <th scope="row"><Button onClick={() => this.props.removeCartItem(item)} color='danger'>Remove</Button></th>
                                                <td><img width="150" src={this.props.cartItems[item].product.images[0].src} alt={this.props.cartItems[item].product.name} /></td>
                                                <td>{this.props.cartItems[item].product.name}</td>
                                                <td>₹{this.props.cartItems[item].product.regular_price}</td>
                                                <td><Input onChange={(e) => { this.props.changeNumberOfItems(e.target.value, item) }} style={{ width: '100px' }} type="number" value={this.props.cartItems[item].count} /></td>
                                                <td>₹{this.props.cartItems[item].count * this.props.cartItems[item].product.regular_price}</td>
                                            </tr>
                                        );
                                    })}


                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>

                        <Col md={{ size: 4, offset: 8 }}>
                            <h3>Cart totals</h3>
                            <h4>Total: ₹{totalPrice}</h4>
                            <Button onClick={() => {
                                this.props.history.push('/checkout/');
                            }} color='success'>Proceed to checkout</Button>
                        </Col>
                    </Row>
                </Fragment>
            );
        } else {
            return (
                <Row>
                    <Col md={12}>
                        <h3>No items found in cart.</h3>
                        <Button onClick={this.goToShop} color='success'>Continue Shopping</Button>
                    </Col>
                </Row>
            );
        }
    }
}

const mapPropsToStore = store => {
    return {
        cartItems: store.cart.cartitems
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        removeCartItem: id => dispatch(removeCartItem(id)),
        changeNumberOfItems: (value, id) => dispatch(changeNumberOfItems(value, id))
    }
}

export default connect(mapPropsToStore, mapPropsToDispatch)(Cart);