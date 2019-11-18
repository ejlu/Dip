import React from 'react'
import { ExpoConfigView } from '@expo/samples'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera'
import { f, auth, database, storage } from '../config/config'

export default class UploadScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedin: false,
      imageId: this.uniqueId(),
      hasCameraPermission: false,
      hasCameraRollPermission: false
    }
    this.uploadImage = this.uploadImage.bind(this)
    this.checkCameraPermissions = this.checkCameraPermissions.bind(this)
    this.checkCameraRollPermissions = this.checkCameraRollPermissions.bind(this)
    this.uniqueId = this.uniqueId.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }

  async checkCameraPermissions() {
    let { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  async checkCameraRollPermissions() {
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    this.setState({ hasCameraRollPermission: status === 'granted' })
  }

  uniqueId() {
    return Math.floor((1 + Math.random()) * 0x10000)
  }

  async getImage() {
    //this.checkCameraPermissions()
    this.checkCameraRollPermissions()
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      quality: 1 //decrease to compress image
    })

    if (!result.cancelled) {
      this.uploadImage(result.uri)
    } else {
      console.log('cancelled')
    }
  }

  async uploadImage(uri) {
    let that = this
    const userId = f.auth().currentUser.uid
    const imageId = this.state.imageId
    const response = await fetch(uri)
    const blob = await response.blob()
    const filePath = imageId + '.jpg'
    const ref = storage.ref(`user/${userId}/images`).child(filePath)
    const snapshot = ref.put(blob).on('state_changed', snapshot => {
      console.log('Progress', snapshot.bytesTransferred, snapshot.totalBytes)
    })
  }

  componentDidMount() {
    let that = this
    f.auth().onAuthStateChanged(function(user) {
      if (user) {
        //logged in
        that.setState({ loggedin: true })
        console.log('logged in')
      } else {
        //logged out
        that.setState({ loggedin: false })
        console.log('logged out')
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.loggedin ? (
          <View style={styles.loggedIn}>
            <TouchableOpacity
              onPress={() => this.getImage()}
              style={styles.uploadButton}
            >
              <Text style={styles.uploadButtonText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text>Please log in to upload content</Text>
          </View>
        )}
      </View>
    )
  }
}

UploadScreen.navigationOptions = {
  title: 'Upload Content'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  loggedIn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loggedInText: {
    fontSize: 30,
    paddingBottom: 15
  },
  uploadButton: {
    marginTop: 10,
    marginHorizontal: 40,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 1.5,
    backgroundColor: '#3392FF'
  },
  uploadButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15
  },
  notLoggedIn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
