import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '', 
      password: '',
      listaFav: [],
      errorMessage: null
    }
  }

async insertUserData() {
  try{
      const currentUser = await firebase.auth().currentUser
      const id  = await currentUser.uid
      const result = firebase.database()
          .ref('users/' + id).set({
              username: this.state.nome,
              email: this.state.email,
              listaFavoritos: this.state.listaFav
              });
  } catch (error) {
      console.log(error.toString())
  }
}

handleSignUp = () => {
  if (this.state.nome == '' || this.state.email == '' || this.state.password == '') {
    Alert.alert("Todos os campos são de preenchimento obrigatório!")
    return
  }

  firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then(() => {
    try {
      const currentUser = firebase.auth().currentUser
      const id  = currentUser.uid
      const result = firebase.database()
          .ref('users/' + id).set({
              username: this.state.nome,
              email: this.state.email,
              listaFavoritos: this.state.listaFav
              });
    } catch (error) {
      console.log(error.toString())
    }
  }, (error) => {
    Alert.alert(error.message);
  });
}
render() {
    return (
      <View style={styles.container}>
        <Text>Cadastre-se</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Nome"
          autoCapitalize="characters"
          style={styles.textInput}
          onChangeText={nome => this.setState({ nome })}
          value={this.state.nome}
        />
        <TextInput
          placeholder="E-mail"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Senha"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Text style={{fontWeight: 'bold', fontSize: 5}}> </Text>
        <Button title="Cadastrar conta" onPress={this.handleSignUp} />
        <Text style={{fontWeight: 'bold', fontSize: 5}}> </Text>
        <Button
          title="Já possui uma conta? Faça Login"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    )
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