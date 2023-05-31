"use client"
import {
  Flex,
  Image,
  Card,
  CardBody,
  Heading,
  Text,
  Stack,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Box,
  Container,
  CardHeader,
  Spinner
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { IFamilies } from './interfaces/interfaces';
import { api } from './services/api';


export default function Home() {
  const [skip, setSkip] = useState<number>(0),
    [take, setTake] = useState<number>(20),
    [dataFamilies, setDataFamilies] = useState<IFamilies | any>()

  const fetchAllData = async () => {
    try {
      const response = await api.get<IFamilies | any>(`https://test-candidaturas-front-end.onrender.com/families?skip=${skip}&take=${take}`)
        .then((r) => {
          return { data: r.data }
        });
      setDataFamilies(response.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  console.log(dataFamilies)

  return (
    <>
      <header>
        {/* ----------------------------------------advertising----------------------- */}
        <Flex w='full'
          className='advertising'
          justifyContent='center'
          alignItems='center'
          height={['0px', '47px', '67px']}
        >
          <Text className='advertising-text' fontFamily='18px' color='#fff'>
            Não limite sua criatividade, junte-se a familia Blocks por apenas <span className='font-bold'>BRL 19,99</span>
            <ButtonGroup className='button-advertising' gap='4' justifyContent='center'>
              Quero ser Premium
              <Image src='/media/arrow-white.png' w='17px' m='0px 6px' />
            </ButtonGroup>
          </Text>
        </Flex>

        {/* ----------------------------------------Logo--------------------------- */}
        <Flex w='full' maxHeight='80px' justifyContent='center' alignItems='center' pt={['8px', '14px', '24px']} pb={['8px', '14px', '24px']}  >
          <Image src="/media/logo.png" w={['116px', '126px', '136px', '146px']} />
        </Flex>

      </header >

      {/* ----------------------------------------Catálago----------------------- */}
      <Container className='catalago' maxW='container.lg' mb='5' justifyContent='center'>
        <Flex w='full' justifyContent='center'>
          <Flex
            w='1329px'
            h='94px'
            alignItems='center'
          >
            <Text fontWeight='700' fontSize='28px'>
              <span className='border-custom'>Ca</span>tálogo
            </Text>
          </Flex>
        </Flex>
      </Container>

      {/* ----------------------------------------Resultados--------------------- */}
      <Container maxW='1329px' minH='75vh' mb='5' margin='auto' >
        <Flex alignItems='left'>
          <Box
            className='result'
            fontWeight='600'
            fontSize='24px'
            color='#202020'
            pt='30px'
            pb='15px'
          >
            Resultados
          </Box>
        </Flex>

        {/* ----------------------------------------Content----------------------- */}
        {
          !dataFamilies && (
            <Flex w='full' h='100%' justifyContent='center' alignItems='center'>
              <Spinner
                w='50px'
                h='50px'
              />
            </Flex>
          )
        }

        {dataFamilies && (
          <Flex className='container-items' flexWrap='wrap' gap='11' >
            {dataFamilies?.map((map: any) => {
              return (
                <>
                  <Card className='card-items' backgroundColor='#fff' border='1px solid #CCCCCC' w={['128px', '166px', '176px']} h='234px' borderRadius='8px 8px'>
                    <CardHeader h='198px' >
                      <Box display='flex' w='full' justifyContent='center' >
                        <Image src={`https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/${map?.id}.jpg`} 
                        w='92px' m='25px 40px' className='image-familia'/>
                      </Box>
                    </CardHeader>
                    <Divider orientation='horizontal' border='1px solid #CCCCCC' />
                    <CardBody h='36px'>
                      <Box display='flex' w='full' flexDir='row' justifyContent='space-between' alignItems='center' >
                        <Box>
                          <Text fontWeight='700' fontSize='10px' lineHeight='10px' p='3'>{map?.details?.name}</Text>
                        </Box>
                        <Divider orientation='vertical' bg='#000' />
                        <Image src='/media/arrow.svg' w='12px' m='0px 6px' className='arrow' />
                      </Box>
                    </CardBody>
                  </Card>
                </>
              )
            })
            }
          </Flex>
        )}
      </Container>
      <footer>
        <Flex
        className='footer-custom'
          position='relative'
          bottom='0'
          marginTop='auto'
          justifyContent='center'
          alignItems='center'
          mt='10'
          w='100%'
          h='65px'
          p='24px 0'
          backgroundColor='#E9E9E9'
          fontFamily='Open sans'
          fontWeight='400'
          fontSize='16px'
          lineHeight='22px'
        >
          <Flex m='0px 20px'>
            Sobre
          </Flex>
          <Flex m='0px 20px'>
            FAQ
          </Flex>
          <Flex m='0px 20px'>
            Termos de uso
          </Flex>
          <Flex m='0px 20px'>
            Politica de privacidade
          </Flex>
        </Flex>
      </footer>
    </>
  )
}
