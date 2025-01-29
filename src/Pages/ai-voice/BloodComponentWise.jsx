import React, { useEffect, useState } from 'react'
import { Box, Typography, Card } from '@mui/material'
import ReactApexChart from 'react-apexcharts'
// import { bloodGroupAll, checkTenantId } from '../../../helper/CommonAPI'
// import AxiosHelper from '../../../helper/AxiosHelper'
import CardHeading, { endOfMonthDefault, startOfMonthDefault } from './cardHeading'
import { DashboardNoDat } from './WasteChart'

export const typeAbbreviationsReverse = {
  'WB (CPDA-1)': 'Whole Blood (CPDA-1)',
  'WB (CPD)': 'Whole Blood (CPD)',
  FFP: 'Fresh Frozen Plasma',
  Plasma: 'Plasma',
  PRBC: 'Packed Red Blood Cells',
  SDP: 'Single Donor Platelet',
  RDP: 'Random Donor Platelets',
  PAS: 'Platelets additive solutions',
  PC: 'Platelet Concentrate',
  Cryo: 'Cryoprecipitate',
  CPP: 'Cryo Poor Plasma',
  Total: ''
}

const AvailableBlood = ({ data = [] }) => {
  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      },
      // offsetX: -26,
      offsetY: -29.5
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: '70%',
        borderRadius: 2,
        dataLabels: {
          position: 'bottom'
        }
      }
    },
    grid: {
      show: true,
      borderColor: '#e7e7e7',
      padding: {
        left: -15,
        right: -25, // Adjust padding to remove the empty space on the right
        // top: -5,
        bottom: -0
      }
    },
    xaxis: {
      labels: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    colors: ['#50D750', '#5086D7', '#C450D7', '#D7BA50', '#12BCAB'],
    legend: {
      show: false
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#333']
      },
      offsetX: 6,
      formatter: function (val) {
        return val.toFixed(0)
      }
    }
  }

  const series = [
    {
      name: 'Series 1',
      data: data?.length ? data : [0, 0, 0, 0, 0, 0, 0, 0]
    }
  ]

  return <ReactApexChart options={options} series={series} type='bar' height={373} />
}

const BloodComponentWise = () => {
  const [BloodData, setBloodData] = useState(null)
  const [bloodCompData, setBloodCompData] = useState([])
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState(startOfMonthDefault)
  const [endDate, setEndDate] = useState(endOfMonthDefault)
  const [updatedDate, setUpdatedDate] = useState(null)

  function filterDataByType(type) {
    // Define the order of blood groups
    const bloodGroupOrder = ['AB-Ve', 'AB+Ve', 'A+Ve', 'A-Ve', 'B+Ve', 'B-Ve', 'O-Ve', 'O+Ve']

    type = typeAbbreviationsReverse[type]

    // Find the matching data object based on type
    const result = BloodData?.find(item => item.type === type)

    if (result) {
      // Create an array with blood group counts in the specified order
      const filteredValues = bloodGroupOrder.map(group => result[group])

      return filteredValues
    } else {
      return [0, 0, 0, 0, 0, 0, 0, 0]
    }
  }

  const bloodGroupAll = [
    { label: 'AB-Ve' },
    { label: 'AB+Ve' },
    { label: 'A+Ve' },
    { label: 'A-Ve' },
    { label: 'B+Ve' },
    { label: 'B-Ve' },
    { label: 'O-Ve' },
    { label: 'O+Ve' }
  ];

  const mockBloodData = [
    {
      type: 'Fresh Frozen Plasma',
      'AB-Ve': 5,
      'AB+Ve': 10,
      'A+Ve': 15,
      'A-Ve': 8,
      'B+Ve': 12,
      'B-Ve': 6,
      'O-Ve': 9,
      'O+Ve': 20
    },
    {
      type: 'Packed Red Blood Cells',
      'AB-Ve': 3,
      'AB+Ve': 7,
      'A+Ve': 12,
      'A-Ve': 5,
      'B+Ve': 9,
      'B-Ve': 4,
      'O-Ve': 6,
      'O+Ve': 18
    },
    {
      type: 'Random Donor Platelets',
      'AB-Ve': 2,
      'AB+Ve': 5,
      'A+Ve': 8,
      'A-Ve': 4,
      'B+Ve': 6,
      'B-Ve': 3,
      'O-Ve': 4,
      'O+Ve': 12
    },
    {
      type: 'Single Donor Platelet',
      'AB-Ve': 1,
      'AB+Ve': 4,
      'A+Ve': 7,
      'A-Ve': 3,
      'B+Ve': 5,
      'B-Ve': 2,
      'O-Ve': 3,
      'O+Ve': 10
    }
  ]
  
  const mockBloodCompData = {
    totalBloodCount: 200,
    bloodGroupWiseCount: mockBloodData
  }
  useEffect(() => {
    // Simulating API response
    setTimeout(() => {
      setBloodCompData(mockBloodCompData)
      setBloodData(mockBloodData)
      setUpdatedDate(new Date())
      setLoading(false)
    }, 1000) // Simulated delay
  }, [])
    

  // const getDashboardBloodComp = () => {
  //   setLoading(true)
  //   const URL = checkTenantId(`dashboard/blood-stock?startDate=${startDate || ''}&endDate=${endDate || ''}`)
  //   AxiosHelper.get(URL)
  //     .then(resp => {
  //       let bloodAll = resp?.data?.data?.bloodGroupWiseCount
  //       if (bloodAll?.length) {
  //         setBloodCompData(resp?.data?.data)
  //         setBloodData(bloodAll)
  //       } else {
  //         setBloodCompData(null)
  //         setBloodData(null)
  //       }
  //       setUpdatedDate(new Date())
  //       setLoading(false)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //       setLoading(false)
  //     })
  // }

  // useEffect(() => {
  //   getDashboardBloodComp()
  // }, [startDate, endDate])

  return (
    <>
      <CardHeading
        path='/blood-stock'
        title='Total Components blood group wise collected'
        size='sm'
        count={bloodCompData?.totalBloodCount}
        refreshDataApi={bloodCompData}
        loading={loading}
        setStartDateCustom={setStartDate}
        setEndDateCustom={setEndDate}
        hideDetail={true}
        updatedDate={updatedDate}
      />
      {BloodData ? (
        <Box display='grid' gridTemplateColumns='repeat(5, 1fr)' sx={{ position: 'relative', overflow: 'auto' }}>
          <Box>
            <Typography sx={{ padding: '11px 0', fontSize: 12, fontWeight: 500 }} align='left'>
              Type
            </Typography>
            {bloodGroupAll?.map((row, index) => (
              <Typography
                key={index}
                align='left'
                style={{
                  padding: '11px 0',
                  fontSize: 12,
                  fontWeight: 500,
                  borderBottom: '1px solid #e7e7e7',
                  borderTop: index === 0 ? '1px solid #e7e7e7' : 'none'
                }}
              >
                {row.label}
              </Typography>
            ))}
          </Box>
          {['FFP', 'PRBC', 'RDP', 'SDP'].map((category, index) => (
            <Box key={index}>
              <Typography
                sx={{
                  padding: '11px 0',
                  fontSize: 12,
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  borderLeft: '1px solid #e7e7e7'
                }}
                align='center'
              >
                {category}
              </Typography>
              <AvailableBlood data={filterDataByType(category)} />
            </Box>
          ))}
        </Box>
      ) : (
        <DashboardNoDat />
      )}
    </>
  )
}

export default BloodComponentWise
