import React from "react";
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
    if (event.target.files[0] !== undefined) {
      if (event.target.files[0].type === "video/mp4") {
        const id = props.slideshow._id;
        await mediaService
          .uploadMedia(event.target.files[0], id)
          .then((data) => {
            var newMedia = data;
            newMedia.type = "video";
            const updatedMediaList = [...props.slideshow.media, newMedia];
            props.setSlideshow({
              ...props.slideshow,
              media: updatedMediaList,
            });
          })
          .catch((error) => {
            console.error("Upload error", error);
          });
      } else if (
        event.target.files[0].type === "image/png" ||
        event.target.files[0].type === "image/jpeg" ||
        event.target.files[0].type === "image/jpg"
      ) {
        const id = props.slideshow._id;
        await mediaService
          .uploadMedia(event.target.files[0], id)
          .then((data) => {
            var newMedia = data;
            newMedia.type = "image";
            const updatedMediaList = [...props.slideshow.media, newMedia];
            props.setSlideshow({
              ...props.slideshow,
              media: updatedMediaList,
            });
          })
          .catch((error) => {
            console.error("Upload error", error);
          });
      }
    }
  }

  function handleDurationChange(event, mediaId) {
    const newDuration = event.target.value;

    slideshowService.updateSlideshowMedia(
      props.slideshow._id,
      mediaId,
      newDuration
    );

    const updatedMediaList = props.slideshow.media.map((media) => {
      if (media._id === mediaId) {
        return { ...media, duration: newDuration };
      }
      return media;
    });
    props.setSlideshow({ ...props.slideshow, media: updatedMediaList });
  }

  function handleOrderChange(newOrder) {
    console.log(newOrder);
    props.setSlideshow({ ...props.slideshow, media: newOrder });

    const updatedOrder = newOrder.map((media, index) => ({
      mediaId: media._id,
      newPosition: index,
    }));
    console.log("updatedOrder", updatedOrder);

    slideshowService
      .updateMediaOrder(props.slideshow._id, updatedOrder)
      .then((response) => {
        console.log("Order updated in the database", response);
      })
      .catch((error) => {
        console.error("Error updating order", error);
      });
  }
  function deleteMedia(mediaToDelete) {
    slideshowService
      .deleteMedia(props.slideshow._id, mediaToDelete._id)
      .then(() => {
        const updatedMediaList = props.slideshow.media.filter(
          (media) => media._id !== mediaToDelete._id
        );
        props.setSlideshow({ ...props.slideshow, media: updatedMediaList });
      });
  }

  function addPanneau() {
    slideshowService.addPanneau(props.slideshow._id).then((data) => {
      console.log("addPanneau", data);
      props.setSlideshow(data);
      console.log("data addPanneau", data.data.newMedia);
      const updatedMediaList = [...props.slideshow.media, data.data.newMedia];
      console.log("updatedMediaList", updatedMediaList);
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
                <MenuItem onClick={addPanneau}>Panneau</MenuItem>
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
                  <ReactSortable
                    list={props.slideshow.media}
                    setList={handleOrderChange}
                  >
                    {props.slideshow.media.map((media, index) => (
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
                            onChange={(e) => handleDurationChange(e, media._id)}
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
