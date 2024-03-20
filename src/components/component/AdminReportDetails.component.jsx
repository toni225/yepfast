import {Box, Button, Modal, TextField} from "@mui/material";
import {toast} from "react-toastify";
import * as userService from "../../services/user.service";
import {useState, useMemo, useEffect} from "react";
import * as userServices from "../../services/user.service";

const AdminReportDetailsComponent = ({ParkingID}) => {
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
    const [reports, setReports] = useState([])

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // Function to ban parking based on report ID and parking ID
    const banParking = async (reportID, parkingID) => {
        try {
            if (window.confirm("Ban now?")) {
                userServices.removeParking(parkingID).then((res) => {
                    // console.log(res)
                    userServices.banParking(reportID).then(res => {
                        // console.log(res)
                        window.location.reload()
                    }).catch(e => console.log(e))
                }).catch(e => console.log(e))
            }
            console.log(reportID, parkingID)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        userService.getReports(ParkingID).then(res => {
            setReports(res.data.users)
        }).catch(e => console.log(e))
    }, [])

    return (
        <>
            <Button variant={'contained'} color={'info'} onClick={handleOpen}>Details</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{...style, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2}}>
                    <h2 id="child-modal-title">Parking Report Details</h2>
                    <Button variant={'outlined'}
                            onClick={() => console.log(`warning ${reports[0]?.ParkingID}`)}>Warning</Button>
                    <Button variant={'contained'} color={'error'}
                            onClick={() => banParking(reports[0]?.ReportID, reports[0]?.ParkingID)}>Ban</Button>
                    <div style={{height: '90%'}} className={'overflow-y-auto'}>
                        <table className={'table-auto border-collapse'}>
                            <thead className={'uppercase'}>
                            <tr>
                                <th scope={'col'} className="px-10 py-3">Reported by</th>
                                <th scope={'col'} className="px-10 py-3">Reason</th>
                                <th scope={'col'} className="px-10 py-3">Time</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reports.map(report => {
                                return (
                                    <tr key={report.ReportID}>
                                        <td>{report.username}</td>
                                        <td>{report.body}</td>
                                        <td>{new Date(report.created_at).toLocaleString('en-US', {
                                            dateStyle: 'long',
                                            timeStyle: 'short'
                                        })}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default AdminReportDetailsComponent
