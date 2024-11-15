import { useEffect, useRef, useState } from "react"
import moment from 'moment';
import { useBreakTimerStartMutation, useBreakTimerStopMutation, useCompleteTimerMutation, usePauseTimerMutation, useResumeTimerMutation, useStartTimerMutation } from "./api/timerApi";
import { Box, Center, Flex, Icon } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { MdSkipNext } from "react-icons/md";
import { useGetConfigQuery } from "./api/configApi";
import { secondsToMinSecPadded } from "./Timer";
import { ActionButton } from "./TimerUtils";

// 
const BreakTimer = (props) => {
    // config, break?,break_type
    // status
    // running
    // not running
    // console.log('breaktimer',props);
    const config = useGetConfigQuery();
    // console.log(config,'config--------' ,config.isSuccess && config.data.data['pomo_time'], 'config in pomo');
    // Setup
    const break_time = () => {
        if (config.isSuccess) {
            console.log('break timer success',props.break_type);
            if (props.break_type === 'LONG') {
                console.log('LONG');
                return JSON.stringify(config.data.data['long_break_time']) + ":00"
            }
            if (props.break_type === 'SHORT') {
                console.log('SHORT');
                return JSON.stringify(config.data.data['short_break_time']) + ":00"
            }
        }
        else {
            return ''
        }
    }
    // console.log;
    let [timeConfig, setTimeConfig] = useState(null); // might be better to add this the useeffect
    const [timer, setTimer] = useState()
    // Mutation
    const [trigger, data] = useBreakTimerStartMutation() // put it on top of hierarcy to pass the trigger down
    const stopApi = useBreakTimerStopMutation()
    // Triggers
    const onStart = () => {
        trigger({ 'break_type': props.break_type })
    }

    const onPause = () => {
        stopApi[0]({ 'break': data.isUninitialized ? props.id : data.data.id })
    }
    // Default to 25:00

    const intervalRef = useRef(null);
    const [time_count, setTimeCount] = useState(0)
    const [is_running, setIsRunning] = useState('inactive');//inactive/paused/running

    // Isolated Functions
    var startTimer = (end_time) => {
        console.log(timer, 'starting timer ');
        setIsRunning('running')// for indication that timer is running
        clearInterval(intervalRef.current);//remove any past timer
        intervalRef.current = setInterval(() => {
            if (end_time - new Date() <= 0) {//check if timeout
                console.log('time is up')
                clearInterval(intervalRef.current);//Stop interval
                setTimeCount(0)// Reset Count
                setIsRunning('inactive')//Now reseting state to in_active
            }
            else
                setTimeCount((end_time - new Date()) / (1000));// set time left 
        }, 1000)//after every 1second

    }
    // If api start success than start timer
    // useEffect(() => {
    //     if (data.isSuccess) {
    //         console.log(data.data, 'now will start timer')
    //         startTimer(moment(data.data.end_time))
    //     }
    // }, [data.isSuccess])

    useEffect(() => {
        if (config.isSuccess) {
            console.log(break_time(), 'break timer ******');
            setTimeConfig(break_time())

        }
    }, [config.isSuccess])
    // To manage the already running timer
    useEffect(() => {

        if (props.end_time) {
            console.log('end_time', moment(props.end_time));
            if (props.id) { startTimer(moment(props.end_time)); console.log('running') }
            // else if (props.timer_status === 'paused') { setTimeCount((moment(props.end_time) - new Date()) / (1000)); console.log('paused') }
        }
    }, [])
    // useEffect(() => { }, [])
    var pauseTimer = () => {
        clearInterval(intervalRef.current)
        onPause()
    }
    const instance = () => {
        if (is_running === 'inactive')
            return <ActionButton onClick={() => {
                setIsRunning('running')
                onStart()
                console.log('Starting')
            }} name={'Start'} />

        if (is_running === 'running')
            return <>
                <ActionButton onClick={() => {
                    pauseTimer()
                    setIsRunning('paused')
                    console.log('pausing')
                }} name={'Pause'} />

                <Flex p={'10px'} background={'gray'} onClick={() => { }}>
                    <Icon as={MdSkipNext} width={10} color={'white'} fontSize={'35px'} zIndex={100}   ></Icon>
                </Flex>
            </>;

    }


    return (
        <Box padding={'5px 30px'} backgroundColor={'transparent'} borderRadius={10} mt={1}>
            <Text fontSize={'100px'} textAlign={'center'} color={'white'}>{time_count ? secondsToMinSecPadded(time_count) : timeConfig}</Text>
            <Center>{
                instance()
            }
            </Center>

        </Box>
    )
}

export default BreakTimer;