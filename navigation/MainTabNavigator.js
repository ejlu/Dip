import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import FeedScreen from '../screens/FeedScreen'
import ProfileScreen from '../screens/ProfileScreen'
import UploadScreen from '../screens/UploadScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
})

const FeedStack = createStackNavigator(
  {
    Feed: FeedScreen
  },
  config
)

FeedStack.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  )
}

FeedStack.path = ''

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  config
)

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  )
}

ProfileStack.path = ''

const UploadStack = createStackNavigator(
  {
    Upload: UploadScreen
  },
  config
)

UploadStack.navigationOptions = {
  tabBarLabel: 'Upload',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cloud-upload' : 'md-cloud-upload'}
    />
  )
}

UploadStack.path = ''

const tabNavigator = createBottomTabNavigator({
  FeedStack,
  UploadStack,
  ProfileStack
})

tabNavigator.path = ''

export default tabNavigator
