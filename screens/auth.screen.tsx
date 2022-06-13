import React from 'react';
import {StyleSheet} from 'react-native';
import {PasswordInput, SimpleTextInput} from '../components/input.component';
import {Badge} from '../components/badge.component';
import {Text, View} from '../components/text-and-view.component';
import {Color} from '../enums/color.enum';
import {SimpleButton} from '../components/button.component';
import {AuthContext} from '../contexts/auth.context';

export default function AuthScreen() {
  const {signIn: auth} = React.useContext(AuthContext);
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Libra</Text>
          <Badge text='beta' color={Color.CyanLight}></Badge>
        </View>
        <View style={styles.inputWrapper}>
          <SimpleTextInput
            placeholder='Логин'
            style={styles.inputLogin}
            onChangeText={setLogin}
          ></SimpleTextInput>
          <PasswordInput
            placeholder='Пароль'
            style={styles.inputPassword}
            onChangeText={setPassword}
          ></PasswordInput>
          <SimpleButton
            text='Войти'
            onPressFn={() => {
              auth(login, password);
            }}
          ></SimpleButton>
        </View>
      </View>
      <Text style={styles.tinkoff}>Created by Kirill Kostarev, TINKOFF</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    marginRight: 12,
  },
  inputWrapper: {
    flexDirection: 'column',
    marginVertical: 30,
    width: '100%',
  },
  inputLogin: {
    marginBottom: 12,
  },
  inputPassword: {
    marginBottom: 24,
  },
  tinkoff: {
    position: 'absolute',
    bottom: 60,
    fontSize: 14,
    fontWeight: '100',
    textAlign: 'center',
  },
});
