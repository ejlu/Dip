import React from 'react'
import { ExpoConfigView } from '@expo/samples'
import { View, StyleSheet, Text } from 'react-native'
import { f, auth, database, storage } from '../config/config'

export default class Comments extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Under construction. Check back later!</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#fff'
  }
})
