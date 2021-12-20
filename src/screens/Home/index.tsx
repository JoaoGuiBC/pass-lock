import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';

import { Header } from '../../components/Header';
import { SearchBar } from '../../components/SearchBar';
import { LoginDataItem } from '../../components/LoginDataItem';

import {
  Container,
  Metadata,
  Title,
  TotalPassCount,
  LoginList,
} from './styles';

interface LoginDataProps {
  id: string;
  service_name: string;
  email: string;
  password: string;
}

type LoginListDataProps = LoginDataProps[];

export function Home() {
  const [searchText, setSearchText] = useState('');
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);

  async function loadData() {
    const dataKey = '@passlock:logins';

    const passwordList = await AsyncStorage.getItem(dataKey);
    const parsedPasswordList = JSON.parse(passwordList);

    setData(parsedPasswordList || {});
    setSearchListData(parsedPasswordList || {});
  }

  function handleFilterLoginData() {
    const searchResult = data.filter((password) =>
      password.service_name.includes(searchText)
    );

    setSearchListData(searchResult);
  }

  function handleChangeInputText(text: string) {
    setSearchText(text);

    if (!searchText.trim()) {
      setSearchListData(data);
    }
  }

  async function handleDeleteLogin(id: string) {
    try {
      const dataKey = '@passlock:logins';

      const filteredData = data.filter((login) => login.id !== id);
      const parsedFilteredData = JSON.stringify(filteredData);

      await AsyncStorage.setItem(dataKey, parsedFilteredData);

      setData(filteredData);
      setSearchListData(filteredData);
    } catch (_) {
      Alert.alert(
        'Erro',
        'Não foi possivel deletar o login no momento, tente novamente mais tarde.'
      );
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <>
      <Header
        user={{
          name: 'João',
          avatar_url: 'https://github.com/JoaoGuiBC.png',
        }}
      />
      <Container>
        <SearchBar
          placeholder="Qual senha você procura?"
          onChangeText={handleChangeInputText}
          value={searchText}
          returnKeyType="search"
          onSubmitEditing={handleFilterLoginData}
          onSearchButtonPress={handleFilterLoginData}
        />

        <Metadata>
          <Title>Suas senhas</Title>
          <TotalPassCount>
            {searchListData.length
              ? `${`${searchListData.length}`.padStart(2, '0')} ao total`
              : 'Nada a ser exibido'}
          </TotalPassCount>
        </Metadata>

        <LoginList
          keyExtractor={(item) => item.id}
          data={searchListData}
          renderItem={({ item: loginData }) => {
            return (
              <LoginDataItem
                id={loginData.id}
                service_name={loginData.service_name}
                email={loginData.email}
                password={loginData.password}
                onDelete={handleDeleteLogin}
              />
            );
          }}
        />
      </Container>
    </>
  );
}
