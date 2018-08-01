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
            createdDeck: [],
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
        this.handleSaveCard = this.handleSaveCard.bind(this)
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

    handleSaveCard() {
        let id = this.state.createdDeck.length+1
        let front = this.state.frontOfNewCard;
        let back = this.state.backOfNewCard;
        let newCard = {id: id, front: front, back: back}
        let deck = this.state.createdDeck
        deck.push(newCard)
        this.setState({createdDeck: deck, frontOfNewCard: '', backOfNewCard: ''})
    }

    handleDeleteCard() {
        //
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
                                <button onClick = {this.handleSaveCard} >Save this Card</button>
                                <button onClick = {this.toggleDeckCreation} >save this deck</button>

                                <div className='madeCardContainer'>
                                    {this.state.createdDeck.map((card, ind) => {
                                        return(
                                            <div className='cardContainer'>
                                                <span>{ind+1}. Front: {card.front}</span>  <span>Back: {card.back}</span>
                                                <button className='removeCard'>remove this card</button>
                                            </div>
                                        )
                                    })}
                                </div>
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