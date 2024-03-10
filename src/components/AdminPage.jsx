import * as userServices from '../services/user.service'

import {Box} from "@mui/material";

import {useEffect, useState} from "react";

const AdminPage = () => {
    const [reports,setReports] = useState([])

    const fetchUser = async () => {
        try{
            const {data: {users}} = await userServices.getAllReports()
            setReports(users)
            // console.log(users)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        fetchUser()
        // console.log(reports)
    },[])

  return (
      <div className={'mt-20 flex justify-center'}>
          <div className={'flex justify-center'}>
                <Box>
                    Reports
                    <table className={'table-auto border-separate'}>
                        <thead className={'uppercase'}>
                            <tr>
                                <th scope={'col'} className="px-6 py-3">ID</th>
                                <th scope={'col'} className="px-6 py-3">Parking Name</th>
                                <th scope={'col'} className="px-6 py-3">Reports</th>
                                <th scope={'col'} className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map(report=> {
                                return (
                                    <tr className={'border-b '} key={report.ParkingID}>
                                        {/*            <tr className={'bg-white border-b '}>*/}
                                        <th scope={'row'}>
                                            {report.ParkingID}
                                            {/*1*/}
                                        </th>
                                        <td>{report.ParkingDetails.ParkingName}</td>
                                        {/*<td>etet</td>*/}
                                        {/*<td>etet</td>*/}
                                        {/*<td>etet</td>*/}
                                        <td>{report.count}</td>
                                        <td>Warning Ban</td>
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
