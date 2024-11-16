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
import { useTodoCreateMutation, useTodoUpdateMutation } from '../api/TodoApi';
const TodoUpdate = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState({
        id: props.id,
        title: props.title,
        category: props.category, description: props.description, custom_color_code: props.custom_color_code
    });
    const todoCreate = useTodoCreateMutation()
    const todoUpdate = useTodoUpdateMutation()
    return (
        <>
            <Button onClick={onOpen} width={'200px'} ml={'auto'} mt={5}>Add</Button>

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
                            <FormLabel mt={2}>Labels</FormLabel>
                            <Input placeholder='Seperated by commas ex:Hobbies,Language' defaultValue={''} value={data['category']}
                                onChange={(e) => { setData({ ...data, category: e.target.value }) }}></Input>
                            <FormLabel mt={2}>Custom Color Coding</FormLabel>
                            <Input placeholder={'Paste color code here'} defaultValue={''} value={data['custom_color_code']}
                                onChange={(e) => { setData({ ...data, custom_color_code: e.target.value }) }}></Input>
                            <Button colorScheme='blue' mr={3} mt={5} onClick={() => { alert(JSON.stringify(data)); todoUpdate[0]({ ...data }) }}>
                                Save
                            </Button>
                            <Button colorScheme='red' mt={5} onClick={() => { }}>Delete</Button>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}
export default TodoUpdate