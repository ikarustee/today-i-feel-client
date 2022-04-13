import React, {useState, useEffect} from 'react'
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import {Box, Button, Container, Heading, ScaleFade, useDisclosure} from "@chakra-ui/react"
import axios from 'axios';

const Chart = () => {
    const URL = "https://todayifeel-server.herokuapp.com/tags";
    const [chartData, setChartData] = useState([])
    const { isOpen, onToggle } = useDisclosure()

    async function getTags() {
        try {
            const response = await axios.get(URL)
            const test = await response.data
            const tagStats = test.map((t) => {
                return {
                    name: t.name,
                    weekly: t.weeklyTimesClicked,
                    allTime: t.timesClicked,
                }
            })
            setChartData(tagStats.slice(0,8))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTags()
    }, [])


  return (
    <Container className="chart" m="5rem 0" maxW={'7xl'} padding="0">
    <Heading as="h2" size="2xl" textAlign="center" color="blue.300" m="3rem 0 1.5rem">How do others feel?</Heading>
      <Button 
        className="btn--centered chart" 
        fontWeight="400" 
        onClick={onToggle}
        borderColor="blue.300" 
        borderWidth="2px" 
        color="blue.300" 
        display="block"
        bg="white"
        height="auto"
        padding="4px 10px"
        _hover={{bg: "blue.300", color: "white", border: "2px solid #5C90FF"}} 
        variant='outlie'
      >{isOpen ? "Hide chart" : "Show chart"}</Button>
      <ScaleFade 
      className={`chart__holder ${isOpen ? "open" : "close"}`}  
      initialScale={0.9} 
      in={isOpen}>
        <Box
          p='1rem'
          marginTop={8}
          marginBottom={8}
          color='white'
          bg="#ffffff"
          rounded='md'
          shadow='md'
          textAlign="center"
        >
          <ResponsiveContainer width="100%" height={400} outerRadius={90} >
            <RadarChart cx="50%" cy="50%" outerRadius={100} data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <Radar name="all time" dataKey="allTime" stroke="#4782ff" fill="#5C90FF" fillOpacity={0.3} />
                <Radar name="weekly" dataKey="weekly" stroke="#9922DD" fill="#AB4AE3" fillOpacity={0.6} />
                <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Box>
      </ScaleFade>
    </Container>
  )
}

export default Chart