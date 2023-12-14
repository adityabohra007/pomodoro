import { useEffect, useRef, useState } from "react"
import moment from 'moment';
import { useBreakTimerStartMutation, useBreakTimerStopMutation, useCompleteTimerMutation, usePauseTimerMutation, useResumeTimerMutation, useStartTimerMutation } from "./timerApi";
import { Box, Center, Flex, Icon } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { MdSkipNext } from "react-icons/md";
import { useGetConfigQuery } from "./configApi";
import { secondsToMinSecPadded } from "./Timer";

// 
const BreakTimer = (props) => {
    // config, break?,break_type
    const config = useGetConfigQuery();
    console.log(config, config.isSuccess && config.data.data['pomo_time'], 'config in pomo');
    // Setup
    const break_time = () => {
        if (config.isSuccess && props.break_type) {
            if (props.break_type === 'LONG') {
                return JSON.stringify(config.data.data['long_break_time']) + ":00"
            }
            if (props.break_type === 'SHORT') {
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
        trigger({ 'start_time': new Date().toString(), 'task': 13 })
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
        console.log(timer);
        setIsRunning('running')
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (end_time - new Date() <= 0) {
                console.log('time is up')
                clearInterval(intervalRef.current);//Stop interval
                setTimeCount(0)// Reset Count
                setIsRunning('inactive')//Now reseting state to in_active
            }
            else
                setTimeCount((end_time - new Date()) / (1000))
        }, 1000)

    }
    // If api start success than start timer
    useEffect(() => {
        if (data.isSuccess) {
            console.log(data.data)
            startTimer(moment(data.data.end_time))
        }
    }, [data])

    useEffect(() => {
        if (config.isSuccess) {
            setTimeConfig(break_time())

        }
    }, [config.isSuccess])
    // To manage the already running timer
    useEffect(() => {

        if (props.end_time) {
            console.log('end_time', props.end_time);
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
            return <button style={{ background: 'white', minWidth: '200px', padding: '10px 5px', borderBottom: '10px solid silver' }} onClick={() => {
                // setTimer(moment(new Date()).add(1500, 'seconds'))
                // startTimer()
                setIsRunning('running')
                onStart()
                console.log('Starting')
            }}>Start</button>;
        if (is_running === 'running')
            return <>
                <button style={{ background: 'white', minWidth: '200px', padding: '10px 5px', borderBottom: '10px solid silver' }} onClick={() => {
                    pauseTimer()
                    setIsRunning('paused')
                    console.log('pausing')
                }}>Pause</button>
                <Flex p={'10px'} background={'gray'} onClick={() => { }}>
                    <Icon as={MdSkipNext} width={10} color={'white'} fontSize={'35px'} zIndex={100}   ></Icon>
                </Flex>
            </>;

    }


    return (
        <Box padding={'25px 50px'} backgroundColor={'transparent'} borderRadius={10} mt={1}>
            <Text fontSize={'9xl'} color={'white'}>{time_count ? secondsToMinSecPadded(time_count) : timeConfig}</Text>
            <Center>{
                instance()
            }
            </Center>

        </Box>
    )
}

export default BreakTimer;