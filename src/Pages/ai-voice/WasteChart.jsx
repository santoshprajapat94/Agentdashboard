import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Box } from '@mui/material'
import CardHeading from './CardHeading'

export function DashboardNoDat() {
  return (
    <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
      No data found
    </Box>
  )
}

const labels = ['Anti-HCV', 'Expired', 'H Bs Ag', 'HIV', 'Malaria', 'Other', 'A+ Vdrl']

const WasteChart = () => {
  const [apiData, setApiData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modalData, setModalData] = useState([])
  const [updatedDate, setUpdatedDate] = useState(null)

  // स्टेटिक डमी डेटा (API के बदले)
  const dummyData = {
    anty_hcv: 12,
    expired: 7,
    hsbg: 10,
    hiv: 5,
    malaria: 14,
    other: 8,
    vdrl: 9,
    total: 65
  }

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: { type: 'donut' },
      stroke: { width: 0 },
      labels: labels,
      colors: ['#13BCAB', '#376196', '#881A1A', '#9B8126', '#783611', '#a2b861', '#d24e4e'],
      dataLabels: {
        enabled: true,
        formatter: (val, opts) => {
          return opts.w.globals.series[opts.seriesIndex]
        }
      },
      legend: {
        show: true,
        position: 'right',
        horizontalAlign: 'center',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: 'Helvetica, Arial',
        labels: {
          colors: ['#000'],
          useSeriesColors: false
        }
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: '60%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Units',
                fontSize: '20px',
                fontWeight: 600,
                color: '#000',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                }
              }
            }
          }
        }
      }
    }
  })

  // API के बदले डमी डेटा सेट करना
  const getDashboardInfo = () => {
    setLoading(true)

    setTimeout(() => {
      let array = [
        dummyData.anty_hcv,
        dummyData.expired,
        dummyData.hsbg,
        dummyData.hiv,
        dummyData.malaria,
        dummyData.other,
        dummyData.vdrl
      ]

      setChartData(prevState => ({
        ...prevState,
        series: array
      }))

      setApiData(dummyData)

      let newArray = labels.map((item, index) => ({
        label: item,
        value: array[index] || '0'
      }))
      setModalData(newArray)

      setUpdatedDate(new Date())
      setLoading(false)
    }, 1000) // 1 सेकंड का टाइमर ताकि ऐसा लगे कि API कॉल हो रही है
  }

  useEffect(() => {
    getDashboardInfo()
  }, [])

  return (
    <>
      <CardHeading
        path='/waste-management/waste-list'
        title='Waste management'
        size='sm'
        count={apiData?.total || 0}
        refreshDataApi={getDashboardInfo}
        loading={loading}
        modalData={modalData}
        updatedDate={updatedDate}
      />
      {apiData ? (
        <ReactApexChart options={chartData.options} series={chartData.series} type='donut' height={350} />
      ) : (
        <h3>Data not found</h3>
      )}
    </>
  )
}

export default WasteChart
