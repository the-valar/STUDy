import React from 'react' 
export default class TestAds extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <div id="banner">
        <a href="https://www.hackreactor.com/" target="_blank">
          <div id="target"></div>
          <img id="product" src="http://base.webdesignforyou.net/banner/product.png"></img>
          <div id="badge">SAVE NOW!</div>
          <div id="sale">
              <span id="sale-text">30% off All Spa Products</span><br/>
              <span id="button">See Special</span>
          </div>
        </a>
    </div>
    )
  }
}