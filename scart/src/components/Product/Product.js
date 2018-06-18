import React from 'react';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';
import renderHTML from 'react-render-html';
import {Link} from 'react-router-dom';
import './Product.scss';

const product = (props) => {
    console.log(props.images);
    return (
        <Card className={['text-center', 'Product'].join(' ')}>
            <Link to={props.slug}>
            <CardImg top width="100%" src={props.images[0].src} alt="Card image cap" />
            </Link>
            <CardBody>
                <CardTitle>{props.name}</CardTitle>
                {props.on_sale?<span className='saleTag'>Sale!</span>:null}
                <CardSubtitle>{renderHTML(props.price_html)}</CardSubtitle>
                {!props.in_stock && !props.manage_stock?<span className='out-of-stock'>Out of stock!</span>:null}
                {props.type === 'grouped'?
                <Button color="primary">View products</Button>:
                props.type === 'variable'? 
                <Button color="primary">Select options</Button>:
                props.type === 'external'?<Button color="link" className='external-link' >{props.button_text}</Button>:
                <Button color="primary">Add to cart</Button>}
            </CardBody>
        </Card>
    );
}

export default product;