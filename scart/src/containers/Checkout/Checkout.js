import React, { Component, Fragment } from 'react';
import { Row, Col, Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import withError from '../../HOC/withHttpErrorHandler';
import axios from '../../http/http';
import { fatchUser, createOrder, emptyCart } from '../../Store/Actions';
import Loader from '../../components/Loader/Loader';

class Checkout extends Component {
    componentDidMount() {
        this.props.fatchUser();
    }
    goToShop = () => {
        this.props.history.push('/');
    }
    createOrder = () => {
        const order = {
            payment_method: "cod",
            payment_method_title: "Cash on delevery",
            set_paid: false,
            line_items: [],
            shipping_lines: [
                {
                    method_id: "flat_rate",
                    method_title: "Free Shipping",
                    total: '0'
                }
            ]
        };

        order.billing = this.props.user.billing;
        order.shipping = this.props.user.shipping;

        Object.keys(this.props.cartItems).map(item => {
            order.line_items.push({ product_id: this.props.cartItems[item].product.id, quantity: this.props.cartItems[item].count });
            return null;
        });
        alert('Order Placed');
        this.props.emptyCart();
        this.props.history.push('/');
        console.log(order);
    }

    render() {
        if (Object.keys(this.props.cartItems).length < 1) {
            return (
                <Row>
                    <Col md={6}>
                        <h1 style={{ margin: '45px 0' }}>No items in cart</h1>
                        <Button onClick={this.goToShop} color='success'>Continue Shopping</Button>
                    </Col>
                </Row>
            );
        }
        const totalProce = Object.keys(this.props.cartItems).map(item => this.props.cartItems[item].product.regular_price * this.props.cartItems[item].count).reduce((total, cVal) => total + +cVal, 0);
        return (
            <Fragment>
                <div>
                    <h1 style={{ margin: '45px 0' }}>Checkout</h1>
                    <Row>
                        <Col md={6}>
                            <h2 style={{ margin: '45px 0 20px' }}>Billing details</h2>
                            {Object.keys(this.props.user).length > 0 && Object.keys(this.props.user.billing).map(item => {
                                return (<p style={{ marginBottom: '15px', textTransform: 'capitalize' }} key={item}><strong>{item.replace('_', ' ')}:</strong> {this.props.user.billing[item]}</p>);
                            })}

                            <h2 style={{ margin: '45px 0 20px' }}>Shipping Address</h2>
                            {Object.keys(this.props.user).length > 0 && Object.keys(this.props.user.shipping).map(item => {
                                return (<p style={{ marginBottom: '15px', textTransform: 'capitalize' }} key={item}><strong>{item.replace('_', ' ')}:</strong> {this.props.user.billing[item]}</p>);
                            })}
                        </Col>
                        <Col md={6}>
                            <h2 style={{ margin: '45px 0 20px' }}>Your order</h2>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th></th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(this.props.cartItems).map(item => {

                                        return (
                                            <tr key={item}>
                                                <td><img width="150" src={this.props.cartItems[item].product.images[0].src} alt={this.props.cartItems[item].product.name} /></td>
                                                <td>{this.props.cartItems[item].product.name}</td>
                                                <td>₹{this.props.cartItems[item].product.regular_price}</td>
                                                <td>{this.props.cartItems[item].count}</td>
                                                <td>₹{this.props.cartItems[item].count * this.props.cartItems[item].product.regular_price}</td>
                                            </tr>
                                        );
                                    })}

                                </tbody>
                            </Table>
                            <h3>Total: ₹ {totalProce}</h3>
                            <Button onClick={this.createOrder} color='success'>Place Order</Button>
                        </Col>
                    </Row>
                </div>
                <Loader show={this.props.loader} />
            </Fragment>
        )
    }
}

const mapSotreToProps = store => {
    return {
        user: store.checkout.user,
        cartItems: store.cart.cartitems,
        loader: store.shop.loader
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fatchUser: () => dispatch(fatchUser()),
        createOrder: (order) => dispatch(createOrder(order)),
        emptyCart: () => dispatch(emptyCart())
    }
}
export default connect(mapSotreToProps, mapDispatchToProps)(withError(Checkout, axios));