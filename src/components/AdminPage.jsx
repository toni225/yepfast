import * as userServices from '../services/user.service'

import {Box, Button} from "@mui/material";

import {useEffect, useState} from "react";
import AdminReportDetailsComponent from "./component/AdminReportDetails.component";

const AdminPage = () => {
    const [reports, setReports] = useState([])

    const groupParking = reports.reduce((r,i)=>{
        const parkingID = i.ParkingID
        if(!r[parkingID]){
            r[parkingID] = []
        }
        r[parkingID].push(i)
        return r
    },[])

    const fetchUser = async () => {
        try {
            const {data: {users}} = await userServices.getAllReports()
            setReports(users)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className={'mt-20 flex justify-center'}>
            <div className={'flex justify-center'}>
                <Box>
                    Reports
                    <table className={'table-auto border-collapse'}>
                        <thead className={'uppercase'}>
                        <tr>
                            <th scope={'col'} className="px-10 py-3">ID</th>
                            <th scope={'col'} className="px-10 py-3">Parking Name</th>
                            <th scope={'col'} className="px-10 py-3">Reports</th>
                            <th scope={'col'} className="px-16 py-3">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{reports.map(report => {*/}
                        {/*    return (*/}
                        {/*        <tr className={'hover:bg-gray-300 border-b border-slate-400'} key={report.ReportID}>*/}
                        {/*            /!*        <tr className={'border-b '} onClick={e=>console.log(e.target.rowIndex)}>*!/*/}
                        {/*            <th scope={'row'}>*/}
                        {/*                {report.ParkingID}*/}
                        {/*                /!*1*!/*/}
                        {/*            </th>*/}
                        {/*            <td className={'text-center'}>{report.ParkingDetails.ParkingName}</td>*/}
                        {/*            /!*<td>etet</td>*!/*/}
                        {/*            /!*<td>etet</td>*!/*/}
                        {/*            /!*<td>etet</td>*!/*/}
                        {/*            <td className={'text-center'}>{report.count}</td>*/}
                        {/*            <td className={'flex gap-2 justify-center'}>*/}
                        {/*                <Button variant={'outlined'}*/}
                        {/*                        onClick={() => console.log(`warning ${report.ParkingID}`)}>Warning</Button>*/}
                        {/*                <Button variant={'contained'}*/}
                        {/*                        onClick={() => banParking(report.ReportID, report.ParkingID)}>Ban</Button>*/}
                        {/*            </td>*/}
                        {/*        </tr>*/}
                        {/*    )*/}
                        {/*})}*/}
                        {groupParking.sort((a,b)=>b.length-a.length).map(i=>{
                            return (
                                <tr className={'hover:bg-gray-300 border-b border-slate-400'} key={i[0].ReportID}>
                                    <th scope={'row'}>
                                        {i[0].ParkingID}
                                    </th>
                                    <td className={'text-center'}>{i[0].ParkingDetails.ParkingName}</td>
                                    <td className={'text-center'}>{i.length}</td>
                                    <td className={'flex gap-2 justify-center'}>
                                        <AdminReportDetailsComponent ParkingID={i[0].ParkingID}/>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </Box>
            </div>
        </div>
    )
}

export default AdminPage
