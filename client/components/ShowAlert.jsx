import { Alert } from 'react-alert';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import React, { Component } from 'react'

class ShowAlert extends Component {
  render() {
    const options = {
      position: 'top center',
      timeout: 2000,
      offset: '400px',
      transition: 'scale'
    }
    
    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <Alert>
          {alert => ( alert.show('Oh snap! Try Again!') )}
        </Alert>
      </AlertProvider>
    )
  }

}

export default ShowAlert;

