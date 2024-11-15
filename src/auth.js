import { Box, Button, Center, Divider, FormControl, FormLabel, HStack, Icon, Input, Link, Stack, Text, VStack } from "@chakra-ui/react"
import { useGoogleMutation, useLazyUserQuery, useLoginMutation } from "./api/authApi"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToken, removeToken } from "./authSlice"
import { GoogleLogin } from '@react-oauth/google';

import { AiFillBuild } from "react-icons/ai";
import { deleteCookie, getCookie, setCookie } from "./cookies"
import { Navigate, redirect } from "react-router-dom"
// import {} from 'react-router';
const Login = () => {
    const login = useLoginMutation()
    const [formData, setFormData] = useState({ 'email': '', 'password': '', 'isSubmitted': false })
    const authDispatch = useDispatch()
    const google = useGoogleMutation();
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        if (google[1].isSuccess) { authDispatch(addToken(google[1].data.access)); setCookie('token', google[1].data.access) }
    }, [google[1].isSuccess])

    useEffect(() => {
        if (login[1].isSuccess) {
            authDispatch(addToken(login[1].data.access));
            setCookie('token', login[1].data.access);

        }
        if (login[1].isError) {
            console.log('deleting cookie');
            deleteCookie('token')
            authDispatch(removeToken())
        }
    }, [login[1]])

    if (auth.token) {
        return <Navigate to={'/'} />
    }
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
                                // console.log(credentialResponse, '######################');
                                google[0]({ 'id_token': credentialResponse.credential, 'access_token': credentialResponse.credential })

                            }}
                            onError={(e) => {
                                // console.log('Login Failed', e);
                            }}
                        />

                    </Box>
                    <Stack>
                        <Divider></Divider>
                        <Text>or</Text>
                        <Divider></Divider>
                    </Stack>
                    <Box>
                        <h4>Error{JSON.stringify(login[1].error)}</h4>
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
    // Steps
    // Check if token in cookie
    // if not redirect to login
    // else call the api for user 
    // if error 401 than delete the cookie
    // than redirect to login page
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const user = useLazyUserQuery();
    const [loading, setLoading] = useState(true);

    // 
    // 
    // useEffect
    useEffect(() => {
        var token = getCookie('token');
        setTimeout(() => {
            if (token) {
                // console.log('loading token to dispatch from cookie');
                dispatch(addToken(token));
                // console.log('loading falsed',token);
            }
            // even if token is not valid stop loading and redirect to login
            setLoading(false);

        }, 1000)

    }, [])
    useEffect(() => {
        // console.log('auth.token', auth);
        if (auth.token) {
            // console.log('auth.token');
            user[0]()
        }
    }, [auth])

    useEffect(() => {
        console.log('delete it');
        if (user[1].isError) {

            console.log('deleting token')
            deleteCookie('token')
            dispatch(removeToken)
        }
    }, [user[1].isError])
    if (loading) return <Text>Loading1</Text>
    if (user[1].isUninitialized || user[1].isError) {
        console.log('brooo');
        // return redirect('/login')
        return <Navigate to={'/login'}></Navigate>
        // return<h4>Loading</h4>
        // return <Login></Login>
    }
    else {
        return props.children
    }
    //     console.log('auth.token is available')
    //     if (user.isSuccess) {
    //         return props.children
    //     }
}
// return <Login></Login>
// }


export default Login;