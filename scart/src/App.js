import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Shop from './containers/Shop/Shop';
import Cart from './containers/Cart/Cart';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Header />
        <div className="content">
          <Container>
            <Row>
              <Col xs={12}>
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
