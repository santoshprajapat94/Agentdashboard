import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
// import AxiosHelper from '../../../helper/AxiosHelper'
import CardHeading, {endOfMonthDefault , startOfMonthDefault} from './CardHeading'
import { DashboardNoDat } from './WasteChart'
// import { checkTenantId } from '../../../helper/CommonAPI'

const DonorsChart = () => {
  const [apiData, setApiData] = useState(null)
  const [campData, setCampData] = useState(22)
  const [bankData, setBankData] = useState(13)
  const [totalData, setTotalData] = useState(35)
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState(startOfMonthDefault)
  const [updatedDate, setUpdatedDate] = useState(endOfMonthDefault)
  const [endDate, setEndDate] = useState(null)
  const options = {
    chart: {
      type: 'donut'
    },
    stroke: { width: 0 },
    labels: ['Voluntary F', 'Voluntary M', 'Replacement F', 'Replacement M', 'Autologous F', 'Autologous M'],
    colors: ['#76B7B2', '#F28E2B', '#59A14F', '#E15759', '#376196', '#881A1A'],
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => {
        return opts.w.globals.series[opts.seriesIndex]
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
      fontWeight: '500',
      fontFamily: 'Helvetica, Arial',
      labels: {
        colors: ['#000'],
        useSeriesColors: false
      },
      markers: {
        width: 12,
        height: 20, // Increase height to make it rectangular
        radius: 2 // Small radius for slightly rounded corners
      },
      itemMargin: {
        horizontal: 2,
        vertical: 5
      }
    }
  }

  const campPlot = {
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '58%', // Increase the width of the donut by decreasing this value
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Blood Camp',
              fontSize: '14px',
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
  const bankPlot = {
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '58%', // Increase the width of the donut by decreasing this value
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Blood Bank',
              fontSize: '14px',
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
  const totalPlot = {
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '58%', // Increase the width of the donut by decreasing this value
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              fontSize: '14px',
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

  const findCounts = data => {
    const counts = {
      Voluntary_Female: 0,
      Voluntary_Male: 0,
      Replacement_Female: 0,
      Replacement_Male: 0,
      Autologous_Female: 0,
      Autologous_Male: 0
    }

    data.forEach(d => {
      const key = `${d.donation_type}_${d.gender}`
      if (counts.hasOwnProperty(key)) {
        counts[key] += d.donors
      }
    })

    return counts
  }

  function filterData(donorData, type) {
    let arrayData = donorData
    if (type !== 'total') {
      arrayData = donorData.filter(d => d.category === type)
    }

    return findCounts(arrayData)
  }

    const getDashboardInfo = () => {
      setLoading(true);
    
      // Mock data
      const resData = [
        { "donation_type": "Voluntary", "gender": "Male", "category": "bank", "donors": 491 },
        { "donation_type": "Voluntary", "gender": "Female", "category": "bank", "donors": 125 },
        { "donation_type": "Voluntary", "gender": "Male", "category": "camp", "donors": 38 },
        { "donation_type": "Voluntary", "gender": "Female", "category": "camp", "donors": 10 },
        { "donation_type": "Replacement", "gender": "Male", "category": "bank", "donors": 23 },
        { "donation_type": "Replacement", "gender": "Female", "category": "bank", "donors": 267 },
        { "donation_type": "Replacement", "gender": "Male", "category": "camp", "donors": 870 },
        { "donation_type": "Replacement", "gender": "Female", "category": "camp", "donors": 220 },
        { "donation_type": "Autologous", "gender": "Male", "category": "bank", "donors": 1200 },
        { "donation_type": "Autologous", "gender": "Female", "category": "bank", "donors": 99 },
        { "donation_type": "Autologous", "gender": "Male", "category": "camp", "donors": 29 },
        { "donation_type": "Autologous", "gender": "Female", "category": "camp", "donors": 7 }
      ];
    
      setApiData(resData);
      setCampData(filterData(resData, 'camp'));
      setBankData(filterData(resData, 'bank'));
      setTotalData(filterData(resData, 'total'));
      setLoading(false);
    };
    
    // Ensure data loads when component mounts
    useEffect(() => {
      getDashboardInfo();
    }, []);
    

  function returnArraySeries(obj) {
    if (!obj) {
      return [0, 0, 0, 0, 0, 0]; // Default values if obj is undefined
    }
    return [
      obj?.Voluntary_Female || 0,
      obj?.Voluntary_Male || 0,
      obj?.Replacement_Female || 0,
      obj?.Replacement_Male || 0,
      obj?.Autologous_Female || 0,
      obj?.Autologous_Male || 0
    ];
  }


  return (
    <>
      <CardHeading
        path='/donors'
        title='Total Donors'
        size='sm'
        hideDetail={true}
        count={apiData?.total_donor?.totalDonor || 15}
        refreshDataApi={getDashboardInfo}
        loading={loading}
        setStartDateCustom={setStartDate}
        setEndDateCustom={setEndDate}
        updatedDate={updatedDate}
      />
      {apiData?.total_donor?.totalDonor == 0 ? (
        <DashboardNoDat />
      ) : (
        <Grid container spacing={2} sx={{ alignItems: 'center', mt: 3, width: '100%', pb: 2 }}>
          <Grid item xs={12} md={4}>
            <ReactApexChart
              options={{ ...options, ...bankPlot }}
              series={returnArraySeries(bankData)}
              type='donut'
              height={350}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ReactApexChart
              options={{ ...options, ...campPlot }}
              series={returnArraySeries(campData)}
              type='donut'
              height={350}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ReactApexChart
              options={{ ...options, ...totalPlot }}
              series={returnArraySeries(totalData)}
              type='donut'
              height={350}
            />
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default DonorsChart
