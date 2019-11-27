import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './Firebase';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import './css/app.css';
import bgApp from './image/bgList.png';


class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: [],
      name: '',
      page: '',
      page2: '',
      size: '',
      amount: '',
      copy: '',
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
    };
  }
  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { name,
        page,
        page2,
        size,
        amount,
        copy,
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
        url2, } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
      page,
      page2,
      size,
      amount,
      copy,
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
      });
    });
    this.setState({
      boards
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  // onChange() {
  //   if(this.state.board.statusOrder == "เสร็จสมบูรณ์!") {

  //   }
  // }

  render(){
    const statusOrder = this.state.statusOrder;
    let orderS,status1;
    
      orderS = this.state.boards.map(board =>{
        if(board.statusOrder=="รับสินค้าแล้ว")
          return null
        else
          return <Button id="button" type="primary" href={`/show/${board.key}`} onChange={this.onChange}><span>{board.rand}</span></Button>
      }
        );
    // }else{
    //   orderS=this.state.boards.map(board =>
    //     <Button disabled type="primary">{board.rand}</Button>
    //     )
    //   }
      
    return (
    <div class="bgApp" >
    <div className="App">
      <div id="content">{orderS}</div>
    </div>
    </div>
  );
}
}

export default App;
