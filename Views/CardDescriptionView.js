import React, { Component } from 'react'
import { ScrollView, Image, Dimensions, Text, TouchableOpacity, Alert } from 'react-native'
import * as firebase from 'firebase';

const SCREEN_WIDTH = Dimensions.get('screen').width

export default class Description extends Component {

    static navigationOptions = {
        title: 'Card Details',
        headerStyle: {
            backgroundColor: 'steelblue',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
        }
    }

    _onItemPress = (card) => {
        this.atualizarListaFavoritos(card);
    }

    async atualizarListaFavoritos(card) {
        try {
            var cartaEstaNaListaFavoritos = false;
            const currentUser = await firebase.auth().currentUser
            const id  = await currentUser.uid
            const result = await firebase.database().ref('users/' + id);
            const resultImage = await firebase.database().ref('users/' + id + '/listaFavoritos').once('value');

            let items = [];

            resultImage.forEach(childSnapshot => {
                if(card.number == childSnapshot.val().number) {
                    cartaEstaNaListaFavoritos = true;
                } else {
                    items.push(childSnapshot.val());
                    
                }
            });

            if (!cartaEstaNaListaFavoritos) {
                items.push(card);
                Alert.alert('Card added to favorites list.')
            } else {
                Alert.alert('Card removed of favorites list.')
            }

            result.update({
                listaFavoritos: items
            });

          } catch (error) {
            console.log(error.toString())
          } 
    }

    render() {
        const { card } = this.props.navigation.state.params
        return (
           <ScrollView>
               <Image 
                    source={{uri: card.imageUrl }} 
                    style={{width:SCREEN_WIDTH, height:SCREEN_WIDTH}}
                />
                <TouchableOpacity onPress={()=>this._onItemPress(card)} style={{flexDirection:'row', padding: 10, alignItems:'center'}}>
                    <Image style={{height: 20, width: 20, borderRadius: 25}} source={require('../StarIcon.png')} />
                </TouchableOpacity>
                <Text style={{padding:10, fontSize:20, fontWeight: 'bold'}}>{card.name}</Text>
                <Text style={{padding:10}}>Rarity: {card.rarity}   -   Mana Cost: {card.manaCost}</Text>
                <Text style={{padding:10}}>{card.originalText}</Text>
           </ScrollView> 
        )
    }
}