import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './Firebase';
import 'antd/dist/antd.css';
import { Button } from 'antd';



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

  render(){
    const statusOrder = this.state.statusOrder;
    let orderS;
    if(!statusOrder){
      orderS = this.state.boards.map(board =>
      <Button type="primary" href={`/show/${board.key}`}>{board.rand}</Button>
        )
    }else{
      orderS = this.state.boards.map(board =>
        <Button disabled type="primary">{board.rand}</Button>
        )
      }
    return (
    
    <div className="App">
      <div>
      {orderS}
      </div>
    </div>
  );
}
}

export default App;
