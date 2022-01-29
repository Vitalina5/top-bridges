import { useState } from 'react';
import { data, dataOne } from './data';
import './App.css';

function App() {
  const [slides, setSlides] = useState(0);
  const {image} = dataOne[slides];


  const [bridges, setBridges] = useState(data);
  //const [showMore, setShowMore] = useState(false);

  const showSlides = () => {
    setSlides((slides => {
      slides++;
      if(slides > dataOne.length-1) {
        slides = 0;
      }
      return slides
    }))
  }
  

  const deleteBridge = (id) => {
    const newBridges = bridges.filter(bridge => bridge.id !== id);
    setBridges(newBridges);
  }

  const setShowMore = (id) => {
    const newBridges = [];
    bridges.forEach(bridge => {
        if (bridge.id === id) {
            const changedBridge = {...bridge, showMore: !bridge.showMore};
            newBridges.push(changedBridge);
        } else {
            newBridges.push(bridge);
        }
    });
    setBridges(newBridges); 
}

  return (
    <div>
      <div className='container'>
        <h1>Топ {bridges.length} необычных мостов, которые стоит увидеть собственными глазами</h1>
      </div>
      <div className='container'>
        <img src={image} width="450px" height="300px" alt="Мост"/>
      </div>
      <div className='container'>
        <button className='btnDelete slides' onClick={showSlides}>Посмотри</button>
      </div>

      {bridges.map((bridge => {
        const {id, bridgeName, typeBridge, lengthBridge, description, imageOne, imageTwo, showMore} = bridge;

        return (
          <div key={id}>
            <div className='container'>
              <h2>{id} - {bridgeName}</h2>
            </div>
            <div className='container'>
              <h3>{typeBridge}</h3>
            </div>
            <div className='container'>
              <h3 className='one'>{lengthBridge}</h3>
            </div>
            <div className='container text'>
              <p>{showMore ? description : description.substring(0, 200) + "..."}
              <button className='btnShowText' onClick={() => setShowMore(id)}>{showMore ? "скрыть" : "показать"}</button>
              </p>
            </div>
            <div className='container'>
              <img src={imageOne} width="600px" alt="Мост"/>
            </div>
            <br></br>
            <div className='container'>
              <img src={imageTwo} width="600px" alt="Мост"/>
            </div>
            <div className='container'>
              <button className='btn' onClick={() => deleteBridge(id)}>Цель № {id}</button>
            </div>
          </div>
        )
      }))}
      <div className='container'>
        <button className='btnDelete' onClick={() => setBridges([])}>Цели достигнуты</button>
      </div>
      </div>
  );
}

export default App;
