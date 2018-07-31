import axios from 'axios'
import React from 'react'

function HeartButton({ user_id, location_id }) {
  let post = () => {
    axios.post("/favorites", {
      user_id: user_id,
      location_id: location_id
    }).then((e) => console.log('this happened'))
  };
  return <p className="emoji" onClick={post}>❤️</p>;
}

export default HeartButton;
