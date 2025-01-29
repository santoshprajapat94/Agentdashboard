import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    Link,
    Menu,
    MenuItem,
    Tab,
    Tabs,
    Typography,
    styled
  } from '@mui/material'
  import { Cached, ChevronLeft, ChevronRight, ExpandMore, Filter, MoreVert } from '@mui/icons-material'
  import { DatePicker } from '@mui/x-date-pickers'
  import React, { forwardRef, useState } from 'react'
//   import Select from 'react-select'
  import dayjs from 'dayjs'
//   import ModalCustom from '../../shared/ModalCustom'
//   import { inputStyles, labelStyles } from '../../certification/EditCertificate'
//   import LoadingButton from '../../shared/LoadingButton'
  import { DashboardNoDat } from './WasteChart'

  
  export const options = [
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'all', label: 'All' },
  
    { value: 'custom', label: 'custom' }
  ]
  
  export const startOfMonthDefault = dayjs().startOf('month').format('YYYY-MM-DD')
  
  // End of the current month
  export const endOfMonthDefault = dayjs().endOf('month').format('YYYY-MM-DD')
  
  const CardHeading = ({
    title,
    count,
    hideDetail,
    size = 'md',
    refreshDataApi,
    loading,
    setType,
    setStartDateCustom,
    setEndDateCustom,
    modalData = [],
    path = '/',
    updatedDate = new Date()
  }) => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [filters, setFilters] = React.useState(null)
    const [anchorEl2, setAnchorEl2] = React.useState(null)
    const [openModal, setOpenModal] = React.useState(false)
    const [startDate, setStartDate] = useState(dayjs(new Date()))
    const [endDate, setEndDate] = useState(dayjs(new Date()))
    const [value, setValue] = useState('month')
    const open = Boolean(anchorEl)
    const open2 = Boolean(anchorEl2)
  
    const handleClick = event => {
      setAnchorEl(event.currentTarget)
    }
  
    const handleClick2 = event => {
      setAnchorEl2(event.currentTarget)
    }
  
    const handleFilters = val => {
      setFilters(val)
      handleClose()
      setType(val ? val?.toLowerCase() : '')
    }
    const handleClose = () => {
      setAnchorEl(null)
      setAnchorEl2(null)
    }
  
    const handeChange = item => {
      setValue(item)
      if (item === 'custom') return
      handleClose()
      if (item === 'week') {
        handleWeekCal()
        return
      }
      if (item === 'month') {
        handleMonthCal()
        return
      }
    }
  
    function handleWeekCal() {
      // Start of the current week (Monday as the first day of the week)
      const startOfWeek = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
  
      // End of the current week (Sunday as the last day of the week)
      const endOfWeek = dayjs().endOf('week').add(1, 'day').format('YYYY-MM-DD')
      setStartDateCustom(startOfWeek)
      setEndDateCustom(endOfWeek)
    }
  
    function handleMonthCal() {
      // Start of the current month
      const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD')
  
      // End of the current month
      const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD')
      setStartDateCustom(startOfMonth)
      setEndDateCustom(endOfMonth)
    }
  
    function handleStartDateChange(date) {
      setStartDate(date)
    }
    function handleEndDateChange(date) {
      setEndDate(date)
    }
  
    function submitCustom() {
      let endDat = dayjs(endDate || null).format('YYYY-MM-DD')
      let startDat = dayjs(startDate || null).format('YYYY-MM-DD')
      setStartDateCustom(startDat)
      setEndDateCustom(endDat)
      handleClose()
    }
  
    const handleClear = () => {
      let d = dayjs(new Date())
      handleStartDateChange(d)
      handleEndDateChange(d)
    }
  
    return (
      <>
        <section style={{ alignItems: 'start' }} className='card-section card_das_title align-items-start'>
          <div
            style={{
              maxWidth: '80%'
            }}
            className='d-flex  align-items-start'
          >
            <Link to={path}>
              <h3 className={`${size === 'sm' ? 'page-title-dash' : 'page-title'}`}>{title}</h3>
            </Link>
            <Box
              sx={{
                background: '#E1F6F0',
                color: 'black',
                width: size === 'sm' ? '40px' : '48px',
                height: '22px',
                borderRadius: '4px',
                fontSize: size === 'sm' ? '0.7rem' : '0.9rem',
                fontWeight: 700,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                ml: 2
              }}
            >
              {count || '0'}
            </Box>
          </div>
  
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: 2,
              gap: '5px',
              ml: 1
            }}
          >
            {size === 'sm' ? (
              <>
                {hideDetail ? null : (
                  <IconButton
                    onClick={() => setOpenModal(true)}
                    sx={{
                      // background: 'linear-gradient(90deg,#214f89,#12bcab)',
                      borderRadius: '4px',
                      // color: '#fff',
                      height: '14px',
                      width: '14px'
                    }}
                  >
                    <img style={{ maxHeight: '20px' }} alt='' src='/assets/images/dashboard/file.svg' />
                  </IconButton>
                )}
  
                <IconButton
                  sx={{
                    background: 'linear-gradient(90deg,#214f89,#12bcab)',
                    borderRadius: '4px',
                    color: '#fff',
                    height: '22px',
                    width: '22px',
                    padding: 0
                  }}
                  onClick={refreshDataApi}
                >
                  {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <Cached />}
                </IconButton>
  
                <IconButton
                  sx={{
                    borderRadius: '4px',
                    height: '14px',
                    width: '14px'
                  }}
                  onClick={handleClick}
                >
                  <MoreVert />
                </IconButton>
              </>
            ) : (
              <>
                
                <IconButton
                  sx={{
                    background: 'linear-gradient(90deg,#214f89,#12bcab)',
                    borderRadius: '4px',
                    color: '#fff',
                    height: '22px',
                    width: '22px',
                    padding: 0
                  }}
                  onClick={refreshDataApi}
                >
                  {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <Cached />}
                </IconButton>
                <Typography
                  onClick={handleClick2}
                  sx={{ color: '#214F8A', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  {filters ? filters : 'All'} <ExpandMore />{' '}
                </Typography>
              </>
            )}
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0
                }
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          >
            <MenuItem
              sx={{
                backgroundColor: value === 'month' ? 'primary.main' : 'transparent',
                color: value === 'month' ? 'white' : 'inherit'
              }}
              onClick={() => handeChange('month')}
            >
              This Month
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: value === 'week' ? 'primary.main' : 'transparent',
                color: value === 'week' ? 'white' : 'inherit'
              }}
              onClick={() => handeChange('week')}
            >
              This Week
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: value === 'custom' ? 'primary.main' : 'transparent',
                color: value === 'custom' ? 'white' : 'inherit'
              }}
              onClick={() => handeChange('custom')}
            >
              Custom
            </MenuItem>
            {value === 'custom' ? (
              <MenuItem
                disableRipple
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#D7F3EF',
                    borderRadius: 2,
                    p: 0.5,
                    width: '100%'
                  }}
                >
                  <IconButton
                    sx={{ background: '#95CDC5' }}
                    size='small'
                    onClick={() => handleStartDateChange(dayjs(startDate).subtract(1, 'month').endOf('month'))}
                  >
                    <ChevronLeft />
                  </IconButton>
                  <Typography>
                    {dayjs(startDate).format('DD/MM/YYYY')} - {dayjs(endDate).format('DD/MM/YYYY')}
                  </Typography>
                  <IconButton
                    sx={{ background: '#95CDC5' }}
                    size='small'
                    onClick={() => handleEndDateChange(dayjs(endDate).add(1, 'month').endOf('month'))}
                  >
                    <ChevronRight />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: 2,
                    alignItems: 'center',
                    borderRadius: 2,
                    p: 0.5,
                    width: '100%'
                  }}
                >
                  <FormControl fullWidth>
                    <FormLabel sx={labelStyles}>From</FormLabel>
                    <DatePicker
                      format='DD/MM/YYYY'
                      slotProps={{
                        textField: {
                          size: 'small',
                          sx: { maxWidth: 170, ...inputStyles }
                        }
                      }}
                      value={startDate}
                      onChange={value => handleStartDateChange(value)}
                    />
                  </FormControl>
  
                  <FormControl fullWidth>
                    <FormLabel sx={labelStyles}>To</FormLabel>
  
                    <DatePicker
                      format='DD/MM/YYYY'
                      slotProps={{
                        textField: {
                          size: 'small',
                          sx: { maxWidth: 170, ...inputStyles }
                        }
                      }}
                      onChange={value => handleEndDateChange(value)}
                      value={endDate}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2 }}>
                  <Button onClick={handleClear} color='primary' variant='outlined'>
                    Reset
                  </Button>
                  <LoadingButton title='Submit' onClick={submitCustom} />
                </Box>
              </MenuItem>
            ) : null}
          </Menu>
  
          <Menu
            anchorEl={anchorEl2}
            open={open2}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0
                }
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => handleFilters('')}>All</MenuItem>
            <MenuItem onClick={() => handleFilters('Tested')}>Tested</MenuItem>
            <MenuItem onClick={() => handleFilters('Untested')}>Untested</MenuItem>
          </Menu>
  
         
        </section>
        <Typography sx={{ color: '#7F7F7F', fontSize: size === 'sm' ? '10px' : '14px' }}>
          Last updated : {dayjs(updatedDate).format('DD MMM YYYY, hh:mm A')}
        </Typography>
      </>
    )
  }
  
  export default CardHeading
  