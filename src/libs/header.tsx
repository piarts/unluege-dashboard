import Avatar from "@/assets/media/300-1.jpg"
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react"

export default function Header() {
	const router = useRouter()
	const [Menu, setMenu] = useState(0)
	const data = [
		{
			name: "Anasayfa",
			source: '/piarts',
			destination: '/piarts',
		},
		{
			name: "Ürün",
			source: '/piarts/products',
			destination: '/piarts/products',
		},
		{
			name: "Hizmetler",
			source: '/piarts/services',
			destination: '/piarts/services',
		},
		{
			name: "Bayiler",
			source: '/piarts/franchising',
			destination: '/piarts/franchising',
		},
		{
			name: "Markalar",
			source: '/piarts/brands',
			destination: '/piarts/brands',
		},
		{
			name: "Ayarlar",
			source: '/piarts/ayarlar',
			destination: '/piarts/settings',
		},
		{
			name: "Blog",
			source: '/piarts/blog',
			destination: '/piarts/blog',
		},
		{
			name: "Slide",
			source: '/piarts/slide',
			destination: '/piarts/slide',
		},
		{
			name: "Sayfalar",
			source: '/piarts/sayfalar',
			destination: '/piarts/page',
		},
		{
			name: "Kullanıcılar",
			source: '/piarts/kullanicilar',
			destination: '/piarts/users',
		},
		{
			name: "Yetkiler",
			source: '/piarts/yetkiler',
			destination: '/piarts/authority',
		},
		{
			name: "Belgeler",
			source: '/piarts/belgeler',
			destination: '/piarts/document',
		},
	];
	const Navigation = (route: any) => {
		const result = data.filter((f: any) => { return (f.destination === route) })
		if (result.length > 0) {
			return result[0]["name"]
		}
		else {
			return "Not Found Page"
		}
	}

	return (
		<>
			<div className="app-header bg-white border">
				<div className="app-container container-fluid d-flex align-items-stretch justify-content-between">
					<div className="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2" title="Show sidebar menu">
						<div className="btn btn-icon btn-active-color-primary w-35px h-35px">
							<i className="ki-duotone ki-abstract-14 fs-2 fs-md-1">
								<span className="path1"></span>
								<span className="path2"></span>
							</i>
						</div>
					</div>
					<div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
						<a href="index.html" className="d-lg-none">
							<img alt="Logo" src="" className="h-30px" />
						</a>
					</div>
					<div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
						<div className="app-header-menu app-header-mobile-drawer align-items-stretch">
							<div className="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0">
								<div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
									<h1 className="page-heading d-flex fw-bold fs-3 flex-column justify-content-center my-0" style={{ color: "#7239EA" }}>Ünlü Ege</h1>
									<ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
										<li className="breadcrumb-item text-muted">
											<a href="index.html" className="text-muted text-hover-primary">Panel</a>
										</li>
										<li className="breadcrumb-item">
											<span className="bullet bg-gray-500 w-5px h-2px"></span>
										</li>
										<li className="breadcrumb-item text-muted">{Navigation(router.pathname)}</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="app-navbar flex-shrink-0">
							<div className="app-navbar-item ms-1 ms-md-4">
								<div className="cursor-pointer symbol symbol-35px" onMouseOver={() => { setMenu(1) }}>
									<div className="menu-content d-flex align-items-center px-3">
										<div className="symbol symbol-50px me-5">
											<img alt="Logo" src={Avatar.src} />
										</div>
										<div className="d-flex flex-column">
											<div className="fw-bold d-flex align-items-center fs-5">Username Lastname</div>
											<a href="#" className="fw-semibold text-muted text-hover-primary fs-7">exam@email.com</a>
										</div>
									</div>
								</div>
								<div className={`menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 shadow-sm bg-white ${Menu === 1 ? "show" : ""}`} onMouseOver={() => { setMenu(1) }} onMouseOut={() => { setMenu(0) }} style={{ zIndex: 109, position: "fixed", inset: "0px 0px auto auto", margin: "0px", transform: "translate3d(-20px ,80px, 0px)", width: "240px" }}>
									<div className="menu-item px-5">
										<Link href="account/overview.html" className="menu-link px-5">Hesabım</Link>
									</div>
									<div className="menu-item px-5">
										<div className="menu-link px-5">Güvenli Çıkış</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}