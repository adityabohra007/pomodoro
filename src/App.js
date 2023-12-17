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
import { useTaskSelectedQuery } from './taskApi';
import { FaRegUserCircle } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import Configuration from './Configuration';

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
            {/* <Text>Bro</Text> */}
            <Main></Main>
          </AuthChecker>
        </GoogleOAuthProvider>

        {/* <Login></Login> */}
      </Provider>
    </ChakraProvider>
  );
}

// Now convert it to guest and authenticated user
const Main = () => {
  const dispatch = useDispatch()
  const [taskId, setTaskId] = useState(null) // from selected api
  const [activeTimer, setActiveTimer] = useState('timer');
  const selected = useTaskSelectedQuery();
  // const [timerState]
  const { data, isLoading, isSuccess, isError, error, isFetching } = useGetConfigQuery()
  const status = useStatusQuery()
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
      return <PomoTimer
        task_selected={selected.isSuccess && selected.data}
        timer_status={status.isSuccess && status.data.status}
        timer_id={status.isSuccess && status.data.id}
        end_time={status.isSuccess && status.data.end_time}></PomoTimer>  //<TimerController end_time={{}} taskId={taskId} onCompleted={() => { }} onPause={() => { }} onResume={() => { }} onStart={() => { }}></TimerController>
    if (activeTimer === 'SHORT')
      return <BreakTimer break_type={'SHORT'}  {...status.data}></BreakTimer>
    if (activeTimer === 'LONG')
      return <BreakTimer break_type={'LONG'}   {...status.data}></BreakTimer>
    else
      return <Text>Something is wrong</Text>


  }
  // { return isFetching && <h1>Loading</h1> }
  if (status.isFetching || status.isLoading || selected.isLoading)
    return <h1>Loading status</h1>
  return <Box backgroundColor={colorFinder()} overflow={'hidden'} height={'auto'}>
    <Center>
      <HStack borderBottom={'2px solid white'} width={'500px'}>
        <Text color={'white'} fontWeight={'600'} fontSize={'22px'} margin={'20px 0px'}>Pomodoro</Text>
        <Link background={'#696969b0'} p={2} borderRadius={5} display={'flex'} justifyContent={'center'} marginLeft={'auto'}>
          <BsGraphUp color='white' />
          <Text ml={2} color={'white'} fontSize={12} >Report</Text>
        </Link>
        <Configuration></Configuration>


        <Menu>
          <MenuButton background={'#696969b0'} borderRadius={5} p={2} >
            <FaRegUserCircle color='white' />
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem onClick={() => {
              dispatch(removeToken())
              logout[0]()
            }}>Logout</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Center>

    <Center >
      <Box height={'100vh'}>
        <Box borderRadius={10} background={'#e7d5d52e'} mt={10} p={'12px 2px'}>
          <HStack justifyContent={'center'} mt={5} >
            <Button _hover={{ background: '#e7d5d52e' }} background={activeTimer === 'timer' && '#e7d5d52e'} opacity={1} borderRadius={3} color={'white'} fontSize={activeTimer === 'timer' && '18px'} onClick={() => setActiveTimer('timer')} p={'1px 5px'}  >Pomodoro</Button>
            <Button _hover={{ background: '#e7d5d52e' }} background={activeTimer === 'SHORT' && '#e7d5d52e'} borderRadius={3} color={'white'} fontSize={activeTimer === 'SHORT' && '18px'} onClick={() => setActiveTimer('SHORT')} p={'1px 5px'}>Short Break</Button>
            <Button _hover={{ background: '#e7d5d52e' }} background={activeTimer === 'LONG' && '#e7d5d52e'} borderRadius={3} color={'white'} fontSize={activeTimer === 'LONG' && '18px'} onClick={() => setActiveTimer('LONG')} p={'1px 5px'}>Long Break</Button>

          </HStack>
          {timer_resolver()}
        </Box>

        {/* end_from = timestatus api */}
        <Task task_selected={selected.isSuccess && selected.data} onChangeTask={{}}></Task>
      </Box>
    </Center>
  </Box>
}

export default App;
