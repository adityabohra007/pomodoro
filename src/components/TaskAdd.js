import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, useDisclosure, FormControl, Input, FormLabel, Textarea, Stack, Box, Text
} from '@chakra-ui/react'
import { useState } from 'react';
import { useTodoCreateMutation, useTodoListCreateMutation } from '../api/TodoApi';
const TaskAdd = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState({});
    const todoCreate = useTodoListCreateMutation()
    return (
        <>
            <Text textAlign={'center'} border={'3px dashed #E4D5D5'} background={'#00000017'} width={'380px'} color={'#E4D5D5'} p={'10px'} onClick={() => { onOpen(); console.log('Adding Waiting please');/* setAddTask(true) */ }} >Add Task</Text>\

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
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
                            <Button colorScheme='blue' mr={3} mt={5} onClick={() => { alert(JSON.stringify(data)); todoCreate[0]({ ...data, 'todo': props.id }) }}>
                                Save
                            </Button>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}
const TaskEdit = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState({...props.predata});
    const todoCreate = useTodoListCreateMutation()
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
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
                            <Button colorScheme='blue' mr={3} mt={5} onClick={() => { alert(JSON.stringify(data)); todoCreate[0]({ ...data, 'todo': props.id }) }}>
                                Save
                            </Button>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}
export default TaskAdd