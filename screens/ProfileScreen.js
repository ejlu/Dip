import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { ExpoLinksView } from '@expo/samples'
import { f, auth, database, storage } from '../config/config'

export default class ProfileScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedin: false
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/**
         * Go ahead and delete ExpoLinksView and replace it with your content;
         * we just wanted to provide you with some helpful links.
         */}
        <ExpoLinksView />
      </ScrollView>
    )
  }
}

ProfileScreen.navigationOptions = {
  title: 'Links'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
})
