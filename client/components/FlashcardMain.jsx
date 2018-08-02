import React from 'react'
import FlashcardApp from 'react-flashcard-app'
import {Button, FormControl, FormGroup} from 'react-bootstrap'

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
            selectedDeckName: '',
            deck: {
                id: 1,
                name: 'Example Deck',
                cards: [
                  {
                    id: 1,
                    front: 'Lorem',
                    back: 'dolor',
                  }
                ],
              }
        }
        //bind section
        this.toggleStudy = this.toggleStudy.bind(this)
        this.toggleDeckCreation = this.toggleDeckCreation.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleSaveCard = this.handleSaveCard.bind(this)
        this.handleDeleteCard = this.handleDeleteCard.bind(this)
        this.handleSaveDeck = this.handleSaveDeck.bind(this)
        this.handleDeckChange = this.handleDeckChange.bind(this)
    }

    //method section
    componentDidMount() {
        this.props.fetchDeckNames()
    }

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

    handleDeleteCard(ind) {
        let deck = this.state.createdDeck
        deck.splice(ind, 1)
        deck.forEach((card, i) => card.id = i+1 )
        console.log(deck)
        this.setState({createdDeck: deck})
    }

    handleSaveDeck() {
        let newDeck = {
            id: 1,
            name: this.state.nameOfNewDeck,
            cards: this.state.createdDeck
        }
        this.setState({createdDeck: [], nameOfNewDeck: ''})
        axios.post('/flashcards', {newDeck: newDeck, user_id: this.props.user_id})
             .then((response) => this.props.fetchDeckNames())
             .catch((err) => console.error('something went wrong saving that deck...', err))
        }

    handleDeckChange(e) {
        this.setState({selectedDeckName: e.target.value})
        axios.get('/flashcardDeck', {params: 
                    {user_id: this.props.user_id, deckName: e.target.value}})
             .then((response) => this.setState({deck: response.data}))
             .catch((err) => console.error(err))
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
                                 onChange = {this.handleValueChange} value = {this.state.nameOfNewDeck} />
                                <br/>
                                <input type='text' placeholder='Front of Card' id = 'frontOfNewCard'
                                 onChange = {this.handleValueChange} value = {this.state.frontOfNewCard} />
                                 <input type='text' placeholder='Back of Card' id = 'backOfNewCard'
                                 onChange = {this.handleValueChange} value = {this.state.backOfNewCard} />
                                <br/>
                                <button onClick = {this.handleSaveCard} >Save this Card</button>
                                <button onClick = {this.handleSaveDeck} >Save this deck</button>
                                <button onClick = {this.toggleDeckCreation}>Back to Flashcard Decks</button>

                                <div className='madeCardContainer'>
                                    {this.state.createdDeck.map((card, ind) => {
                                        return(
                                            <div className='cardContainer'>
                                                <span>{ind+1}. Front: {card.front}</span>  <span>Back: {card.back}</span>
                                                <button onClick={() => this.handleDeleteCard(ind)} className='removeCard'>remove this card</button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
        
                        :
                        //Deck Selection
                        <div style={{width: '70%' }}>
                            <FormControl componentClass='select' onChange={this.handleDeckChange} 
                                placeholder='select a flashcard deck'>
                                <option  value=''>select a flashcard deck</option>
                                {this.props.deckNames.map((name) => {
                                    return(
                                        <option value={name}>{name}</option>
                                    )
                                })}
                            </FormControl>
                            <br/>
                            <Button onClick = {this.toggleStudy} >Study this Deck</Button>
                            <Button onClick = {this.toggleDeckCreation} >Create a new flashcard deck</Button>
                        </div>
                    }
                </div>
            )
        }
    }
}

export default FlashcardMain