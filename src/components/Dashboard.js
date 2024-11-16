import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Link, Text, Box, HStack, Tooltip, Stack, VStack, ButtonGroup
} from '@chakra-ui/react'
import { BsGraphUp } from "react-icons/bs";
import { useDashboardQuery } from '../api/dashboardApi';
import moment from 'moment';
import { Chart } from './BarChart';
// Sequence Dashboard,List of Task done
// function Charts() {
//     return <BarChart></BarChart>
// }
function Dashboard() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dashboard = useDashboardQuery()
    // const graphMode
    console.log(dashboard.data);
    const types = {
        pause: { color: 'gray' },
        SHORT: { color: 'purple' },
        LONG: { color: 'pink.500' },
        timer: { color: 'green.500' },
    }
    class Format {
        constructor(type, start_time, end_time, title) {
            this.type = type;
            this.start_time = start_time;
            this.end_time = end_time;
            this.title = title;
            this.period = null;
            this.color = null;

        }
        create() {

            this.period = moment(this.end_time) - moment(this.start_time)
            if (this.type === 'timer') {
                this.color = types['timer'].color;
            }
            if (this.type === 'LONG') {
                this.color = types['LONG'].color;

            }
            if (this.type === 'SHORT') {
                this.color = types['SHORT'].color;

            }
            if (this.type === 'pause') {
                this.color = types['pause'].color;

            }

        }
        output() {
            return { type: this.type, period: this.period, title: this.title, color: this.color, start_time: this.start_time, end_time: this.end_time }
        }
    }
    //  const a = new Format()
    //  a.create()
    // const format = { title: '', period: '', color: '', typet: '', start_timer: '', end_time: '' }
    var final_data = []
    const sequence_creator = () => {
        let break_counter = 0;
        let timer_counter = 0;
        let seq = []
        while (true) {
            if (break_counter < dashboard.data.break.length && timer_counter < dashboard.data.data.length) {
                console.log(dashboard.data.break[break_counter].start_time, 'data-', dashboard.data.data[timer_counter].timer.start_time, 'seq')
                if (dashboard.data.break[break_counter].start_time < dashboard.data.data[timer_counter].timer.start_time) {
                    seq.push(dashboard.data.break[break_counter]);
                    break_counter += 1;
                    console.log('seq,break')
                }
                else {
                    seq.push(dashboard.data.data[timer_counter]);
                    timer_counter += 1;
                    console.log('seq,data')


                }
            }
            else if (break_counter < dashboard.data.break.length) {
                seq.push(dashboard.data.break[break_counter])
                break_counter += 1
            }
            else if (timer_counter < dashboard.data.data.length) {
                seq.push(dashboard.data.data[timer_counter])
                timer_counter += 1
            }
            else {
                break
            }

        }
        console.log(seq, 'seq')
        const output = []
        for (let i in seq) {
            console.log(i);
            if (seq[i].break_type !== undefined) {
                console.log('break')
                const f = new Format(seq[i].break_type, seq[i].start_time, seq[i].end_time, 'Break');
                f.create();
                console.log(f.output())
                output.push(f.output())
            }
            if (seq[i].timer !== undefined) {
                console.log('timer');
                const f = new Format('timer', seq[i].timer.start_time, seq[i].timer.end_time, seq[i].task.title);
                f.create();
                console.log(f.output())
                output.push(f.output())
            }
        }
        return output
    }

    if (dashboard.isSuccess)
        return (
            <>

                <Link background={'#696969b0'} onClick={onOpen} p={2} borderRadius={5} display={'flex'} justifyContent={'center'} marginLeft={'auto'}>
                    <BsGraphUp color='white' />
                    <Text ml={2} color={'white'} fontSize={12} >Report</Text>
                </Link>

                <Modal isOpen={isOpen} onClose={onClose} size={'xl'} >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Dashboard</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack m={'auto'}>
                                <VStack>
                                    <ButtonGroup size='sm' isAttached variant='outline'>
                                        <Button>Summary</Button>
                                        <Button>Detail</Button>
                                        <Button>Ranking</Button>
                                    </ButtonGroup>
                                </VStack>
                                <p>Acitvity Summary</p>
                                <Chart></Chart>
                            </Stack>
                            {/* {dashboard.data} */}
                            {/* <Text fontWeight={800}>{new Date().toDateString()}</Text> */}
                            <Text mt={5}>
                                <HStack>
                                    {sequence_creator()
                                        .map(item => <Sequence {...item}></Sequence>)}
                                </HStack>

                            </Text>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </>
        )
}
const Sequence = (props) => {
    return <Tooltip label={`Title- ${props.title} | Start Time- ${moment(props.start_time).toString()} ,End Time ${moment(props.end_time).toString()},\nPeriod:${props.period / 60000}minutes`} placement='right-end'>
        <Box background={props.color} minWidth={`${(props.period) / (60 * 1000)}px`} width={`${(props.period) / (60 * 1000)}px`} height={10}>
        </Box>
    </Tooltip>
}
export default Dashboard;