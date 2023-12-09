import { Box, Button, Center, Divider, FormControl, FormLabel, HStack, Icon, Input, Link, Stack, Text, VStack } from "@chakra-ui/react"
import { useGoogleMutation, useLoginMutation, useUserQuery } from "./authApi"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToken } from "./authSlice"
import { GoogleLogin } from '@react-oauth/google';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { AiFillBuild } from "react-icons/ai";
import { useDisclosure } from '@chakra-ui/react'
const Login = () => {
    const login = useLoginMutation()
    const [formData, setFormData] = useState({ 'email': '', 'password': '', 'isSubmitted': false })
    const authDispatch = useDispatch()
    const google = useGoogleMutation();

    useEffect(() => {
        if (google[1].isSuccess)
            authDispatch(addToken(google[1].data.access))
    }, [google[1].isSuccess])

    useEffect(() => {
        if (login[1].isSuccess)
            authDispatch(addToken(login[1].data.access))
    }, [login[1].isSuccess,])

    return <Box bg={'#ad4444'} minHeight={'100vh'} paddingTop={'100px'} >
        <Center>

            <VStack>
                <HStack>
                    <Icon as={AiFillBuild} fontSize={'50px'} color={'white'}></Icon>
                    <Text fontSize={30} color={'white'} ml={4}>Pomodoro</Text>

                </HStack>
                <Text fontSize={'20px'} mt={2} color={'white'}>Login</Text>
                <VStack background={'white'} p={'20px 4px'} borderRadius={5} width={'350px'} mt={2}>
                    <Box mt={2} >
                        <GoogleLogin size={"large"} width={"300px"}
                            onSuccess={credentialResponse => {
                                console.log(credentialResponse, '######################');
                                google[0]({ 'id_token': credentialResponse.credential, 'access_token': credentialResponse.credential })

                            }}
                            onError={(e) => {
                                console.log('Login Failed', e);
                            }}
                        />

                    </Box>
                    <Stack>
                        <Divider></Divider>
                        <Text>or</Text>
                        <Divider></Divider>
                    </Stack>
                    <Box>

                        <FormControl >
                            <FormLabel color={'gray'}>Email</FormLabel>
                            <Input placeholder="example@mail.com" width={'300px'} background={'#e8e8e8'} value={formData.email} onChange={(event) => { setFormData({ ...formData, 'email': event.target.value }) }}></Input>
                            <FormLabel mt={2} color={'gray'}>Password</FormLabel>
                            <Input placeholder="Password" background={'#e8e8e8'} value={formData.password} onChange={(event) => { setFormData({ ...formData, 'password': event.target.value }) }}></Input>
                        </FormControl>

                        <Button size={'sm'} width={'100%'} mt={5} p={6} background={'black'} color={'white'}
                            onClick={() => {
                                // setFormData({ ...formData, isSubmitted: true })
                                login[0]({ 'username': formData['email'], 'password': formData['password'] })
                            }}>Log in with Email</Button>
                        <Center>
                            <Link mt={4} color={'gray'}>Forgot Password</Link>
                        </Center>
                    </Box>
                </VStack>
                <Text color={'silver'} mt={2}>Don't have account</Text>
                <Link color={'white'}>Create Account</Link>
            </VStack>
        </Center>
    </Box>

}
export const AuthChecker = (props) => {
    const  auth = useSelector(state => state.auth)
    const user = useUserQuery();
    if (auth.token) {
        if (user.isSuccess) {
            return props.children
        }
    }
    return <Login></Login>



}

const BasicUsage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* <Lorem count={2} /> */}
                        <Text>G</Text>
                        <Login></Login>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}




export default Login;