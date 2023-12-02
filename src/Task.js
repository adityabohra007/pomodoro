import { Flex, HStack, Icon, IconButton, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import { useFetchTaskQuery, useTaskSelectedQuery } from './taskApi'
import { Box } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons'
import { MdSettings } from 'react-icons/md'
import { FiMoreVertical } from "react-icons/fi";
import { useDrag } from 'react-dnd'
import { useState, useEffect } from 'react';
const Task = () => {
    const { isLoading, isSuccess, error, data, isError, isFetching } = useFetchTaskQuery()
    const taskSelected = useTaskSelectedQuery()

    // const [{ opacity }, dragRef] = useDrag(() => ({
    //     type
    // }))
    // cons
    const [value, setValue] = useState(null);
    useEffect(() => {
        if (taskSelected.isSuccess) { setValue(taskSelected.data.selected.task.id); }
    }, [taskSelected.isSuccess])
    if (isLoading | taskSelected.isLoading) return <h5>Loading</h5>
    return <Box marginTop={10} >
        <RadioGroup name="tasks" value={value} onChange={(v) => {
            setValue(parseInt(v))
            // check if any timer is running than give warning

        }} width={'380xp'} >
            <VStack >
                {isSuccess && data.map(item =>
                    <Radio value={item.id} key={item.id}  >
                        <Box padding={5} borderRadius={10} marginBottom={5} background={'white'} width={'380px'}>
                            <Flex justifyContent={'center'} alignItems={'center'} width={'380xp'}>
                                <CheckCircleIcon color={'silver'} fontSize={28} ></CheckCircleIcon>
                                <Text fontSize={18} fontWeight={'bold'} flexBasis={'70%'} ml={2}>{item.title}</Text>
                                <Text color={'gray'} fontWeight={'semi-bold'}>0/2</Text>
                                <IconButton ml={2} p={0}><Icon as={FiMoreVertical} fontSize={25}></Icon></IconButton>
                            </Flex>
                            <Text backgroundColor={'wheat'} padding={2} mt={2} borderRadius={3}>{item.description}</Text>
                        </Box>
                    </Radio>


                )}
            </VStack>
        </RadioGroup>
    </Box>
}
export default Task;
