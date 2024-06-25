import { Modal, Typography, Box } from '@mui/material';

const OverlayModal = ({ open, onClose, children }) => (
  <Modal open={open} onClose={onClose}>
    <Box p={2} bgcolor="background.paper">
      <Typography variant="h6">{children}</Typography>
    </Box>
  </Modal>
);
