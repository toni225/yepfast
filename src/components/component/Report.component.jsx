import * as userService from '../../services/user.service'
import {useEffect, useMemo, useState} from "react";

import {Box, Modal, Button, Typography} from '@mui/material'

const ReportComponent = ({open, handleClose}) => {

    const [userParkingHistory,setUserParkingHistory] = useState([]);

    useMemo(()=>{
       userService.getParkingHistory(JSON.parse(localStorage.getItem('user')).username)
           .then(res=>setUserParkingHistory(res.data.response.data)).catch(e=>console.log(e))
    },[])

    // useEffect(()=>{
    //    console.log(userParkingHistory)
    // },[])
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
                width: 400,
                maxHeight: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                zIndex: 1000,
                overflowY: 'scroll'
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Parking History
                </Typography>
                <table className={'table-auto border-separate w-full'}>
                    <thead>
                    <tr>
                        <td>Parking ID</td>
                        <td>Parking Name</td>
                        <td className={'text-center'}>Actions</td>
                    </tr>
                    </thead>
                    <tbody>
                    {userParkingHistory.map(history=>{
                        return (
                            <tr className={'even:bg-gray-200'} key={history.ParkingID}>
                                <td>{history.ParkingID}</td>
                                <td>{history.ParkingDetails.ParkingName}</td>
                                <td className={'flex justify-center'}>
                                    <Button variant={'contained'} color={'error'}
                                        onClick={()=>console.log('reported: '+ history.ParkingID)}
                                    >Report</Button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

            </Box>
        </Modal>
    )
    // return (
    //     <div>{open && 'hello'}</div>
    // )
}

export default ReportComponent
