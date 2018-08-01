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
        this.toggleStudy = this.toggleStudy.bind(this)
        this.toggleDeckCreation = this.toggleDeckCreation.bind(this)
    }

    //method section

    toggleStudy() {
        let old = this.state.showDeck;
        this.setState({showDeck: !old})
    }

    toggleDeckCreation() {
        let old = this.state.createDeck
        this.setState({createDeck: !old})
    }


    //render section
    render() {
        if (this.state.showDeck) {
            return (
                <div>
                    <FlashcardApp data = {this.state.deck} />
                    <button onClick = {this.toggleStudy} >Back to Flashcard Choice</button>
                </div>
            )
        } else {
            return (
                <div>
                    {
                        this.state.createDeck ?
                            <div>
                                <p>placeholder for deck creation</p>
                                <button onClick = {this.toggleDeckCreation} >save this deck</button>
                            </div>
        
                        :
        
                        <div>
                            <p>Select a flashcard deck to study with!</p>
                            <button onClick = {this.toggleStudy} >Study this Deck</button>
                            <button onClick = {this.toggleDeckCreation} >Create a new flashcard deck</button>
                        </div>
                    }
                </div>
            )
        }
    }
}

export default FlashcardMain