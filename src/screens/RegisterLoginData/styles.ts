import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: #f2f3f5;
  padding: 0 ${RFValue(24)}px;
`;

export const Form = styled.View`
  margin-top: ${RFValue(24)}px;
`;
