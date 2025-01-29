import React from 'react';
import {
    Button,
    Typography,
    Box,
    Grid,
    TextField,
    Stack,
    MenuItem,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const ArrDeployType = [
    'Weebly',
    'Wordpress',
    'Wix',
    'Shopify',
    'SquareSpace',
    'Webflow',
    'Slack',
    'Discord',
    'WhatsApp',
];

const schema = Yup.object({
    deploy_plateforms: Yup.string().nullable().required('Please select a deploy platform.'),
});

const AgentDeploy = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            deploy_plateforms:'',
        },
    });
    //  const onSubmit = (data) => {
    //         const formData = {
    //             ...data,
    //             avatar: preview,
    //         };
    
    //         const prevData = localStorage.getItem("agentFormData");
    //         let updatedData;
    
    //         if (prevData) {
    //             const parsedData = JSON.parse(prevData);
    //             updatedData = Array.isArray(parsedData) ? [...parsedData, formData] : [parsedData, formData];
    //         } else {
    //             updatedData = [formData];
    //         }
    
    //         localStorage.setItem("agentFormData", JSON.stringify(updatedData));
    //         toast.success("Form Data Saved to LocalStorage");
    //         reset(); // This clears the form fields
    //         setPreview(null);
    //     };
    const onSubmit = (data) => {
        console.log('Form Data:', data);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Grid item xs={12}>
                <Typography
                    variant="subtitle1"
                    sx={{ mb: 3, fontWeight: 600, textAlign: 'left' }}
                >
                    Deploy Your Agent
                </Typography>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start',
                            }}
                        >
                            Deploy Platforms
                        </Box>
                        <Controller
                            name="deploy_plateforms"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    sx={{ mb: 2 }}
                                    error={!!errors.deploy_plateforms}
                                    helperText={errors.deploy_plateforms?.message}
                                >
                                    {ArrDeployType.map((item, idx) => (
                                        <MenuItem key={idx} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1} direction="row">
                            <Button
                                className="hover:bg-gray-700"
                                type="submit"
                                size="large"
                                variant="contained"
                                sx={{ backgroundColor: '#1e293b', color: '#fff' }}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AgentDeploy;
