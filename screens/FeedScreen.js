import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native'
import { f, auth, database, storage } from '../config/config'

import { MonoText } from '../components/StyledText'

export default class FeedScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      pictures: [],
      refresh: false,
      loading: true
    }
    this.loadNew = this.loadNew.bind(this)
    this.pluralCheck = this.pluralCheck.bind(this)
    this.timeConverter = this.timeConverter.bind(this)
  }

  componentDidMount() {
    this.loadFeed()
  }

  pluralCheck(s) {
    return s === 1 ? 'ago' : 's ago'
  }

  timeConverter(timestamp) {
    const datePosted = new Date(timestamp * 1000)
    const seconds = Math.floor((new Date() - datePosted) / 1000)
    let interval = Math.floor(seconds / 31536000)
    if (interval > 1) {
      return interval + ' year' + this.pluralCheck(interval)
    }
    interval = Math.floor(seconds / 2592000)
    if (interval > 1) {
      return interval + ' month' + this.pluralCheck(interval)
    }
    interval = Math.floor(seconds / 86400)
    if (interval > 1) {
      return interval + ' day' + this.pluralCheck(interval)
    }
    interval = Math.floor(seconds / 3600)
    if (interval > 1) {
      return interval + ' hour' + this.pluralCheck(interval)
    }
    interval = Math.floor(seconds / 60)
    if (interval > 1) {
      return interval + ' minute' + this.pluralCheck(interval)
    }
    return Math.floor(seconds) + ' second' + this.pluralCheck(seconds)
  }

  loadFeed() {
    this.setState({
      refresh: true,
      pictures: []
    })
    let that = this
    database
      .ref('pictures')
      .orderByChild('timestamp')
      .once('value')
      .then(function(snapshot) {
        const photoExists = snapshot.val() !== null
        if (photoExists) {
          data = snapshot.val()
          const pictures = that.state.pictures

          for (let photo in data) {
            let photoObj = data[photo]
            database
              .ref('users')
              .child(photoObj.author)
              .once('value')
              .then(function(snapshot) {
                const photoExists = snapshot.val() !== null
                if (photoExists) {
                  data = snapshot.val()
                }
                pictures.push({
                  id: photo,
                  url: photoObj.url,
                  caption: photoObj.caption,
                  timestamp: that.timeConverter(photoObj.timestamp),
                  author: data.username,
                  authorId: photoObj.author,
                  upvotes: photoObj.upvotes,
                  category: photoObj.category
                })
                that.setState({
                  refresh: false,
                  loading: false
                })
              })
              .catch(error => console.error(error))
          }
        }
      })
      .catch(error => console.error(error))
  }

  loadNew() {
    this.loadFeed()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>Loading...</Text>
          </View>
        ) : (
          <FlatList
            refreshing={this.state.refresh}
            onRefresh={this.loadNew}
            data={this.state.pictures}
            keyExtractor={(item, index) => index.toString()}
            style={{ flex: 1, backgroundColor: 'white' }}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={{
                  width: '100%',
                  overflow: 'hidden',
                  marginBottom: 5,
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderColor: 'grey'
                }}
              >
                <View
                  style={{
                    padding: 5,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  {/* <Text>{item.timestamp}</Text> */}
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Profile', {
                        userId: item.authorId
                      })
                    }
                  >
                    <Text>{item.author}</Text>
                  </TouchableOpacity>
                  <Text>{`Category: ${item.category}`}</Text>
                  <Text>{`Upvotes: ${item.upvotes}`}</Text>
                </View>
                <View>
                  <Image
                    source={{
                      uri: item.url
                    }}
                    style={{ resizeMode: 'cover', width: '100%', height: 275 }}
                  />
                </View>
                <View style={{ padding: 5 }}>
                  <Text>{item.caption}</Text>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Comments', {
                        userId: item.id
                      })
                    }
                  >
                    <Text style={{ marginTop: 10, textAlign: 'center' }}>
                      View Comments
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    )
  }
}

// export default function FeedScreen() {
//   return (
//     <View style={styles.container}>
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={styles.contentContainer}
//       >
//         <View style={styles.welcomeContainer}>
//           <Image
//             source={
//               __DEV__
//                 ? require('../assets/images/robot-dev.png')
//                 : require('../assets/images/robot-prod.png')
//             }
//             style={styles.welcomeImage}
//           />
//         </View>

//         <View style={styles.getStartedContainer}>
//           <DevelopmentModeNotice />

//           <Text style={styles.getStartedText}>Get started by opening</Text>

//           <View
//             style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
//           >
//             <MonoText>screens/HomeScreen.js</MonoText>
//           </View>

//           <Text style={styles.getStartedText}>
//             Change this text and your app will automatically reload.
//           </Text>
//         </View>

//         <View style={styles.helpContainer}>
//           <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
//             <Text style={styles.helpLinkText}>
//               Help, it didn’t automatically reload!
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       <View style={styles.tabBarInfoContainer}>
//         <Text style={styles.tabBarInfoText}>
//           This is a tab bar. You can edit it in:
//         </Text>

//         <View
//           style={[styles.codeHighlightContainer, styles.navigationFilename]}
//         >
//           <MonoText style={styles.codeHighlightText}>
//             navigation/MainTabNavigator.js
//           </MonoText>
//         </View>
//       </View>
//     </View>
//   )
// }

FeedScreen.navigationOptions = {
  title: 'Feed'
}

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    )

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    )
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    )
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  )
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
})
