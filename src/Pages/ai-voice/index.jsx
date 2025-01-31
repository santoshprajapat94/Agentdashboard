import React, { forwardRef, useRef, useState } from 'react'
import HeaderTabs from './HeaderTabs'
import { Bar, Line } from 'react-chartjs-2'
import { useEffect } from 'react'

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
  styled
} from '@mui/material'
import { BorderBottom, Cached, ChevronLeft, ChevronRight, Refresh } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { CategoryScale, LinearScale, Chart } from 'chart.js'
import AvailableBlood from './AvailableBlood'
import TtiChart from './TtiChart'
import BloodComponentWise from './BloodComponentWise'
import WasteChart from './WasteChart'
import DonorsChart from './DonorsChart'
import ChatComponent from './chat-ai'
import ScrollCard from '../../components/ScrollCard'
import BlodgroupWiseChart from './BlodgroupWiseChart'

Chart.register(CategoryScale, LinearScale)

const StyledTabs = styled(props => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }} />
))({
  '& .MuiTabs-indicator': {
    display: 'none'
  }
})

const StyledTab = styled(props => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  minWidth: '30px',
  fontSize: theme.typography.pxToRem(15),
  color: '#9CA3AF',
  '&.Mui-selected': {
    color: '#000000',
    borderBottom: '2px solid #000000'
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)'
  }
}))

export const bloodGroup = {
  total: 'Total',
  AB_NEGATIVE: 'AB-',
  AB_POSITIVE: 'AB+',
  A_POSITIVE: 'A+',
  A_NEGATIVE: 'A-',
  B_POSITIVE: 'B+',
  B_NEGATIVE: 'B-',
  O_NEGATIVE: 'O-',
  O_POSITIVE: 'O+'
}

export const bloodGroupToFilter = {
  total: 'total',
  AB_NEGATIVE: 'AB-Ve',
  AB_POSITIVE: 'AB+Ve',
  A_POSITIVE: 'A+Ve',
  A_NEGATIVE: 'A-Ve',
  B_POSITIVE: 'B+Ve',
  B_NEGATIVE: 'B-Ve',
  O_NEGATIVE: 'O-Ve',
  O_POSITIVE: 'O+Ve'
}

export const selectoptions = [
  { value: 'thisMonth', label: 'This Month' },
  { value: 'lastMonth', label: 'Last Month' },
  { value: 'all', label: 'All' },

  { value: 'custom', label: 'custom' }
]

const BoxWrapper = styled('Box')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',

  [theme.breakpoints.down({ unit: 1300 })]: {
    flexDirection: 'column'
  }
}))

