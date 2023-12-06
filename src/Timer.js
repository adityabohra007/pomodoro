import { useEffect, useRef, useState } from "react"
import moment from 'moment';
import { useCompleteTimerMutation, usePauseTimerMutation, useResumeTimerMutation, useStartTimerMutation } from "./timerApi";
import { Box, Center, Flex, Icon } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { MdSkipNext } from "react-icons/md";
import { useGetConfigQuery } from "./configApi";
const secondsToMinSecPadded = time => {
    const minutes = `${Math.floor(time / 60)}`.padStart(2, "0");
    const seconds = `${time - minutes * 60}`.padStart(3, "00");
    return `${minutes}:${seconds.split('.')[0]}`;
};

// Complete timer implementation 
// Api integration
// Task CRUD
// UI/UX
export const PomoTimer = (props) => {
    // props.is_paused
    // console.log(props.end_time, 'pomo');
    // props - end_time
    // if end_time is provided just use end_time 
    // steps
    // 1. check if any timer is running 
    // 2. if yes , get the end_time of that time 
    // 3. start timer without clicking start
    // we need taskId
    const config = useGetConfigQuery();
    console.log(config, config.isSuccess && config.data.data['pomo_time'], 'config in pomo');
    const timeConfig = config.isSuccess ? JSON.stringify(config.data.data['pomo_time']) + ':00' : ""
    const [timer, setTimer] = useState()
    // Mutation
    const [trigger, data] = useStartTimerMutation() // put it on top of hierarcy to pass the trigger down
    const pausingApi = usePauseTimerMutation()
    const resumeApi = useResumeTimerMutation()
    const completedApi = useCompleteTimerMutation()
    // Triggers
    const onStart = () => {
        trigger({ 'start_time': new Date().toString(), 'task': 13 })
    }

    const onPause = () => {
        pausingApi[0]({ 'state': 'pause', 'current_time': new Date().toString(), 'timer': data.isUninitialized ? props.timer_id : data.data.id })
    }
    const onResume = () => {
        resumeApi[0]({ 'state': 'unpause', 'current_time': new Date().toString(), 'timer': data.isUninitialized ? props.timer_id : data.data.id })

    }
    const onCompleted = () => {
        completedApi[0]({ 'state': 'completed', 'timer': data.isUninitialized ? props.timer_id : data.data.id })
    }
    // 
    // Default to 25:00


    const intervalRef = useRef(null);
    const [time_count, setTimeCount] = useState(0)
    const [is_running, setIsRunning] = useState('inactive');//inactive/paused/running
    var resumeTime = () => {
        // startTimer()
        // setIsRunning('running')
        // console.log('Resuming')
        onResume()
    }
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
            // console.log('update')
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

        if (resumeApi[1].isSuccess) {
            console.log('useeffect');
            if (resumeApi[1].data) {
                console.log('resume useeffect')
                startTimer(moment(resumeApi[1].data.timer.end_time))
            }
        }
    }, [resumeApi])
    // To manage the already running timer
    useEffect(() => {

        if (props.end_time) {
            console.log('end_time', props.end_time);
            if (props.timer_status === 'running') { startTimer(moment(props.end_time)); console.log('running') }
            else if (props.timer_status === 'paused') { setTimeCount((moment(props.end_time) - new Date()) / (1000)); console.log('paused') }
        }
        // to set status
        if (props.timer_status) {
            if (props.timer_status === 'paused') { setIsRunning('paused'); console.log('paused other'); }
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
        if (is_running === 'paused')
            return <><button style={{ background: 'white', minWidth: '200px', padding: '10px 5px', borderBottom: '10px solid silver' }} onClick={() => { console.log('resuming'); resumeTime() }}>Resume</button>   <Box>
                <Flex p={'10px'} background={'gray'} onClick={() => { onCompleted() }}>
                    <Icon as={MdSkipNext} width={10} color={'white'} fontSize={'35px'} zIndex={100} ></Icon>
                </Flex>
            </Box>
            </>
        if (is_running === 'running')
            return <>
                <button style={{ background: 'white', minWidth: '200px', padding: '10px 5px', borderBottom: '10px solid silver' }} onClick={() => {
                    pauseTimer()
                    setIsRunning('paused')
                    console.log('pausing')
                }}>Pause</button>
                <Flex p={'10px'} background={'gray'} onClick={() => { onCompleted() }}>
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

const TimerController = ({ taskId, onStart, onPause, onResume, onCompleted }) => {
    // Three methods should be provided to controller , such that , when we start ,what api to call , pause and complete
    const [timer, setTimer] = useState({ end_time: moment(new Date()).add(1500, 'seconds') })

    return <Timer taskId={taskId} time={timer['end_time']} timeConfig={'25:00'}></Timer>
}
const Timer = ({ time, timeConfig, onStart, onCompleted, onPause, onResume }) => {
    const intervalRef = useRef(null);
    const [time_count, setTimeCount] = useState(0)
    const [is_running, setIsRunning] = useState('inactive');//inactive/paused/running
    var resumeTime = () => {
        startTimer()
        setIsRunning('running')
        console.log('Resuming')
        onResume()
    }
    var startTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setTimeCount((time - new Date()) / (1000))
            console.log('update')
        }, 1000)

    }
    var pauseTimer = () => {
        clearInterval(intervalRef.current)
        onPause()
    }
    const instance = () => {
        if (is_running === 'inactive')
            return <button style={{ background: 'white', minWidth: '200px', padding: '10px 5px', borderBottom: '10px solid silver' }} onClick={() => {
                startTimer()
                setIsRunning('running')
                onStart()
                console.log('Starting')
            }}>Start</button>;
        if (is_running === 'paused')
            return <button style={{ background: 'white', minWidth: '200px', padding: '10px 5px', borderBottom: '10px solid silver' }} onClick={resumeTime}>Resume</button>;
        if (is_running === 'running')
            return <button style={{ background: 'white', minWidth: '200px', padding: '10px 5px', borderBottom: '10px solid silver' }} onClick={() => {
                pauseTimer()
                setIsRunning('paused')
                console.log('pausing')
            }}>Pause</button>;

    }

    // useEffect(() => {
    //     if (isSuccess) {
    //         console.log(taskData)
    //         trigger({ 'start_time': new Date().toString(), 'task': 13 })
    //     }
    //     // startTimer()
    //     // setTimer({ end_time: taskData[0].end_time })
    //     // return () => { clearInterval(timerCounter) }
    // }, [taskData])
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
export default TimerController;


//All mode api to be assigned properly 
// all break api should also be properly worked
// once all api is connected then add user sign in