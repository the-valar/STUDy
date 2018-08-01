import React from 'react'
import FlashcardApp from 'react-flashcard-app'

class FlashcardMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deck: {
                id: 1,
                name: 'Example Deck',
                cards: [
                  {
                    id: 1,
                    front: 'Lorem',
                    back: 'dolor',
                  },
                  {
                    id: 2,
                    front: 'sit',
                    back: 'amet',
                  },
                  {
                    id: 3,
                    front: 'consetetur',
                    back: 'sadipscing',
                  },
                  {
                    id: 4,
                    front: 'sed',
                    back: 'diam',
                  },
                ],
              }
        }
        //bind section
    }

    //method section


    //render section
    render() {
        return (
            <FlashcardApp data = {this.state.deck} />
        )
    }
}

export default FlashcardMain