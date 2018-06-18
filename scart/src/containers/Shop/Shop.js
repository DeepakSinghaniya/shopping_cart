import React, { Component, Fragment } from 'react';
import { initialLoadProducts } from '../../Store/Actions';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
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
    loadMore = () => {
        this.props.initProducts(this.props.offset);
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
                <Row>

                    <Col md={3}>
                        <Filter />
                    </Col>
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
                        <Loader show={this.props.loader} />
                    </Col>
                </Row>
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
        initProducts: (offset) => dispatch(initialLoadProducts(offset))
    }
}
export default withErrorHandler(connect(mapStoreToProps, mapDispatchToProps)(Shop), httpInstance);