import React, { useEffect, useState } from 'react'
import ReactApexcharts from 'react-apexcharts'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import CardHeading from './cardHeading'
import { DashboardNoDat } from './WasteChart'
// import ModalCustom from '../../shared/ModalCustom'

// Ensure these imports are correctly defined
import { bloodGroup, bloodGroupToFilter } from './index'

export const typeAbbreviations = {
  'Whole Blood (CPDA-1)': 'WB',
  'Whole Blood (CPD)': 'WB (CPD)',
  'Fresh Frozen Plasma': 'FFP',
  Plasma: 'Plasma',
  'Packed Red Blood Cells': 'PRBC',
  'Single Donor Platelet': 'SDP',
  'Random Donor Platelets': 'RDP',
  'Platelets additive solutions': 'PAS',
  'Platelet Concentrate': 'PC',
  Cryoprecipitate: 'Cryo',
  'Cryo Poor Plasma': 'CPP',
  '': 'Total'
}

const AvailableBlood = () => {
  const [loading, setLoading] = useState(true)
  const [BloodData, setBloodData] = useState([])
  const [bloodGrp, setBloodGrp] = useState(Object.keys(bloodGroup)[0])
  const [openModal, setOpenModal] = useState(false)
  const [bloodtypeLabels, setBloodtypeLabels] = useState([])
  const [bloodtypeValues, setBloodtypeValues] = useState([])

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: { type: 'bar', toolbar: { show: false } },
      legend: { show: false },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          barHeight: 40,
          dataLabels: { position: 'bottom' }
        }
      },
      colors: ['#13BCAB', '#376196', '#881A1A', '#9B8126', '#783611'],
      dataLabels: {
        enabled: true,
        style: { colors: ['#333'] },
        offsetX: 6,
        formatter: val => val.toFixed(0)
      },
      xaxis: { categories: [] },
      yaxis: {
        labels: {
          style: { fontSize: '12px', textAlign: 'left' },
          align: 'left'
        }
      },
      tooltip: { enabled: false }
    }
  })

  const dummyData = {
    "totalBloodCount": 1500,
    "bloodGroupWiseCount": [
      {
        "type": "Whole Blood (CPDA-1)",
        "total": 120,
        "A+Ve": 30,
        "A-Ve": 10,
        "B+Ve": 20,
        "B-Ve": 5,
        "O+Ve": 35,
        "O-Ve": 8,
        "AB+Ve": 10,
        "AB-Ve": 2
      },
      {
        "type": "Fresh Frozen Plasma",
        "total": 90,
        "A+Ve": 15,
        "A-Ve": 5,
        "B+Ve": 18,
        "B-Ve": 6,
        "O+Ve": 25,
        "O-Ve": 8,
        "AB+Ve": 10,
        "AB-Ve": 3
      },
      {
        "type": "Packed Red Blood Cells",
        "total": 130,
        "A+Ve": 40,
        "A-Ve": 12,
        "B+Ve": 25,
        "B-Ve": 8,
        "O+Ve": 38,
        "O-Ve": 5,
        "AB+Ve": 15,
        "AB-Ve": 7
      },
      {
        "type": "Single Donor Platelet",
        "total": 70,
        "A+Ve": 10,
        "A-Ve": 4,
        "B+Ve": 15,
        "B-Ve": 3,
        "O+Ve": 20,
        "O-Ve": 5,
        "AB+Ve": 10,
        "AB-Ve": 3
      },
      {
        "type": "Random Donor Platelets",
        "total": 80,
        "A+Ve": 12,
        "A-Ve": 5,
        "B+Ve": 18,
        "B-Ve": 6,
        "O+Ve": 22,
        "O-Ve": 7,
        "AB+Ve": 9,
        "AB-Ve": 1
      },
      {
        "type": "Platelets additive solutions",
        "total": 60,
        "A+Ve": 10,
        "A-Ve": 3,
        "B+Ve": 12,
        "B-Ve": 4,
        "O+Ve": 18,
        "O-Ve": 5,
        "AB+Ve": 7,
        "AB-Ve": 1
      },
      {
        "type": "Cryoprecipitate",
        "total": 50,
        "A+Ve": 8,
        "A-Ve": 2,
        "B+Ve": 10,
        "B-Ve": 3,
        "O+Ve": 15,
        "O-Ve": 4,
        "AB+Ve": 6,
        "AB-Ve": 2
      },
      {
        "type": "Cryo Poor Plasma",
        "total": 40,
        "A+Ve": 6,
        "A-Ve": 2,
        "B+Ve": 9,
        "B-Ve": 2,
        "O+Ve": 12,
        "O-Ve": 3,
        "AB+Ve": 6,
        "AB-Ve": 0
      }
    ]
  }

  const getDashboardBloodComp = () => {
    setLoading(true)
    let bloodAll = dummyData.bloodGroupWiseCount

    if (bloodAll.length) {
      setBloodData(bloodAll)

      const typeLabels = bloodAll.map(item => item.type)
      const totalValues = bloodAll.map(item => item.total || 0)

      setChartData(prevData => ({
        ...prevData,
        series: [{ name: 'Quantity', data: totalValues }],
        options: { ...prevData.options, xaxis: { categories: typeLabels } }
      }))
    }
    setLoading(false)
  }

  useEffect(() => {
    getDashboardBloodComp()
  }, [])

  useEffect(() => {
    if (bloodGrp && BloodData.length) {
      let apiToUser = bloodGroupToFilter[bloodGrp]
      const totalValues = BloodData.map(item => item[apiToUser] || 0)

      if (totalValues.length) {
        setChartData(prevData => ({
          ...prevData,
          series: [{ name: 'Quantity', data: totalValues }]
        }))
        setBloodtypeValues(totalValues)
      }
    }
  }, [bloodGrp, BloodData])

  return (
    <>
      <CardHeading
        path='/blood-stock'
        title='Available Blood Stock'
        count={dummyData.totalBloodCount}
        refreshDataApi={getDashboardBloodComp}
        loading={loading}
      />
      {BloodData.length ? (
        <div className='dash-card-100 cleartop-m-p'>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <section className='dash-table-60 blood-section'>
                <div className='table-container_stock'>
                  <table className='blood-type-table'>
                    <thead>
                      <tr>
                        <th>Blood Type</th>
                        {Object.keys(bloodGroup).map((item, index) => (
                          <th key={index} className='blood-grp-btn'>
                            <button
                              type='button'
                              onClick={() => setBloodGrp(item)}
                              className={item === bloodGrp ? 'active' : ''}
                            >
                              {bloodGroup[item]}
                            </button>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {BloodData.map((row, index) => (
                        <tr key={index}>
                          <td>{typeAbbreviations[row.type] || 'Total'}</td>
                          <td>{row.total}</td>
                          <td>{row['A+Ve'] || '-'}</td>
                          <td>{row['A-Ve'] || '-'}</td>
                          <td>{row['B+Ve'] || '-'}</td>
                          <td>{row['B-Ve'] || '-'}</td>
                          <td>{row['O+Ve'] || '-'}</td>
                          <td>{row['O-Ve'] || '-'}</td>
                          <td>{row['AB+Ve'] || '-'}</td>
                          <td>{row['AB-Ve'] || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </Grid>
            <Grid item xs={12} lg={4}>
              <section className='dash-table-40 blood-section py-3'>
                <Box>
                  <h3>Available blood components for {bloodGroup[bloodGrp]}</h3>
                </Box>
                <ReactApexcharts
                  options={chartData.options}
                  series={chartData.series}
                  type='bar'
                  height={300}
                />
              </section>
            </Grid>
          </Grid>
        </div>
      ) : (
        <DashboardNoDat />
      )}

      {/* <ModalCustom open={openModal} closeDialog={() => setOpenModal(false)} title='Available Blood Components'>
        <Grid container spacing={3}>
          {bloodtypeLabels.length ? (
            bloodtypeLabels.map((item, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Typography>{item}</Typography>
                <Typography>{bloodtypeValues[i]} Units</Typography>
              </Grid>
            ))
          ) : (
            <DashboardNoDat />
          )}
        </Grid>
      </ModalCustom> */}
    </>
  )
}

export default AvailableBlood
