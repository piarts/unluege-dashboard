import axios from "axios";
import Layout from "../layout";
import { Drawer, Root } from "@/libs/module";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Index() {
    const slide = useRef<any>(null)
    const [Error, setError] = useState<number>(200)
    const [Drawer, setDrawer] = useState<string>("")
    const [Modal, setModal] = useState<any>({ id: 0, status: "" })

    const [FranchisingNew, setFranchisingNew] = useState<boolean>(false)
    const [FranchisingData, setFranchisingData] = useState<any>([])
    const [FranchisingEdit, setFranchisingEdit] = useState<any>({ id: 0, status: false })

    const [FranchisingName, setFranchisingName] = useState<string>("")
    const [FranchisingCity, setFranchisingCity] = useState<any>(0)
    const [FranchisingCounty, setFranchisingCounty] = useState<any>(0)
    const [FranchisingAdress, setFranchisingAdress] = useState<any>("")
    const [FranchisingMaps, setFranchisingMaps] = useState<string>("")
    const [FranchisingWeb, setFranchisingWeb] = useState<string>("")
    const [FranchisingFax, setFranchisingFax] = useState<string>("")
    const [FranchisingPhone, setFranchisingPhone] = useState<string>("")
    const [FranchisingMobile, setFranchisingMobile] = useState<string>("")
    const [FranchisingLogo, setFranchisingLogo] = useState<any>({ blob: "", file: "" })


    const [CityData, setCityData] = useState<any>([])
    const [CountyData, setCountyData] = useState<any>([])

    const GetCity = () => {
        axios.get(`${Root({ type: "root" })}/api.php?params=list-city`).then((data) => {
            if (data.data.status) {
                setCityData(data.data.data)
            }
        })
    }
    const GetCounty = (id: any) => {
        axios.get(`${Root({ type: "root" })}/api.php?params=list-county`).then((data) => {
            if (data.data.status) {
                setCountyData(data.data.data.filter((f: any) => { return (parseInt(f.il_id) === parseInt(id)) }))
            }
        })
    }

    const SelectFranchisingImage = (e: any) => {
        e.preventDefault();
        const [file] = e.target.files;
        const url = URL.createObjectURL(file);
        const data = new FormData();
        data.append('file', file);
        setFranchisingLogo({ blob: url, file: file })
    }
    const ListFranchising = () => {
        axios.get(`${Root({ type: "root" })}/api.php?params=list-franchising`).then((data) => {
            if (data.data.status) {
                setFranchisingData(data.data.data)
            }
        })
    }
    const EditFranchising = (e: any) => {
        const result = FranchisingData.filter((f: any) => { return (f.id === e) })
        if (result.length > 0) {

            setFranchisingName(result[0]["name"])
            setFranchisingCity(result[0]["city"])
            setFranchisingCounty(result[0]["county"])
            setFranchisingAdress(result[0]["address"])
            setFranchisingMaps(result[0]["maps"])
            setFranchisingWeb(result[0]["web"])
            setFranchisingFax(result[0]["fax"])
            setFranchisingPhone(result[0]["phone"])
            setFranchisingMobile(result[0]["mobile"])
            setFranchisingLogo({ blob: result[0]["logo"], file: "" })

        }
        else {

        }
    }
    const InsertFranchising = async () => {
        const data = new FormData();
        data.append('file', FranchisingLogo.file);
        var res = (await axios.post(`${Root({ type: "root" })}/file.php`, data)).data;
        var result = `${Root({ type: "root" })}/upload/${res}`
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "insert-franchising",
            name: FranchisingName,
            city: FranchisingCity,
            county: FranchisingCounty,
            address: FranchisingAdress,
            maps: FranchisingMaps,
            web: FranchisingWeb,
            fax: FranchisingFax,
            phone: FranchisingPhone,
            mobile: FranchisingMobile,
            logo: result,
        }).then((data) => {
            console.log(data)
            if (data.data.status) {
                ListFranchising()
                toast.success("Bayi Eklendi")
            }
        })
    }
    const UpdateFranchising = async (e: any) => {
        const data = new FormData();
        var result = "";
        if (FranchisingLogo.file === "") {
            result = FranchisingLogo.blob;
        }
        else {
            data.append('file', FranchisingLogo.file);
            var res = (await axios.post(`${Root({ type: "root" })}/file.php`, data)).data;
            result = `${Root({ type: "root" })}/upload/${res}`
        }
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "update-franchising",
            id: e,
            name: FranchisingName,
            city: FranchisingCity,
            county: FranchisingCounty,
            address: FranchisingAdress,
            maps: FranchisingMaps,
            web: FranchisingWeb,
            fax: FranchisingFax,
            phone: FranchisingPhone,
            mobile: FranchisingMobile,
            logo: result,
        }).then((data) => {
            if (data.data.status) {
                ListFranchising()
                toast.success("Bayi Güncellendi")
            }
        })
    }
    const DeleteFranchising = (e: any) => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "delete-franchising",
            id: e,
        }).then((data) => {
            if (data.data.status) {
                ListFranchising()
                toast.success("Bayi Silindi")
                setModal({ id: 0, status: "" })
            }
        })
    }
    const ClearFranchising = () => {
        setFranchisingName("")
        setFranchisingCity(0)
        setFranchisingCounty(0)
        setFranchisingAdress("")
        setFranchisingMaps("")
        setFranchisingWeb("")
        setFranchisingFax("")
        setFranchisingPhone("")
        setFranchisingMobile("")
        setFranchisingLogo({ blob: "", file: "" })

        setCountyData([])
    }


    useEffect(() => {
        GetCity();
        ListFranchising()
    }, [])
    return (
        <Layout>
            {/* Header */}
            <div className="row">
                <div className="col-lg-12 mb-4 d-flex justify-content-end">
                    {
                        FranchisingNew || FranchisingEdit.status ?
                            <>
                                <button className="btn h-40px w-150px ms-2" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { ClearFranchising(); setFranchisingNew(false); setFranchisingEdit({ id: 0, status: false }) }}>
                                    <i className="fa-solid fa-chevron-left me-2"></i>
                                    Listeye Dön
                                </button>
                            </>
                            :
                            <>
                                <button className="btn h-40px ms-2" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { setFranchisingNew(true); ClearFranchising(); }}>
                                    <i className="fa-solid fa-circle-plus me-2"></i>
                                    Bayi Ekle
                                </button>
                            </>
                    }
                </div>
            </div>

            {/* Edit Or New */}
            <div className="row mb-10" hidden={FranchisingNew || FranchisingEdit.status ? false : true}>
                <div className="col-lg-3 mb-4">
                    <div className="mb-10">
                        <div className="slide-container" style={{ backgroundImage: `url(${FranchisingLogo.blob})` }}>
                            <div className="slide-inner" style={{ height: "240px", position: "relative", border: Error === 200 ? "dashed 1px #E8E8E8" : "dashed 2px #e74c3c", backgroundColor: Error === 200 ? "#e8e8e800" : "#e74c3c45" }}>
                                <div className="text-center">
                                    <div className="d-flex justify-content-center mb-2 ms-2">
                                        <div className="slide-menu shadow-sm cursor-pointer border" onClick={() => { document.getElementById(`id_franchising`)?.click() }}>
                                            <i className="fa-solid fa-cloud-arrow-up fs-1"></i>
                                            <input type="file" id={`id_franchising`} onChange={(e: any) => { SelectFranchisingImage(e) }} hidden />
                                        </div>
                                    </div>
                                    <div className="fs-5 fw-semibold">Bayi Sekansı için resim</div>
                                    <div className="fs-6 fw-normal mt-1">Resim 1:1 Ratio (Kare Olmak Zorundadır)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="row">
                        <div className="col-lg-12 mb-4">
                            <input className="form-control" placeholder="Firma Adı" value={FranchisingName} onChange={(e: any) => { setFranchisingName(e.target.value) }} />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <select className="form-select" onChange={(e: any) => { setFranchisingCity(e.target.value); GetCounty(e.target.value) }}>
                                <option>İl Seç</option>
                                {(CityData || []).map((d: any, x: number) => { return (<option key={`il-${x}`} selected={FranchisingCity === d.id ? true : false} value={d.id}>{d.il_adi}</option>) })}
                            </select>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <select className="form-select" onChange={(e: any) => { setFranchisingCounty(e.target.value) }}>
                                <option>İlçe Seç</option>
                                {(CountyData || []).map((d: any, x: number) => { return (<option key={`ilce-${x}`} selected={FranchisingCounty === parseInt(d.id) ? true : false} value={d.id}>{d.ilce_adi}</option>) })}
                            </select>
                        </div>
                        <div className="col-lg-12 mb-4">
                            <input className="form-control" placeholder="Web Sitesi" value={FranchisingWeb} onChange={(e: any) => { setFranchisingWeb(e.target.value) }} />
                        </div>
                        <div className="col-lg-4 mb-4">
                            <input className="form-control" placeholder="Fax" value={FranchisingFax} onChange={(e: any) => { setFranchisingFax(e.target.value) }} />
                        </div>
                        <div className="col-lg-4 mb-4">
                            <input className="form-control" placeholder="Sabit Telefon" value={FranchisingPhone} onChange={(e: any) => { setFranchisingPhone(e.target.value) }} />
                        </div>
                        <div className="col-lg-4 mb-4">
                            <input className="form-control" placeholder="Mobile Telefon" value={FranchisingMobile} onChange={(e: any) => { setFranchisingMobile(e.target.value) }} />
                        </div>
                        <div className="col-lg-12 mb-4">
                            <textarea rows={5} className="form-control" placeholder="Adres" value={FranchisingAdress} onChange={(e: any) => { setFranchisingAdress(e.target.value) }}></textarea>
                        </div>
                        <div className="col-lg-12 mb-4">
                            <input className="form-control" placeholder="Harita" value={FranchisingMaps} onChange={(e: any) => { setFranchisingMaps(e.target.value) }} />
                        </div>
                        <div className="col-lg-12 mb-4">
                            <iframe src={FranchisingMaps} className="border rounded-2 shadow-sm" style={{ width: "100%", height: "200px" }}></iframe>
                        </div>


                    </div>
                </div>
            </div>

            {/* LIST */}
            <div style={{ overflowY: "auto", overflowX: "hidden", height: "600px" }} className="border p-3 rounded-1" hidden={FranchisingNew || FranchisingEdit.status ? true : false}>
                <div className="row mb-10">
                    {
                        (FranchisingData || []).map((d: any, x: number) => {
                            return (

                                <div className="col-lg-12 mb-5" key={`franc-${x}`}>
                                    <div className="card shadow-sm cursor-pointer">
                                        <div className="card-body d-flex p-0">
                                            <div className="h-70px d-flex align-items-center justify-content-center" style={{ borderRight: "solid 1px #e7e7e7" }}>
                                                <div className="fs-3 w-40px d-flex align-items-center justify-content-center">{x + 1}</div>
                                            </div>
                                            <div className="w-100px h-70px d-flex align-items-center" style={{ borderRight: "solid 1px #e7e7e7" }}>
                                                {
                                                    d.logo === "" ?
                                                        <div className="d-flex align-items-center justify-content-center" style={{ height: "70px", width: "70px" }}>
                                                            <i className="fa-solid fa-image fs-2" ></i>
                                                        </div>
                                                        :
                                                        <div className="bg-image" style={{ backgroundImage: `url(${d.logo})` }}></div>
                                                }
                                            </div>
                                            <div className="w-100 h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                                                <div className="w-100 ms-2">
                                                    <div className="fw-bold">Firma Adı</div>
                                                    <div>{d.name}</div>
                                                </div>
                                            </div>
                                            <div className="w-100 h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                                                <div className="w-100 ms-2">
                                                    <div className="fw-bold">Mobil Numarası</div>
                                                    {d.mobile}
                                                </div>
                                            </div>
                                            <div className="w-100 h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                                                <div className="w-100 ms-2">
                                                    <div className="fw-bold">Sabit Numarası</div>
                                                    {d.phone}
                                                </div>
                                            </div>
                                            <div className="w-100 h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                                                <div className="w-100 ms-2">
                                                    <div className="fw-bold">Web Sitesi</div>
                                                    {d.web}
                                                </div>
                                            </div>

                                            <div className="w-200px h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                                                <div>
                                                    <div className="fw-bold">Durum</div>
                                                    {
                                                        d.status ?
                                                            <span className="badge badge-success" style={{ color: "#fff" }}>
                                                                Aktif
                                                                <i className="fa-solid fa-link ms-2"></i>
                                                            </span>
                                                            :
                                                            <span className="badge badge-danger" style={{ color: "#fff" }}>
                                                                Pasif
                                                                <i className="fa-solid fa-link ms-2"></i>
                                                            </span>
                                                    }
                                                </div>
                                            </div>
                                            <div className="w-200px h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                                                <div>
                                                    <div className="fw-bold">Oluşturulma</div>
                                                </div>
                                            </div>
                                            <div className="w-200px h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                                                <div className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px me-2 border" onClick={() => { }}>
                                                    {
                                                        true ?
                                                            <i className="fa-solid fa-eye-slash fs-3" style={{ color: "#99a1b7" }}></i>
                                                            :
                                                            <i className="fa-solid fa-eye fs-3" style={{ color: "#99a1b7" }}></i>
                                                    }
                                                </div>
                                                <div className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px me-2 border" onClick={() => { setFranchisingEdit({ id: d.id, status: true }); EditFranchising(d.id); GetCounty(d.city) }}>
                                                    <i className="fa-solid fa-square-pen fs-3" style={{ color: "#99a1b7" }}></i>
                                                </div>
                                                <div className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px border me-2" onClick={() => { setModal({ id: d.id, status: "delete_franchising" }) }}>
                                                    <i className="fa-solid fa-trash fs-3" style={{ color: "#99a1b7" }}></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        FranchisingData.length === 0 &&
                        <div className="p-5">
                            <div className="card shadow-sm border h-300px">
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <div className="text-center">
                                        <i className="fa-solid fa-folder-tree fs-1"></i>
                                        <div className="fs-4 mt-3">Tablonuzda veri bulunamadı.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            {/* BUTTON */}
            <div className="col-10 mb-20 mt-20" hidden={FranchisingNew ? false : true}>
                <div className="menu-container">
                    <div className="menu-sticky shadow-sm" style={{ width: "82.7%" }}>
                        <div className="w-100">
                        </div>
                        <div className="w-100 d-flex justify-content-end">
                            <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { InsertFranchising() }}>Değişiklikleri Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-10 mb-20 mt-20" hidden={FranchisingNew || FranchisingEdit.status ? false : true}>
                <div className="menu-container">
                    <div className="menu-sticky shadow-sm" style={{ width: "82.7%" }}>
                        <div className="w-100">
                        </div>
                        <div className="w-100 d-flex justify-content-end">
                            <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { UpdateFranchising(FranchisingEdit.id) }}>Değişiklikleri Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            <div className={`modal fade ${Modal.status === "delete_franchising" ? "show" : ""}`} tabIndex={-1} style={{ display: Modal.status === "delete_franchising" ? "block" : "none" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Silme İşlmi</h3>

                            <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" onClick={() => { setModal({ id: 0, status: "" }) }}>
                                <i className="ki-duotone ki-cross fs-1"><span className="path1"></span><span className="path2"></span></i>
                            </div>
                        </div>
                        <div className="modal-body text-center">
                            <p className="fs-5">Bu veriyi silmek istediğinize emin misiniz ?</p>
                        </div>
                        <div className="modal-footer w-100">
                            <div className="d-flex w-100">
                                <div className="w-100 d-flex justify-content-end me-2">
                                    <button className="btn btn-sm" style={{ backgroundColor: "#e74c3c", color: "#fff" }} onClick={() => { setModal({ id: 0, status: "" }) }}>İptal</button>
                                </div>
                                <div className="w-100 d-flex justify-content-start ms-2">
                                    <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { DeleteFranchising(Modal.id) }}>Sil</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {Modal.status === "delete_franchising" ? <div className="modal-backdrop fade show"></div> : ""}
        </Layout>
    )
}
export default Index;