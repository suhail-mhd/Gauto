import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { Grid } from "swiper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function District() {
  const [place, setPlace] = useState("");
  const [districtData, SetDistrictData] = useState([]);
  const [disSortedData, setDisSortedData] = useState([]);
  const dispatch = useDispatch();

  // redux
  dispatch({
    type: "districtsort",
    payload: disSortedData,
  });

  //

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = async (dis) => {
    console.log(dis);

    try {
      axios
        .post("/api/user/searchdistrict", { place: dis })
        .then((res) => {
          // console.log(res.data.data);
          setDisSortedData(res.data.data);
        });
      setOpen(false);
    } catch (error) {}
  };

  const getDistict = () => {
    try {
      axios.get("/api/user/getdistrict").then((res) => {
        SetDistrictData(res.data.Getdistrict);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDistict();
  }, []);
  return (
    <div>
      <Box sx={{ minWidth: 120, marginTop: 3 }}>
      <div className="d-flex">
      <span className=" d-flex align-items-center">
              <i class="ri-sort-asc"></i> Sort By
            </span>
        <Button style={{ marginLeft: 120 }} onClick={handleOpen}>
          District
        </Button>
      </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {districtData.map((obj) => {
              return (
                <Button
                  onClick={() => handleChange(`${obj.district}`)}
                  style={{ color: "black" }}
                >
                  {obj.district}
                </Button>
              );
            })}
          </Box>
        </Modal>
      </Box>
    </div>
  );
}

export default District;
