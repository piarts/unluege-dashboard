import Link from "next/link"
import { useRouter } from "next/router";

export default function Sidebar() {
    const router = useRouter();
    return (
        <>
            <div className="app-sidebar flex-column">
                <div className="app-sidebar-logo px-6">
                    <a style={{ color: "#fff" }} href="index.html">
                        <div className="d-flex mt-3 mb-0">
                            <div className="me-1" style={{ fontSize: "28px", fontWeight: "800", lineHeight: "28px" }}><span style={{ color: "#FD2E35" }}>Pi</span>Arts</div>
                            <div className="ms-1" style={{ fontSize: "28px", fontWeight: "300", lineHeight: "28px", color: "#b4b4b4" }}>Dash</div>
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "300", color: "#b4b4b4" }}>version 0.1.0</div>
                    </a>
                </div>
                <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
                    <div className="app-sidebar-wrapper">
                        <div className="scroll-y my-5 mx-3">
                            <div className="menu menu-column menu-rounded menu-sub-indention fw-semibold fs-6" data-kt-menu="true" data-kt-menu-expand="false">

                                <div className="menu-item">
                                    <Link className={`menu-link ${router.pathname === "/piarts" ? "active" : ""}`} href="/piarts">
                                        <span className="menu-icon">
                                            <i className="fa-solid fa-gauge-high fs-2"></i>
                                        </span>
                                        <span className="menu-title">Panel</span>
                                    </Link>
                                </div>
                                <div className="menu-item">
                                    <Link className={`menu-link ${router.pathname === "/piarts/products" ? "active" : ""}`} href="/piarts/products">
                                        <span className="menu-icon">
                                            <i className="fa-solid fa-box fs-2"></i>
                                        </span>
                                        <span className="menu-title">Ürünler</span>
                                    </Link>
                                </div>
                                <div className="menu-item">
                                    <Link className={`menu-link ${router.pathname === "/piarts/services" ? "active" : ""}`} href="/piarts/services">
                                        <span className="menu-icon">
                                            <i className="fa-solid fa-microchip fs-2"></i>
                                        </span>
                                        <span className="menu-title">Hizmetler</span>
                                    </Link>
                                </div>
                                <div className="menu-item">
                                    <Link className={`menu-link ${router.pathname === "/piarts/franchising" ? "active" : ""}`} href="/piarts/franchising">
                                        <span className="menu-icon">
                                            <i className="fa-solid fa-code-branch fs-2"></i>
                                        </span>
                                        <span className="menu-title">Bayiler</span>
                                    </Link>
                                </div>
                                <div className="menu-item">
                                    <Link className={`menu-link ${router.pathname === "/piarts/blog" ? "active" : ""}`} href="/piarts/blog">
                                        <span className="menu-icon">
                                            <i className="fa-brands fa-blogger-b fs-2"></i>
                                        </span>
                                        <span className="menu-title">Blog</span>
                                    </Link>
                                </div>
                                <div className="menu-item">
                                    <Link className={`menu-link ${router.pathname === "/piarts/brands" ? "active" : ""}`} href="/piarts/brands">
                                        <span className="menu-icon">
                                            <i className="fa-solid fa-copyright fs-2"></i>
                                        </span>
                                        <span className="menu-title">Markalar</span>
                                    </Link>
                                </div>



                                <div className="menu-item">
                                    <Link className={`menu-link ${router.pathname === "/piarts/slide" ? "active" : ""}`} href="/piarts/slide">
                                        <span className="menu-icon">
                                            <i className="fa-solid fa-images fs-2"></i>
                                        </span>
                                        <span className="menu-title">Slide</span>
                                    </Link>
                                </div>
                                <div className="menu-item">
                                    <Link className={`menu-link ${router.pathname === "/piarts/settings" ? "active" : ""}`} href="/piarts/settings">
                                        <span className="menu-icon">
                                            <i className="fa-solid fa-gears fs-2"></i>
                                        </span>
                                        <span className="menu-title">Ayarlar</span>
                                    </Link>
                                </div>

                                <div className="menu-item" hidden>
                                    <Link className={`menu-link ${router.pathname === "/piarts/page" || router.pathname === `/piarts/page/[id]` ? "active" : ""}`} href="/piarts/sayfalar">
                                        <span className="menu-icon">
                                            <i className="fa-regular fa-note-sticky fs-2"></i>
                                        </span>
                                        <span className="menu-title">Sayfalar</span>
                                    </Link>
                                </div>
                                <div className="menu-item" hidden>
                                    <Link className={`menu-link ${router.pathname === "/piarts/users" ? "active" : ""}`} href="/piarts/kullanicilar">
                                        <span className="menu-icon">
                                            <i className="fa-solid fa-user-group fs-2"></i>
                                        </span>
                                        <span className="menu-title">Kullanıcılar</span>
                                    </Link>
                                </div>
                                <div className="menu-item" hidden>
                                    <Link className={`menu-link ${router.pathname === "/piarts/authority" ? "active" : ""}`} href="/piarts/yetkiler">
                                        <span className="menu-icon">
                                            <i className="fa-solid fa-wand-magic-sparkles fs-2"></i>
                                        </span>
                                        <span className="menu-title">Yetkiler</span>
                                    </Link>
                                </div>
                                <div className="menu-item">
                                    <Link className={`menu-link ${router.pathname === "/piarts/document" ? "active" : ""}`} href="/piarts/belgeler">
                                        <span className="menu-icon">
                                            <i className="fa-regular fa-folder-open fs-2"></i>
                                        </span>
                                        <span className="menu-title">Belgeler</span>
                                    </Link>
                                </div>

                                <div className="menu-item" style={{ pointerEvents: "none", opacity: 0.4 }}>
                                    <Link className={`menu-link ${router.pathname === "/piarts/integration" ? "active" : ""}`} href="/piarts/integration">
                                        <span className="menu-icon">
                                            <i className="fa-solid fa-plug fs-2"></i>
                                        </span>
                                        <span className="menu-title">Entegrasyonlar</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}