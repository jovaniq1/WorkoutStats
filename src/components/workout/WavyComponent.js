import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
export default function WavyComponent({ customStyles }) {
  return (
    <Svg
      height="60%"
      width="100%"
      viewBox="0 0 1440 320"
      style={{ position: 'absolute', top: -110, paddingTop: 20 }}
    >
      <Path
        fill="#047857"
        d="M0,128L34.3,144C68.6,160,137,192,206,218.7C274.3,245,343,267,411,240C480,213,549,139,617,106.7C685.7,75,754,85,823,112C891.4,139,960,181,1029,213.3C1097.1,245,1166,267,1234,234.7C1302.9,203,1371,117,1406,74.7L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
      />
    </Svg>
  );
}
