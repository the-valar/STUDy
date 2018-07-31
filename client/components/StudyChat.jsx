import React from 'react'

class StudyChat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stream: false
        }
        //bind methods
        this.showFace = this.showFace.bind(this)
    }

    componentDidMount() {
        this.showFace()
    }

    //define methods
    showFace() {
        navigator.mediaDevices.getUserMedia({audio: true, video:true})
                 .then(stream => document.getElementById('yourVideo').srcObject = stream)
    }

    //render
    render() {
        return (
            <div>
                <video id="yourVideo" autoPlay muted></video>
                <video id="friendVideo"></video>
            </div>
        )
    }
}

export default StudyChat