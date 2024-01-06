import React, { useState } from 'react';
import TaskList from './TaskList';
import Swal from 'sweetalert2'
import LoginForm from './LoginForm'
import axios from 'axios'

function App() {
  const [token, setToken] = useState('');
  const [userRole, setUserRole] = useState(null);

  const onLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: username,
        password: password,
      });
      const { jwtToken, name } = response.data;

      console.log(username+" " +password)
    
      if(username!=='akshay' || password!=='akshay'){

        // alert("Please Enter valid Username or Password")
        Swal.fire({
          icon:'error',
          title:"Invalid Credentials",
          text:'Please Enter valid Username or Password',
        });
      }else{
      // console.log(response.data)
      // console.log(name)
      // console.log(jwtToken)
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome!',
      });
      setUserRole(name);
      setToken(jwtToken);
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };
  

  return (

    <div>

{token ? (
        <>
          {userRole === 'akshay' ? (
            // <UploadForm token={token} />
            <TaskList token={token}/>
          ) : (
            // <CardDisplay images={images} />
            <App/>
          )}
        </>
      ) : (
        <LoginForm onLogin={onLogin} />
      )}
      
      
    </div>
    
  );
}

export default App;


// import React, { useState } from 'react';
// import TaskList from './TaskList';
// import TaskForm from './TaskForm';

// function App() {

//   return (

//     <div>
//       <TaskList/>
//       <TaskForm />
//     </div>
    
//   );
// }

// export default App;
