import Header from "@/libs/header"
import Sidebar from "@/libs/sidebar"
import Toolbar from "@/libs/toolbar"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
export default function Layout({ children }: any) {
    const router = useRouter()
    useEffect(() => {
        document.body.setAttribute("data-kt-app-layout", "dark-sidebar")
        document.body.setAttribute("data-kt-app-header-fixed", "true")
        document.body.setAttribute("data-kt-app-sidebar-enabled", "true")
        document.body.setAttribute("data-kt-app-sidebar-fixed", "true")
        document.body.setAttribute("data-kt-app-sidebar-hoverable", "true")
        document.body.setAttribute("data-kt-app-sidebar-push-header", "true")

        document.body.setAttribute("data-kt-app-sidebar-push-toolbar", "true")
        document.body.setAttribute("data-kt-app-sidebar-push-footer", "true")
        document.body.setAttribute("data-kt-app-toolbar-enabled", "true")

        document.body.setAttribute("class", "app-default")
    }, [])


    return (
        <>
            <div className="page-loader flex-column">
                <span className="spinner-border text-primary" role="status"></span>
                <span className="text-muted fs-6 fw-semibold mt-5">Loading...</span>
                <span className="spinner-border text-primary" role="status"></span>
                <span className="text-muted fs-6 fw-semibold mt-5">Loading...</span>
            </div>

            < div className="d-flex flex-column flex-root app-root">
                <div className="app-page flex-column flex-column-fluid">
                    <Header />
                    <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                        <Sidebar />
                        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                            <div className="d-flex flex-column flex-column-fluid">
                                <Toolbar />
                                <div className="app-content flex-column-fluid">
                                    <div className="app-container container-fluid">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >


            <ToastContainer />

        </>
    )
}