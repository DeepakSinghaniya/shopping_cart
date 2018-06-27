import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    Row,
    Col,
    Button,
    Input,
    Label,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import renderHTML from 'react-render-html';
import { getSingleProduct, setSingleProduct, setProductsReadyToCart, setProductCount,addToCart } from '../../Store/Actions/';
import Loader from '../../components/Loader/Loader';
import withErrorHandler from '../../HOC/withHttpErrorHandler';
import axios from '../../http/http';
import ProductCarousel from './ProductCarousel/ProductCarousel';
import './SingleProduct.scss';
import classnames from 'classnames';

class SingleProduct extends Component {
    productReadyFlag = true;
    state = {
        activeTab: '1'
    };
    componentDidMount = () => {
        if (this.props.products.length) {
            let ProductArray = [...this.props.products];
            ProductArray = ProductArray.filter(item => (+this.props.match.params.slug === item.id));
            this.props.setSingleProduct(ProductArray[0]);
            if ('grouped' === ProductArray[0].type) {
                this.props.getSingleProduct(+this.props.match.params.slug);
            }
        } else {
            this.props.getSingleProduct(+this.props.match.params.slug);
        }

    }
    componentWillReceiveProps() {
        if (this.props.product) {
            const gropuedProduct = {};
            this.props.product.grouped_products.map(item => {
                gropuedProduct[item] = { count: 0 }
                return null;
            });
            if (this.productReadyFlag) {
                this.productReadyFlag = false;
                this.props.setProductsReadyToCart({ ...gropuedProduct });
            }
        }
    }


    gropedProductHandler = (e, id) => {
        let value = e.target.value;
        if (value < 0) {
            value = 0;
        }
        this.props.setProductCount({ id: id, value: value });
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        if (this.props.product) {
            return (
                <Fragment>
                    <Row className='single-product-wrapper'>
                        <Col md={4}>
                            <ProductCarousel items={this.props.product.images} />
                        </Col>
                        <Col>
                            <h1>{this.props.product.name}</h1>
                            {this.props.product.on_sale ? <Button disabled={true} color="success" >Sale!</Button> : null}
                            <h3>{renderHTML(this.props.product.price_html)}</h3>
                            {this.props.product && renderHTML(this.props.product.short_description)}
                            {!this.props.product.in_stock && !this.props.product.manage_stock ? <span className='out-of-stock'>Out of stock!</span> : null}
                            {this.props.product.type === 'grouped' && this.props.readyToCart && <div className="grouped-product">
                                {Object.keys(this.props.readyToCart).length && this.props.product.grouped_products.map(item => {
                                    return <Label key={item}><Input type="number" onChange={(e) => this.gropedProductHandler(e, item)} value={this.props.readyToCart[item].count} /> <span className="product-name">{this.props.readyToCart[item].product && this.props.readyToCart[item].product.name}</span> <span className="price-name">{this.props.readyToCart[item].product && renderHTML(this.props.readyToCart[item].product.price_html)}</span></Label>
                                })}
                                <Button onClick={() => {
                                    console.log(this.props.readyToCart);
                                    const addToCartInstance = {};
                                    Object.keys(this.props.readyToCart).forEach(item => {
                                        if(0 < this.props.readyToCart[item].count) {
                                            addToCartInstance[item] = this.props.readyToCart[item] ;
                                        }
                                    });
                                   return this.props.addToCart(addToCartInstance);
                                }} color="primary">Add to cart</Button>
                            </div>}
                            {this.props.product.type === 'simple' && <div className="simple-product">
                           
                                <Button onClick={() => {this.props.addToCart({[this.props.product.id] : {count: 1, product: this.props.product}})}} color="primary">Add to cart</Button>
                            </div>}


                            <hr />

                            <p>SKU: {this.props.product && this.props.product.sku}</p>
                            <p>Categories: {this.props.product && this.props.product.categories.map(itme => itme.name).join(', ')}</p>



                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}
                                    >
                                        Description
										</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}
                                    >
                                        Reviews
										</NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                        <Col sm="12">
                                            <h2>Description</h2>
                                            {this.props.product && renderHTML(this.props.product.description)}
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col sm="12">
                                            <h2>This section is not implemented yet.</h2>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>



                        </Col>
                    </Row>
                    <Loader show={this.props.loader} />
                </Fragment>
            );


        }
        return <Loader show={this.props.loader} />;
    };



}
const mapStoreToProps = store => {
    return {
        products: store.shop.products,
        product: store.sinPro.product,
        readyToCart: store.sinPro.productReadyToCart,
        loader: store.shop.loader,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSingleProduct: (id) => dispatch(getSingleProduct(id)),
        setSingleProduct: (product) => dispatch(setSingleProduct(product)),
        setProductsReadyToCart: (data) => dispatch(setProductsReadyToCart(data)),
        setProductCount: (data) => dispatch(setProductCount(data)),
        addToCart: (items) => dispatch(addToCart(items))
    }
}
export default connect(mapStoreToProps, mapDispatchToProps)(withErrorHandler(SingleProduct, axios));