import React, { useEffect, useState } from 'react'
import { Box, Typography, Card } from '@mui/material'
import ReactApexChart from 'react-apexcharts'
// import AxiosHelper from '../../../helper/AxiosHelper'
// import CardHeading, { endOfMonthDefault, startOfMonthDefault } from './cardHeading'
import { DashboardNoDat } from './WasteChart'
import CardHeading, {endOfMonthDefault , startOfMonthDefault} from './cardHeading'
// import { checkTenantId } from '../../../helper/CommonAPI'

const AvailableBlood = ({ data = [] }) => {
  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      },
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
        right: -25,
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
      data: data?.length ? data : [10, 20, 30, 21, 13]
    }
  ]

  return <ReactApexChart options={options} series={series} type='bar' height={250} />
}

const data = [
  { type: 'Anti_HCV', replacementF: 4, replacementM: 2, voluntaryF: 0, voluntaryM: 3 },
  { type: 'HIV', replacementF: 2, replacementM: 8, voluntaryF: 2, voluntaryM: 0 },
  { type: 'Malaria', replacementF: 1, replacementM: 4, voluntaryF: 5, voluntaryM: 1 },
  { type: 'VDRL', replacementF: 0, replacementM: 5, voluntaryF: 0, voluntaryM: 4 },
  { type: 'HSBG', replacementF: 3, replacementM: 0, voluntaryF: 3, voluntaryM: 2 }
]

const TtiChart = () => {
  const [BloodData, setBloodData] = useState(null)
  const [bloodCompData, setBloodCompData] = useState([])
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState(startOfMonthDefault)
  const [endDate, setEndDate] = useState(endOfMonthDefault)
  const [updatedDate, setUpdatedDate] = useState(null)

  function filterDonations(data = [], combinedFilter) {
    if (data?.length === 0) {
      return []
    }
    // Split the combined filter into donation_type and gender
    const [donationType, gender] = combinedFilter.split(' ')

    let genderFull
    if (gender === 'M') {
      genderFull = 'Male'
    } else {
      genderFull = 'Female'
    }

    // Filter the data array based on the provided gender and donation type
    const filtered = data?.find(obj => obj.gender === genderFull && obj.donation_type === donationType)

    // If a matching object is found, return the desired values in an array
    if (filtered) {
      return [filtered.anty_hcv, filtered.hiv, filtered.malaria, filtered.vdrl, filtered.hsbg]
    }

    // If no matching object is found, return an array with null values or empty strings
    return [0, 0, 0, 0, 0]
  }

  const getDashboardBloodComp = () => {
    setLoading(true);
  
    // Mock data when API is not working
    const mockResponse = {
      data: {
        data: {
          ttiReactiveCount: [
            { gender: 'Male', donation_type: 'Replacement', anty_hcv: 2, hiv: 5, malaria: 3, vdrl: 1, hsbg: 4 },
            { gender: 'Female', donation_type: 'Replacement', anty_hcv: 3, hiv: 2, malaria: 4, vdrl: 2, hsbg: 5 },
            { gender: 'Male', donation_type: 'Voluntary', anty_hcv: 1, hiv: 3, malaria: 2, vdrl: 4, hsbg: 2 },
            { gender: 'Female', donation_type: 'Voluntary', anty_hcv: 4, hiv: 1, malaria: 5, vdrl: 3, hsbg: 3 }
          ],
          totalTTIReactiveCount: 20
        }
      }
    };
  
    // Simulating API response delay
    setTimeout(() => {
      let bloodAll = mockResponse?.data?.data?.ttiReactiveCount;
      if (bloodAll?.length) {
        setBloodCompData(mockResponse?.data?.data);
        setBloodData(bloodAll);
      } else {
        setBloodData(null);
        setBloodCompData(null);
      }
      setUpdatedDate(new Date());
      setLoading(false);
    }, 1000);
  };
  

  useEffect(() => {
    getDashboardBloodComp()
  }, [startDate, endDate])

  return (
    <>
      <CardHeading
        path='/serology/lab-testing'
        title='TTI Screening Details'
        count={bloodCompData?.totalTTIReactiveCount || 0}
        size='sm'
        refreshDataApi={getDashboardBloodComp}
        loading={loading}
        setStartDateCustom={setStartDate}
        setEndDateCustom={setEndDate}
        hideDetail={true}
        updatedDate={updatedDate}
      />
      {BloodData ? (
        <Box display='grid' gridTemplateColumns='repeat(5, 1fr)' sx={{ position: 'relative',overflow:'auto' }}>
          <Box>
            <Typography sx={{ padding: '11px 0', fontSize: 12, fontWeight: 500 }} align='left'>
              Type
            </Typography>
            {data.map((row, index) => (
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
                {row.type}
              </Typography>
            ))}
          </Box>
          {['Replacement F', 'Replacement M', 'Voluntary F', 'Voluntary M'].map((category, index) => (
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
              <AvailableBlood data={filterDonations(BloodData, category)} />
            </Box>
          ))}
        </Box>
      ) : (
        <DashboardNoDat />
      )}
    </>
  )
}

export default TtiChart