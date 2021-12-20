import React, { useState } from 'react';

import {
  Container,
  ShowPasswordButton,
  Icon,
  PassData,
  Title,
  Password,
  LoginData,
  BoldTitle,
  Email,
} from './styles';

interface Props {
  service_name: string;
  email: string;
  password: string;
}

export function LoginDataItem({ service_name, email, password }: Props) {
  const [passIsVisible, setPassIsVisible] = useState(false);

  function handleTogglePassIsVisible() {
    setPassIsVisible(!passIsVisible);
  }

  return (
    <Container colors={[passIsVisible ? '#eee1ff' : '#ffffff', '#ffffff']}>
      <ShowPasswordButton onPress={handleTogglePassIsVisible}>
        <Icon
          name={passIsVisible ? 'eye' : 'eye-off'}
          color={passIsVisible ? '#7719fb' : '#888D97'}
        />
      </ShowPasswordButton>

      {passIsVisible ? (
        <PassData>
          <Title>{service_name}</Title>
          <Password>{password}</Password>
        </PassData>
      ) : (
        <LoginData>
          <BoldTitle>{service_name}</BoldTitle>
          <Email>{email}</Email>
        </LoginData>
      )}
    </Container>
  );
}
