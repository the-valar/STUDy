import React from 'react'
import FlashcardApp from 'react-flashcard-app'

class FlashcardMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDeck: false,
            createDeck: false,
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
        if (this.state.showDeck) {
            return (
                <div>
                    <FlashcardApp data = {this.state.deck} />
                    <button>Back to Flashcard Choice</button>
                </div>
            )
        } else {
            return (
                <div>
                    {
                        this.state.createDeck ?
                            <div>
                                <p>placeholder for deck creation</p>
                            </div>
        
                        :
        
                        <div>
                            <p>Select a flashcard deck to study with!</p>
                            <button>Study this Deck</button>
                            <button>Create a new flashcard deck</button>
                        </div>
                    }
                </div>
            )
        }
    }
}

export default FlashcardMain