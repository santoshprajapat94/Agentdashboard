import React from 'react';
import {
    Button,
    Typography,
    Grid,
    Stack,
    FormControlLabel,
    Checkbox,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

const checkboxOptions = [
    {
        label: 'Image Generation',
        knowMore: 'Know more about image generation',
        description: 'Enable high-quality image generation capability for your agent.',
        value: 'imageGeneration',
    },
    {
        label: 'Web Browsing',
        knowMore: 'Know more about web browsing',
        description: 'Enable web browsing for your agent to fetch real-time online data.',
        value: 'webBrowsing',
    },
    {
        label: 'Search Engine',
        knowMore: 'Know more about search engine',
        description: "Allow your agent to search real-time information on the internet.",
        value: 'searchEngine',
    },
    {
        label: 'Text Extraction',
        knowMore: 'Know more about text extraction',
        description: "Enable text reading from images with OCR capabilities.",
        value: 'textExtraction',
    },
    {
        label: 'Lead Generation',
        knowMore: 'Know more about lead generation',
        description: "Allow the agent to collect customer information like name, email, etc.",
        value: 'leadGeneration',
    },
    {
        label: 'Advanced Tool',
        knowMore: 'Know more about advanced tools',
        description: "Create new tools programmatically with advanced features.",
        value: 'advancedTool',
    },
];

const schema = Yup.object({
    selectedCheckboxes: Yup.array()
        .min(1, 'At least one option must be selected.')
        .of(Yup.string()),
});

const AgentAction = ({setAgentData,agentData,setTab}) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            selectedCheckboxes: [],
        },
    });
    const onSubmit = (data) => {
                setAgentData({...data,...agentData})
                toast.success('add Knowledge section successfully')
                reset(); 
                setTab(3);
        // console.log('Selected Options:', data.selectedCheckboxes);
    };
      console.log('Selected Options:', agentData);

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600, textAlign: 'left' }}>
                    Agent Actions
                </Typography>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {checkboxOptions.map((option, index) => (
                            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', mb: 2 }}>
                                <Controller
                                    name="selectedCheckboxes"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={value.includes(option.value)}
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        const newValue = checked
                                                            ? [...value, option.value]
                                                            : value.filter((v) => v !== option.value);
                                                        onChange(newValue);
                                                    }}
                                                />
                                            }
                                            label={option.label}
                                        />
                                    )}
                                />
                                <Accordion className='w-full'>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>{option.knowMore}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>{option.description}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        ))}
                        {errors.selectedCheckboxes && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {errors.selectedCheckboxes.message}
                            </Typography>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={1} direction="row">
                            <Button
                                size="large"
                                variant="contained"
                                sx={{ backgroundColor: '#e2e8f0', color: '#000' }}
                            >
                                Previous
                            </Button>
                            <Button
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

export default AgentAction;
