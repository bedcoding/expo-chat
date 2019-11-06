import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0

import Fire from '../Fire';

class Chat extends React.Component {

  // 헤더의 모양과 동작을 구성하는 데 사용
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  // 메시지 저장
  state = {
    messages: [],
  };

  // 우리는 우리의 사용자에 대한 간단한 참조가 필요하다. 
  // 그래서 GippedChat은 우리의 채팅 버블을 어느 쪽에 붙여야 할지 알고 있다.
  get user() {
    return {      // Return our name and our UID for GiftedChat to parse
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };
  }

  render() {
    // 마지막으로 GiftedChat에 사용자와 Fire의 onSend 메소드에 대한 참조를 제공해야 합니다.
    return (
      <GiftedChat
        messages={this.state.messages}  // 채팅 메시지 입력하는 곳!
        onSend={Fire.shared.send}  // 보내기 버튼
        user={this.user}
      />
    );
  }

  // ----- component의 아래에 구독자와 구독자를 추가하십시오 -----

  // 1.컴포넌트가 화면에 추가되면 메시지를 찾기 시작합니다. 
  // Fire.shared.on 메소드를 호출하고 콜백을 전달하십시오. 
  // 콜백에서 메시지를 얻은 다음 현재 메시지에 추가하기를 원합니다.
  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }

  // 2.component가 화면을 벗어나면 데이터베이스에서 구독을 취소하려고 합니다.
  componentWillUnmount() {
    Fire.shared.off();
  }
}

export default Chat;
// 이제 빌드를 실행할 때 그룹에 가입하고 데이터베이스에 메시지 저장을 시작할 수 있어야 합니다!!!