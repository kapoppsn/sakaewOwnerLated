import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Button, Descriptions, Badge, Popconfirm, message  } from 'antd';

const text = 'Are you sure to confirm this order?';

function confirm() {
  message.info('Confirm order success!');
}

class Show extends Component {

  constructor(props) {
    super(props);
    this.toggleConfirm = this.toggleConfirm.bind(this);
    this.toggleFinish = this.toggleFinish.bind(this);
    this.state = {
      board: {},
      key: '',
      confirmS: false,
      finishS: false,
      statusOrder: true,
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
      rand: ''
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
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }
  onSubmit = (e) => {
    e.preventDefault();

    const {name, size, amount, format, color, page, page2, tel, address, rand, statusOrder } = this.state;

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
      statusOrder
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
        statusOrder: true
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
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
        finishS: !this.state.finishS,
        statusOrder: true
    })
    console.log("click");
  }
  

  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/history")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    const confirmS = this.state.confirmS;
    const finishS = this.state.finishS;
    const statusOrder = this.state.statusOrder;
    let status1,successBut,status2;
    if (!confirmS){
      status1 = <Badge status="default" text="Waiting for confirm" />
      successBut = <Button onClick={this.toggleConfirm}>Confirm order</Button>
    }else if(confirmS){
      status1 = <Badge status="processing" text="Doing the order" />
      successBut = <Button type="primary"  onSubmit={this.onSubmit} onChange={this.onChange} onClick={this.toggleFinish}>Finish order</Button>
      if(finishS){
        status1 = <Badge status="success" text="Finish order!" />
        successBut = <Button disabled type="primary">Finish order</Button>
      }
    }
    
    return (
      <div class="container">
        <header>
            <Button type="link" href="/">หน้าแรก</Button>
          </header>
        <Descriptions title="User Info" layout="vertical" bordered>
          <Descriptions.Item label="หมายเลขสั่งซื้อ">{this.state.board.rand}</Descriptions.Item>
          <Descriptions.Item label="ชื่อ">{this.state.board.name}</Descriptions.Item>
          <Descriptions.Item label="ขนาดกระดาษ">{this.state.board.size}</Descriptions.Item>
    <Descriptions.Item label="หน้าที่">{this.state.board.page}-{this.state.board.page2}</Descriptions.Item>
          <Descriptions.Item label="จำนวนหน้า">{this.state.board.amount}</Descriptions.Item>
          <Descriptions.Item label="สี">{this.state.board.color}</Descriptions.Item>
          <Descriptions.Item label="รูปแบบการเข้าเล่ม">{this.state.board.format}</Descriptions.Item>
          {/* <Descriptions.Item label="Usage Time" span={2}>
            2019-04-24 18:00:00
          </Descriptions.Item> */}
          <Descriptions.Item label="Status" span={3}>
           {status1}{status2}
          </Descriptions.Item>
        </Descriptions><br />
        <div>
        {successBut}
        </div>
        {/* <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-name">
              {this.state.board.rand}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>ขนาดกระดาษ:</dt>
              <dd>{this.state.board.size}</dd>
              <dt>หน้าที่:</dt>
              <dd>{this.state.board.page}</dd>
              <dt>จำนวนหน้า:</dt>
              <dd>{this.state.board.amount}</dd>
              <dt>สี:</dt>
              <dd>{this.state.board.color}</dd>
              <dt>รูปแบบการเข้าเล่ม:</dt>
              <dd>{this.state.board.format}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>

          </div>
        </div> */}
      </div>
    );
  }
}

export default Show;