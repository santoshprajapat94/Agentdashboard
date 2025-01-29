import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Slider,
    TextField,
    Button,
    Avatar,
    MenuItem,
    IconButton,
    Grid,
    Grid2,
    Stack,
    Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Autocomplete from '@mui/material/Autocomplete';
import { Add } from '@mui/icons-material';
import { toast } from 'react-toastify';

const greetingMessages = [
    "Hello, Welcome!",
    "Hi there! Nice to see you!",
    "Greetings! How can I assist you today?",
    "Welcome to our platform!",
    "Good day! What brings you here?",
    "Hey! Let's get started.",
    "Hi! How can I help?",
    "Welcome aboard!",
    "Hello! Hope you're doing well.",
    "Hi! What can I do for you?"
];
console.log('greetingMessages', greetingMessages)

const validationSchema = yup.object({
    agentName: yup.string().required('Agent Name is required'),
    creatorName: yup.string().required('Creator Name is required'),
    agentBio: yup.string().required('Agent Bio is required'),
    greetingMessage: yup.string().required('Greeting Message is required'),
    llmEngine: yup.string().required('Please select an LLM Engine'),
    avatar: yup
        .mixed()
        .required('Avatar is required')
        .test(
            "fileSize",
            "File size should be less than 2MB",
            (value) => value && value[0] && value[0].size <= 2 * 1024 * 1024
        )
        .test(
            "fileType",
            "Only image files (JPEG, PNG, SVG) are allowed",
            (value) =>
                value &&
                value[0] &&
                ["image/jpeg", "image/png", "image/svg+xml"].includes(value[0].type)
        ),
});


const AgentMainSection = ({setAgentData,agentData,setTab}) => {
    const [preview, setPreview] = useState(null);
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            agentName: '',
            creatorName: '',
            agentBio: '',
            greetingMessage: '',
            llmEngine: '',
            creativityLevel: 50,
            avatar: null,
        },
    });
    const avatar = watch("avatar");

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue("avatar", e.target.files);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data) => {
        const formData = {
            ...data,
            avatar: preview,
        };
        setAgentData({...formData})
        reset(); 
        setPreview(null);
        setTab(1);
    };
    console.log('agentData',agentData)
    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Stack spacing={1} direction="row" alignItems="center" mb={3}>
                <Avatar
                    src={preview || ''}
                    alt="Avatar"
                    sx={{ width: 35, height: 35, }}
                />
                <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600, textAlign: 'left' }}>
                    {watch('agentName') || 'Agent Name'}
                </Typography>
            </Stack>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                            <Avatar
                                src={preview || ""}
                                alt="Avatar"
                                sx={{ width: 96, height: 96 }}
                            />
                            <Stack spacing={1} direction="row" style={{ marginBottom: '1rem' }}>
                                <Tooltip title="Upload Avatar">
                                    <IconButton component="label" sx={{ mb: 2 }}>
                                        <CloudUploadIcon sx={{ color: '#27272a' }} />
                                        <input
                                            hidden
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarUpload}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Generate Avatar">
                                    <IconButton component="label" sx={{ mb: 2 }} size='large'>
                                        <AutorenewIcon sx={{ color: '#27272a' }} size='large' />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                Creativity Level
                            </Typography>
                            <Controller
                                name="creativityLevel"
                                control={control}
                                render={({ field }) => (
                                    <Slider {...field} defaultValue={50} aria-label="Creativity Level" />
                                )}
                            />
                        </Box>


                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>Agent Name</Box>
                        <Controller
                            name="agentName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    variant="outlined"
                                    size='small'
                                    sx={{ mb: 2 }}
                                    error={!!errors.agentName}
                                    helperText={errors.agentName?.message}
                                />
                            )}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>Creator Name</Box>
                        <Controller
                            name="creatorName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    variant="outlined"
                                    size='small'
                                    sx={{ mb: 2 }}
                                    error={!!errors.creatorName}
                                    helperText={errors.creatorName?.message}
                                />
                            )}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>Select LLM Engine</Box>
                        <Controller
                            name="llmEngine"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    variant="outlined"
                                    size='small'
                                    sx={{ mb: 2 }}
                                    error={!!errors.llmEngine}
                                    helperText={errors.llmEngine?.message}
                                >
                                    <MenuItem value="openai-gpt-4">OpenAI GPT 4.0</MenuItem>
                                    <MenuItem value="openai-gpt-3.5">OpenAI GPT 3.5</MenuItem>
                                    <MenuItem value="cohere-command-xlarge">Cohere Command XLarge</MenuItem>
                                    <MenuItem value="anthropic-claude-2">Anthropic Claude 2</MenuItem>
                                    <MenuItem value="custom-llm">Custom LLM</MenuItem>
                                </TextField>
                            )}
                        />

                    </Grid>


                    <Grid item xs={12} md={12}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>Agent Bio</Box>
                        <Controller
                            name="agentBio"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    size='small'
                                    rows={1}
                                    sx={{ mb: 2 }}
                                    error={!!errors.agentBio}
                                    helperText={errors.agentBio?.message}
                                />
                            )}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>Greeting Message</Box>
                        <Controller
                            name="greetingMessage"
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    freeSolo
                                    options={greetingMessages}
                                    onChange={(event, value) => field.onChange(value)} 
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            size="small"
                                            sx={{ mb: 2 }}
                                            error={!!errors.greetingMessage}
                                            helperText={errors.greetingMessage?.message}
                                        />
                                    )}
                                />
                            )}
                        />

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>Responsive Instruction</Box>
                        <Controller
                            name="responsive_instruction"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    variant="outlined"
                                    size='small'
                                    multiline
                                    rows={2}
                                    sx={{ mb: 2 }}
                                    error={!!errors.responsive_instruction}
                                    helperText={errors.responsive_instruction?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1} direction="row">
                            <Button
                                className='hover:bg-gray-700'
                                size="large"
                                variant="contained"
                                sx={{ backgroundColor: '#e2e8f0', color: '#000' }}
                            >
                                cencel
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
        </Box>
    );
};

export default AgentMainSection;
