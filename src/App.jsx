
import { useEffect, useState } from 'react';

import './App.css'
import { Card,Button } from 'react-bootstrap';


function App() { const [users, setUsers] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      setUsers(data.users);
      generateRandomUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const generateRandomUsers = (users) => {
    const randomIndexes = [];
    while (randomIndexes.length < 1) {
      const randomIndex = Math.floor(Math.random() * users.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    const selectedUsers = randomIndexes.map((index) => users[index]);
    setRandomUsers(selectedUsers);
  };
  const handleGenerateRandomUsers = (e) => {
    const body = document.querySelector('body')
    body.style.background=getRandomColor()
    generateRandomUsers(users);
  };
  function getRandomColor(){
    let letters= '0123456789ABCDEF'
    let color= '#'
    for(let i=0;i<6;i++){
      color += letters[Math.floor(Math.random() * 16)]
     
    }
    return color;
  }


  return (
    <div>
      <h1 className='text-dark text-center' >Random User On Refresh</h1>
      <Card style={{ width: '700px' ,height:'100vh'}} className='container box shadow text-center d-flex justify-content-center align-items-center p-2'>
      <Card.Body>
        <div>
          <div className='row'>
            <div className='col-lg-6'>
           
            {randomUsers.map((users) => (
          <div key={users.id}>
             <img className='img-fluid rounded' src={users.image} alt="User" />
            <h2>{`${users.firstName} ${users.lastName}`}</h2>
            <p>Birth Date: {users.birthDate}</p>
            <p>Age: {users.age}</p>
            <p>Height: {users.height}</p>
            <p>Weight: {users.weight}</p>
           
            <Button variant="primary" onClick={handleGenerateRandomUsers}>Refresh</Button>
          </div>
        ))}
            </div>
            <div style={{flexDirection:'column'}} className='col-lg-6 mb-5'>
            {randomUsers.map((users) => (
          <div key={users.id}>
            <p className='mb-5'>Home Address: {users.address.address}</p>
            <p className='mb-5'>Mobile Number {users.phone}</p>
            <p className='mb-5'>Company: {users.company.name}</p>
            <p className='mb-5'>Job Title: {users.company.title}</p>
            <p className='mb-5'>Email: {users.email}</p>
           
            
          </div>
        ))}
            </div>
          </div>
        </div>
       
      </Card.Body>
    </Card>
     </div>
     
  )
}

export default App
