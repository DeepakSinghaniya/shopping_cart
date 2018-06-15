import React from 'react';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';
import renderHTML from 'react-render-html';
import {Link} from 'react-router-dom';
import bootstrap from '../../assets/scss/bootstrap.scss';
import classes from './Product.scss';

const product = (props) => {
    console.log(props.images);
    return (
        <Card className={[bootstrap['text-center'], classes.Product].join(' ')} cssModule={bootstrap}>
            <Link to={props.slug}>
            <CardImg top width="100%" src={props.images[0].src} alt="Card image cap" />
            </Link>
            <CardBody cssModule={bootstrap}>
                <CardTitle cssModule={bootstrap}>{props.name}</CardTitle>
                {props.on_sale?<span className={classes.saleTag}>Sale!</span>:null}
                <CardSubtitle cssModule={bootstrap}>{renderHTML(props.price_html)}</CardSubtitle>
                {!props.in_stock && !props.manage_stock?<span className={classes['out-of-stock']}>Out of stock!</span>:null}
                {props.type === 'grouped'?
                <Button color="primary" cssModule={bootstrap}>View products</Button>:
                props.type === 'variable'? 
                <Button color="primary" cssModule={bootstrap}>Select options</Button>:
                props.type === 'external'?<Button color="primary" cssModule={bootstrap}>{props.button_text}</Button>:
                <Button color="primary" cssModule={bootstrap}>Add to cart</Button>}
            </CardBody>
        </Card>
    );
}

export default product;