const DashboardComp = () => {
  const [headerData, setHeaderData] = useState({})
  const [certificateData, setCertificateData] = useState({
    BloodBank: null,
    BloodCamp: [],
    AllCount: null,
    BankCount: null,
    CampCount: null
  })
  const [auditData, setAuditData] = useState([])
  const [headerTop, setHeaderTop] = useState('thisMonth')
  const [pageLoading, setPageLoading] = useState(false)
  const [loadingWidger, setLoadingWidger] = useState(false)
  const [startDate, setStartDate] = useState(dayjs(new Date()))
  const [endDate, setEndDate] = useState(dayjs(new Date()))
  const [open, setOpen] = useState(false)
  const [certificateFilter, setCertificateFilter] = useState('all')
  const [updatedDate, setUpdatedDate] = useState(null)
  const [certificateFilterData, setCertificateFilterData] = useState({
    BloodBank: null,
    BloodCamp: []
  })
  // const { settings, saveSettings } = useSettings()
  function handleStartDateChange(date) {
    setStartDate(date)
    let endDat = dayjs(endDate).format('YYYY-MM-DD')
    let startDat = dayjs(date).format('YYYY-MM-DD')
    getDashboardInfo(`?endDate=${endDat}&startDate=${startDat}`)
  }
  function handleEndDateChange(date) {
    setEndDate(date)
    let endDat = dayjs(date || null).format('YYYY-MM-DD')
    let startDat = dayjs(startDate || null).format('YYYY-MM-DD')
    getDashboardInfo(`?endDate=${endDat}&startDate=${startDat}`)
  }

  const getDashboardInfo = item => {
    setLoadingWidger(true)
    let filter = ''
    if (item === 'thisMonth') {
      const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD')
      // End of the current month
      const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD')
      filter = `?endDate=${endOfMonth}&startDate=${startOfMonth}`
    } else if (item === 'lastMonth') {
      const startOfLastMonth = dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
      // End of the last month
      const endOfLastMonth = dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')

      filter = `?endDate=${endOfLastMonth}&startDate=${startOfLastMonth}`
    } else if (item === 'all') {
      filter = ``
    } else {
      filter = item
    }
    const data = {
      "donorCount": 8,
      "campCount": 4,
      "requestCount": 16,
      "inwardCount": 5,
      "tenantCount": 0,
      "storagecount": 0
    }
    setHeaderData(data)
    setUpdatedDate(new Date())
    setLoadingWidger(false)
    // const URL = checkTenantId(`dashboard/widget-count${filter}`)
    // AxiosHelper.get(URL)
    //   .then(resp => {
    //     setHeaderData(resp.data.data)
    //     setUpdatedDate(new Date())
    //     setLoadingWidger(false)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     setLoadingWidger(false)
    //   })
  }

  const headerCardsData = [
    {
      icon: 'https://test-dev.ebloodconnect.com/assets/images/dashboard/regBloodBank.svg',
      stats: '15%',
      data: '1200',
      title: 'Total Blood Request Count',
      bgColor: 'linear-gradient(98.28deg, #D7E3F6 0.4%, #F0F3F5 100%)',
    },
    {
      icon: 'https://test-dev.ebloodconnect.com/assets/images/dashboard/regBloodBank.svg',
      stats: '10%',
      data: '850',
      title: 'Total Inward Stock Count',
      bgColor: 'linear-gradient(98.28deg, #D7F3EF 0.4%, #F0F3F5 100%)',
    },
    {
      icon: 'https://test-dev.ebloodconnect.com/assets/images/dashboard/regBloodBank.svg',
      stats: '8%',
      data: '200',
      title: 'Registered Blood Banks',
      bgColor: 'linear-gradient(98.28deg, #D7F3EF 0.4%, #F0F3F5 100%)',
    },
    {
      icon: 'https://test-dev.ebloodconnect.com/assets/images/dashboard/regBloodBank.svg',
      stats: '20%',
      data: '5000',
      title: 'Total Registered Donors',
      bgColor: 'linear-gradient(98.28deg, #EDD9EE 0.4%, #F0F3F5 100%)',
    },
    {
      icon: 'https://test-dev.ebloodconnect.com/assets/images/dashboard/regBloodBank.svg',
      stats: '12%',
      data: '1500',
      title: 'Total Blood Request Received',
      bgColor: 'linear-gradient(98.28deg, #D7E3F6 0.4%, #F0F3F5 100%)',
    },
    {
      icon: 'https://test-dev.ebloodconnect.com/assets/images/dashboard/regBloodBank.svg',
      stats: '18%',
      data: '45',
      title: 'Blood Camp Organized',
      bgColor: 'linear-gradient(98.28deg, #EED9D9 0.4%, #F0F3F5 100%)',
    },
  ];

  const data1 = [
    {
      "id": 6285,
      "message": "Blood Bag 'HG25D-6797' is Removed",
      "redirect_url": "bag-detail/2529",
      "user_name": "Ajay chauhan",
      "role_name": "admin",
      "createdAt": "2025-01-27T11:57:28.000Z",
      "created_at": "2025-01-27T11:57:28.000Z"
    },
    {
      "id": 6284,
      "message": "Bag number HG25D-6797 is Added",
      "redirect_url": "master-register/bag-detail/2529",
      "user_name": "Ajay chauhan",
      "role_name": "admin",
      "createdAt": "2025-01-27T11:05:11.000Z",
      "created_at": "2025-01-27T11:05:11.000Z"
    },
    {
      "id": 6283,
      "message": "Bag number HG25D-6796 is Added",
      "redirect_url": "master-register/bag-detail/2528",
      "user_name": "Ajay chauhan",
      "role_name": "admin",
      "createdAt": "2025-01-27T11:05:11.000Z",
      "created_at": "2025-01-27T11:05:11.000Z"
    },
    {
      "id": 6282,
      "message": "Blood Bag 'HG25D-6795' is Removed",
      "redirect_url": "bag-detail/2527",
      "user_name": "Ajay chauhan",
      "role_name": "admin",
      "createdAt": "2025-01-27T11:04:20.000Z",
      "created_at": "2025-01-27T11:04:20.000Z"
    },
    {
      "id": 6281,
      "message": "Blood Bag 'EBC25-101' is Removed",
      "redirect_url": "bag-detail/2508",
      "user_name": "Ajay chauhan",
      "role_name": "admin",
      "createdAt": "2025-01-27T11:04:05.000Z",
      "created_at": "2025-01-27T11:04:05.000Z"
    },
    {
      "id": 6280,
      "message": "Bag number HG25D-6795 is Added",
      "redirect_url": "master-register/bag-detail/2527",
      "user_name": "Ajay chauhan",
      "role_name": "admin",
      "createdAt": "2025-01-27T10:56:40.000Z",
      "created_at": "2025-01-27T10:56:40.000Z"
    },
    {
      "id": 6279,
      "message": "Bag number HG25D-6794 is Added",
      "redirect_url": "master-register/bag-detail/2526",
      "user_name": "Ajay chauhan",
      "role_name": "admin",
      "createdAt": "2025-01-27T10:48:21.000Z",
      "created_at": "2025-01-27T10:48:21.000Z"
    },
    {
      "id": 6278,
      "message": "Bag number HG25D-6792 is Added",
      "redirect_url": "master-register/bag-detail/2525",
      "user_name": "Ajay chauhan",
      "role_name": "admin",
      "createdAt": "2025-01-27T10:36:22.000Z",
      "created_at": "2025-01-27T10:36:22.000Z"
    },
    {
      "id": 6277,
      "message": "Bag number HG25D-6791 is Added",
      "redirect_url": "master-register/bag-detail/2524",
      "user_name": "Ajay chauhan",
      "role_name": "admin",
      "createdAt": "2025-01-27T10:25:55.000Z",
      "created_at": "2025-01-27T10:25:55.000Z"
    },
    {
      "id": 6276,
      "message": "Donor 'Suman' is moved from 'undefined' to camp 'Re Life Camp'",
      "redirect_url": "bag-detail/2250",
      "user_name": "Ajay chauhan",
      "role_name": "admin",
      "createdAt": "2025-01-25T14:39:42.000Z",
      "created_at": "2025-01-25T14:39:42.000Z"
    }
  ]

  const getDashboardAuditLog = () => {
    setAuditData(data1)
  }
  return (
    <Grid sx={{ width: '100%',height:{xs:'auto',sm:'auto',md:'auto',lg:'100vh'},overflow:{xs:'auto',sm:'auto',md:'auto',lg:'hidden'}}} container ml={0} spacing={1} pb={3}>
      <Grid item xs={12} lg={3}>
        <Card
          sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <ChatComponent />
        </Card>
      </Grid>
      
        <Grid item xs={12} lg={9} sx={{ height:'100%',overflow:"auto"}}>
        {/* <ScrollCard style={{ height:'100%',overflow:"auto"}}> */}
          <section className='dash-card mt-0 pt-2'>
            <Box
              className='dash__tabs '
              sx={{
                justifyContent: 'space-between',
                alignItems: { lg: 'center', md: 'flex-start' },
                width: '100%',
                borderBottom: '2px solid #fff'
              }}
            >
              <StyledTabs
                variant='scrollable'
                scrollButtons='auto'
                value={headerTop}
                // onChange={handleChange}
                aria-label='basic tabs example'
              >
                <StyledTab value='thisMonth' label='This Month' />
                <StyledTab value='lastMonth' label='Last Month' />
                <StyledTab value='all' label='All' />
                <StyledTab value='custom' label='Custom' />
              </StyledTabs>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {updatedDate ? (
                  <Typography>Last updated on {dayjs(updatedDate).format('DD MMM YYYY, hh:mm A')}</Typography>
                ) : null}
                <IconButton
                  onClick={() => getDashboardInfo(headerTop)}
                  sx={{
                    background: 'linear-gradient(90deg,#214f89,#12bcab)',
                    borderRadius: '4px',
                    color: '#fff',
                    height: '24px',
                    width: '24px'
                  }}
                >
                  {loadingWidger ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <Cached />}
                </IconButton>
              </Box>
            </Box>

            {/* <Collapse in={open}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              p: 1,
              borderRadius: 2,
              gap: 2,
              backgroundColor: '#F0FFFF'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#fff',
                borderRadius: 2
              }}
            >
              <IconButton
                onClick={() => handleStartDateChange(dayjs(startDate).subtract(1, 'month').endOf('month'))}
              >
                <ChevronLeft />
              </IconButton>
              <Typography>
                {dayjs(startDate).format('DD/MM/YYYY')} - {dayjs(endDate).format('DD/MM/YYYY')}
              </Typography>
              <IconButton onClick={() => handleEndDateChange(dayjs(endDate).add(1, 'month').endOf('month'))}>
                <ChevronRight />
              </IconButton>
            </Box>
            <DatePicker
              format='DD/MM/YYYY'
              slotProps={{
                textField: {
                  size: 'small',
                  sx: { maxWidth: 170, background: '#fff' }
                }
              }}
              value={startDate}
              disableFuture
              onChange={value => handleStartDateChange(value)}
              label='From'
            />

            <DatePicker
              format='DD/MM/YYYY'
              slotProps={{
                textField: {
                  size: 'small',
                  sx: { maxWidth: 170, background: '#fff' }
                }
              }}
              minDate={startDate}
              disableFuture
              onChange={value => handleEndDateChange(value)}
              value={endDate}
              label='To'
            />

             <Button onClick={handleClear} color='primary' variant='outlined'>
              Reset
              <FilterAltOutlined />
            </Button> 
          </Box>
        </Collapse> */}

            <div className='header-cards' style={{ width: '100%' }}>

              <Grid container spacing={2}>
                {headerCardsData.map((card, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                    <HeaderTabs
                      icon={card.icon}
                      stats={card.stats}
                      data={card.data}
                      title={card.title}
                      bgColor={card.bgColor}
                    />
                  </Grid>
                ))}
              </Grid>



            </div>
          </section>

          <section className='dash-card-100 flex-col-cust' style={{ minHeight: '400px' }}>
            <AvailableBlood />
          </section>

          <Grid container spacing={2}>

            <>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', width: '100%', p: 1 }}>
                  <TtiChart />
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', width: '100%', p: 1 }}>
                  <BloodComponentWise />
                </Card>
              </Grid>
            </>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', width: '100%', p: 1 }}>
                <BlodgroupWiseChart/>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', width: '100%', p: 1 }}>
                <WasteChart />
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ height: '100%', width: '100%', p: 1, minHeight: 350 }}>
                <DonorsChart />
              </Card>
            </Grid>

          </Grid>
          {/* </ScrollCard> */}
        </Grid>
      
    </Grid>
  );
}

export default DashboardComp;
