import React from 'react';
import {
  Nav,
  NavItem,
  Button
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
      
    }
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect (key) {
//    axios
//      .post('/orders', {
//        params: {
//          productID: key.productID
//        }
//    })
    console.log (key.productKey)
  }
  
  render () {
    return (
      <Nav bsStyle = 'pills' stacked activeKey = {1} bsClass='sidebysideLeft nav' onSelect = {this.handleSelect}>
        <NavItem eventKey = {
            {
              productID: 1
            }
          }>
        <img src='https://static2.jetpens.com/images/a/000/000/244.jpg?mark64=aHR0cDovL3d3dy5qZXRwZW5zLmNvbS9pbWFnZXMvYXNzZXRzL3dhdGVybWFyay5wbmc&markalign64=dG9wLHJpZ2h0&markscale=19&q=90&s=c7fc4b892dba3605f098ebbf19d63734' width = '100' height = '100'/>
        </NavItem>
        <NavItem eventKey = {
            {
              productID: 2
            }
          }>
        <img src='https://static2.jetpens.com/images/a/000/000/244.jpg?mark64=aHR0cDovL3d3dy5qZXRwZW5zLmNvbS9pbWFnZXMvYXNzZXRzL3dhdGVybWFyay5wbmc&markalign64=dG9wLHJpZ2h0&markscale=19&q=90&s=c7fc4b892dba3605f098ebbf19d63734' width = '100' height = '100'/>        
        </NavItem>
        <NavItem eventKey = {
            {
              productID: 3
            }
          }>
        <img src='https://static2.jetpens.com/images/a/000/000/244.jpg?mark64=aHR0cDovL3d3dy5qZXRwZW5zLmNvbS9pbWFnZXMvYXNzZXRzL3dhdGVybWFyay5wbmc&markalign64=dG9wLHJpZ2h0&markscale=19&q=90&s=c7fc4b892dba3605f098ebbf19d63734' width = '100' height = '100'/>        
        </NavItem>
        <NavItem eventKey = {
            {
              productID: 4
            }
          }>
        <img src='https://static2.jetpens.com/images/a/000/000/244.jpg?mark64=aHR0cDovL3d3dy5qZXRwZW5zLmNvbS9pbWFnZXMvYXNzZXRzL3dhdGVybWFyay5wbmc&markalign64=dG9wLHJpZ2h0&markscale=19&q=90&s=c7fc4b892dba3605f098ebbf19d63734' width = '100' height = '100'/>        
        </NavItem>
        
      
      </Nav>
    )
  }
}
export default AmazonBar