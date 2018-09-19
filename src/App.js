import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import 'antd/dist/antd.css'
import './index.css';
import HeaderBar from './client/components/Navigation/Header/Header'
import ListUserContainers from './client/containers/ListUser/ListUserContainers'
import FooterBar from './client/components/Navigation/Footer/footer'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
              <HeaderBar/>
              <div className="content">
                  <ListUserContainers/>
              </div>
              <FooterBar/>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
