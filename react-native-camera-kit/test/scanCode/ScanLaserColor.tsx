import {useRef} from 'react';
import React, {StyleSheet, View} from 'react-native';
import {CameraApi, CameraType, Camera} from 'react-native-camera-kit';
import {TestSuite, TestCase, Tester} from '@rnoh/testerino';

export const ScanLaserColorTest = () => {
  const cameraRef = useRef<CameraApi>(null);

  return (
    <Tester>
      <TestSuite name="LaserColor:条形码扫描仪激光可视化的颜色">
        <TestCase itShould="设置为红色">
          <View>
            <Camera
              ref={cameraRef}
              style={styles.cameraPreview}
              laserColor={'FFE20C56'}
              scanBarcode
              showFrame
            />
          </View>
        </TestCase>
      </TestSuite>
    </Tester>
  );
};
const styles = StyleSheet.create({
  view: {flex: 1},
  cameraPreview: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  actionBtn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    left: 0,
    zIndex: 999,
    gap: 10,
  },
});
