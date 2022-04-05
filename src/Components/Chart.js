import React, {useState, useEffect} from 'react'
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import {Box, Button, ScaleFade, useDisclosure} from "@chakra-ui/react"
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

    
    const data = [
        {
          subject: 'Math',
          A: 120,
          B: 110,
          fullMark: 150,
        },
        {
          subject: 'Chinese',
          A: 98,
          B: 130,
          fullMark: 150,
        },
        {
          subject: 'English',
          A: 86,
          B: 130,
          fullMark: 150,
        },
        {
          subject: 'Geography',
          A: 99,
          B: 100,
          fullMark: 150,
        },
        {
          subject: 'Physics',
          A: 85,
          B: 90,
          fullMark: 150,
        },
        {
          subject: 'History',
          A: 65,
          B: 85,
          fullMark: 150,
        },
      ];

  return (
    <>
    <ResponsiveContainer width="100%" height={400} outerRadius={90} >
        <RadarChart cx="50%" cy="50%" outerRadius={150} data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            {/* <PolarRadiusAxis angle={50} domain={[0, 100]} /> */}
            <Radar name="all time" dataKey="allTime" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4} />
            <Radar name="weekly" dataKey="weekly" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
        </RadarChart>
    </ResponsiveContainer>
    <Button fontWeight="300" onClick={onToggle}>Show chart</Button>
      <ScaleFade initialScale={0.9} in={isOpen}>
        <Box
          p='1rem'
          color='white'
          bg="blue.300"
          rounded='md'
          shadow='md'
          textAlign="center"
        >

        </Box>
      </ScaleFade>
    </>
  )
}

export default Chart