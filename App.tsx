/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar, StyleSheet, Text } from 'react-native';
import TimeZone from 'react-native-timezone';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Availability from 'src/views/Availability';
import { Colors } from 'src/components/Atoms/Design';
import 'intl';
import 'intl/locale-data/jsonp/en';

(Text as any).defaultProps = {
  ...((Text as any).defaultProps || {}),
  allowFontScaling: false,
};

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.primarySurface,
  };

  const getTimeZone = async () => {
    const timeZone = TimeZone.getTimeZone();
    console.log({ timeZone });
  };
  useEffect(() => {
    getTimeZone();
  }, []);

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Availability />
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
