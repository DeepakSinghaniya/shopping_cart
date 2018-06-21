import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    Row,
    Col,
    Button,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import renderHTML from 'react-render-html';
import { getSingleProduct, setSingleProduct } from '../../Store/Actions/';
import Loader from '../../components/Loader/Loader';


class SingleProduct extends Component {

    state = { activeIndex: 0 };
    onExiting = () => {
        this.animating = true;
    }

    onExited = () => {
        this.animating = false;
    }

    next = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.props.product.images.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.props.product.images.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex = (newIndex) => {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    componentDidMount = () => {
        if (this.props.products.length) {
            let ProductArray = [...this.props.products];
            ProductArray = ProductArray.filter(item => (+this.props.match.params.slug === item.id));
            this.props.setSingleProduct(ProductArray[0]);
        } else {
            this.props.getSingleProduct(+this.props.match.params.slug);
        }
    }

    render() {
        if (this.props.product) {
            const { activeIndex } = this.state;
            const slides = this.props.product.images.map((item) => {
                return (
                    <CarouselItem
                        onExiting={this.onExiting}
                        onExited={this.onExited}
                        key={item.src}
                    >
                        <img src={item.src} alt={item.altText} />
                        <CarouselCaption />
                    </CarouselItem>
                );
            });
            return (
                <Fragment>
                    <Row>
                        <Col md={4}>
                            <Carousel
                                activeIndex={activeIndex}
                                next={this.next}
                                previous={this.previous}
                            >
                                <CarouselIndicators items={this.props.product.images} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                                {slides}
                                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                            </Carousel>
                        </Col>
                        <Col>
                            <h1>{this.props.product.name}</h1>
                            {this.props.product.on_sale ? <Button disabled color="success" >Sale!</Button> : null}
                            <h3>{renderHTML(this.props.product.price_html)}</h3>
                            {!this.props.product.in_stock && !this.props.product.manage_stock ? <span className='out-of-stock'>Out of stock!</span> : null}
                            {this.props.product.type === 'grouped'? <p>This is a grouped product.</p>: null}

                        </Col>
                    </Row>
                    <Loader show={this.props.loader} />
                </Fragment>
            );
        }
        return null;
    };



}
const mapStoreToProps = store => {
    return {
        products: store.shop.products,
        loader: store.shop.loader,
        product: store.sinPro.product
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSingleProduct: (id) => dispatch(getSingleProduct(id)),
        setSingleProduct: (product) => dispatch(setSingleProduct(product))
    }
}
export default connect(mapStoreToProps, mapDispatchToProps)(SingleProduct);