import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Avatar, Rating, Grid } from '@mui/material';

const AgentReview = () => {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: 'Alice Johnson',
            avatar: 'https://i.pravatar.cc/150?img=1',
            rating: 4,
            comment: 'Great product! Highly recommend it.',
        },
        {
            id: 2,
            name: 'John Smith',
            avatar: 'https://i.pravatar.cc/150?img=2',
            rating: 5,
            comment: 'Excellent service and quality!',
        },
    ]);

    const [newReview, setNewReview] = useState({
        name: '',
        rating: 0,
        comment: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newReview.name && newReview.comment && newReview.rating) {
            setReviews([
                ...reviews,
                {
                    id: reviews.length + 1,
                    ...newReview,
                    avatar: `https://i.pravatar.cc/150?img=${reviews.length + 3}`,
                },
            ]);
            setNewReview({ name: '', rating: 0, comment: '' });
        }
    };

    return (
        <Grid container spacing={2} className="p-3">
            <Grid item xs={12} md={12}>


                <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600, textAlign: 'left' }}>
                    Customer Review
                </Typography>


                <Box className="space-y-6 mb-4">
                    {reviews.map((review) => (
                        <Box
                            key={review.id}
                            className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm"
                            sx={{
                                textAlign: 'left',
                            }}
                        >
                            <Avatar
                                src={review.avatar}
                                alt={review.name}
                                sx={{
                                    width: 40,
                                    height: 40,
                                }}
                            />
                            <Box>
                                <Typography
                                    variant="subtitle1"
                                    className=" font-medium capitalize "
                                    sx={{
                                        fontWeight: '600',
                                        textAlign: 'left',
                                        mb: 1,
                                    }}
                                >
                                    {review.name}
                                </Typography>
                                <Box sx={{ textAlign: 'left', display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Rating value={review.rating} readOnly />
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        textAlign: 'left',
                                    }}
                                >
                                    {review.comment}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>


                {/* Add Review Form */}
                <Box component="form" onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-sm">
                    <Typography variant="subtitle1" xs={{ fontWeight: '600', }} className=" flex align-start" mb={3}>
                        Leave a Review
                    </Typography>

                    <TextField
                        fullWidth
                        label="Your Name"
                        variant="outlined"
                        className="mb-8"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    />

                    <Rating
                        name="rating"
                        value={newReview.rating}
                        onChange={(e, newValue) => setNewReview({ ...newReview, rating: newValue })}
                        style={{ marginBottom: '1rem', marginTop: '1rem', display: 'flex', alignItems: 'left' }}

                    />

                    <TextField
                        fullWidth
                        label="Your Review"
                        variant="outlined"
                        multiline
                        rows={4}
                        className="mb-6"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        style={{ marginBottom: '1rem' }}
                    />

                    <Button variant="contained"
                        className='hover:bg-gray-700 w-full'
                        sx={{ backgroundColor: '#1e293b', color: '#fff' }}
                        type="submit" >
                        Submit Review
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default AgentReview;
