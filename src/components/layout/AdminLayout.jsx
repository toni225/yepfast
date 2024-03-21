import AdminAppBar from "./AdminAppBar";

const AdminLayout = ({children}) => {
    return (
        <>
            <AdminAppBar/>
            {children}
        </>
    )
}

export default AdminLayout
