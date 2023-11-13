import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { slideshowService } from "../../../services/SlideshowService";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSlideshowDialog from "../../dialogs/DeleteSlideshowDialog";
import AddSlideshowDialog from "../../dialogs/AddSlideshowDialog";
import { useEffect } from "react";

function SlideshowList(props) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [slideshowToDelete, setSlideshowToDelete] = useState({});

  async function AddSlideshow(name) {
    const data = { name: name };
    await slideshowService.createSlideshow(data).then((data) => {

      props.setSlideshows([...props.slideshows, data.data.slideshow]);
      closeDialog();
    });
  }

  function openDeleteDialog(slideshow) {
    setDeleteDialogOpen(true);
    setSlideshowToDelete(slideshow);
  }

  async function deleteSlideshow(eventToDelete) {
    await slideshowService.deleteSlideshow(eventToDelete).then((data) => {
      props.setSlideshows(
        props.slideshows.filter((slideshow) => slideshow._id !== eventToDelete)
      );
      closeDialog();
      setSlideshowToDelete({});
    });
  }

  function closeDialog() {
    setDeleteDialogOpen(false);
    setAddDialogOpen(false);
  }

  return (
    <>
      <Grid item xs={12}>
        <Paper className="mainPaperPage">
          <Stack className="herderTitlePage">
            <Box className="headerLeft">
              <IconButton disabled className="headerButton">
                <FolderIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: "text.primary" }}
                className="headerTitle"
              >
                {t("Slideshow")}
              </Typography>
            </Box>
            <Box className="headerRight">
              <IconButton
                className="headerButton"
                onClick={() => {
                  setAddDialogOpen(true);
                }}
              >
                <AddIcon sx={{ color: "secondary.main" }} />
              </IconButton>

              {/*  <input
              type="file"
              id="inputFile"
              style={{ display: "none" }}
              onChange={goToCrop}
            /> */}
            </Box>
          </Stack>
            {props.slideshows ? (
              <Box className="containerPage">
                {props.slideshows.map((slideshow) => (
                  <Table size="big" key={slideshow._id}>
                    <TableBody>
                      <TableRow hover>
                        <TableCell
                          onClick={(e) => {
                            e.stopPropagation();
                            props.setSlideshow(slideshow);
                          }}
                        >
                          {slideshow.name}
                        </TableCell>
                        <TableCell sx={{ p: 0 }} align="right">
                          <IconButton
                            sx={{ p: 0 }}
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteDialog(slideshow);
                            }}
                          >
                            <DeleteIcon
                              sx={{ fontSize: 15, color: "secondary.main" }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ))}
              </Box>
            ) : (
              <Box className="infoPage">
                <Typography sx={{ color: "text.secondary" }}>
                  {t("slideshowListEmptyText")}
                </Typography>
              </Box>
            )}

        </Paper>
      </Grid>
      <DeleteSlideshowDialog
        open={deleteDialogOpen}
        onClose={closeDialog}
        onDelete={deleteSlideshow}
        slideshowToDelete={slideshowToDelete && slideshowToDelete}
      />
      <AddSlideshowDialog
        open={addDialogOpen}
        onClose={closeDialog}
        AddSlideshow={AddSlideshow}
      />
    </>
  );
}

export default SlideshowList;
