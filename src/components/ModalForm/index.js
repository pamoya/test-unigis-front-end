import { Box, Modal } from "@mui/material";

import { RegisterForm } from "../RegisterForm";

export const ModalForm = (props) => {
    const { open, handleOnClose, isNew, data, onlyPoint, reloadAndClose } = props;
    return (
        <Modal
            open={open}
            onClose={handleOnClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ width: 400 }} class="modal-container-manual">
                <h2 id="parent-modal-title">{isNew ? "Nuevo punto de venta" : "Editar punto de venta"}</h2>
                <p id="parent-modal-description">
                    <RegisterForm isNew={isNew} data={data} onlyPoint={onlyPoint} reloadAndClose={reloadAndClose}/>
                </p>
            </Box>
        </Modal>
    )
}