import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Button, Descriptions, Badge, Popconfirm, message} from 'antd';
import '../css/editPage.css';
import bgEdit from '../image/bgList.png';

class EditStatus extends Component {

  constructor(props) {
    super(props);
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
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {name, size, amount, format, color, page, page2, tel, address, rand, statusOrder} = this.state;

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
    const statusOrder = this.state.statusOrder;
    const checkWaiting = this.state.checkWaiting;
    const checkDoing = this.state.checkDoing;
    const checkFinish = this.state.checkFinish;
    let status1,successBut,status2;
  
    if(checkWaiting==true && checkDoing==false && checkFinish==false){
      this.state.board.statusOrder = <Badge status="default" text="รอการจัดทำ" />
      successBut = <div><input type="checkbox" name="statusOrder" value="รอการจัดทำ" onChange={this.onChange} onClick={this.toggleCheckWaiting} checked/><text>รอการจัดทำ</text>
                        <input disabled type="checkbox" name="statusOrder" value="อยู่ระหว่างการจัดทำ" onChange={this.onChange} onClick={this.toggleCheckDoing}/> <text>อยู่ระหว่างการจัดทำ</text>
                        <input disabled type="checkbox" name="statusOrder" value="เสร็จสมบูรณ์!" onChange={this.onChange} onClick={this.toggleCheckFinish}/><text>เสร็จสมบูรณ์!</text>
                        <button name="statusOrder">เลือกสถานะ</button></div>
    }
    else if(checkWaiting==false && checkDoing==true && checkFinish==false){
      this.state.board.statusOrder = <Badge status="processing" text="อยู่ระหว่างการจัดทำ" /> 
      successBut = <div><input disabled type="checkbox" name="statusOrder" value="รอการจัดทำ" onChange={this.onChange} onClick={this.toggleCheckWaiting} /><text>รอการจัดทำ</text>
                        <input type="checkbox" name="statusOrder" value="อยู่ระหว่างการจัดทำ" onChange={this.onChange} onClick={this.toggleCheckDoing} checked/> <text>อยู่ระหว่างการจัดทำ</text>
                        <input disabled type="checkbox" name="statusOrder" value="เสร็จสมบูรณ์!" onChange={this.onChange} onClick={this.toggleCheckFinish}/><text>เสร็จสมบูรณ์!</text>
                        <button name="statusOrder">เลือกสถานะ</button></div>
    }
    else if (checkWaiting==false && checkDoing==false && checkFinish==true){
      this.state.board.statusOrder = <Badge status="success" text="เสร็จสมบูรณ์!"/>
      successBut = <div><input disabled type="checkbox" name="statusOrder" value="รอการจัดทำ" onChange={this.onChange} onClick={this.toggleCheckWaiting} /><text>รอการจัดทำ</text>
                        <input disabled type="checkbox" name="statusOrder" value="อยู่ระหว่างการจัดทำ" onChange={this.onChange} onClick={this.toggleCheckDoing} /> <text>อยู่ระหว่างการจัดทำ</text>
                        <input type="checkbox" name="statusOrder" value="เสร็จสมบูรณ์!" onChange={this.onChange} onClick={this.toggleCheckFinish} checked/><text>เสร็จสมบูรณ์!</text>
                        <button name="statusOrder">เลือกสถานะ</button></div>
    }
    else if (checkWaiting==false && checkDoing==false && checkFinish==false) {
      successBut = <div><input type="checkbox" name="statusOrder" value="รอการจัดทำ" onChange={this.onChange} onClick={this.toggleCheckWaiting} /><text>รอการจัดทำ</text>
                        <input type="checkbox" name="statusOrder" value="อยู่ระหว่างการจัดทำ" onChange={this.onChange} onClick={this.toggleCheckDoing} /> <text>อยู่ระหว่างการจัดทำ</text>
                        <input type="checkbox" name="statusOrder" value="เสร็จสมบูรณ์!" onChange={this.onChange} onClick={this.toggleCheckFinish} /><text>เสร็จสมบูรณ์!</text>
                        <button name="statusOrder" disabled>เลือกสถานะ</button></div>
    }

    return (
        <div class="bgEdit">
        <form id="con" onSubmit={this.onSubmit} >
            {this.state.board.statusOrder}
            {successBut}
        </form>
        </div>
    );
  }
}

export default EditStatus;