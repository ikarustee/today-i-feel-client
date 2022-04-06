import React, {useState, useEffect} from 'react'
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import {Box, Button, Container, Heading, ScaleFade, useDisclosure} from "@chakra-ui/react"
import axios from 'axios';
// import staticDATA from "../helper/tagStats.json"

// let tagStats = staticDATA

const Chart = () => {
    const URL = "https://todayifeel-server.herokuapp.com/tags";
    // const [initialData, setInitialData] = useState([])
    const [chartData, setChartData] = useState([])
    const [tagData, setTagData] = useState([])
    const { isOpen, onToggle } = useDisclosure()

    async function getTags() {
        try {
            const response = await axios.get(URL)
            // .then((response) => setTagData(response.data))
            const test = await response.data
            // console.log(test)
            const tagStats = test.map((t) => {
                return {
                    name: t.name,
                    weekly: t.weeklyTimesClicked,
                    allTime: t.timesClicked,
                }
            })
            setChartData(tagStats)
            // console.log(tagStats)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTags()
    }, [])


  return (
    <Container className="chart" m="2rem 0" maxW={'7xl'}>
    <Heading as="h2" textAlign="center" color="blue.300" m="3rem 0 1.5rem">How do others feel?</Heading>
    <Button className="btn--centered" fontWeight="300" onClick={onToggle}>{isOpen ? "Hide chart" : "Show chart"}</Button>
      <ScaleFade initialScale={0.9} in={isOpen}>
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
                {/* <PolarRadiusAxis angle={50} domain={[0, 100]} /> */}
                <Radar name="all time" dataKey="allTime" stroke="#0a58ff" fill="#154fa6" fillOpacity={0.3} />
                <Radar name="weekly" dataKey="weekly" stroke="#4782ff" fill="#709dff" fillOpacity={0.6} />
                <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Box>
      </ScaleFade>
    </Container>
  )
}

export default Chart