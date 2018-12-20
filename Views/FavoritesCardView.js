import React from 'react';
import { StyleSheet, Text, TextInput,
     View, Button, Platform, Image, FlatList, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

export default class FavoritesCardView extends React.Component {

    static navigationOptions = {
        title: 'Favorites Cards',
        headerStyle: {
            backgroundColor: 'steelblue',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
        }
    };
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    async componentWillMount() {
        console.log("componentWillMount")
        const currentUser = await firebase.auth().currentUser
        const id  = await currentUser.uid

        const response = await firebase.database().ref('users/' + id + '/listaFavoritos').once('value');

        let items = [];
        response.forEach(childSnapshot => {
            items.push(childSnapshot.val());
        });

        this.setState({data: items})
    }
    componentDidMount() {
    }

    _renderItem = ({item}) => {
        return  (
            <TouchableOpacity onPress={()=>this._onItemPress(item)} style={{flexDirection:'row', padding: 10}}>
                <Image style={{height: 50, width: 50, borderRadius: 25}} source={{uri: item.imageUrl }} />
                <Text style={{marginLeft: 10, fontSize: 20}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    _onItemPress = (item) => {
        this.props.navigation.navigate('CardDescription', {card: item})
    } 

    onSignout = () => {
        firebase.auth().signOut();
    }

    render() {
        return (
            <FlatList 
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={()=>
                        <View style={{height:1, backgroundColor: '#f7f7f7'}} 
                    />}
                    keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    }
})