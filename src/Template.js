
import { Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Input } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useTemplateQuery } from './templateApi';
export const TemplateSave = ({ open, onClose, onSave }) => {
    const [name, setName] = useState('')
    return <>

        <Modal isOpen={open} onClose={() => { onClose(); setName('') }} isCentered={true}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Save Template</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input placeholder='Template name' onChange={(event) => { setName(event.target.value); }} value={name}></Input>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => { onSave(name); onClose(); setName('') }}>
                        Save
                    </Button>
                    {/* <Button variant='ghost'>Secondary Action</Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}
export const TemplateSelect = ({ open, onClose, onSave }) => {
    const template = useTemplateQuery()
    if (template.isSuccess)
        return <>
            <Modal isOpen={open}
                onClose={() => { onClose(); }} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Template Select(Append)</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {template.data.data.map(item =>
                            <Text p={'2px 4px'} cursor={'pointer'} fontSize={20} border={'2px solid gray'} borderRadius={5} margin={4} _hover={{ 'color': 'gray' }}>{item.name}</Text>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button colorScheme='blue' mr={3} onClick={() => { onSave(name); onClose(); setName('') }}> */}
                        Done
                        {/* </Button> */}
                        {/* <Button variant='ghost'>Secondary Action</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
}