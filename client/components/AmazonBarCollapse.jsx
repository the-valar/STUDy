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

var AmazonBarCollapse  = (props) => {
  return (
    <Collapse in = {props.openStatus}>
      <div>
        <Well>
          Buy {props.productName}?
          <div>
            <Button>Yes</Button>
          </div>
        </Well>
      </div>
    </Collapse>
  
  )
}
export default AmazonBarCollapse;