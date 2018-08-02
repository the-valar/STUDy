import React from 'react';
import {
  Nav,
  NavItem,
  Button,
  Popover,
  OverlayTrigger
} from 'react-bootstrap';
import StackGrid from 'react-stack-grid';
import ScrollToTop from 'react-scroll-up';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import '../style.css';

class AmazonBar extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      penSource: 'https://cdn1.iconfinder.com/data/icons/education-set-4/512/roller-pencil-512.png',
      paperSource: 'http://www.free-icons-download.net/images/a-stack-of-paper-icon-92340.png',
      postitSource: 'https://d30y9cdsu7xlg0.cloudfront.net/png/7161-200.png',
      hiliterSource: 'https://d30y9cdsu7xlg0.cloudfront.net/png/231154-200.png',
      amazonSource: 'https://i0.wp.com/freepngimages.com/wp-content/uploads/2016/10/amazon-logo.png?fit=624%2C329'
      
    }
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect (key) {
    console.log (this.props.creditCard)
    axios
      .post('/orders', {
        params: {
          productID: key.productID,
          creditCard: this.props.creditCard
        }
    }).then (function (response) {
      console.log (response)
    }).catch (function (error) {
      console (error)
    })
    console.log (key.productKey)
  }

  
  render () {
    return (
      <div class = 'sidebysideLeft'>
        <img src = {this.state.amazonSource} width = '100' height = '52'/>
        <Nav bsStyle = 'pills' stacked activeKey = {1} onSelect = {this.handleSelect}>

          <NavItem eventKey = {
              {
                productID: 'B00347A8NK'
              }
            }>
          <img src= {this.state.penSource} width = '100' height = '100'/>
          </NavItem>
          <NavItem eventKey = {
              {
                productID: 'B00005C55O'
              }
            }>
          <img src= {this.state.paperSource} width = '100' height = '100'/>        
          </NavItem>
          <NavItem eventKey = {
              {
                productID: 'B079X87CY1'
              }
            }>
          <img src= {this.state.postitSource} width = '100' height = '100'/>        
          </NavItem>
          <NavItem eventKey = {
              {
                productID: 'B002BA5WMI'
              }
            }>
          <img src= {this.state.hiliterSource} width = '100' height = '100'/>        
          </NavItem>


        </Nav>
      </div>
    )
  }
}
export default AmazonBar