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
      boards: []
    };
  }
  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { name, amount, size, format, color, page, statusOrder, rand } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        page,
        amount,
        size,
        color,
        format,
        statusOrder,
        rand
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
    
    if(!statusOrder){
      orderS = this.state.boards.map(board =>
       <Button id="button" type="primary" href={`/show/${board.key}`} onChange={this.onChange}><span>{board.rand}</span></Button>
        )
    }else{
      orderS = this.state.boards.map(board =>
        <Button disabled type="primary">{board.rand}</Button>
        )
      }
      
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
