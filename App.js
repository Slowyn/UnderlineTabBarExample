/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 28,
  },
});

const Page = ({label, text = ''}) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      {label}
    </Text>
    <Text style={styles.instructions}>
      {text}
    </Text>
  </View>
);

const Tab = (tab, page, isTabActive, onPressHandler, onTabLayout, styles) => {
  const { label } = tab;
  const style = {
    marginHorizontal: 20,
    paddingVertical: 10,
  };
  const containerStyle = {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
    backgroundColor: styles.backgroundColor,
    opacity: styles.opacity,
    transform: [{ scale: styles.opacity }],
  };
  const textStyle = {
    color: styles.textColor,
    fontWeight: '600',
  };
  return (
    <TouchableOpacity style={style} onPress={onPressHandler} onLayout={onTabLayout} key={page}>
      <Animated.View style={containerStyle}>
        <Animated.Text style={textStyle}>{label}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

class UnderlineTabBarExample extends Component {
  _scrollX = new Animated.Value(0);
  // 6 is a quantity of tabs
  interpolators = [...Array(6).keys()].map((i) => ({
    scale: this._scrollX.interpolate({
      inputRange: [i - 1, i, i + 1],
      outputRange: [1, 1.2, 1],
      extrapolate: 'clamp',
    }),
    opacity: this._scrollX.interpolate({
      inputRange: [i - 1, i, i + 1],
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    }),
    textColor: this._scrollX.interpolate({
      inputRange: [i - 1, i, i + 1],
      outputRange: ['#000', '#fff', '#000'],
    }),
    backgroundColor: this._scrollX.interpolate({
      inputRange: [i - 1, i, i + 1],
      outputRange: ['rgba(0,0,0,0.1)', '#000', 'rgba(0,0,0,0.1)'],
      extrapolate: 'clamp',
    }),
  }));
  render() {
    return (
      <View style={[styles.container, { paddingTop: 20 }]}>
        <ScrollableTabView
          tabBarUnderlineColor="#53ac49"
          tabBarActiveTextColor="#53ac49"
          renderTabBar={() => (
            <TabBar underlineColor="#53ac49" activeTabTextStyle={{ color: "#53ac49" }} />
          )}
        >
          <Page tabLabel={{label: "Page #1"}} label="Page #1"/>
          <Page tabLabel={{label: "Page #2 aka Long!", badge: 3}} label="Page #2 aka Long!"/>
          <Page tabLabel={{label: "Page #3", badge: 30, badgeColor: 'red'}} label="Page #3"/>
          <Page tabLabel={{label: "Page #4 aka Page", badge: 8, badgeColor: 'violet'}} label="Page #4 aka Page"/>
          <Page tabLabel={{label: "Page #5"}} label="Page #5"/>
          <Page tabLabel={{label: "Page #6 SUPER HYPER LONG PAGE"}} label="Page #6 SUPER HYPER LONG PAGE WITH NITRO ACCELERATORS"/>
        </ScrollableTabView>

        <ScrollableTabView
          renderTabBar={() => (
            <TabBar
              underlineColor="#000"
              tabBarStyle={{ backgroundColor: "#fff", borderTopColor: '#d2d2d2', borderTopWidth: 1 }}
              renderTab={(...props) => {
                return Tab(...props, this.interpolators[props[1]]);
              }}
            />
          )}
          onScroll={(x) => this._scrollX.setValue(x)}
        >
          <Page tabLabel={{label: "Hot"}} label="Page #1 Hot" text="You can pass your own views to TabBar!"/>
          <Page tabLabel={{label: "Trending"}} label="Page #2 Trending" text="Yehoo!!!"/>
          <Page tabLabel={{label: "Fresh"}} label="Page #3 Fresh" text="Hooray!"/>
          <Page tabLabel={{label: "Funny"}} label="Page #4 Funny"/>
          <Page tabLabel={{label: "Movie & TV"}} label="Page #5 Movie & TV"/>
          <Page tabLabel={{label: "Sport"}} label="Page #6 Sport"/>
        </ScrollableTabView>

        <ScrollableTabView
          tabBarUnderlineColor="#53ac49"
          tabBarActiveTextColor="#53ac49"
          renderTabBar={() => <TabBar/>}
        >
          <Page tabLabel={{label: "Page #1"}} label="Page #1"/>
          <Page tabLabel={{label: "Page #2", badge: 3}} label="Page #2 aka Long!"/>
          <Page tabLabel={{label: "Page #3"}} label="Page #3"/>
        </ScrollableTabView>

      </View>
    );
  }
}

export default UnderlineTabBarExample;
