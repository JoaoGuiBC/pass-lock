import React, { useState } from 'react';
import * as Clipboard from 'expo-clipboard';

import {
  Container,
  PasswordButton,
  CopyClipboardButton,
  Icon,
  PassData,
  Title,
  Password,
  LoginData,
  BoldTitle,
  Email,
} from './styles';

interface Props {
  id: string;
  service_name: string;
  email: string;
  password: string;
  onDelete: (id: string) => Promise<void>;
}

export function LoginDataItem({
  id,
  service_name,
  email,
  password,
  onDelete,
}: Props) {
  const [passIsVisible, setPassIsVisible] = useState(false);

  function handleTogglePassIsVisible() {
    setPassIsVisible(!passIsVisible);
  }

  return (
    <Container colors={[passIsVisible ? '#eee1ff' : '#ffffff', '#ffffff']}>
      <PasswordButton onPress={handleTogglePassIsVisible}>
        <Icon
          name={passIsVisible ? 'eye' : 'eye-off'}
          color={passIsVisible ? '#7719fb' : '#888D97'}
        />
      </PasswordButton>

      {passIsVisible ? (
        <PassData>
          <CopyClipboardButton onPress={() => Clipboard.setString(password)}>
            <Title>{service_name}</Title>
            <Password>{password}</Password>
          </CopyClipboardButton>
        </PassData>
      ) : (
        <LoginData>
          <BoldTitle>{service_name}</BoldTitle>
          <Email>{email}</Email>
        </LoginData>
      )}

      <PasswordButton onPress={() => onDelete(id)}>
        <Icon name="trash-2" color={passIsVisible ? '#7719fb' : '#888D97'} />
      </PasswordButton>
    </Container>
  );
}
