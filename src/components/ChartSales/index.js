import { PieChart } from "@mui/x-charts/PieChart";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export const ChartSales = (props) => {
    const { dataSales } = props;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid spacing={12}>
                    <Item size={12}>
                        <div className="title-chart">
                            Total de Ventas por Zona
                        </div>
                        <PieChart
                            title="Total de Ventas por Zona"

                            series={[
                                {
                                    data: dataSales,
                                },
                            ]}
                            width={600}
                            height={300}
                        />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}