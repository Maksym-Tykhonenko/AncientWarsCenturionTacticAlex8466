import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';

const Layyout = ({
  children,
  bounce = true,
  scroll = true,
}: {
  children: React.ReactNode;
  scroll?: boolean;
  bounce?: boolean;
}) => {
  return (
    <ImageBackground
      source={require('../assets/images/appbg.png')}
      style={styles.background}>
      {scroll ? (
        <ScrollView
          bounces={bounce}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={styles.fill}>{children}</View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  fill: {
    flex: 1,
  },
});

export default Layyout;
