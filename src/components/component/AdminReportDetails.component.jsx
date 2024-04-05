import {Box, Button, Modal, TextField} from "@mui/material";
import {toast} from "react-toastify";
import * as userService from "../../services/user.service";
import {useState, useMemo, useEffect} from "react";
import * as userServices from "../../services/user.service";

const AdminReportDetailsComponent = ({ ParkingID }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const [open, setOpen] = useState(false);
    const [reports, setReports] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        userService.getReports(ParkingID)
            .then(res => {
                setReports(res.data.users);
            })
            .catch(e => console.log(e));
    }, [ParkingID]);

    const banParking = async (reportID, parkingID) => {
        try {
            if (window.confirm("Ban now?")) {
                userService.removeParking(parkingID)
                    .then(() => {
                        userService.banParking(reportID)
                            .then(() => {
                                window.location.reload();
                            })
                            .catch(e => console.log(e));
                    })
                    .catch(e => console.log(e));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button variant={'contained'} color={'info'} onClick={handleOpen}>Details</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={style}>
                    <h2 id="child-modal-title">Parking Report Details</h2>
                    <div className='bg-gray-800' style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        {reports
                        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                        .map((report, index) => (
                            <div key={report.ReportID} className="font-['Inconsolata'] text-white bg-gray-800 p-6 mb-4">
                                <h3 className="text-lg font-semibold mb-2">Report No. {index + 1}</h3>
                                <div className="space-y-2">
                                    <p><strong>Reported By:</strong> {report.username}</p>
                                    <p><strong>Time:</strong> {new Date(report.created_at).toLocaleString('en-US', {
                                        dateStyle: 'long',
                                        timeStyle: 'short'
                                    })}</p>
                                    <p><strong>Reason:</strong> {report.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-6 flex justify-end">
                        <Button variant="contained" onClick={handleClose} style={{ marginRight: '10px' }}>Close</Button>
                        <Button variant="contained" color="warning" onClick={() => console.log(`warning ${reports[0]?.ParkingID}`)} style={{ marginRight: '10px' }}>Warning</Button>
                        <Button variant="contained" color="error" onClick={() => banParking(reports[0]?.ReportID, reports[0]?.ParkingID)}>Ban</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default AdminReportDetailsComponent;