import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

function DeleteSlideshowDialog({ open, onClose, onDelete, slideshowToDelete}) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('confirmDeletion')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('areYouSureToDelete')} <strong>{slideshowToDelete.name}</strong> ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "secondary.main" }}>
          {t('cancel')}
        </Button>
        <Button onClick={() => onDelete(slideshowToDelete._id)} sx={{ color: "secondary.main" }}>
          {t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteSlideshowDialog;
