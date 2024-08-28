import { useRouter } from "next/router";
import Layout from "../layout";
import { useEffect, useState } from "react";
import Nestable from 'react-nestable';
import axios from "axios";
import { Root } from "@/libs/module";
import { toast } from "react-toastify";



interface Data {
    name: string
    params: string
}

function Index() {
    const router = useRouter();
    const { params }: any = router.query
    const Data: Data[] = [
        {
            name: "Menü",
            params: '_menu',
        },
        {
            name: "Header",
            params: '_header',
        },
        {
            name: "Footer",
            params: '_footer',
        },
        {
            name: "E-Posta Ayarları",
            params: '_e_mail',
        },
        {
            name: "İletişim Bilgileri",
            params: '_contact',
        },

    ];
    useEffect(() => {
        if (!params) {
            router.push(`/piarts/ayarlar?params=_menu`)
        }
    }, [router])
    const GetDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0'dan başladığı için +1 ekliyoruz
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const [ListEditValue, setListEditValue] = useState<string>()

    const [PageMenu, setPageMenu] = useState<any>([])
    const [HeaderData, setHeaderData] = useState<any>([
        {
            id: 1,
            name: "1",
            link: ""
        },
        {
            id: 2,
            name: "2",
            link: ""
        },
        {
            id: 3,
            name: "3",
            link: ""
        }
    ])
    const [FooterData, setFooterData] = useState<any>({
        adress: {
            title: "Adres",
            value: null
        },
        phone: {
            title: "Telefon",
            value_1: null,
            value_2: null,
            value_3: null
        },
        email: {
            title: "E-posta",
            value_1: null,
            value_2: null,
            value_3: null
        },
        social: {
            value_1: null,
            value_2: null,
            value_3: null
        },
    })
    const [Host, setHost] = useState<string>("")
    const [Port, setPort] = useState<string>("")
    const [Secure, setSecure] = useState<string>("")
    const [Charset, setCharset] = useState<string>("")
    const [Username, setUsername] = useState<string>("")
    const [Password, setPassword] = useState<string>("")
    const [PasswordShow, setPasswordShow] = useState<boolean>(false)
    const [ContactData, setContactData] = useState<any>({
        phone: {
            title: "Telefon",
            value_1: null,
            value_2: null,
            value_3: null
        },
        email: {
            title: "E-posta",
            value_1: null,
            value_2: null,
            value_3: null
        },
        adress: {
            title: "Adres",
            value: null
        },
        maps: {
            value: null,
        },


    })

    const GetData = () => {
        axios.get(`${Root({ type: "root" })}/api.php?params=list-menu`).then((data) => {
            if (data.data.status) {
                const result = data.data.data[0]
                setPageMenu(JSON.parse(result.content))
            }
        })
        axios.get(`${Root({ type: "root" })}/api.php?params=list-header`).then((data) => {
            if (data.data.status) {
                const result = data.data.data[0]
                setHeaderData(JSON.parse(result.content))
            }
        })
        axios.get(`${Root({ type: "root" })}/api.php?params=list-footer`).then((data) => {
            if (data.data.status) {
                const result = data.data.data[0]
                setFooterData(JSON.parse(result.content))
            }
        })
        axios.get(`${Root({ type: "root" })}/api.php?params=list-email-settings`).then((data) => {
            if (data.data.status) {
                const result = data.data.data[0]
                setHost(result.host)
                setPort(result.port)
                setSecure(result.secure)
                setCharset(result.charset)
                setUsername(result.username)
                setPassword(result.password)
            }
        })
        axios.get(`${Root({ type: "root" })}/api.php?params=list-contact`).then((data) => {
            if (data.data.status) {
                const result = data.data.data[0]
                setContactData(JSON.parse(result.content))
            }
        })

    }

    useEffect(() => {
        GetData()
    }, [])


    const SaveMenu = async () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "insert-menu",
            content: PageMenu
        }).then((data) => {
            if (data.data.status) {
                toast.success("Slider Düzeni Kayıt Edildi.")
            }
        })
    }
    const SaveHeader = async () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "insert-header",
            content: HeaderData
        }).then((data) => {
            if (data.data.status) {
                toast.success("Slider Düzeni Kayıt Edildi.")
            }
        })
    }
    const SaveFooter = async () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "insert-footer",
            content: FooterData
        }).then((data) => {
            if (data.data.status) {
                toast.success("Slider Düzeni Kayıt Edildi.")
            }
        })
    }
    const SaveEmail = async () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "insert-email-settings",
            host: Host,
            port: Port,
            secure: Secure,
            charset: Charset,
            username: Username,
            password: Password
        }).then((data) => {
            if (data.data.status) {
                toast.success("Slider Düzeni Kayıt Edildi.")
            }
        })


    }
    const SaveContact = async () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "insert-contact",
            content: ContactData,
        }).then((data) => {
            if (data.data.status) {
                toast.success("Slider Düzeni Kayıt Edildi.")
            }
        })
    }

    const List = ({ item, index }: { item: any, index: number }) => (
        <div className="col-lg-12">
            <div className="card shadow-sm cursor-pointer" onMouseLeave={() => { }}>
                <div className="card-body d-flex p-0">
                    <div className="h-70px d-flex align-items-center justify-content-center" style={{ borderRight: "solid 1px #e7e7e7" }}>
                        <div className="fs-3 w-40px d-flex align-items-center justify-content-center">{index + 1}</div>
                    </div>
                    <div className="w-100 h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                        <div className="w-100 ms-2">
                            <div className="fw-bold">Menü Adı</div>
                            {
                                ListEditValue === `title_${index}` ?
                                    <div className="w-100 me-2">
                                        <input
                                            onBlur={() => { setListEditValue(``) }}
                                            value={item.title || ''}
                                            onChange={(e) => {
                                                setPageMenu((old: any) => old.map((page: any) => page.id === parseInt(item.id) ? { ...page, title: e.target.value, } : page))
                                            }}
                                            maxLength={40}
                                            className="form-control p-0 h-30px default-input"
                                        />
                                    </div>
                                    :
                                    <div className="w-100 h-30px pt-2" onClick={() => { setListEditValue(`title_${index}`) }} style={{ height: "22px" }}>{item.title}</div>
                            }
                        </div>
                    </div>
                    <div className="w-100 h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                        <div className="w-100 ms-2">
                            <div className="fw-bold">Url</div>
                            {
                                ListEditValue === `path_${index}` ?
                                    <div className="w-100 me-2">
                                        <input
                                            onBlur={() => { setListEditValue(``) }}
                                            value={item.path || ''}
                                            onChange={(e) => { setPageMenu((old: any) => old.map((page: any) => page.id === parseInt(item.id) ? { ...page, path: e.target.value, } : page)) }}
                                            maxLength={40}
                                            className="form-control p-0 h-30px default-input"
                                        />
                                    </div>
                                    :
                                    <div className="w-100 h-30px pt-2" onClick={() => { setListEditValue(`path_${index}`) }} style={{ height: "22px" }}>{item.path}</div>
                            }
                        </div>
                    </div>
                    <div className="w-200px h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                        <div>
                            <div className="fw-bold">Konum</div>
                            <div>
                                {item.position === 2 && <span className="badge badge-primary w-100px" style={{ color: "#fff" }}>Header</span>}
                                {item.position === 3 && <span className="badge badge-primary w-100px" style={{ color: "#fff" }}>Header, Footer</span>}
                            </div>
                        </div>
                    </div>
                    <div className="w-200px h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                        <div>
                            <div className="fw-bold">Durum</div>
                            {
                                item.status ?
                                    <div><span className="badge badge-success" style={{ color: "#fff" }}>Aktif</span></div>
                                    :
                                    <div><span className="badge badge-danger" style={{ color: "#fff" }}>Pasif</span></div>
                            }
                        </div>
                    </div>
                    <div className="w-200px h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                        <div>
                            <div className="fw-bold">Oluşturulma</div>
                            <div>{item.created_date}</div>
                        </div>
                    </div>
                    <div className="w-200px h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                        <div className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px me-2 border"
                            onClick={() => {
                                item.status ?
                                    setPageMenu((old: any) => old.map((page: any) => page.id === parseInt(item.id) ? { ...page, status: false, } : page))
                                    :
                                    setPageMenu((old: any) => old.map((page: any) => page.id === parseInt(item.id) ? { ...page, status: true, } : page))
                                item.status ?
                                    toast.error("Sayfa listede gizlendi")
                                    :
                                    toast.success("Sayfa listede gösriliyor.")
                            }}
                        >
                            {
                                item.status ?
                                    <i className="fa-solid fa-eye-slash fs-3" style={{ color: "#99a1b7" }}></i>
                                    :
                                    <i className="fa-solid fa-eye fs-3" style={{ color: "#99a1b7" }}></i>
                            }

                        </div>
                        <div className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px border me-2" onClick={() => { }}>
                            <i className="fa-solid fa-trash fs-3" style={{ color: "#99a1b7" }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    const [MenuDrawer, setMenuDrawer] = useState<boolean>(false)


    return (
        <Layout>
            <div className="row">
                <div className="col-2">
                    <div className="tabs-menu">
                        <div className="row">
                            {
                                (Data || []).map((d: any, x: number) => {
                                    return (
                                        <div key={`data-${x}`} className="col-12" onClick={() => { router.push(`/piarts/ayarlar?params=${d.params}`) }}>
                                            <div className={`tabs-item fw-bold ${params === d.params ? "active" : ""}`}>{d.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    {/*TABS 1 -> MENU */}
                    <div className={`tabs-container ${params === "_menu" ? "active" : ""}`}>
                        <div className="row">
                            <div className="col-lg-12">
                                <Nestable
                                    maxDepth={1}
                                    items={PageMenu}
                                    onChange={(e: any) => { setPageMenu(e.items) }}
                                    renderItem={List}
                                />
                            </div>
                        </div>
                    </div>
                    {/*TABS 2 -> HEADER */}
                    <div className={`tabs-container ${params === "_header" ? "active" : ""}`}>
                        <div className="row mt-5">

                            <div className="col-lg-12">
                                <label className="form-label fs-4 fw-bold">Sütun 1</label>
                            </div>
                            <div className="col-lg-12 mb-5">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label className="form-label fs-7">Değer</label>
                                        <input
                                            className="form-control"
                                            placeholder="Üst Kısım Sütun Değeri"
                                            value={HeaderData[0].name || ''}
                                            onChange={(e: any) => {
                                                setHeaderData((old: any) => old.map((page: any) => page.id === 1 ? { ...page, name: e.target.value, } : page))
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label fs-7">Bağlantı</label>
                                        <input
                                            className="form-control"
                                            placeholder="Üst Kısım Sütun Bağlantısı (Opsiyonel)"
                                            value={HeaderData[0].link || ''}
                                            onChange={(e: any) => {
                                                setHeaderData((old: any) => old.map((page: any) => page.id === 1 ? { ...page, link: e.target.value, } : page))
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 mt-5">
                                <label className="form-label fs-4 fw-bold">Sütun 2</label>
                            </div>
                            <div className="col-lg-12 mb-5">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label className="form-label fs-7">Değer</label>
                                        <input
                                            className="form-control"
                                            placeholder="Üst Kısım Sütun Değeri"
                                            value={HeaderData[1].name || ''}
                                            onChange={(e: any) => {
                                                setHeaderData((old: any) => old.map((page: any) => page.id === 2 ? { ...page, name: e.target.value, } : page))
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label fs-7">Bağlantı</label>
                                        <input
                                            className="form-control"
                                            placeholder="Üst Kısım Sütun Bağlantısı (Opsiyonel)"
                                            value={HeaderData[1].link || ''}
                                            onChange={(e: any) => {
                                                setHeaderData((old: any) => old.map((page: any) => page.id === 2 ? { ...page, link: e.target.value, } : page))
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 mt-5">
                                <label className="form-label fs-4 fw-bold">Sütun 3</label>
                            </div>
                            <div className="col-lg-12 mb-5">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label className="form-label fs-7">Değer</label>
                                        <input
                                            className="form-control"
                                            placeholder="Üst Kısım Sütun Değeri"
                                            value={HeaderData[2].name || ''}
                                            onChange={(e: any) => {
                                                setHeaderData((old: any) => old.map((page: any) => page.id === 3 ? { ...page, name: e.target.value, } : page))
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label fs-7">Bağlantı</label>
                                        <input
                                            className="form-control"
                                            placeholder="Üst Kısım Sütun Bağlantısı (Opsiyonel)"
                                            value={HeaderData[2].link || ''}
                                            onChange={(e: any) => {
                                                setHeaderData((old: any) => old.map((page: any) => page.id === 3 ? { ...page, link: e.target.value, } : page))
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*TABS 3 -> FOOTER */}
                    <div className={`tabs-container ${params === "_footer" ? "active" : ""}`}>
                        <div className="row">
                            <div className="col-lg-12 mt-5">
                                <label className="form-label fs-4 fw-bold">Adres</label>
                            </div>
                            <div className="col-lg-12 mb-5">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">Başlık</label>
                                        <input
                                            value={FooterData.adress.title || ''}
                                            onChange={(e: any) => { setFooterData((oldData: any) => ({ ...oldData, ["adress"]: { ...oldData["adress"], title: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Başlık"
                                        />
                                    </div>
                                    <div className="col-lg-8">
                                        <label className="form-label fs-7">Adres</label>
                                        <input
                                            value={FooterData.adress.value || ''}
                                            onChange={(e: any) => { setFooterData((oldData: any) => ({ ...oldData, ["adress"]: { ...oldData["adress"], value: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Satır Değeri"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 mt-5">
                                <label className="form-label fs-4 fw-bold">Telefon</label>
                            </div>
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <label className="form-label">Başlık</label>
                                        <input
                                            value={FooterData.phone.title || ''}
                                            onChange={(e: any) => { setFooterData((oldData: any) => ({ ...oldData, ["phone"]: { ...oldData["phone"], title: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Telefon Başlığı"
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-3"></div>
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">Değer</label>
                                        <input
                                            value={FooterData.phone.value_1 || ''}
                                            onChange={(e: any) => { setFooterData((oldData: any) => ({ ...oldData, ["phone"]: { ...oldData["phone"], value_1: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Telefon Değeri"
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">Değer (Opsiyonel)</label>
                                        <input
                                            value={FooterData.phone.value_2 || ''}
                                            onChange={(e: any) => { setFooterData((oldData: any) => ({ ...oldData, ["phone"]: { ...oldData["phone"], value_2: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Telefon Değeri"
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">Değer (Opsiyonel)</label>
                                        <input
                                            value={FooterData.phone.value_3 || ''}
                                            onChange={(e: any) => { setFooterData((oldData: any) => ({ ...oldData, ["phone"]: { ...oldData["phone"], value_3: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Telefon Değeri"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 mt-5">
                                <label className="form-label fs-4 fw-bold">E-posta</label>
                            </div>
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">Başlık</label>
                                        <input
                                            value={FooterData.email.title || ''}
                                            onChange={(e: any) => { setFooterData((oldData: any) => ({ ...oldData, ["email"]: { ...oldData["email"], title: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Başlık"
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-3"></div>
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">E-posta</label>
                                        <input
                                            value={FooterData.email.value_1 || ''}
                                            onChange={(e: any) => { setFooterData((oldData: any) => ({ ...oldData, ["email"]: { ...oldData["email"], value_1: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="E-posta Değeri"
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">E-posta (Opsiyonel)</label>
                                        <input
                                            value={FooterData.email.value_2 || ''}
                                            onChange={(e: any) => { setFooterData((oldData: any) => ({ ...oldData, ["email"]: { ...oldData["email"], value_2: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="E-posta Değeri"
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">E-posta (Opsiyonel)</label>
                                        <input
                                            value={FooterData.email.value_3 || ''}
                                            onChange={(e: any) => { setFooterData((oldData: any) => ({ ...oldData, ["email"]: { ...oldData["email"], value_3: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="E-posta Değeri"
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-12 mt-5">
                                <label className="form-label fs-4 fw-bold">Sosyal Medya</label>
                            </div>
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-4 mb-3">
                                        <label className="form-label fs-7">Instagram</label>
                                        <input
                                            value={FooterData.social.value_1 || ''}
                                            onChange={(e: any) => { setFooterData((oldData: any) => ({ ...oldData, ["social"]: { ...oldData["social"], value_1: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Instagram"
                                        />
                                    </div>
                                    <div className="col-lg-4 mb-3">
                                        <label className="form-label fs-7">Facebook</label>
                                        <input
                                            value={FooterData.social.value_2 || ''}
                                            onChange={(e: any) => { setFooterData((oldData: any) => ({ ...oldData, ["social"]: { ...oldData["social"], value_2: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Facebook"
                                        />
                                    </div>
                                    <div className="col-lg-4 mb-3">
                                        <label className="form-label fs-7">Linkedin</label>
                                        <input
                                            value={FooterData.social.value_3 || ''}
                                            onChange={(e: any) => { setFooterData((oldData: any) => ({ ...oldData, ["social"]: { ...oldData["social"], value_3: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Linkedin"
                                        />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    {/*TABS 4 -> EMAIL */}
                    <div className={`tabs-container ${params === "_e_mail" ? "active" : ""}`}>
                        <div className="row">
                            <div className="col-lg-6">
                                <label className="form-label">Host</label>
                                <input
                                    value={Host}
                                    onChange={(e: any) => { setHost(e.target.value) }}
                                    className="form-control"
                                    placeholder="Host Bağlantısı"
                                />
                            </div>
                            <div className="col-lg-2">
                                <label className="form-label">Port</label>
                                <input
                                    value={Port}
                                    onChange={(e: any) => { setPort(e.target.value) }}
                                    className="form-control"
                                    placeholder="Port Numarası"
                                />
                            </div>
                            <div className="col-lg-2">
                                <label className="form-label">Secure</label>
                                <input
                                    value={Secure}
                                    onChange={(e: any) => { setSecure(e.target.value) }}
                                    className="form-control"
                                    placeholder="Secure Türü"
                                />
                            </div>
                            <div className="col-lg-2">
                                <label className="form-label">Charset</label>
                                <input
                                    value={Charset}
                                    onChange={(e: any) => { setCharset(e.target.value) }}
                                    className="form-control"
                                    placeholder="Charset"
                                />
                            </div>

                            <div className="col-lg-12 mt-2 mb-2"></div>

                            <div className="col-lg-6">
                                <label className="form-label">Kullanıcı Adı</label>
                                <input
                                    value={Username}
                                    onChange={(e: any) => { setUsername(e.target.value) }}
                                    className="form-control"
                                    placeholder="Kullanıcı Adı"
                                />
                            </div>
                            <div className="col-lg-6">
                                <label className="form-label">Şifre</label>
                                <div style={{ position: "relative" }}>
                                    <input
                                        type={PasswordShow ? "text" : "password"}
                                        value={Password}
                                        onChange={(e: any) => { setPassword(e.target.value) }}
                                        className="form-control"
                                        placeholder="Kullanıcı Şifresi"
                                    />
                                    {
                                        PasswordShow ?
                                            <i className="fa-solid fa-eye-slash fs-2 cursor-pointer" style={{ position: "absolute", zIndex: 50, right: "10px", top: "15px" }} onClick={() => { PasswordShow ? setPasswordShow(false) : setPasswordShow(true) }}></i>
                                            :
                                            <i className="fa-solid fa-eye fs-2 cursor-pointer" style={{ position: "absolute", zIndex: 50, right: "10px", top: "15px" }} onClick={() => { PasswordShow ? setPasswordShow(false) : setPasswordShow(true) }}></i>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*TABS 5 -> CONTACT */}
                    <div className={`tabs-container ${params === "_contact" ? "active" : ""}`}>
                        <div className="row">


                            <div className="col-lg-12 mt-5">
                                <label className="form-label fs-4 fw-bold">Telefon</label>
                            </div>
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <label className="form-label">Başlık</label>
                                        <input
                                            value={ContactData.phone?.title || ''}
                                            onChange={(e: any) => { setContactData((oldData: any) => ({ ...oldData, ["phone"]: { ...oldData["phone"], title: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Telefon Başlığı"
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-3"></div>
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">Değer</label>
                                        <input
                                            value={ContactData.phone?.value_1 || ''}
                                            onChange={(e: any) => { setContactData((oldData: any) => ({ ...oldData, ["phone"]: { ...oldData["phone"], value_1: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Telefon Değeri"
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">Değer (Opsiyonel)</label>
                                        <input
                                            value={ContactData.phone?.value_2 || ''}
                                            onChange={(e: any) => { setContactData((oldData: any) => ({ ...oldData, ["phone"]: { ...oldData["phone"], value_2: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Telefon Değeri"
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">Değer (Opsiyonel)</label>
                                        <input
                                            value={ContactData.phone?.value_3 || ''}
                                            onChange={(e: any) => { setContactData((oldData: any) => ({ ...oldData, ["phone"]: { ...oldData["phone"], value_3: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Telefon Değeri"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 mt-5">
                                <label className="form-label fs-4 fw-bold">E-posta</label>
                            </div>
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">Başlık</label>
                                        <input
                                            value={ContactData.email?.title || ''}
                                            onChange={(e: any) => { setContactData((oldData: any) => ({ ...oldData, ["email"]: { ...oldData["email"], title: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Başlık"
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-3"></div>
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">E-posta</label>
                                        <input
                                            value={ContactData.email?.value_1 || ''}
                                            onChange={(e: any) => { setContactData((oldData: any) => ({ ...oldData, ["email"]: { ...oldData["email"], value_1: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="E-posta Değeri"
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">E-posta (Opsiyonel)</label>
                                        <input
                                            value={ContactData.email?.value_2 || ''}
                                            onChange={(e: any) => { setContactData((oldData: any) => ({ ...oldData, ["email"]: { ...oldData["email"], value_2: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="E-posta Değeri"
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">E-posta (Opsiyonel)</label>
                                        <input
                                            value={ContactData.email?.value_3 || ''}
                                            onChange={(e: any) => { setContactData((oldData: any) => ({ ...oldData, ["email"]: { ...oldData["email"], value_3: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="E-posta Değeri"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 mt-5">
                                <label className="form-label fs-4 fw-bold">Adres</label>
                            </div>
                            <div className="col-lg-12 mb-5">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <label className="form-label fs-7">Başlık</label>
                                        <input
                                            value={ContactData.adress?.title || ''}
                                            onChange={(e: any) => { setContactData((oldData: any) => ({ ...oldData, ["adress"]: { ...oldData["adress"], title: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Başlık"
                                        />
                                    </div>
                                    <div className="col-lg-8">
                                        <label className="form-label fs-7">Adres</label>
                                        <input
                                            value={ContactData.adress?.value || ''}
                                            onChange={(e: any) => { setContactData((oldData: any) => ({ ...oldData, ["adress"]: { ...oldData["adress"], value: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Satır Değeri"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 mt-5">
                                <label className="form-label fs-4 fw-bold">Harita</label>
                            </div>
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <label className="form-label fs-7">Google Maps</label>
                                        <input
                                            value={ContactData.maps?.value || ''}
                                            onChange={(e: any) => { setContactData((oldData: any) => ({ ...oldData, ["maps"]: { ...oldData["maps"], value: e.target.value, }, })); }}
                                            className="form-control"
                                            placeholder="Instagram"
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-12">
                                <iframe src={ContactData.maps?.value} style={{ width: "100%", height: "500px" }}></iframe>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-2"></div>
                <div className="col-10 mb-20 mt-20">
                    <div className="menu-container">
                        <div className="menu-sticky shadow-sm" style={{ width: "68.8%" }}>
                            <div className="w-100">
                            </div>
                            {
                                params === "_menu" &&
                                <div className="w-100 d-flex justify-content-end">
                                    <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { SaveMenu() }}>Değişiklikleri Kaydet</button>
                                </div>
                            }
                            {
                                params === "_header" &&
                                <div className="w-100 d-flex justify-content-end">
                                    <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { SaveHeader() }}>Değişiklikleri Kaydet</button>
                                </div>
                            }
                            {
                                params === "_footer" &&
                                <div className="w-100 d-flex justify-content-end">
                                    <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { SaveFooter() }}>Değişiklikleri Kaydet</button>
                                </div>
                            }
                            {
                                params === "_e_mail" &&
                                <div className="w-100 d-flex justify-content-end">
                                    <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { SaveEmail() }}>Değişiklikleri Kaydet</button>
                                </div>
                            }
                            {
                                params === "_contact" &&
                                <div className="w-100 d-flex justify-content-end">
                                    <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { SaveContact() }}>Değişiklikleri Kaydet</button>
                                </div>
                            }




                        </div>
                    </div>
                </div>
            </div>

            <div className={`bg-white drawer drawer-end ${MenuDrawer ? "drawer-on" : ""} shadow-sm`} style={{ width: "500px" }} >
                <div className="card rounded-0 w-100">
                    <div className="card-header pe-5">
                        <div className="card-title">
                            <div className="d-flex justify-content-center flex-column me-3">
                                <a href="#" className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">Example Dismiss Button</a>
                            </div>
                        </div>
                        <div className="card-toolbar">
                            <div className="btn btn-sm btn-icon btn-active-light-primary" id="kt_drawer_example_dismiss_close">
                                <i className="ki-duotone ki-cross fs-2"><span className="path1"></span><span className="path2"></span></i>                </div>
                        </div>
                    </div>
                    <div className="card-body hover-scroll-overlay-y">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo vel fringilla est ullamcorper eget nulla. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget. Sed faucibus turpis in eu mi. Velit egestas dui id ornare arcu odio. Arcu non odio euismod lacinia at quis risus sed vulputate. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Vehicula ipsum a arcu cursus. Gravida neque convallis a cras semper. Amet massa vitae tortor condimentum. Lectus mauris ultrices eros in cursus turpis massa. Orci sagittis eu volutpat odio facilisis mauris sit amet. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Erat pellentesque adipiscing commodo elit at imperdiet dui. Vestibulum morbi blandit cursus risus at ultrices.</p>

                        <p>Quis ipsum suspendisse ultrices gravida dictum. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Vitae proin sagittis nisl rhoncus mattis rhoncus urna. Eget arcu dictum varius duis at consectetur lorem donec massa. Morbi tincidunt ornare massa eget. Ornare arcu dui vivamus arcu felis. Egestas purus viverra accumsan in nisl nisi scelerisque eu. Aliquet nec ullamcorper sit amet. Dignissim enim sit amet venenatis urna cursus eget. Accumsan sit amet nulla facilisi morbi tempus iaculis urna. Non consectetur a erat nam at. Ut morbi tincidunt augue interdum velit. Ridiculus mus mauris vitae ultricies leo integer malesuada.</p>

                        <p>Ipsum dolor sit amet consectetur adipiscing. Blandit cursus risus at ultrices mi tempus imperdiet. Risus nullam eget felis eget. A lacus vestibulum sed arcu non. Tristique magna sit amet purus gravida quis blandit turpis cursus. Imperdiet nulla malesuada pellentesque elit. Nec dui nunc mattis enim ut tellus elementum sagittis. Ac placerat vestibulum lectus mauris. Facilisi etiam dignissim diam quis enim. Suspendisse faucibus interdum posuere lorem ipsum dolor. Mattis rhoncus urna neque viverra justo nec ultrices. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. At varius vel pharetra vel turpis nunc eget. Accumsan sit amet nulla facilisi morbi tempus iaculis urna. Ut morbi tincidunt augue interdum velit euismod in.</p>

                        <p>Etiam tempor orci eu lobortis elementum nibh. Libero volutpat sed cras ornare arcu. Risus sed vulputate odio ut enim. Iaculis nunc sed augue lacus viverra vitae. Enim neque volutpat ac tincidunt vitae. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Ullamcorper a lacus vestibulum sed arcu. In dictum non consectetur a erat. Varius quam quisque id diam vel quam elementum. Cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla. Sed viverra tellus in hac habitasse platea dictumst. Amet cursus sit amet dictum sit amet. Elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Non tellus orci ac auctor augue mauris.</p>

                        <p>Ut lectus arcu bibendum at varius vel. Arcu felis bibendum ut tristique et egestas quis. Sit amet commodo nulla facilisi nullam vehicula ipsum. Tellus cras adipiscing enim eu turpis egestas pretium. Imperdiet massa tincidunt nunc pulvinar sapien et. Integer eget aliquet nibh praesent tristique magna sit. Lacinia at quis risus sed vulputate odio ut. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Aenean pharetra magna ac placerat vestibulum. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Viverra nam libero justo laoreet sit amet cursus sit amet. Diam vel quam elementum pulvinar. Massa vitae tortor condimentum lacinia quis vel eros donec ac.</p>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-light-danger" data-kt-drawer-dismiss="true">Dismiss drawer</button>
                    </div>
                </div>
            </div>
            {MenuDrawer ? <div className="drawer-overlay" onClick={() => { setMenuDrawer(false) }} style={{ zIndex: 109, backgroundColor: "#00000038" }}></div> : <></>}



        </Layout>
    )
}

export default Index;