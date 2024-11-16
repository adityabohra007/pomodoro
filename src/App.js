import '@fontsource/ubuntu';
import './App.css';
import { store } from './store';
import { Provider } from 'react-redux'

import { ChakraProvider, } from '@chakra-ui/react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import theme from './theme';
import { RouterProvider } from 'react-router';
import router from './routes';

// web-push add 

// const Report = () => {

// }

function App() {
  // get selected task
  // get the time status
  // get all other configs 

  //color objects
  // timer :
  // short
  // long
  return <ChakraProvider theme={theme}>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="798224335861-ho4meomu5j6dpcmr5tk7vfesff2td6pl.apps.googleusercontent.com">
        <RouterProvider router={router}></RouterProvider>
      </GoogleOAuthProvider>
    </Provider>
  </ChakraProvider>

}

// Now convert it to guest and authenticated user


export default App;
