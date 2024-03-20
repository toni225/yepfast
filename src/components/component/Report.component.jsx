import * as userService from '../../services/user.service'
import {useEffect, useMemo, useState} from "react";

import {Box, Modal, Button, Typography, TextField} from '@mui/material'
import {toast} from "react-toastify";


function ChildModal({history}) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState("")
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {history.reported ?
                <Button disabled variant={'contained'}>Reported</Button> :
                <Button variant={'contained'} color={'error'} onClick={handleOpen}>Report</Button>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{...style, width: 400, display: 'flex', flexDirection: 'column', gap: 2}}>
                    <h2 id="child-modal-title">Reporting {history.ParkingDetails.ParkingName}</h2>
                    <TextField
                        multiline
                        rows={4}
                        label={'Reason'}
                        onChange={e => setReason(e.target.value)}
                    />
                    <div className={'flex justify-end gap-2'}>
                        <Button onClick={() => {
                            if (reason.length == 0) return toast.warning('Please enter reason');

                            userService.addReport({
                                username: history.username,
                                ParkingID: history.ParkingID,
                                body: reason
                            })
                                .then(() => {
                                    userService.addParkingHistory({
                                        HistoryID: history.HistoryID,
                                        reported: true
                                    }).then(() => {
                                        toast.success(`${history.ParkingDetails.ParkingName} is Reported!`)
                                        handleClose()
                                        setTimeout(() => window.location.reload(), 3000)
                                    }).catch(e => console.log(e))

                                })
                                .catch(e => {
                                    console.log(e)
                                    toast.error("Error.")
                                })
                        }} variant={'contained'} color={'error'}>Report</Button>
                        <Button onClick={handleClose} variant={'outlined'}>Cancel</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}


const ReportComponent = ({open, handleClose}) => {

    const [userParkingHistory, setUserParkingHistory] = useState([]);

    useMemo(() => {
        userService.getParkingHistory(JSON.parse(localStorage.getItem('user'))?.username)
            .then(res => setUserParkingHistory(res.data.response.data)).catch(e => console.log(e))
    }, [])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70%',
                height: '50%',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                // overflow: 'auto'
                // overflowY: 'scroll'
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Parking History
                </Typography>
                <div style={{height: '90%'}} className={'overflow-y-auto'}>
                    <table className={'table-auto border-separate w-full'}>
                        <thead className={'sticky top-0 bg-white z-10'}>
                        <tr>
                            <th>Parking ID</th>
                            <th>Parking Name</th>
                            <th>Time</th>
                            <th className={'text-center'}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userParkingHistory.map((history, index) => {
                            return (
                                <tr className={'even:bg-gray-200'} key={index}>
                                    <td className={'text-center'}>{history.ParkingID}</td>
                                    <td className={'text-center'}>{history.ParkingDetails.ParkingName}</td>
                                    <td className={'text-center'}>{new Date(history.created_at).toLocaleString('en-US', {
                                        dateStyle: 'long',
                                        timeStyle: 'short'
                                    })}</td>
                                    <td className={'flex justify-center'}>
                                        <ChildModal history={history}/>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

            </Box>
        </Modal>
    )
}


export default ReportComponent
