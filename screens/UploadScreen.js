import React from 'react'
import { ExpoConfigView } from '@expo/samples'
import { f, auth, database, storage } from '../config/config'

export default function UploadScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return <ExpoConfigView />
}

UploadScreen.navigationOptions = {
  title: 'app.json'
}
