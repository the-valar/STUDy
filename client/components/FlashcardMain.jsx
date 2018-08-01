import React from 'react'
import FlashcardApp from 'react-flashcard-app'

const axios = require('axios')

class FlashcardMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDeck: false,
            createDeck: false,
            nameOfNewDeck: '',
            frontOfNewCard: '',
            backOfNewCard: '',
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
        this.handleValueChange = this.handleValueChange.bind(this)
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

    handleValueChange(e) {
        e.preventDefault()
        let key = e.target.id
        this.setState({ [key]: e.target.value })
    }


    //render section
    render() {
        if (this.state.showDeck) {
            return (
                //Study selected Deck
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
                        //Deck Creation
                            <div>
                                <input type= 'text' placeholder='Name of New Deck' id = 'nameOfNewDeck'
                                 onChange = {this.handleValueChange} />
                                <br/>
                                <input type='text' placeholder='Front of Card' id = 'frontOfNewCard'
                                 onChange = {this.handleValueChange} />
                                 <input type='text' placeholder='Back of Card' id = 'backOfNewCard'
                                 onChange = {this.handleValueChange} />
                                <br/>
                                <button>Save this Card</button>
                                <button onClick = {this.toggleDeckCreation} >save this deck</button>
                            </div>
        
                        :
                        //Deck Selection
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