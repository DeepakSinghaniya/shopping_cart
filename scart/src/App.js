import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Bootstrap from './assets/scss/bootstrap.scss';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Shop from './containers/Shop/Shop';
import Cart from './containers/Cart/Cart';
import classes from './App.scss';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>

        <Header />
        <div className="content">
          <Container cssModule={Bootstrap}  >
            <Row cssModule={Bootstrap}>
              <Col cssModule={Bootstrap} xs={12}>
                <Switch>
                  <Route exact path='/' component={Shop} />
                  <Route path='/cart' component={Cart} />
                </Switch>

              </Col>
            </Row>
          </Container>
        </div>

        <Footer />

      </div>
    );
  }
}


export default App;
