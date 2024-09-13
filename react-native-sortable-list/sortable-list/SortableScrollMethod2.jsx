/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import {Tester, TestSuite, TestCase} from '@rnoh/testerino';

const window = Dimensions.get('window');

const data = {
  0: {
    image: require('../assets/1.jpg'),
    text: 'Chloe （0）',
  },
  1: {
    image: require('../assets/2.jpg'),
    text: 'Jasper （1）',
  },
  2: {
    image: require('../assets/3.jpg'),
    text: 'Pepper （2）',
  },
  3: {
    image: require('../assets/4.jpg'),
    text: 'Oscar （3）',
  },
  4: {
    image: require('../assets/5.jpg'),
    text: 'Dusty （4）',
  },
  5: {
    image: require('../assets/6.jpg'),
    text: 'Spooky （5）',
  },
  6: {
    image: require('../assets/7.jpg'),
    text: 'Kiki （6）',
  },
  7: {
    image: require('../assets/8.jpg'),
    text: 'Smokey （7）',
  },
  8: {
    image: require('../assets/9.jpg'),
    text: 'Gizmo （8）',
  },
  9: {
    image: require('../assets/7.jpg'),
    text: 'Kitty （9）',
  },
  10: {
    image: require('../assets/6.jpg'),
    text: 'Otyt （10）',
  },
  11: {
    image: require('../assets/5.jpg'),
    text: 'Otyt （11）',
  },
  12: {
    image: require('../assets/4.jpg'),
    text: 'Otyt （12）',
  },
  13: {
    image: require('../assets/3.jpg'),
    text: 'Otyt （13）',
  },
  14: {
    image: require('../assets/2.jpg'),
    text: 'Otyt （14）',
  },
  15: {
    image: require('../assets/1.jpg'),
    text: 'Otyt （15）',
  },
};

export default function SortableScrollMethod2() {
  const renderRow = useCallback(({data, active}) => {
    return <Row data={data} active={active} />;
  }, []);
  const myref = useRef();
  return (
    <Tester>
      <TestSuite name="Test scroll ">
        <TestCase itShould={`Test scrollBy scrollTo scrollToRowKey`}>
          <View style={{height: 150, marginBottom: 10}}>
            <Button
              style={styles.button}
              title={`scrollBy({dx: 200,dy: 0,animated: true})`}
              onPress={() => {
                myref.current.scrollBy({
                  dx: 200,
                  dy: 0,
                  animated: true,
                });
              }}
            />
            <Button
              style={styles.button}
              title={`scrollTo({x: 500,y: 0,animated: true})`}
              onPress={() => {
                myref.current.scrollTo({
                  x: 500,
                  y: 0,
                  animated: true,
                });
              }}
            />
            <Button
              style={styles.button}
              title={'scrollToRowKey({key: "2", animated: false})'}
              onPress={() => {
                myref.current.scrollToRowKey({key: '2', animated: false});
              }}
            />
            <Button
              style={styles.button}
              title={'scrollToRowKey({key: "9", animated: true})'}
              onPress={() => {
                myref.current.scrollToRowKey({key: '9', animated: true});
              }}
            />
          </View>
          <View style={{height: 300}}>
            <SortableList
              horizontal
              ref={myref}
              style={styles.list}
              data={data}
              renderRow={renderRow}
            />
          </View>
        </TestCase>
      </TestSuite>
    </Tester>
  );
}
function Row(props) {
  const {active, data} = props;

  const activeAnim = useRef(new Animated.Value(0));
  const style = useMemo(
    () => ({
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: activeAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1],
              }),
            },
          ],
          shadowRadius: activeAnim.current.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [
            {
              scale: activeAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          elevation: activeAnim.current.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      }),
    }),
    [],
  );
  useEffect(() => {
    Animated.timing(activeAnim.current, {
      duration: 300,
      easing: Easing.bounce,
      toValue: Number(active),
      useNativeDriver: true,
    }).start();
  }, [active]);

  return (
    <Animated.View style={[styles.row, style]}>
      <Image source={data.image} style={[styles.image]} />
      <Text style={styles.text}>{data.text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      harmony: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    height: 210,
    width: window.width,
  },

  contentContainer: {
    ...Platform.select({
      ios: {
        paddingVertical: 30,
      },

      android: {
        paddingVertical: 0,
      },
    }),
  },

  row: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    width: 110,
    height: 150,
    marginHorizontal: 10,
    borderRadius: 4,

    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },
      android: {
        elevation: 0,
        marginHorizontal: 30,
      },
      harmony: {
        elevation: 0,
        marginHorizontal: 30,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },
    }),
  },

  image: {
    width: 50,
    height: 50,
    marginBottom: 15,
    borderRadius: 25,
  },

  text: {
    fontSize: 18,
    color: '#222222',
  },
});
