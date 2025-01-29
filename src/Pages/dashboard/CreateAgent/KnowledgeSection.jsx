import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    Button,
    Typography,
    Box,
    Grid,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';

// Styled hidden input for file uploads
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const schema = Yup.object({
    business_name: Yup.string().required('Business/Company name is required.'),
    founder_name: Yup.string().required('Founder name is required.'),
    founded_date: Yup.date().nullable().required('Founded date is required.'),
    document: Yup.mixed().required('Document is required.'),
    webLink: Yup.string().url('Invalid URL format').required('Website link is required.'),
});

const KnowledgeSection = ({setAgentData,agentData,setTab}) => {
    const [faqData] = useState([
        {
            question: 'What is onboarding?',
            answer: 'Onboarding is the process of integrating new users or employees into a system or company.',
        },
        {
            question: 'How do I upload documents?',
            answer: 'You can upload documents by clicking on the upload button in the document section.',
        },
    ]);

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            business_name: '',
            founder_name: '',
            founded_date: null,
            document: null,
            webLink: '',
        },
    });

    const compressAndSaveFile = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1]; 
            // localStorage.setItem('uploadedDocument', base64String); 
            setValue('document', base64String); 
            // console.log('Base64 Encoded File:', base64String);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = (data) => {
        
        setAgentData({...data,...agentData})
        toast.success('add Knowledge section successfully')
        reset(); 
        setTab(2);
    }
    console.log('agentData',agentData)

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600, textAlign: 'left' }}>
                    Onboarding Info
                </Typography>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    {/* Business Name */}
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>Business/Company Name</Box>
                        <Controller
                            name="business_name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    error={!!errors.business_name}
                                    helperText={errors.business_name?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Founder Name */}
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>Founder Name</Box>
                        <Controller
                            name="founder_name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    error={!!errors.founder_name}
                                    helperText={errors.founder_name?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Founded Date */}
                    <Grid item xs={6} sm={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>Company Founded</Box>
                        <Controller
                            name="founded_date"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        {...field}
                                        onChange={(value) => field.onChange(value)}
                                        slotProps={{ field: { size: 'small' } }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                size="small"
                                                error={!!errors.founded_date}
                                                helperText={errors.founded_date?.message}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Grid>

                    {/* File Upload */}
                    <Grid item xs={6} sm={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>Choose File</Box>
                        <Button
                            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start',backgroundColor: '#1e293b', color: '#fff' }}
                            component="label"
                            className='hover:bg-gray-700'
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                        >
                            Document
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) compressAndSaveFile(file);
                                }}
                            />
                        </Button>
                        {errors.document && (
                            <Typography variant="body2" color="error">
                                {errors.document.message}
                            </Typography>
                        )}
                    </Grid>

                    {/* Website Link */}
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>Your Website Link</Box>
                        <Controller
                            name="webLink"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    error={!!errors.webLink}
                                    helperText={errors.webLink?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* FAQ Section */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600, textAlign: 'left' }}>
                            The FAQ (Frequently Asked Questions)
                        </Typography>
                        {faqData.map((faq, index) => (
                            <Accordion key={index}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{faq.question}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{faq.answer}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1} direction="row">
                            <Button
                                className='hover:bg-gray-700'
                                size="large"
                                variant="contained"
                                sx={{ backgroundColor: '#e2e8f0', color: '#000' }}
                            >
                                Previous
                            </Button>
                            <Button
                                className='hover:bg-gray-700'
                                type="submit"
                                size="large"
                                variant="contained"
                                sx={{ backgroundColor: '#1e293b', color: '#fff' }}
                            >
                                Next
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default KnowledgeSection;
