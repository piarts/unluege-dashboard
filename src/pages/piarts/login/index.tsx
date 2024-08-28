import BgImage from "@/assets/media/bg9.jpg"
import { useRouter } from "next/router"
import { useEffect } from "react"
function Index() {
    const router = useRouter()

    const Singin = () => {
        window.localStorage.setItem("login", "piarts")
        router.push("/piarts/")
    }

    useEffect(() => {
        window.localStorage.getItem("login") !== null && router.push("/piarts/login")
    }, [router])
    return (
        <>
            <div className="d-flex flex-column flex-root" id="kt_app_root">
                <div className="d-flex flex-column flex-lg-row flex-column-fluid">
                    <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
                        <div className="d-flex flex-center flex-column flex-lg-row-fluid" style={{ height: "800px" }}>
                            <div className="w-lg-500px p-10">
                                <div className="form w-100">
                                    <div className="text-center mb-11">
                                        <h1 className="text-gray-900 fw-bolder mb-3">Hoş Geldiniz</h1>
                                    </div>
                                    <div className="fv-row mb-8">
                                        <input type="text" placeholder="Email" name="email" className="form-control bg-transparent" />
                                    </div>
                                    <div className="fv-row mb-3">
                                        <input type="password" placeholder="Password" name="password" className="form-control bg-transparent" />
                                    </div>
                                    <div className="d-grid mb-10">
                                        <button style={{ backgroundColor: "#1b84ff", color: "#fff" }} className="btn " onClick={() => { Singin() }}>
                                            <span className="indicator-label">Giriş Yap</span>
                                            <span className="indicator-progress">Please wait...
                                                <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-stack px-10 mx-auto">
                            <div className="me-10">
                                <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-4 fs-7" data-kt-menu="true" id="kt_auth_lang_menu">
                                    <div className="menu-item px-3">
                                        <a href="#" className="menu-link d-flex px-5" data-kt-lang="English">
                                            <span className="symbol symbol-20px me-4">
                                                <img data-kt-element="lang-flag" className="rounded-1" src="assets/media/flags/united-states.svg" alt="" />
                                            </span>
                                            <span data-kt-element="lang-name">English</span>
                                        </a>
                                    </div>
                                    <div className="menu-item px-3">
                                        <a href="#" className="menu-link d-flex px-5" data-kt-lang="Spanish">
                                            <span className="symbol symbol-20px me-4">
                                                <img data-kt-element="lang-flag" className="rounded-1" src="assets/media/flags/spain.svg" alt="" />
                                            </span>
                                            <span data-kt-element="lang-name">Spanish</span>
                                        </a>
                                    </div>
                                    <div className="menu-item px-3">
                                        <a href="#" className="menu-link d-flex px-5" data-kt-lang="German">
                                            <span className="symbol symbol-20px me-4">
                                                <img data-kt-element="lang-flag" className="rounded-1" src="assets/media/flags/germany.svg" alt="" />
                                            </span>
                                            <span data-kt-element="lang-name">German</span>
                                        </a>
                                    </div>
                                    <div className="menu-item px-3">
                                        <a href="#" className="menu-link d-flex px-5" data-kt-lang="Japanese">
                                            <span className="symbol symbol-20px me-4">
                                                <img data-kt-element="lang-flag" className="rounded-1" src="assets/media/flags/japan.svg" alt="" />
                                            </span>
                                            <span data-kt-element="lang-name">Japanese</span>
                                        </a>
                                    </div>
                                    <div className="menu-item px-3">
                                        <a href="#" className="menu-link d-flex px-5" data-kt-lang="French">
                                            <span className="symbol symbol-20px me-4">
                                                <img data-kt-element="lang-flag" className="rounded-1" src="assets/media/flags/france.svg" alt="" />
                                            </span>
                                            <span data-kt-element="lang-name">French</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2" style={{ backgroundImage: `url(${BgImage.src})` }}>
                        <div className="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
                            <h1 className="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7">PiArts Dash</h1>
                            <div className="d-none d-lg-block text-white text-center fs-4">
                                Metin buraya gelecek
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Index;