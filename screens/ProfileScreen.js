import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { ExpoLinksView } from '@expo/samples'
import { f, auth, database, storage } from '../config/config'

export default class ProfileScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      name: '',
      picture: '',
      loaded: false
    }
    this.checkParams = this.checkParams.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.logout = this.logout.bind(this)
    this.registerUser = this.registerUser.bind(this)
  }

  checkParams() {
    console.log('nav items:', this.props.navigation)
    const params = this.props.navigation.state.params
    console.log('params:', params)
    if (params) {
      if (params.userId) {
        this.setState({
          userId: params.userId
        })
        this.getUserInfo(params.userId)
      }
    }
  }

  getUserInfo(userId) {
    console.log('getting user info...')
    let that = this
    database
      .ref('users')
      .child(userId)
      .child('username')
      .once('value')
      .then(function(snapshot) {
        const exists = snapshot.val() !== null
        if (exists) {
          data = snapshot.val()
        }
        that.setState({ username: data })
      })
      .catch(error => console.log(error))

    database
      .ref('users')
      .child(userId)
      .child('name')
      .once('value')
      .then(function(snapshot) {
        const exists = snapshot.val() !== null
        if (exists) {
          data = snapshot.val()
        }
        that.setState({ name: data })
      })
      .catch(error => console.log(error))

    database
      .ref('users')
      .child(userId)
      .child('picture')
      .once('value')
      .then(function(snapshot) {
        const exists = snapshot.val() !== null
        if (exists) {
          data = snapshot.val()
        }
        that.setState({ picture: data, loaded: true })
      })
      .catch(error => console.log(error))
  }

  logout() {
    auth
      .signOut()
      .then(() => console.log('logged out'))
      .catch(error => console.error(error))
  }

  registerUser = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => console.log(email, user))
      .catch(error => console.error(error))
  }

  componentDidMount() {
    this.checkParams()
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loaded ? (
          <View style={styles.container}>
            <View style={styles.content}>
              <Image
                source={{
                  uri: this.state.picture
                }}
                style={styles.profilePic}
              />
              <View style={styles.userName}>
                <Text>{`Name: ${this.state.name}`}</Text>
                <Text>{`Username: ${this.state.username}`}</Text>
              </View>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => this.logout()}
                style={styles.logoutButton}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.otherButtons}>
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.otherButtons}
                onPress={() => this.props.navigation.navigate('Upload')}
              >
                <Text style={styles.buttonText}>Upload Content</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.loading}>
            <Text>Loading...</Text>
          </View>
        )}
      </View>
    )
  }
}

ProfileScreen.navigationOptions = {
  title: 'My Profile'
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10
  },
  profilePic: {
    marginLeft: 10,
    width: 200,
    height: 200,
    borderRadius: 100
  },
  userName: {
    marginRight: 10
  },
  buttons: {
    paddingBottom: 20,
    borderBottomWidth: 1
  },
  logoutButton: {
    marginTop: 10,
    marginHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 1.5,
    backgroundColor: 'red'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  },
  otherButtons: {
    marginTop: 10,
    marginHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 1.5,
    backgroundColor: '#3392FF'
  }
})
