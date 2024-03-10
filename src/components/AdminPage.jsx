import {Box} from "@mui/material";

const AdminPage = () => {
  return (
      <div className={'flex min-h-screen flex-col justify-center'}>
          <div className={'flex justify-center'}>
                <Box>
                    Reports
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Parking Name</th>
                            <th>Reports</th>
                            <th>Action</th>
                        </tr>
                    </table>
                </Box>
          </div>
      </div>
  )
}

export default AdminPage
