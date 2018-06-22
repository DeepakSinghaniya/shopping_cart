import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Input, Label } from 'reactstrap';
import renderHTML from 'react-render-html';
import { getSingleProduct, setSingleProduct, setProductsReadyToCart, setProductCount } from '../../Store/Actions/';
import Loader from '../../components/Loader/Loader';
import withErrorHandler from '../../HOC/withHttpErrorHandler';
import axios from '../../http/http';
import ProductCarousel from './ProductCarousel/ProductCarousel';
import './SingleProduct.scss';


class SingleProduct extends Component {
    productReadyFlag = true;

    componentDidMount = () => {
        if (this.props.products.length) {
            let ProductArray = [...this.props.products];
            ProductArray = ProductArray.filter(item => (+this.props.match.params.slug === item.id));
            this.props.setSingleProduct(ProductArray[0]);
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
            if(this.productReadyFlag) {
                this.productReadyFlag = false;
                this.props.setProductsReadyToCart({ ...gropuedProduct });
            }
        }
    }

    
    gropedProductHandler = (e, id) => {
        let value = e.target.value;
        if(value < 0) {
            value = 0;
        }
        this.props.setProductCount({id: id, value: value});
    }
    render() {
        if (this.props.product) {
                return (
                    <Fragment>
                        <Row>
                            <Col md={4}>
                                <ProductCarousel items={this.props.product.images} />
                            </Col>
                            <Col>
                                <h1>{this.props.product.name}</h1>
                                {this.props.product.on_sale ? <Button disabled color="success" >Sale!</Button> : null}
                                <h3>{renderHTML(this.props.product.price_html)}</h3>
                                {!this.props.product.in_stock && !this.props.product.manage_stock ? <span className='out-of-stock'>Out of stock!</span> : null}
                                {this.props.product.type === 'grouped' && this.props.readyToCart && <div className="grouped-product">
                                    <p>This is a grouped product.</p>
                                    {Object.keys(this.props.readyToCart).length && this.props.product.grouped_products.map(item => {
                                        return <Label key={item}><Input type="number" onChange={(e) => this.gropedProductHandler(e, item)} value={this.props.readyToCart[item].count} /> <span className="product-name">{this.props.readyToCart[item].product  && this.props.readyToCart[item].product.name}</span> <span className="price-name">{this.props.readyToCart[item].product  && renderHTML(this.props.readyToCart[item].product.price_html)}</span></Label>
                                    })}
                                </div>}
    
                            </Col>
                        </Row>
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
        setProductCount: (data) => dispatch(setProductCount(data))
    }
}
export default connect(mapStoreToProps, mapDispatchToProps)(withErrorHandler(SingleProduct, axios));