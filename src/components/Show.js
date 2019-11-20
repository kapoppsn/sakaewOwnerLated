import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Button, Descriptions, Badge, Popconfirm, message} from 'antd';
import '../css/info.css';
import bg from '../image/bgList.png';

const text = 'Are you sure to confirm this order?';

function confirm() {
  message.info('Confirm order success!');
}

class Show extends Component {

  constructor(props) {
    super(props);
    this.toggleConfirm = this.toggleConfirm.bind(this);
    this.toggleFinish = this.toggleFinish.bind(this);
    this.toggleCheckWaiting = this.toggleCheckWaiting.bind(this);
    this.toggleCheckDoing = this.toggleCheckDoing.bind(this);
    this.toggleCheckFinish = this.toggleCheckFinish.bind(this);
    this.state = {
      board: {},
      key: '',
      confirmS: true,
      finishS: false,
      statusOrder: '',
      key: '',
      name: '',
      page: '',
      page2: '',
      size: '',
      amount: '',
      color: '',
      format: '',
      address: '',
      tel:'',
      rand: '',
      datePay: '',
      timePay: '',
      costPay: '',
      image: null,
      url: '',
      url2: '',
      progress: 0,
      value:'',
      checkWaiting: false,
      checkDoing: false,
      checkFinish: false,
    };
  }
  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          board: doc.data(),
          key: doc.id,
          name: board.name,
          page: board.page,
          page2: board.page2,
          size: board.size,
          amount: board.amount,
          color: board.color,
          format: board.format,
          tel: board.tel,
          address: board.address,
          rand: board.rand,
          statusOrder: board.statusOrder,
          datePay: board.datePay,
          timePay: board.timePay,
          costPay: board.costPay,
          url: board.url,
          url2: board.url2,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }
  onSubmit = (e) => {
    e.preventDefault()

    const {name, size, amount, format, color, page, page2, tel, address, rand, statusOrder, datePay,timePay ,costPay, url, url2 } = this.state;

    const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
    updateRef.set({
      name,
      page,
      page2,
      size,
      amount,
      color,
      format,
      tel,
      address,
      rand,
      statusOrder,
      datePay,
      timePay,
      costPay,
      url,
      url2,
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        page: '',
        page2: '',
        size: '',
        amount: '',
        color: '',
        format: '',
        address: '',
        tel:'',
        rand: '',
        statusOrder: '',
        datePay: '',
        timePay: '',
        costPay: '',
        url: '',
        url2: '',
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
    
  };
    


  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }


  toggleConfirm() {
    this.setState({
      confirmS: !this.state.confirmS
  });
    }

  toggleFinish() {
      this.setState({
        statusOrder: ""
    })
    //console.log("click");
  }
  

  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/history")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  toggleCheckWaiting() {
    this.setState({
      checkWaiting: !this.state.checkWaiting,
  });
  }
  toggleCheckDoing() {
    this.setState({
      checkDoing: !this.state.checkDoing,
  });
  }
  toggleCheckFinish() {
    this.setState({
      checkFinish: !this.state.checkFinish,
  });
  }



  render() {
    const confirmS = this.state.confirmS;
    const finishS = this.state.finishS;
    const statusOrder = this.state.statusOrder;
    const checkWaiting = this.state.checkWaiting;
    const checkDoing = this.state.checkDoing;
    const checkFinish = this.state.checkFinish;
    let status1,successBut,status2;

    if(statusOrder=="เสร็จสมบูรณ์!") {
      status1 = <Link id="edit" to={`/editstatus/${this.state.key}`} disabled class="btn btn-success">&nbsp;&nbsp;&nbsp;แก้ไขสถานะ</Link>
    }
    else {
      status1 = <Link id="edit" to={`/editstatus/${this.state.key}`} class="btn btn-success">&nbsp;&nbsp;&nbsp;แก้ไขสถานะ</Link>
    }
    
    return (
      <div class="bg">
      <div class="container">
        <header>
            <Button id="btnBack" type="link" href="/">หน้าแรก</Button>
          </header>
          <div id="table">
        <Descriptions title="รายละเอียดคำสั่งซื้อ" layout="vertical" bordered>
          <Descriptions.Item label="หมายเลขสั่งซื้อ">{this.state.board.rand}</Descriptions.Item>
          <Descriptions.Item label="ชื่อ">{this.state.board.name}</Descriptions.Item>
          <Descriptions.Item label="ขนาดกระดาษ">{this.state.board.size}</Descriptions.Item>
    <Descriptions.Item label="หน้าที่">{this.state.board.page}-{this.state.board.page2}</Descriptions.Item>
          <Descriptions.Item label="จำนวนหน้า">{this.state.board.amount}</Descriptions.Item>
          <Descriptions.Item label="สี">{this.state.board.color}</Descriptions.Item>
          <Descriptions.Item label="รูปแบบการเข้าเล่ม">{this.state.board.format}</Descriptions.Item>
          <Descriptions.Item label="จำนวนเงิน">{this.state.board.costPay}</Descriptions.Item>
          <Descriptions.Item label="วันที่โอน">{this.state.board.datePay}</Descriptions.Item>
          <Descriptions.Item label="เวลาที่โอน">{this.state.board.timePay}</Descriptions.Item>
          <Descriptions.Item label="เอกสาร"><Button type="link" href={this.state.board.url}>Download</Button></Descriptions.Item>
          <Descriptions.Item label="ใบเสร็จโอนเงิน"><Button type="link" href={this.state.board.url2}>Download</Button></Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
          {this.state.board.statusOrder}
          {status1}
          </Descriptions.Item>
        </Descriptions><br />
        </div>
      </div>
      </div>
    );
  }
}

export default Show;