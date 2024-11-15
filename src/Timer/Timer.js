export const secondsToMinSecPadded = time => {
    const minutes = `${Math.floor(time / 60)}`.padStart(2, "0");
    const seconds = `${time - minutes * 60}`.padStart(3, "00");
    return `${minutes}:${seconds.split('.')[0]}`;
};

// Complete timer implementation 
// Api integration
// Task CRUD
// UI/UX



// const TimerController = ({ taskId, onStart, onPause, onResume, onCompleted }) => {
//     // Three methods should be provided to controller , such that , when we start ,what api to call , pause and complete
//     const [timer, setTimer] = useState({ end_time: moment(new Date()).add(1500, 'seconds') })

//     return <Timer taskId={taskId} time={timer['end_time']} timeConfig={'25:00'}></Timer>
// }
// const Timer = ({ time, timeConfig, onStart, onCompleted, onPause, onResume }) => {
//     const intervalRef = useRef(null);
//     const [time_count, setTimeCount] = useState(0)
//     const [is_running, setIsRunning] = useState('inactive');//inactive/paused/running
//     var resumeTime = () => {
//         startTimer()
//         setIsRunning('running')
//         console.log('Resuming')
//         onResume()
//     }
//     var startTimer = () => {
//         clearInterval(intervalRef.current);
//         intervalRef.current = setInterval(() => {
//             setTimeCount((time - new Date()) / (1000))
//             console.log('update')
//         }, 1000)

//     }
//     var pauseTimer = () => {
//         clearInterval(intervalRef.current)
//         onPause()
//     }
//     const instance = () => {
//         if (is_running === 'inactive')
//             return <button style={{ background: 'white', minWidth: '200px', padding: '10px 5px', borderBottom: '10px solid silver' }} onClick={() => {
//                 startTimer()
//                 setIsRunning('running')
//                 onStart()
//                 console.log('Starting')
//             }}>Start</button>;
//         if (is_running === 'paused')
//             return <button style={{ background: 'white', minWidth: '200px', padding: '10px 5px', borderBottom: '10px solid silver' }} onClick={resumeTime}>Resume</button>;
//         if (is_running === 'running')
//             return <button style={{ background: 'white', minWidth: '200px', padding: '10px 5px', borderBottom: '10px solid silver' }} onClick={() => {
//                 pauseTimer()
//                 setIsRunning('paused')
//                 console.log('pausing')
//             }}>Pause</button>;

//     }

//     // useEffect(() => {
//     //     if (isSuccess) {
//     //         console.log(taskData)
//     //         trigger({ 'start_time': new Date().toString(), 'task': 13 })
//     //     }
//     //     // startTimer()
//     //     // setTimer({ end_time: taskData[0].end_time })
//     //     // return () => { clearInterval(timerCounter) }
//     // }, [taskData])
//     return (
//         <Box padding={'25px 50px'} backgroundColor={'transparent'} borderRadius={10} mt={1}>
//             <Text fontSize={'9xl'} color={'white'}>{time_count ? secondsToMinSecPadded(time_count) : timeConfig}</Text>
//             <Center>{
//                 instance()
//             }
//             </Center>

//         </Box>
//     )
// }
// export default TimerController;


//All mode api to be assigned properly 
// all break api should also be properly worked
// once all api is connected then add user sign in