import React, { Component, Fragment } from 'react';
import { initialLoadProducts, loadMore } from '../../Store/Actions';
import { connect } from 'react-redux';
import { Row, Col, Button, Input } from 'reactstrap';
import { chunk } from '../../utility/utility';
import Product from '../../components/Product/Product';
import httpInstance from '../../http/http';
import withErrorHandler from '../../HOC/withHttpErrorHandler';
import Loader from '../../components/Loader/Loader';
import './Shop.scss';
import Filter from '../Filters/Filter';

class Shop extends Component {
    componentDidMount() {
        this.props.initProducts(this.props.offset);
    }
    componentWillReceiveProps() {

    }
    loadMore = () => {
        this.props.loadMore(this.props.offset);
    }
    render() {
        const layoutedProducts = chunk(this.props.products, 3);
        return (
            <Fragment>
                <Row className='secton-title'>
                    <Col>
                        <h1>Shop</h1>
                    </Col>
                </Row>
                <Row className="order-by">
                    <Col>
                        <Input type="select" name="orderby" >
                            <option value="popularity" selected="selected">Sort by popularity</option>
                            <option value="rating">Sort by average rating</option>
                            <option value="date">Sort by newness</option>
                            <option value="price">Sort by price: low to high</option>
                            <option value="price-desc">Sort by price: high to low</option>
                        </Input>
                    </Col>
                </Row>
                <Row>


                    <Col md={9}>

                        {layoutedProducts.map((productsRow, index) => {
                            return (
                                <Row key={index}>
                                    {productsRow.map(product => {
                                        return (<Col md={4} key={product.id}><Product {...product} /></Col>);
                                    })}
                                </Row>
                            );
                        })}

                        <Button className='load-more-button' color="success" onClick={this.loadMore}>Load More</Button>

                    </Col>

                    <Col md={3} className="fitler-siderbar">
                        <Filter />
                    </Col>

                </Row>
                <Loader show={this.props.loader} />
            </Fragment>
        );
    }
}
const mapStoreToProps = store => {
    return {
        products: store.shop.products,
        loader: store.shop.loader,
        offset: store.shop.offset
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initProducts: (offset) => dispatch(initialLoadProducts(offset)),
        loadMore: (offset) => dispatch(loadMore(offset))
    }
}
export default withErrorHandler(connect(mapStoreToProps, mapDispatchToProps)(Shop), httpInstance);