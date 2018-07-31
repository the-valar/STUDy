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
      this.props.toggleShow()
      alert("Purchase Complete!")
    } 
  }

  render() {
    let elementStyle = {
      base: {
        iconColor: '#c4f0ff',
        color: '#fff',
        fontWeight: 500,
        // fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
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
        <button className='field-button'onClick={this.submit}>Start membership</button>
      </div>
    );
  }
}

export default injectStripe(PaymentForm);