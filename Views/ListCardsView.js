import React from 'react';
import { StyleSheet, Text, TextInput,
     View, Button, Platform, Image, FlatList, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

export default class ListCardsView extends React.Component {

    static navigationOptions = {
        title: 'Cards',
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
        const response = await fetch('https://api.magicthegathering.io/v1/cards')
        const responseJson = await response.json()
        this.setState({data: responseJson.cards})
    }
    componentDidMount() {
    }

    _renderItem = ({item}) => {
        return  (
            <TouchableOpacity onPress={()=>this._onItemPress(item)} style={{flexDirection:'row', padding: 10, alignItems:'center'}}>
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
            <View style={styles.container}>
                <FlatList 
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={()=>
                        <View style={{height:1, backgroundColor: '#f7f7f7'}} 
                    />}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Text style={{fontWeight: 'bold', fontSize: 10}}> </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button style={styles.button}
                        onPress={() => this.props.navigation.navigate('FavoritesCards')}
                        title="Favorites List"/>
                    <Text style={{fontWeight: 'bold', fontSize: 10}}>           </Text>
                    <Button style={styles.button}
                        onPress={() => this.onSignout()}
                        title="Logoff"/>
                </View>
            </View>
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