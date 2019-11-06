// 백엔드
import firebase from 'firebase';    // Firebase를 가져옵니다. 데이터베이스를 액세스하는 데 사용합니다.

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

  // 앱에서 얻는 키를 사용하여 Firebase 앱을 초기화합니다.
  init = () =>
    firebase.initializeApp({
      apiKey: "AIzaSyCFMhnHbLyZrWnak_rc6zYgwS18p2k3_w8",
      authDomain: "chat-4a9b7.firebaseapp.com",
      databaseURL: "https://chat-4a9b7.firebaseio.com",
      projectId: "chat-4a9b7",
      storageBucket: "chat-4a9b7.appspot.com",
      messagingSenderId: "734136880826",
      appId: "1:734136880826:web:b6febd7fe5bbf1e0f97c83",
      measurementId: "G-KK63YPQM22"
    });

  // 우리는 인증을 받고 싶습니다. 전에 로그인 한 경우 사용자를 반환합니다. 그렇지 않으면 null이 됩니다.
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  // firebase가 인증을 찾으면 onAuthStateChanged가 호출됩니다.
  onAuthStateChanged = user => {
    if (!user) {
      try {
        // 로그인하지 않은 경우 (익명으로 로그인하면) 실패하면 오류 메시지와 함께 경고 메시지가 나타납니다.
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  // 이제 메시지를 보낼 방법이 필요합니다.
  // 사용자의 UID를 얻기 위한 도우미 만들기
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }


  // ----- onAuthStateChanged 이후, 이제 메시지를 구독 할 수 있는 방법이 필요합니다 -----
  // 데이터베이스에서 메시지가 저장 될 위치에 대한 참조를 작성하십시오. /messages
  get ref() {
    return firebase.database().ref('messages');
  }


  // 구문 분석 방법을 만듭니다. 
  // 이제 우리는 메시지를 얻을 수 있습니다. GiftedChat을 위해 메시지를 올바르게 포맷해야 합니다. 
  // 이를 위해 구문 분석 방법에서 스냅 샷(파이어베이스에서 반환된 데이터)을 줄입니다.
  parse = snapshot => {
    // 1. snapshot.val()을 해체하고 snapshot.val ()을 호출하면 스냅 샷과 관련된 값 또는 객체가 반환됩니다.
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;

    // 2. 저장된 타임 스탬프를 js Date로 변환합니다.
    const timestamp = new Date(numberStamp);

    // 3. 마지막으로 GiftedChat에 익숙한 객체를 만든 다음 반환합니다. 
    // _id는 메시지, 텍스트, 사용자 및 타임 스탬프의 고유한 키입니다.
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };


  // 메시지 ref를 호출하고 마지막 20개의 메시지를 가져 오는 콜백 소품을 사용하여 메소드를 작성하십시오. 
  // 그러면 새 메시지가 올 때마다 그 정보도 얻을 수 있습니다. 메시지를 받으면 파싱할 함수를 보내려고 합니다.
  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  // 메시지 저장을 위한 정확한 타임 스탬프 받기
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];

      // firebase에 적합한 모양을 만들어 서버에 저장하십시오.
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  // 추가 기능은 메시지 객체를 고유 한 ID로 저장합니다.
  append = message => this.ref.push(message);

  // 데이터베이스 구독을 취소하는 기능 추가 (close the connection to the Backend)
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
