import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [lists, setLists] = useState([]);

  useEffect(() => {
    console.log('mounted');
    (async () => {
      try {
        const { data } = await axios.get('/api/values');
        console.log('data: ', data);
        setLists(data);
      } catch (err) {
        console.log('failed to fetch');
      }
    })();
  }, []);

  const handleChange = (e) => setValue(e.currentTarget.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const {data} = await axios.post('/api/values', { value });
      if (data.success) {
        setLists((prevState) => [...prevState, data]);
        setValue('');
        return;
      }

      throw new Error('failed to save');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <ul>
          {lists.map((list) => (
            <li key={list.value}>{list.value}</li>
          ))}
          <p>안녕하세요.</p>
        </ul>
        <div className='container'>
          <form className='example' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='입력해 주세요.'
              value={value}
              onChange={handleChange}
            />
            <button type='submit'>확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
