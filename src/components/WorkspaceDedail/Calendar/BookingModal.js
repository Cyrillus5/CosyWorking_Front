import {
  Button, Modal, Typography, Box, TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  format, getHours,
} from 'date-fns';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

function BookingModal({
  handleCloseBookingModal, isOpenBookingModal, workspaceId, bookings, host, totalPrice,
}) {
  const submitStatus = useSelector((state) => state.workspaces.submitStatus);
  const userName = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  //   const workspace = useSelector((state) => state.workspaces.workspaceToEdit);

  //   const [file, setFile] = useState(null);
  //   const [fileDataURL, setFileDataURL] = useState(mainImage.link);
  const dispatch = useDispatch();
  const [messageToSend, setMessageToSend] = useState(null);

  const handleChange = (event) => {
    setMessageToSend(event.target.value);
  };

  if (submitStatus === 'succeed') {
    navigate('/espace-perso/espace-coworker/mes-reservations');
    dispatch({
      type: 'BOOKING_SUBMIT_STATUS',
      submitStatus: null,
    });
  }

  if (submitStatus === 'fail') {
    handleCloseBookingModal();
  }
  // useEffect(() => {

  // }, [submitStatus]);

  //   const formatDate = (date) => {
  //     const day = getDate(date);
  //     const month = getMonth(date);
  //     const year = getYear(date);
  //     return `${day}/${month}/${year}`;
  //   };

  return (

    <Modal
      open={isOpenBookingModal}
      onClose={handleCloseBookingModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        component="form"
        onSubmit={(event) => {
          event.stopPropagation();
          event.preventDefault();
          if (localStorage.getItem('userToken')) {
            dispatch({
              type: 'SEND_NEW_BOOKING',
              payload: {
                workspace_id: workspaceId,
                date_list: bookings,
                receiverEmail: 'clement.duports@gmail.com',
                userPseudo: userName,
                message: messageToSend,
              },
            });
          }
          else {
            console.log('pas connecter');
            handleCloseBookingModal();
          }
          // eslint-disable-next-line no-console
          console.log('pouet!!!');
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h3">
          Validation de votre demande de reservation
        </Typography>
        <div className="bookingDatesModaleContainer">
          <h4 className="bookingDatesModaleContainer_title"> Dates:</h4>
          {
            bookings.map((booking) => (
              <p key={booking.start_date}>Le {format(new Date(booking.start_date), 'dd/MM/yy')} de {getHours(booking.start_date)}h à {getHours(booking.end_date)}h</p>
            ))
          }
        </div>

        <p>Total: {totalPrice}&euro;</p>
        <h4 className="bookingDatesModaleContainer_title"> Ecrivez un message a {host} pour l'avertire de votre arrivé</h4>
        <TextField
          id="outlined-multiline-flexible"
          label="Message"
          multiline
          maxRows={8}
          value={messageToSend}
          onChange={handleChange}
          placeholder="Message"
          required
        />

        {
            submitStatus !== 'pending'

        && (
        <Button
          variant="contained"
          size="small"
          type="submit"
          sx={{
            color: '#8A8A8A',
            margin: 1,
            width: '50%',
            // fontSize: 10,
            backgroundColor: '#FFC000',
            ':hover': {
              backgroundColor: '#8A8A8A',
              color: '#FFC000',
            },
          }}
        >Valider
        </Button>
        )
        }

        {
            submitStatus === 'pending'

        && (
        <LoadingButton loading variant="outlined">
          Submit
        </LoadingButton>
        )
        }

      </Box>
    </Modal>

  );
}

BookingModal.propTypes = {
  handleCloseBookingModal: PropTypes.func.isRequired,
  workspaceId: PropTypes.number.isRequired,
  isOpenBookingModal: PropTypes.bool.isRequired,
  host: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      host: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default BookingModal;

// import {
//     useParams,
//     useNavigate,
//     useLocation,
//   } from "react-router-dom";
