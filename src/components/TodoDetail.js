import { useDispatch } from "react-redux"
import { Button, Flex, Icon, IconButton, Link, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Text, Textarea, VStack } from '@chakra-ui/react';
import { useCreateTaskMutation, useDeleteTaskMutation, useTaskCheckOffMutation, useUpdateTaskMutation } from '../api/taskApi'
import { Box } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons'
import { FiMoreVertical } from "react-icons/fi";
import { useState } from 'react';
import { Input } from '@chakra-ui/react';


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton, useDisclosure, FormControl, FormLabel
} from '@chakra-ui/react'
import { useTodoListDeleteMutation, useTodoListUpdateMutation } from '../api/TodoApi';
import { useTodoGetQuery } from "../api/TodoApi";
import { useParams } from "react-router";
import TaskAdd from "./TaskAdd";
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


    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState({ 'title': props.title, 'description': props.description, 'id': props.id });
    const todoUpdate = useTodoListUpdateMutation()
    const todoDelete = useTodoListDeleteMutation()

    return <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Ttle</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input placeholder='Enter title for you task' defaultValue={''} value={data['title']}
                            onChange={(e) => { setData({ ...data, title: e.target.value }) }}></Input>
                        <FormLabel mt={2}>Description</FormLabel>
                        <Textarea placeholder='Any detail you need to save'
                            defaultValue={''} value={data['description']}
                            onChange={(e) => { setData({ ...data, description: e.target.value }) }}></Textarea>
                        {/* <FormLabel mt={2}>Labels</FormLabel>
                            <Input placeholder='Seperated by commas ex:Hobbies,Language' defaultValue={''} value={data['category']}
                                onChange={(e) => { setData({ ...data, category: e.target.value }) }}></Input> */}
                        {/* <FormLabel mt={2}>Custom Color Coding</FormLabel>
                            <Input placeholder={'Paste color code here'} defaultValue={''} value={data['custom_color_code']}
                                onChange={(e) => { setData({ ...data, custom_color_code: e.target.value }) }}></Input> */}
                        <Button colorScheme='blue' mr={3} mt={5} onClick={() => { alert(JSON.stringify(data)); todoUpdate[0](data) }}>
                            Save
                        </Button>
                        <Button colorScheme="red" mt={5} onClick={() => { todoDelete[0](data.id) }}>Delete</Button>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>

        {/* // if (!settingsOpen) */}
        <Box position={'relative'} onClick={(event) => { event.preventDefault(); props.onClick() }} padding={3} borderRadius={10} marginBottom={1} background={'white'} width={'380px'} borderLeft={props.selected && `8px solid black`}
            borderLeftRadius={5}
        >

            <Flex justifyContent={'center'} alignItems={'center'} width={'380xp'}>
                <Button borderRadius={'50%'} width={10} onClick={(event) => { event.stopPropagation(); check_off[0]({ id: props.id, check_off: !props.check_off }) }} ><CheckCircleIcon color={props.check_off ? 'red.500' : 'silver'} fontSize={28} ></CheckCircleIcon></Button>
                <Text fontSize={18} fontWeight={'bold'} flexBasis={'70%'} ml={2} textDecoration={props.check_off ? 'line-through' : 'none'} color={props.check_off && 'gray.300'}>{props.title}</Text>
                <Text color={'gray'} fontWeight={'semi-bold'}>{props.completed}/{props.want_to_focus}</Text>
                <IconButton ml={2} p={0} onClick={(event) => { event.stopPropagation(); setSettingsOpen(true); onOpen() }} ><Icon as={FiMoreVertical} fontSize={25} ></Icon></IconButton>
            </Flex>
            <Text display={!props.description && 'none'} backgroundColor={'wheat'} padding={2} mt={2} borderRadius={3}>{props.description}</Text>
        </Box>
    </>

}
const Todo = () => {
    const params = useParams();
    const detail = useTodoGetQuery(params.id)
    const dispatch = useDispatch();
    return <Stack p={1} background={'#31363F'} height={'100vh'}>
        {
            detail.isSuccess && <Combiner data={detail.data} />

        }
    </Stack>
}
export default Todo

const Combiner = (props) => {
    const [open, setOpen] = useState(true)
    // const detail = useTodoGetQuery()
    return <VStack position={'relative'} p={3}>
        <TodoMain onClick={() => { }} data={props.data}>
        </TodoMain >
        {props.data.todo_list.map(item => {
            return <TaskItem {...item}></TaskItem>
        })}

        <TaskAdd id={props.data.id}></TaskAdd>


    </VStack >

}
const TodoMain = (props) => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const deleteTask = useDeleteTaskMutation()
    const check_off = useTaskCheckOffMutation()
    if (!settingsOpen)
        return <Box position={'relative '} onClick={(event) => { event.preventDefault(); props.onClick() }} padding={2} borderRadius={10} marginBottom={0} background={'#00224D'} width={'380px'} borderLeft={`10px solid purple`}
            borderLeftRadius={5}
        >
            <Flex justifyContent={'center'} alignItems={'center'} width={'380xp'}>
                <Button borderRadius={'50%'} width={2} onClick={(event) => { event.stopPropagation(); check_off[0]({ id: props.id, check_off: !props.check_off }) }} >
                    <Text fontSize={'12'}>2</Text>
                </Button>
                <Text fontSize={'medium'} color={'white'} fontWeight={'bold'} flexBasis={'70%'} ml={2} textDecoration={props.check_off ? 'line-through' : 'none'} color={props.check_off && 'gray.300'} color={'green'}>{props.data.title}</Text>
                <Text color={'gray'} fontWeight={'semi-bold'}>{props.completed}/{props.want_to_focus}</Text>
                <Box background={'white'} ml={2} p={0} lineHeight={1} padding={1} borderRadius={'5'} onClick={(event) => { event.stopPropagation(); setSettingsOpen(true) }} >
                    <Icon as={FiMoreVertical} fontSize={20} m={'auto'} p={0} lineHeight={1}></Icon>
                </Box>
            </Flex>
            <Text display={!props.description && 'none'} backgroundColor={'wheat'} padding={1} mt={2} borderRadius={3}>{props.description}</Text>
            <Stack background={'#4CCD99'} height={0.8} width={'70%'} position={'absolute'} left={0} bottom={0}></Stack>
            {/* Just like this we can do this for all the current timer , suppose if a timer is running for a task the loader should show the update for that task */}
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
export const TodoDetail = Todo


const data = {
    title: 'Job',
    description: 'Apply',
    items: [{}, {}, {}]
}