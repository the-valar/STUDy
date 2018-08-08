import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault()
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await axios.post("/charge", {tokenId: token.id});
    if (response.data.status === 'succeeded'){
      let res = await axios.post("/member",{userId: this.props.userId});
      if(res.data){
        this.props.toggleShow()
        this.props.getUser()
        alert("You are a STUD now!!!")
      }
    } 
  }

  render() {
    let elementStyle = {
      base: {
        iconColor: '#c4f0ff',
        color: '#fff',
        fontWeight: 500,
        fontSize: '16px',
        fontSmoothing: 'antialiased',

        ':-webkit-autofill': {
          color: '#fce883',
        },
        '::placeholder': {
          color: '#87BBFD',
        },
      },
      invalid: {
        iconColor: '#FFC7EE',
        color: '#FFC7EE',
      },
    };

    return (
      <div className="checkout">
        <h3 style={{paddingBottom:'16px'}}>Set up your credit or debit card</h3>
        <div className='field-set'>
          <div className='field-row'>
            <input className='field-input' placeholder="Name"></input>
          </div>
        </div>
        <div className='field-set'>
          <div className='field-row'>
            <CardElement iconStyle='solid' style={elementStyle}/>
          </div>
        </div>
        <div style={{textAlign: "center"}}>Remove ads and many more benefits for only <span style={{fontSize: '125%', color: 'red'}}>$9.99!</span></div>

        <button className='field-button'onClick={this.submit}>Start membership</button>
      </div>
    );
  }
}

export default injectStripe(PaymentForm);