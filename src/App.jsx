import React from 'react';
import './App.scss';
import './styles/general.scss';
import { districts, jobPlaces } from './api/api';
import { Form } from './components/Form';

const App = () => (
  <div className="App">
    <div className="App__title">
      Заявки на відвідання тренінгу для вчителів
    </div>
    <Form districts={districts} jobPlaces={jobPlaces} />
  </div>
);

export default App;
