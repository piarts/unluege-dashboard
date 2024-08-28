import axios from "axios";
import Layout from "../layout";
import { Drawer, Root } from "@/libs/module";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKE_Module from "@/libs/class.ckeditor";




function Index() {
    const slide = useRef<any>(null)
    const [Error, setError] = useState<number>(200)
    const [Drawer, setDrawer] = useState<string>("")
    const [Modal, setModal] = useState<any>({ id: 0, status: "" })

    const [ServiceCategoryType, setServiceCategoryType] = useState<any>()
    const [ServiceCategoryTops, setServiceCategoryTops] = useState<number>(0)
    const [ServiceCategoryName, setServiceCategoryName] = useState<string>("")

    const [ServiceNew, setServiceNew] = useState<boolean>(false)
    const [ServiceEdit, setServiceEdit] = useState<any>({ id: 0, status: false })
    const [ServiceCategory, setServiceCategory] = useState<any>()
    const [ServiceTitle, setServiceTitle] = useState<any>()
    const [ServiceContent, setServiceContent] = useState<any>()
    const [ServiceImage, setServiceImage] = useState<any>({ blob: "", file: "" })


    const [ServiceData, setServiceData] = useState<any>([])
    const ListService = () => {
        axios.get(`${Root({ type: "root" })}/api.php?params=list-service`).then((data) => {
            if (data.data.status) {
                setServiceData(data.data.data)
            }
        })
    }
    const [ServiceCategoryData, setServiceCategoryData] = useState<any>([])
    const ListServiceCategory = () => {
        axios.get(`${Root({ type: "root" })}/api.php?params=list-service-category`).then((data) => {
            if (data.data.status) {
                setServiceCategoryData(data.data.data)
            }
        })
    }
    const SelectServiceImage = (e: any) => {
        e.preventDefault();
        const [file] = e.target.files;
        const url = URL.createObjectURL(file);
        const data = new FormData();
        data.append('file', file);
        setServiceImage({ blob: url, file: file })
    }
    const FindServiceCategory = (e: any) => {
        const result = ServiceCategoryData.filter((f: any) => { return (f.id === e) })
        if (result.length > 0) {
            return result[0]["category"]
        }
        else {
            return ""
        }
    }
    const InsertService = async () => {
        const data = new FormData();
        data.append('file', ServiceImage.file);
        var res = (await axios.post(`${Root({ type: "root" })}/file.php`, data)).data;
        var result = `${Root({ type: "root" })}/upload/${res}`
        console.log(ServiceTitle, ServiceCategory, ServiceContent, result)
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "insert-service",
            title: ServiceTitle,
            category: ServiceCategory,
            content: ServiceContent,
            image: result
        }).then((data) => {
            if (data.data.status) {
                ListService()
                toast.success("Servis Eklendi")
            }
        })
    }
    const InsertServiceCategory = () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "insert-service-category",
            pid: ServiceCategoryTops,
            category: ServiceCategoryName
        }).then((data) => {
            if (data.data.status) {
                ListServiceCategory()
                toast.success("Servis Kategorisi Eklendi")
            }
        })
    }
    const UpdateService = async (e: any) => {
        const data = new FormData();
        var result = "";
        if (ServiceImage.file === "") {
            result = ServiceImage.blob;
        }
        else {
            data.append('file', ServiceImage.file);
            var res = (await axios.post(`${Root({ type: "root" })}/file.php`, data)).data;
            result = `${Root({ type: "root" })}/upload/${res}`
        }
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "update-service",
            id: e,
            title: ServiceTitle,
            category: ServiceCategory,
            content: ServiceContent,
            image: result
        }).then((data) => {
            if (data.data.status) {
                ListService()
                toast.success("Ürün Güncellendi")
            }
        })
    }
    const DeleteService = (e: any) => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "delete-service",
            id: e,
        }).then((data) => {
            if (data.data.status) {
                ListService()
                toast.success("Servis Silindi")
                setModal({ id: 0, status: "" })
            }
        })
    }
    const EditService = (e: any) => {
        const result = ServiceData.filter((f: any) => { return (f.id === e) })
        if (result.length > 0) {
            setServiceTitle(result[0]["title"])
            setServiceCategory(result[0]["category"])
            setServiceContent(result[0]["content"])
            setServiceImage({ blob: result[0]["image"], file: "" })
        }
        else {

        }
    }
    const ClearService = () => {
        setServiceTitle("")
        setServiceCategory(0)
        setServiceContent("")
        setServiceImage({ blob: "", file: "" })
    }
    useEffect(() => {
        ListService()
        ListServiceCategory()
    }, [])
    return (
        <Layout>
            {/* Header */}
            <div className="row">
                <div className="col-lg-12 mb-4">
                    <div className="w-100 d-flex justify-content-end">
                        {
                            ServiceNew || ServiceEdit.status ?
                                <>
                                    <button className="btn h-40px w-150px ms-2" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { setServiceNew(false); setServiceEdit({ id: 0, status: false }) }}>
                                        <i className="fa-solid fa-chevron-left me-2"></i>
                                        Listeye Dön
                                    </button>
                                </>
                                :
                                <>
                                    <button className="btn h-40px ms- me-4" style={{ backgroundColor: "#d7d7d7", color: "#555" }} onClick={() => {
                                        setServiceCategoryType(0);
                                        setDrawer("service_category");
                                        setServiceCategoryTops(0);
                                        setServiceCategoryName("");
                                    }}>
                                        <i className="fa-solid fa-circle-plus me-2"></i>
                                        Kategori Ekle
                                    </button>
                                    <button className="btn h-40px ms-2" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { setServiceNew(true); ClearService() }}>
                                        <i className="fa-solid fa-circle-plus me-2"></i>
                                        Hizmet Ekle
                                    </button>
                                </>
                        }
                    </div>
                </div>
            </div>
            {/* Edit Or New */}
            <div className="row mb-10" hidden={ServiceNew || ServiceEdit.status ? false : true}>
                <div className="col-lg-4 mb-4">
                    <div className="mb-10">
                        <div className="slide-container" style={{ backgroundImage: `url(${ServiceImage.blob})` }}>
                            <div className="slide-inner" style={{ height: "340px", position: "relative", border: Error === 200 ? "dashed 1px #E8E8E8" : "dashed 2px #e74c3c", backgroundColor: Error === 200 ? "#e8e8e800" : "#e74c3c45" }}>
                                <div className="text-center">
                                    <div className="d-flex justify-content-center mb-2 ms-2">
                                        <div className="slide-menu shadow-sm cursor-pointer border" onClick={() => { document.getElementById(`id_service`)?.click() }}>
                                            <i className="fa-solid fa-cloud-arrow-up fs-1"></i>
                                            <input type="file" id={`id_service`} onChange={(e: any) => { SelectServiceImage(e) }} hidden />
                                        </div>
                                    </div>
                                    <div className="fs-5 fw-semibold">Hizmet Sekansı için resim</div>
                                    <div className="fs-6 fw-normal mt-1">Resim 1:1 Ratio (Kare Olmak Zorundadır)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 mb-4">
                    <div className="row">
                        <div className="col-lg-3 mb-4">
                            <select className="form-select" onChange={(e: any) => { setServiceCategory(e.target.value) }}>
                                <option>Kategori Seç</option>
                                {(ServiceCategoryData || []).map((d: any, x: number) => { return (<option key={`cat1-${x}`} selected={ServiceCategory === d.id ? true : false} value={d.id}>{d.category}</option>) })}
                            </select>
                        </div>
                        <div className="col-lg-12 mb-4">
                            <input className="form-control" placeholder="Hizmet Başlığı" value={ServiceTitle} onChange={(e: any) => { setServiceTitle(e.target.value) }} />
                        </div>
                        <div className="col-lg-12">
                            <CKE_Module load={ServiceContent} style={"200px"} response={(e: any) => { setServiceContent(e) }} />
                        </div>
                    </div>
                </div>
            </div>
            {/* List */}
            <div style={{ overflowY: "auto", overflowX: "hidden", height: "600px" }} className="border p-3 rounded-1" hidden={ServiceNew || ServiceEdit.status ? true : false}>
                <div className="row mb-10">
                    {
                        (ServiceData || []).map((d: any, x: number) => {
                            return (
                                <div className="col-lg-12 mb-5" key={`service-${x}`}>
                                    <div className="card shadow-sm cursor-pointer">
                                        <div className="card-body d-flex p-0">
                                            <div className="h-70px d-flex align-items-center justify-content-center" style={{ borderRight: "solid 1px #e7e7e7" }}>
                                                <div className="fs-3 w-40px d-flex align-items-center justify-content-center">{x + 1}</div>
                                            </div>
                                            <div className="w-100px h-70px d-flex align-items-center" style={{ borderRight: "solid 1px #e7e7e7" }}>
                                                {
                                                    d.image === "" ?
                                                        <div className="d-flex align-items-center justify-content-center" style={{ height: "70px", width: "70px" }}>
                                                            <i className="fa-solid fa-image fs-2" ></i>
                                                        </div>
                                                        :
                                                        <div className="bg-image" style={{ backgroundImage: `url(${d.image})` }}></div>
                                                }
                                            </div>
                                            <div className="w-100 h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                                                <div className="w-100 ms-2">
                                                    <div className="fw-bold">Hizmet Adı</div>
                                                    <div>{d.title}</div>
                                                </div>
                                            </div>
                                            <div className="w-100 h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                                                <div className="w-100 ms-2">
                                                    <div className="fw-bold">Kategori</div>
                                                    {FindServiceCategory(d.category)}
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
                                                <div className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px me-2 border" onClick={() => { setServiceEdit({ id: d.id, status: true }); EditService(d.id); }}>
                                                    <i className="fa-solid fa-square-pen fs-3" style={{ color: "#99a1b7" }}></i>
                                                </div>
                                                <div className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px border me-2" onClick={() => { setModal({ id: d.id, status: "delete_service" }) }}>
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
                        ServiceData.length === 0 &&
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


            {/*Button */}
            <div className="col-10 mb-20 mt-20" hidden={ServiceNew ? false : true}>
                <div className="menu-container">
                    <div className="menu-sticky shadow-sm" style={{ width: "82.8%" }}>
                        <div className="w-100">
                        </div>
                        <div className="w-100 d-flex justify-content-end">
                            <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { InsertService() }}>Değişiklikleri Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-10 mb-20 mt-20" hidden={ServiceEdit.status ? false : true}>
                <div className="menu-container">
                    <div className="menu-sticky shadow-sm" style={{ width: "82.8%" }}>
                        <div className="w-100">
                        </div>
                        <div className="w-100 d-flex justify-content-end">
                            <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { UpdateService(ServiceEdit.id) }}>Değişiklikleri Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Modal */}
            <div className={`modal fade ${Modal.status === "delete_service" ? "show" : ""}`} tabIndex={-1} style={{ display: Modal.status === "delete_service" ? "block" : "none" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Silme İşlmi</h3>

                            <div className="btn btn-icon btn-sm btn-active-light-primary ms-2">
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
                                    <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { DeleteService(Modal.id) }}>Sil</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {Modal.status === "delete_service" ? <div className="modal-backdrop fade show"></div> : ""}

            {/*Drawer */}
            <div className={`bg-white drawer drawer-end ${Drawer === "service_category" ? "drawer-on" : ""} shadow-sm`} style={{ width: "500px" }} >
                <div className="card rounded-0 w-100">
                    <div className="card-header pe-5">
                        <div className="card-title">
                            <div className="d-flex justify-content-center flex-column me-3">
                                <a href="#" className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">Yeni Kategori</a>
                            </div>
                        </div>
                        <div className="card-toolbar">
                            <div className="btn btn-sm btn-icon btn-active-light-primary" onClick={() => { setDrawer("") }}>
                                <i className="ki-duotone ki-cross fs-2">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </i>
                            </div>
                        </div>
                    </div>
                    <div className="card-body hover-scroll-overlay-y">
                        <div className="row">
                            <div className="col-lg-12 mb-4">
                                <select className="form-select" value={ServiceCategoryType} onChange={(e: any) => { setServiceCategoryType(e.target.value) }}>
                                    <option value={0}>Kategori Türü</option>
                                    <option value={1}>Üst Kategori</option>
                                    <option value={2}>Üst Alt Kategori</option>
                                </select>
                            </div>

                            {
                                parseInt(ServiceCategoryType) === 1 &&
                                <div className="col-lg-12">
                                    <input className="form-control" placeholder="Kategori Adı" value={ServiceCategoryName} onChange={(e: any) => { setServiceCategoryName(e.target.value) }} />
                                </div>
                            }
                            {
                                parseInt(ServiceCategoryType) === 2 &&
                                <>
                                    <div className="col-lg-12 mb-4">
                                        <select className="form-select" onChange={(e: any) => { setServiceCategoryTops(e.target.value) }}>
                                            <option>Üst Kategori Seç</option>
                                            {(ServiceCategoryData || []).map((d: any, x: number) => { return (<option key={`cat2-${x}`} value={d.id}>{d.category}</option>) })}
                                        </select>
                                    </div>
                                    <div className="col-lg-12">
                                        <input className="form-control" placeholder="Kategori Adı" value={ServiceCategoryName} onChange={(e: any) => { setServiceCategoryName(e.target.value) }} />
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className="card-footer d-flex">
                        <div className="w-100">
                            <button className="btn btn-sm" style={{ backgroundColor: "#e74c3c", color: "#fff" }} onClick={() => { setDrawer("") }}>Kapat</button>
                        </div>
                        <div className="w-100 d-flex justify-content-end">
                            <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { InsertServiceCategory() }}>Değişiklikleri Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>
            {Drawer === "service_category" ? <div className="drawer-overlay" onClick={() => { setDrawer("") }} style={{ zIndex: 109, backgroundColor: "#00000038" }}></div> : <></>}
        </Layout>
    )
}

export default Index;