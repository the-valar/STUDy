import React from 'react';

class Map extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>This many cafes: {this.props.cafes.length}</div>
    );
  }

}

export default Map;

