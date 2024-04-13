import MapDisplay from "../map/MapDisplay";
import { useEffect, useState } from "react";
import { getAllParking } from "../../services/user.service";
import Layout from "./Layout";

const ParkingPage = ({ socket }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await getAllParking();

    setData(response.data.users);
  };

  useEffect(() => {
    fetchData();
    console.log(socket);
  }, []);

  return (
    <Layout socket={socket}>
      <div>
        <MapDisplay data={data} page={"ParkingPage"} socket={socket} />
      </div>
    </Layout>
  );
};

export default ParkingPage;
