import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userServices from "../services/user.service";
import Layout from "./layout/Layout";

const AdminPage = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);

    // Function to fetch reports from the server
    const fetchReports = async () => {
        try {
            const { data: { users } } = await userServices.getAllReports();
            setReports(users);
        } catch (error) {
            console.error(error);
        }
    };

    // Function to ban parking based on report ID and parking ID
    const banParking = async (reportID, parkingID) => {
        try {
            if (window.confirm("Ban now?")) {
                await userServices.banParking(reportID);
                await userServices.removeParking(parkingID);
                window.location.reload(); // This might not be the best way to refresh the page
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <Layout>
            <div id="entire-container">
                <ul className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6 p-10">
                    {/* Mapping through each report to display */}
                    {reports.map(report => (
                        <li key={report.ReportID} className="bg-Admin-Secondary text-gray-800 w-[300px] h-auto text-left mx-auto rounded-md relative transition-transform duration-300 transform hover:scale-110">
                            <div className="px-3 py-2">
                                {/* Displaying Parking Name */}
                                <div className="py-2 overflow-ellipsis truncate text-2xl">{report.ParkingDetails.ParkingName}</div>
                                {/* Displaying Parking ID */}
                                <div className="py-2 text-xs">{`ID: ${report.ParkingID}`}</div>
                                {/* Displaying number of reports */}
                                <div className="py-2 text-xs">{`Reports: ${report.count}`}</div>
                                {/*Displaying description*/}
                                <div className="w-[217px] h-[108px] text-white text-xs font-normal font-['Poppins']">“The parking owner didn’t follow his set price on the site. A friend of mine also complained that he also got forced to pay otherwise the parking owner threatened to sue him for trespassing.”</div>
                                {/* Action buttons */}
                                <div className="flex justify-between mt-3">
                                    <Button variant="outlined" sx={{ bgcolor: '#F9D94A', color: 'black' }} onClick={() => console.log(`warning ${report.ParkingID}`)}>Warning</Button>
                                    <Button variant="contained" sx={{ bgcolor: '#F94A4A', color: 'black' }}  onClick={() => banParking(report.ReportID, report.ParkingID)}>Ban</Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default AdminPage;
