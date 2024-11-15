import { Button, Center, Flex, HStack, Icon, IconButton, Link, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, Textarea, VStack } from '@chakra-ui/react';
import { useCreateTaskMutation, useDeleteTaskMutation, useFetchTaskQuery, useTaskCheckOffMutation, useTaskCheckOffResetMutation, useTaskSelectMutation, useTaskSelectedQuery, useTasktimerQuery, useUpdateTaskMutation } from './taskApi'
import { Box } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons'
import { FiMoreVertical } from "react-icons/fi";
import { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import { useTemplateSaveMutation } from './api/templateApi';
import { TemplateSave, TemplateSelect } from './Template';
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
        return <Box onClick={(event) => { event.preventDefault(); props.onClick() }} padding={3} borderRadius={10} marginBottom={5} background={'white'} width={'380px'} borderLeft={props.selected && `8px solid black`}
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

const TaskStats = (props) => {
    // console.log(props.task.data.length());
    console.log(props.task, 'taskstats', props.tasktimer)
    // const timerToday = 0;
    // const task_completed = 0;
    let total_tasks = 0;
    props.task.forEach((item) => { total_tasks += item.want_to_focus })

    // const time_will_take_to_completed = 0;
    // const will_be_completed_by = 0
    return <Box width={'100%'} color={'white'} border={'1px solid white'} background={'#e7d5d52e'} borderTop={'5px solid white'} borderRadius={'2px'} mt={30}>
        <Flex justifyContent={'space-between'} w={'100%'} p={'10px 20px'}>
            <HStack w={'50%'}>
                <Text fontWeight={200} color={'silver'}>Pomo: </Text>
                <Text fontWeight={600} fontSize={'20px'}>{props.tasktimer?.length}/{total_tasks}</Text>
            </HStack>
            <HStack width={'50%'}>
                <Text fontWeight={200} color={'silver'}>Finish At:</Text>
                <Text fontWeight={600} fontSize={'20px'}>7:06(12.05hrs)</Text>
            </HStack>

        </Flex>
    </Box>
}


const Task = () => {
    const { isLoading, isSuccess, error, data, isError, isFetching } = useFetchTaskQuery()
    const taskSelected = useTaskSelectedQuery()
    const tasktimer = useTasktimerQuery()
    const taskSelect = useTaskSelectMutation()
    const [addTask, setAddTask] = useState(false);
    const [templateSave, setTemplateSave] = useState(false);
    const [templateName, setTemplateName] = useState('');
    const templateSaving = useTemplateSaveMutation();
    const [templateSelect, setTemplateSelect] = useState(false);
    const checkoff = useTaskCheckOffResetMutation()
    // console.log(taskSelected.data.selected);
    console.log(tasktimer[1])
    useEffect(() => {
        // if (taskSelected.isSuccess) { setValue(taskSelected.data.selected.task.id); }
    }, [taskSelected.isSuccess])
    if (isLoading | taskSelected.isLoading) return <h5>Loading</h5>
    if (taskSelected.isSuccess)
        return <>
            <TemplateSave open={templateSave} onClose={() => { setTemplateSave(false) }} onSave={(name) => {
                templateSaving[0]({ 'name': name })
            }}></TemplateSave>
            <TemplateSelect open={templateSelect} onClose={() => { }} onSave={() => { }}></TemplateSelect>
            {/*  */}
            <HStack justifyContent={'space-between'} alignItems={'center'} mt={5}>
                <Text color={'white'} fontSize={20} >Tasks</Text>
                {/* <IconButton ml={2} p={0} onClick={(event) => { event.stopPropagation(); }} > */}
                {/* <HStack bg={'gray.100'} cursor={'pointer'} p={1} borderRadius={8} justifyContent={'center'}>
                    <Icon as={FiMoreVertical} fontSize={25} ></Icon>
                </HStack> */}
                <Menu>
                    <MenuButton bg={'gray.600'} p={'7px'} borderRadius={'5px'} _hover={{ background: 'gray.600' }} >
                        <FiMoreVertical size={20} m={0} color='white' />
                    </MenuButton>
                    <MenuList>

                        <MenuItem onClick={() => {
                            checkoff[0]()
                        }}>Clear Task Checked Off</MenuItem>
                        <MenuItem onClick={() => {
                            setTemplateSave(true)
                        }}>Save to Template</MenuItem>
                        <MenuItem onClick={() => {
                            setTemplateSelect(true)
                        }}>Load From Template</MenuItem>
                    </MenuList>
                </Menu>
                {/* </IconButton> */}
            </HStack>
            <Box height={'2px'} background={'white'} mt={1}></Box>
            <Box marginTop={5} >
                <VStack>
                    {isSuccess && data.map(item =>
                        <TaskItem completed={tasktimer.isSuccess && tasktimer.data.filter(inner => inner.task.id === item.id).length} onClick={() => {
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
                                    setAddTask(false)
                                    // api call to save for new task
                                }}></TaskForm>
                        </Center>
                        :
                        <Text textAlign={'center'} border={'3px dashed #E4D5D5'} background={'#00000017'} width={'380px'} color={'#E4D5D5'} p={'10px'} onClick={() => { console.log('Adding Waiting please'); setAddTask(true) }} >Add Task</Text>}
                    {/*  */}
                    <TaskStats task={data} tasktimer={tasktimer.data}></TaskStats>
                </VStack>
            </Box>
        </>

}
export default Task;

// clear finished tasks

// Template system - save as template,add from template

// Project system