import React from 'react';
import { StyleSheet, Text, TextInput,
     View, Button, Platform, Image, Alert } from 'react-native';
import * as firebase from 'firebase';
import ApiKeys from '../FirebaseApiKeys';

export default class LoginView extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', errorMessage: null };
    }
    componentWillMount() {
    }
    componentDidMount() {
    }

    _handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            
        }, (error) => {
            Alert.alert(error.message);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: 'white', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 23, color: 'black'}}>The Magic Info App</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}> </Text>
                </View>
                <Text>Login</Text>
                    {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="E-mail"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Senha"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Text style={{fontWeight: 'bold', fontSize: 5}}> </Text>
                <Button title="Login" onPress={this._handleLogin} />
                <Text style={{fontWeight: 'bold', fontSize: 5}}> </Text>
                <Button
                    title="Não possui uma conta? Cadastre-se"
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
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