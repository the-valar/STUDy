import React from 'react';
import {
  Nav,
  NavItem,
  Button,
  Popover,
  OverlayTrigger,
  Collapse,
  Well
} from 'react-bootstrap';
import StackGrid from 'react-stack-grid';
import ScrollToTop from 'react-scroll-up';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import '../style.css';
import AmazonBarCollapse from './AmazonBarCollapse.jsx'

class AmazonBar extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      penSource: 'https://cdn1.iconfinder.com/data/icons/education-set-4/512/roller-pencil-512.png',
      paperSource: 'http://www.free-icons-download.net/images/a-stack-of-paper-icon-92340.png',
      postitSource: 'https://d30y9cdsu7xlg0.cloudfront.net/png/7161-200.png',
      hiliterSource: 'https://d30y9cdsu7xlg0.cloudfront.net/png/231154-200.png',
      amazonSource: 'http://merivisfoundation.org/wp-content/uploads/2018/02/Amazon-Logo-Transparent-PNG.png',
      openStatuses: {
        paper: false,
        pens: false,
        'post-its': false,
        'high-liters': false
      },
      products: {
        paper: {},
        pens: {},
        'post-its': {},
        'high-liters': {}
      }
    }
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect (key) {
    console.log (this.props.creditCard)
    let openObj = Object.assign({}, this.state.openStatuses)
    openObj[key.productName] = !openObj[key.productName]
    this.setState ({openStatuses: openObj})

//    axios
//      .post('/orders', {
//        params: {
//          productID: key.productID,
//          creditCard: this.props.creditCard
//        }
//    }).then (function (response) {
//      console.log (response)
//    }).catch (function (error) {
//      console (error)
//    })
    console.log ('Key.productKey', key.productName)
  }

  
  render () {
    return (
      <div class = 'sidebysideLeft'>
        <img src = {this.state.amazonSource} width = '100' height = '100'/>
        <Nav bsStyle = 'pills' stacked activeKey = {1} onSelect = {this.handleSelect}>

          <NavItem eventKey = {
              {
                productName: 'pens',
                productID: 'B00347A8NK'
              }
            }>
          <img src= {this.state.penSource} width = '100' height = '100'/>
          <AmazonBarCollapse openStatus = {this.state.openStatuses['pens']} productName = {'pens'}/>

          </NavItem>
          <NavItem eventKey = {
              {
                productName: 'paper',
                productID: 'B00005C55O'
              }
            }>
          <img src= {this.state.paperSource} width = '100' height = '100'/>   
          <AmazonBarCollapse openStatus = {this.state.openStatuses['pens']} productName = {'pens'}/>
            
          </NavItem>
          <NavItem eventKey = {
              {
                productName: 'post-its',
                productID: 'B079X87CY1'
              }
            }>
          <img src= {this.state.postitSource} width = '100' height = '100'/>        
           <AmazonBarCollapse openStatus = {this.state.openStatuses['pens']} productName = {'pens'}/>
          </NavItem>
          <NavItem eventKey = {
              {
                productName: 'high-lighters',
                productID: 'B002BA5WMI'
              }
            }>
          <img src= {this.state.hiliterSource} width = '100' height = '100'/>  
          <AmazonBarCollapse openStatus = {this.state.openStatuses['pens']} productName = {'pens'}/>

          </NavItem>


        </Nav>
      </div>
    )
  }
}
export default AmazonBar