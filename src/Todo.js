import { useDispatch } from "react-redux"
import { Button, Flex, Icon, IconButton, Link, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Text, Textarea } from '@chakra-ui/react';
import { useCreateTaskMutation, useDeleteTaskMutation, useTaskCheckOffMutation, useUpdateTaskMutation } from './taskApi'
import { Box } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons'
import { FiMoreVertical } from "react-icons/fi";
import { useState } from 'react';
import { Input } from '@chakra-ui/react';

import { useNavigate } from "react-router";
import TodoAdd from "./TodoAdd";
import { useTodoGetListQuery } from "./api/TodoApi";
const TaskForm = (props) => {
    const creating = useCreateTaskMutation()
    const updating = useUpdateTaskMutation();
    // onCancel,onSave,onDelete,type:create/edit,if create 'data' not required,
    const onCancel = () => {
        props.onCancel()
    }
    const onSave = () => {
        // 
        if (props.create) { console.log('creating', data); creating[0](data) }
        else {
            updating[0]({ ...data })
        }
        props.onSave()

    }
    const onDelete = () => {
        props.onDelete()
    }
    const [addNote, setAddNote] = useState(props.create && props.description ? true : false)
    const [data, setData] = useState(props.create ? { 'title': '', 'description': null, 'want_to_focus': 0 } : props.data)
    console.log(data);

    return <Box borderRadius={10} marginBottom={5} background={'white'} width={'380px'}>
        <Box padding={5}>
            <Input placeholder='Name' border={'0'} defaultValue={data['title']}
                onChange={(value) => {
                    setData({ ...data, title: value.target.value })
                }}
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
                <NumberInput min={0} defaultValue={0} isDisabled={true}  >
                    <NumberInputField width={'100px'}></NumberInputField>
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                {/* to focus */}
                <NumberInput min={0} ml={2} value={data.want_to_focus} v onChange={(valueString) => {
                    console.log(parseInt(valueString))
                    setData({ ...data, want_to_focus: parseInt(valueString) })
                }}>
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
                <Link onClick={() => { props.onDelete() }}>Delete</Link>
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
    const deleteTask = useDeleteTaskMutation()
    const check_off = useTaskCheckOffMutation()
    if (!settingsOpen)
        return <Box position={'relative'} onClick={(event) => { event.preventDefault(); props.onClick() }} padding={3} borderRadius={10} marginBottom={1} background={'white'} width={'380px'} borderLeft={props.selected && `8px solid black`}
            borderLeftRadius={5}
        >
            <Flex justifyContent={'center'} alignItems={'center'} width={'380xp'}>
                <Button borderRadius={'50%'} width={10} onClick={(event) => { event.stopPropagation(); check_off[0]({ id: props.id, check_off: !props.check_off }) }} ><CheckCircleIcon color={props.check_off ? 'red.500' : 'silver'} fontSize={28} ></CheckCircleIcon></Button>
                <Text fontSize={18} fontWeight={'bold'} flexBasis={'70%'} ml={2} textDecoration={props.check_off ? 'line-through' : 'none'} color={props.check_off && 'gray.300'}>{props.title}</Text>
                <Text color={'gray'} fontWeight={'semi-bold'}>{props.completed}/{props.want_to_focus}</Text>
                <IconButton ml={2} p={0} onClick={(event) => { event.stopPropagation(); setSettingsOpen(true) }} ><Icon as={FiMoreVertical} fontSize={25} ></Icon></IconButton>
            </Flex>
            <Text display={!props.description && 'none'} backgroundColor={'wheat'} padding={2} mt={2} borderRadius={3}>{props.description}</Text>
        </Box>
    else
        return <TaskForm onCancel={() => {
            setSettingsOpen(false)
        }}
            onSave={() => {
                setSettingsOpen(false)
            }}
            onDelete={() => {
                deleteTask[0]({ task: props.id })
            }}

            data={{ title: props.title, want_to_focus: props.want_to_focus, description: props.description, id: props.id }}></TaskForm>
}
const Todo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <Stack background={'#31363F'}>
        <Stack width={'380px'} m="auto" height={'100vh'}>
            {/* <Button onClick={() => navigate('/todo/add')}>Add</Button> */}
            <TodoAdd></TodoAdd>
            <Combiner />
        </Stack>
    </Stack>

}
export default Todo

const Combiner = () => {
    const [open, setOpen] = useState(false)
    const t = useTodoGetListQuery();
    const navigate = useNavigate();

    console.log(t.data)
    if (t.isSuccess)
        return <Stack position={'relative'}>
            {t.data.map(item => <TodoMain onClick={() => { navigate('/todo/' + item.id) }} {...item}></TodoMain>
            )}

            {open && <>
                <TaskItem></TaskItem>
                <TaskItem></TaskItem>
                <TaskItem></TaskItem>
                <TaskItem></TaskItem>
                <TaskItem></TaskItem>

            </>
            }
        </Stack>

}
const TodoMain = (props) => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const deleteTask = useDeleteTaskMutation()
    const check_off = useTaskCheckOffMutation()
    if (!settingsOpen)
        return <Box position={'relative '} onClick={(event) => {
            event.preventDefault(); props.onClick()
        }} padding={3} borderRadius={10} marginBottom={0} background={'#00224D'} width={'380px'} borderLeft={`10px solid ` + props.custom_color_code ? props.custom_color_code : `purple`}
            borderLeftRadius={5}
        >
            <Flex justifyContent={'center'} alignItems={'center'} width={'380xp'}>
                <Button borderRadius={'50%'} width={10} onClick={(event) => { event.stopPropagation(); check_off[0]({ id: props.id, check_off: !props.check_off }) }} >
                    <CheckCircleIcon color={props.check_off ? 'red.500' : 'silver'} fontSize={28} ></CheckCircleIcon></Button>
                <Text fontSize={18} fontWeight={'bold'} flexBasis={'70%'} ml={2} textDecoration={props.check_off ? 'line-through' : 'none'} color={props.check_off && 'gray.300'} color={'gray.300'}>{props.title}</Text>
                <Text color={'gray'} fontWeight={'semi-bold'}>{props.completed}/{props.want_to_focus}</Text>
                <IconButton ml={2} p={0} onClick={(event) => { event.stopPropagation(); setSettingsOpen(true) }} ><Icon as={FiMoreVertical} fontSize={25} ></Icon></IconButton>
            </Flex>
            <Text display={!props.description && 'none'} backgroundColor={'wheat'} padding={2} mt={2} borderRadius={3}>{props.description}</Text>
        </Box>
    else
        return <TaskForm onCancel={() => {
            setSettingsOpen(false)
        }}
            onSave={() => {
                setSettingsOpen(false)
            }}
            onDelete={() => {
                deleteTask[0]({ task: props.id })
            }}

            data={{ title: props.title, want_to_focus: props.want_to_focus, description: props.description, id: props.id }}></TaskForm>

}