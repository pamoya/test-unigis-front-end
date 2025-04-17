
import { Box, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

export const FloatingAddButton = (props) => {
    const { onNew } = props;
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }} class="button-add-point">
            <Fab color="primary" aria-label="add" onClick={() => onNew()}>
                <Add />
            </Fab>
        </Box>
    )
}