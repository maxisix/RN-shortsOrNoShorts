import React from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import { Constants, Location, Permissions } from "expo";

import { getLocationAsync } from "./helpers/getLocation";
import { getWeather } from "./helpers/getWeather";

export default class App extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    weather: null
  };

  async componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      await getLocationAsync().then(({ status, location }) => {
        if (status !== "granted") {
          this.setState({
            errorMessage: "Permission to access location was denied"
          });
        }
        this.setState({ location });
      });

      await getWeather(this.state.location).then(weather => {
        this.setState({ weather });
      });
    }
  }

  render() {
    let text = "Waiting..";

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.weather) {
      text = this.state.weather.main.temp > 17 ? "Shorts" : "No shorts";
    }

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  }
});
