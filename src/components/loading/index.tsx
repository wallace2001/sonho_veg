import { Box } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import React from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'

export const Loading = () => {

    const { open } = useSelector((state: RootStateOrAny) => state.loadingReducer);

    return (
        open ? (
            <Box w="100%" h="100vh" d="flex" alignItems="center" justifyContent="center">
                <Spinner 
                    thickness="4px"
                    speed="0.65s"
                    color="blue.500"
                    size="xl"
                />
            </Box>
        ) : null
    )
}
