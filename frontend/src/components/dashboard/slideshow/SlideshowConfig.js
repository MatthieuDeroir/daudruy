import React, { useEffect } from "react";
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { mediaService } from "../../../services/MediaServices";
import { slideshowService } from "../../../services/SlideshowService";
import { ReactSortable } from "react-sortablejs";

function SlideshowConfig(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const sortedMedia = [...props.slideshow.media].sort(
    (a, b) => a.order - b.order
  );

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleUpload = () => {
    document.getElementById("inputFile").click();
    handleCloseMenu();
  };

  async function uploadMedia(event) {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;

    const id = props.slideshow.id;
    try {
      const acceptedFormats = [
        "video/mp4",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ];
      if (!acceptedFormats.includes(file.type)) {
        throw new Error(
          `Invalid file type ${file.type}. Only accept ${acceptedFormats.join(
            ", "
          )}`
        );
      }

      const mediaType = file.type.startsWith("image") ? "image" : "video";
      const data = await mediaService.uploadMedia(file, id);

      const newMedia = {
        ...data.media,
        type: mediaType,
      };
      const updatedMediaList = [...props.slideshow.media, newMedia];
      console.log("updatedMediaList", updatedMediaList);
      props.setSlideshow({
        ...props.slideshow,
        media: updatedMediaList,
      });
    } catch (error) {
      console.error("Upload error", error);
    }
  }
  function handleDurationChange(event, mediaId) {
    const newDuration = event.target.value;

    slideshowService.updateSlideshowMedia(
      props.slideshow.id,
      mediaId,
      newDuration
    );

    const updatedMediaList = props.slideshow.media.map((media) => {
      if (media.id === mediaId) {
        return { ...media, duration: newDuration };
      }
      return media;
    });
    props.setSlideshow({ ...props.slideshow, media: updatedMediaList });
  }

  function handleOrderChange(newOrder) {
    const newOrderWithId = newOrder.map((media, index) => ({
      ...media,
      order: index,
    }));
    mediaService.updateOrder(newOrderWithId);
    props.setSlideshow({ ...props.slideshow, media: newOrderWithId });
  }

  function deleteMedia(mediaToDelete) {
    console.log(mediaToDelete);
    mediaService.deleteMedia(mediaToDelete.id).then(() => {
      const updatedMediaList = props.slideshow.media.filter(
        (media) => media.id !== mediaToDelete.id
      );
      props.setSlideshow({ ...props.slideshow, media: updatedMediaList });
    });
  }

  function addPanel() {
    mediaService.addPanel(props.slideshow.id).then((data) => {
      console.log(data);
      const updatedMediaList = [...props.slideshow.media, data.media];
      props.setSlideshow({
        ...props.slideshow,
        media: updatedMediaList,
      });
    });
    handleCloseMenu();
  }

  return (
    <>
      <Grid item xs={12}>
        <Paper className="mainPaperPage">
          <Stack className="herderTitlePage">
            <Box className="headerLeft">
              <IconButton
                className="headerButton"
                onClick={() => {
                  props.setSlideshow(null);
                }}
              >
                <CloseIcon sx={{ color: "secondary.main" }} />
              </IconButton>
              <IconButton disabled className="headerButton">
                <ImageIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: "text.primary" }}
                className="headerTitle"
              >
                {props.slideshow.name}
              </Typography>
            </Box>
            <Box className="headerRight">
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleOpenMenu}
                className="headerButton"
              >
                <AddIcon sx={{ color: "secondary.main" }} />
              </IconButton>
              <input
                type="file"
                id="inputFile"
                style={{ display: "none" }}
                onChange={(event) => {
                  event.preventDefault();
                  uploadMedia(event);
                }}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleUpload();
                  }}
                >
                  Upload
                </MenuItem>
                <MenuItem onClick={addPanel}>Panneau</MenuItem>
              </Menu>
            </Box>
          </Stack>
          <Box
            className="containerPage"
            sx={{
              paddingLeft: { xs: 2 },
              paddingRight: { xs: 2 },
            }}
          >
            <TableContainer>
              <Table sx={{ borderCollapse: "separate", borderSpacing: 0 }}>
                <TableBody>
                  <ReactSortable list={sortedMedia} setList={handleOrderChange}>
                    {sortedMedia.map((media, index) => (
                      <TableRow sx={{ width: "100%" }} key={index}>
                        <TableCell
                          sx={{
                            borderBottom: 0,
                            p: 0,
                            textAlign: "center",
                            width: "50%",
                          }}
                        >
                          {media.type.split("/")[0] === "video" ? (
                            <Box
                              component="video"
                              sx={{
                                minHeight: "calc(8vh)",
                                minWidth: "calc(16vh)",
                                maxWidth: "calc(16vh)",
                                maxHeight: "calc(8vh)",
                              }}
                              alt={media.originalFilename}
                              src={media.path}
                            />
                          ) : media.type.split("/")[0] === "image" ? (
                            <Box
                              component="img"
                              sx={{
                                minHeight: "calc(8vh)",
                                minWidth: "calc(16vh)",
                                maxWidth: "calc(16vh)",
                                maxHeight: "calc(8vh)",
                              }}
                              alt={media.originalFilename}
                              src={media.path}
                            />
                          ) : (
                            "Panneau"
                          )}
                        </TableCell>
                        <TableCell sx={{ width: "40%" }} p={0}>
                          <TextField
                            value={media.duration}
                            onChange={(e) => handleDurationChange(e, media.id)}
                            size="small"
                            type="number"
                            disabled={media.type.split("/")[0] === "video"}
                            inputProps={{ min: 0, max: 999 }}
                            style={{ width: "90px" }}
                          />
                        </TableCell>
                        <TableCell p={0} sx={{ width: "10%" }}>
                          <IconButton
                            sx={{ p: 0 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMedia(media);
                            }}
                          >
                            <DeleteIcon sx={{ color: "secondary.main" }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </ReactSortable>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}

export default SlideshowConfig;
