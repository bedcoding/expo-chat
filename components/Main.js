import React from 'react';
import {
  StyleSheet,
  Text,              // 텍스트 추가
  TextInput,
  TouchableOpacity,  // 터치
  View,
} from 'react-native';

class Main extends React.Component {
  static navigationOptions = {
    title: 'Chatter',
  };

  // 텍스트 입력 추가
  state = {
    name: '',
  };

  // 채팅 화면으로 안내하는 onPress를 추가하겠습니다.
  onPress = () =>
    this.props.navigation.navigate('Chat', { name: this.state.name });

  // 사용자가 무언가를 입력 할 때 상태를 업데이트 해야 합니다. 
  onChangeText = name => this.setState({ name });

  render() {
    return (
      <View>
        <Text style={styles.title}> 닉네임 입력: </Text>

        {/* 입력창 */}
        <TextInput
          style={styles.nameInput}
          placeHolder="John Cena"
          onChangeText={this.onChangeText}
          value={this.state.name}
        />

        {/* 버튼 */}
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const offset = 24;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,

    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
});

export default Main;
