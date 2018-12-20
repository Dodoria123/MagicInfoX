import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginView from './Views/LoginView';
import SignUpView from './Views/SignUpView';
import ListCardsView from './Views/ListCardsView';
import CardDescriptionView from './Views/CardDescriptionView';
import FavoritesCardView from './Views/FavoritesCardView';
import * as firebase from 'firebase';
import ApiKeys from './FirebaseApiKeys';

export default class App extends React.Component {

  constructor(props) { 
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false
    };
  
    YellowBox.ignoreWarnings(['Setting a timer']);
  
    if(!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.setState({isAuthenticationReady: true});
    this.setState({isAuthenticated: !!user});
  }

  componentWillMount() {
    //console.log("componentWillMount")
    //firebase.auth().signOut();
  }
  componentDidMount() {
      //console.log("componentDidMount")  
  }

  render() {
    return (
      (this.state.isAuthenticated) ? <MagicAppContainer/> : <LoginContainer />
    );
  }
}

const LoginNavigator = createStackNavigator({
  Home: LoginView,
  SignUp: SignUpView 
}, {
  initialRouteName: "Home"
});

const MagicAppNavigator = createStackNavigator({
  CardsList: ListCardsView,
  CardDescription: CardDescriptionView,
  FavoritesCards: FavoritesCardView
}, {
  initialRouteName: "CardsList"
});

const LoginContainer = createAppContainer(LoginNavigator);
const MagicAppContainer = createAppContainer(MagicAppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
