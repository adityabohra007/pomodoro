import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Text, useDisclosure, Box, Divider, Switch,
} from '@chakra-ui/react'
import { MdDone } from "react-icons/md";
import { Center, Flex, HStack, Icon, IconButton, Link, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Textarea, Tr, VStack } from '@chakra-ui/react';
import { useGetConfigQuery, useUpdateConfigMutation } from './api/configApi';
import { useEffect, useState } from 'react';
import { IoSettingsSharp } from "react-icons/io5";

const ColorBox = ({ color, selected, onClick }) => {
    return <Button background={color} h={12} w={12} borderRadius={4} onClick={() => { onClick(color) }} >
        {selected ? <MdDone color='white' /> : ''}
    </Button>

}
const ThemeSelector = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [color, setColor] = useState(props.selectedColor)
    const colorList = ['#1B4242'
        , '#BE3144'
        , '#5FBDFF'
        , '#2B2A4C'
        , '#2D9596', '#5F0F40', '#527853', '#392467']
    return (
        <>
            <Button onClick={onOpen} background={props.selected} h={10} w={10} borderRadius={4} mr={3}></Button>
            <Modal isOpen={isOpen} onClose={() => { onClose(); props.onClose() }} isCentered closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>Color Selection</ModalHeader>
                    <ModalBody>
                        <HStack p={'20px 10px'} flexWrap={'wrap'}>
                            {colorList.map(item => <ColorBox key={item} onClick={props.onClick} color={item} selected={props.selected === item ? true : false}  ></ColorBox>)}
                        </HStack>
                    </ModalBody>


                </ModalContent>
            </Modal>
        </>
    )
}
const Configuration = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const config = useGetConfigQuery()
    const update = useUpdateConfigMutation()
    const [data, setData] = useState()
    useEffect(() => {
        if (config.isSuccess) {
            setData(config.data.data)
        }
    }, [config.isSuccess])
    if (config.isLoading)
        return <Text>Loading</Text>
    if (config.isSuccess && data)
        return (
            <>
                <Link onClick={onOpen} background={'#696969b0'} p={2} borderRadius={5} display={'flex'} justifyContent={'center'}><IoSettingsSharp color='white' />
                    <Text ml={2} color={'white'} fontSize={12} >Settings</Text></Link>
                <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Settings</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>Time(minutes)</Text>
                            <HStack>
                                <VStack>
                                    <Text color={'gray.400'}>
                                        Pomo
                                    </Text>
                                    <NumberInput min={0} ml={2} value={data.pomo_time} onChange={(valueString) => {
                                        setData({ ...data, pomo_time: parseInt(valueString) })
                                    }}>
                                        <NumberInputField width={'100px'}></NumberInputField>
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </VStack>
                                <VStack>
                                    <Text color={'gray.400'}>
                                        Short
                                    </Text>
                                    <NumberInput min={0} ml={2} value={data.short_break_time} onChange={(valueString) => {
                                        setData({ ...data, short_break_time: parseInt(valueString) })
                                    }}>
                                        <NumberInputField width={'100px'}></NumberInputField>
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </VStack>
                                <VStack>
                                    <Text color={'gray.400'}>
                                        Long
                                    </Text>
                                    <NumberInput min={0} ml={2} value={data.long_break_time} onChange={(valueString) => {
                                        setData({ ...data, long_break_time: parseInt(valueString) })
                                    }}>
                                        <NumberInputField width={'100px'}></NumberInputField>
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </VStack>
                            </HStack>
                            <Divider mt={5} mb={5} />
                            <Text>Theme</Text>
                            <HStack m={'15px 0px'}>
                                <Text fontSize={16} fontWeight={800}>Color Theme</Text>
                                <Box ml={'auto'}>
                                    <ThemeSelector
                                        onClick={(v) => {
                                            setData({ ...data, theme: { ...data.theme, pomodoro: v } })
                                        }
                                        }
                                        onClose={(data) => { }}
                                        selected={config.isSuccess && data?.theme.pomodoro}></ThemeSelector>
                                    <ThemeSelector onClick={(v) => {
                                        setData({ ...data, theme: { ...data.theme, short_break: v } })
                                    }
                                    }
                                        onClose={(data) => { }}
                                        selected={config.isSuccess && data?.theme.short_break} ></ThemeSelector>
                                    <ThemeSelector
                                        onClick={(v) => {
                                            setData({ ...data, theme: { ...data.theme, long_break: v } })
                                        }
                                        }
                                        onClose={(data) => { }}
                                        selected={config.isSuccess && data?.theme.long_break}></ThemeSelector>
                                </Box>
                            </HStack>
                            <HStack m={'15px 0px'}>
                                <Text fontSize={16} fontWeight={800}>Dark Mode which Focusing</Text>
                                <Switch size={'lg'} ml={'auto'} />
                            </HStack>
                            <Divider mt={5} mb={5} />



                            <Text>G</Text>
                            {/* <Login></Login> */}
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={() => {
                                update[0](data)
                                onClose()
                            }}>
                                Ok
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
}

export default Configuration;