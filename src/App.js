import '@fontsource/ubuntu';
import './App.css';
import { store } from './store';
import { Provider, useDispatch } from 'react-redux'

import Task from './Task';
import { useEffect, useState } from 'react';
import { Box, Button, ChakraProvider, HStack, Link, Text, } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { useGetConfigQuery } from './configApi';
import { useStatusQuery } from './timerApi';
import { AuthChecker } from './auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import theme from './theme';
import { useLogoutMutation } from './authApi';
import { removeToken } from './authSlice';
import BreakTimer from './BreakTimer';
import PomoTimer from './PomoTimer';

// web-push add 
function App() {
  // get selected task
  // get the time status
  // get all other configs 

  //color objects
  // timer :
  // short
  // long

  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        {/* <Main></Main> */}
        <GoogleOAuthProvider clientId="798224335861-ho4meomu5j6dpcmr5tk7vfesff2td6pl.apps.googleusercontent.com">
          <AuthChecker>
            <Main></Main>
          </AuthChecker>
        </GoogleOAuthProvider>

        {/* <Login></Login> */}
      </Provider>
    </ChakraProvider>
  );
}
const GuestorUser = () => {
  return
}
// Now convert it to guest and authenticated user
const Main = () => {
  const dispatch = useDispatch()
  const [taskId, setTaskId] = useState(null) // from selected api
  const [activeTimer, setActiveTimer] = useState('timer');
  // const [timerState]
  const { data, isLoading, isSuccess, isError, error, isFetching } = useGetConfigQuery()
  const status = useStatusQuery(encodeURI(new Date().toString()))
  const logout = useLogoutMutation()
  useEffect(() => {
    if (status.isSuccess) {
      if ((status.data['status'] === 'running') | (status.data['status'] === 'paused')) {
        setActiveTimer('timer')
      }
      else {
        if ((status.data['break_type'] === 'LONG') | (status.data['break_type'] === 'SHORT')) {
          setActiveTimer(status.data['break_type'])
        }
      }
    }
  }, [status.isSuccess])
  // console.log(data, isLoading, isSuccess,error)
  const colorFinder = () => {
    if (activeTimer === 'timer')
      return isSuccess && data.data.theme.pomodoro
    if (activeTimer === 'SHORT')
      return isSuccess && data.data.theme.short_break
    if (activeTimer === 'LONG')
      return isSuccess && data.data.theme.long_break
  }
  const timer_resolver = () => {

    if (activeTimer === 'timer')
      return <PomoTimer timer_status={status.isSuccess && status.data.status} timer_id={status.isSuccess && status.data.id} end_time={status.isSuccess && status.data.end_time}></PomoTimer>  //<TimerController end_time={{}} taskId={taskId} onCompleted={() => { }} onPause={() => { }} onResume={() => { }} onStart={() => { }}></TimerController>
    if (activeTimer === 'SHORT')
      return <BreakTimer  {...status.data}></BreakTimer>
    if (activeTimer === 'LONG')
      return <BreakTimer   {...status.data}></BreakTimer>
    else
      return <Text>Something is wrong</Text>


  }
  // { return isFetching && <h1>Loading</h1> }
  if (!status.isSuccess)
    return <h1>Loading status</h1>
  return <Box backgroundColor={colorFinder()} overflow={'hidden'} height={'auto'}>
    <HStack>
      <Text color={'white'} fontWeight={'600'} fontSize={'22px'}>Pomodoro</Text>
      <Link onClick={() => {
        dispatch(removeToken())
        logout[0]()
      }}>Logout</Link>
    </HStack>
    <Center >
      <Box height={'100vh'}>
        <Box border={'1px solid white'} mt={10} p={'5px 2px'}>
          <HStack justifyContent={'center'} >
            <Button _hover={{
              background: '#FF8F8F'
            }} background={activeTimer === 'timer' && '#FF8F8F'} opacity={1} borderRadius={3} onClick={() => setActiveTimer('timer')} p={'1px 5px'} variant={'ghost'} >Pomodoro</Button>
            <Button background={activeTimer === 'Short' && 'blue'} borderRadius={3} onClick={() => setActiveTimer('SHORT')} p={'1px 5px'}>Short Break</Button>
            <Button background={activeTimer === 'Long' && 'green'} borderRadius={3} onClick={() => setActiveTimer('LONG')} p={'1px 5px'}>Long Break</Button>

          </HStack>
          {timer_resolver()}
        </Box>

        {/* end_from = timestatus api */}
        <Task onChangeTask={{}}></Task>
      </Box>
    </Center>
  </Box>
}

export default App;
