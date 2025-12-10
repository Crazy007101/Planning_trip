import {Container, Typography} from "@mui/material";

export default function HeroSection() {
    return (
        <Container sx={{ py: 4, bgcolor: 'tomato' }}>
            <Typography variant="h5">Hello world!</Typography>
        </Container>
    );
}