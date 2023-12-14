import { Button, Center, Flex, HStack, Icon, IconButton, Link, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Text, Textarea, VStack } from '@chakra-ui/react';
import { useFetchTaskQuery, useTaskSelectMutation, useTaskSelectedQuery } from './taskApi'
import { Box } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons'
import { MdSettings } from 'react-icons/md'
import { FiMoreVertical } from "react-icons/fi";
import { useDrag } from 'react-dnd'
import { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/react';
const TaskForm = (props) => {
    // onCancel,onSave,onDelete,type:create/edit,if create 'data' not required,
    const onCancel = () => {
        props.onCancel()
    }
    const onSave = () => {
        props.onSave()
    }
    const onDelete = () => {
        props.onDelete()
    }
    const [addNote, setAddNote] = useState(false)
    const [data, setData] = useState(props.create ? { 'title': '', 'description': '', 'want_to_focus': null } : props.data)
    return <Box borderRadius={10} marginBottom={5} background={'white'} width={'380px'}>
        <Box padding={5}>
            <Input placeholder='Name' border={'0'}
                _active={{
                    'border': '0'
                }}
                outline={'0'}
                _hover={{
                    'border': '0'
                }}></Input>
            <Text mt={2} fontWeight={'bold'}>Act/Est Pomodoros</Text>
            <Flex mt={2}>
                {/* To be done */}
                <NumberInput min={0} value={0} isDisabled={true} >
                    <NumberInputField width={'100px'}></NumberInputField>
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                {/* to focus */}
                <NumberInput min={0} ml={2} value={props.want_to_focus}>
                    <NumberInputField width={'100px'}></NumberInputField>
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <button></button>
                <button></button>
            </Flex>
            {props.description | addNote ? <Box mt={4} borderRadius={2} background={'yellowgreen'}><Textarea resize={false} height={50} ></Textarea></Box> : <Link onClick={() => { setAddNote(true) }}>Add note</Link>
            }
            <Flex mt={4}>

                <Link ml={2}>Add Project</Link>
            </Flex>
        </Box>
        <Flex background={'#e8e8e8'} padding={5} borderBottomRadius={5} alignItems={'center'}>
            {props.create ? <></> :
                <Link>Delete</Link>
            }

            <Flex marginLeft={'auto'}>
                <Button onClick={() => { onCancel() }}>Cancel</Button>
                <Button ml={2} background={'black'} color={'white'} onClick={() => { onSave() }}>Save</Button>
            </Flex>

        </Flex>
    </Box>
}
const TaskItem = (props) => {
    console.log(props);
    const [settingsOpen, setSettingsOpen] = useState(false);
    if (!settingsOpen)
        return <Box onClick={props.onClick} padding={5} borderRadius={10} marginBottom={5} background={'white'} width={'380px'} borderLeft={props.selected && '5px solid black '}
            borderLeftRadius={props.selected && 0}
        >
            <Flex justifyContent={'center'} alignItems={'center'} width={'380xp'}>
                <CheckCircleIcon color={'silver'} fontSize={28} ></CheckCircleIcon>
                <Text fontSize={18} fontWeight={'bold'} flexBasis={'70%'} ml={2}>{props.title}</Text>
                <Text color={'gray'} fontWeight={'semi-bold'}>0/{props.want_to_focus}</Text>
                <IconButton ml={2} p={0}><Icon as={FiMoreVertical} fontSize={25} onClick={() => { setSettingsOpen(true) }}></Icon></IconButton>
            </Flex>
            <Text backgroundColor={'wheat'} padding={2} mt={2} borderRadius={3}>{props.description}</Text>
        </Box>
    else
        return <TaskForm></TaskForm>
}

const TaskStats = () => {
    return <Box width={'100%'} color={'white'} border={'1px solid white'} borderRadius={'2px'}>
        <Flex justifyContent={'space-between'} w={'100%'}>
            <VStack width={'50%'}>
                <Text>Completion On</Text>
                <Text>7:06(12.05hrs)</Text>
            </VStack>
            <VStack w={'50%'}>
                <Text>Pomo Done</Text>
                <Text>11/18</Text>
            </VStack>
        </Flex>
    </Box>
}

const Task = () => {
    const { isLoading, isSuccess, error, data, isError, isFetching } = useFetchTaskQuery()
    const taskSelected = useTaskSelectedQuery()
    const taskSelect = useTaskSelectMutation()
    const [addTask, setAddTask] = useState(false);
    // console.log(taskSelected.data.selected);

    useEffect(() => {
        // if (taskSelected.isSuccess) { setValue(taskSelected.data.selected.task.id); }
    }, [taskSelected.isSuccess])
    if (isLoading | taskSelected.isLoading) return <h5>Loading</h5>
    if (taskSelected.isSuccess)
        return <>


            <Box marginTop={10} >
                <VStack>
                    {isSuccess && data.map(item =>
                        <TaskItem onClick={() => {
                            taskSelect[0]({ 'task': item.id })
                            // check if any timer is running than give warning

                        }} key={item.id} {...item} selected={
                            taskSelected.data && taskSelected.data.selected.task.id === item.id && true
                        }></TaskItem>
                    )}
                    {addTask ?
                        <Center mt={'10px'}>
                            <TaskForm
                                onCancel={() => { setAddTask(false) }}
                                create={true}
                                onSave={() => {
                                    // api call to save for new task
                                }}></TaskForm>
                        </Center>
                        :
                        <Text textAlign={'center'} border={'3px dotted white'} background={'transparent'} width={'380px'} color={'white'} p={'7px'} onClick={() => { console.log('Adding Waiting please'); setAddTask(true) }} >Add New Task</Text>}
                    {/*  */}
                    <TaskStats></TaskStats>
                </VStack>
            </Box>
        </>

}
export default Task;
