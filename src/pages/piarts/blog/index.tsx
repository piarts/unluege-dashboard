import { useEffect, useState } from "react";
import Layout from "../layout";
import axios from "axios";
import { Drawer, Root } from "@/libs/module";
import { toast } from "react-toastify";
import CKE_Module from "@/libs/class.ckeditor";
function Index() {

    const [Modal, setModal] = useState({ id: 0, status: "" })

    const [BlogData, setBlogData] = useState<any>([])
    const [Process, setProcess] = useState<string>("list")
    const [DrawerOpen, setDrawerOpen] = useState<string>("")

    const [CategoryData, setCategoryData] = useState<any>([])
    const [CategoryType, setCategoryType] = useState<any>(0)
    const [CategoryTops, setCategoryTops] = useState<number>(0)
    const [CategoryName, setCategoryName] = useState<string>("")

    const Get_Category_List = () => {
        axios.get(`${Root({ type: "root" })}/api.php?params=list-blog-category`).then((data) => {
            if (data.data.status) {
                setCategoryData(data.data.data)
            }
        })
    }
    const Get_Category_Find = (e: any) => {
        return ""
    }
    const Set_Category_Insert = () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "insert-blog-category",
            pid: CategoryTops,
            category: CategoryName,
        }).then((data) => {
            if (data.data.status) {
                toast.success("Kategori Eklendi");
                Get_Category_List();
            }
        })
    }
    const Set_Category_Update = (e: any) => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "update-blog-category",
            pid: CategoryTops,
            category: CategoryName,
            id: e
        }).then((data) => {
            if (data.data.status) {
                toast.success("Kategori Güncellendi");
                Get_Category_List();
            }
        })
    }
    const Set_Category_Delete = (e: any) => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "delete-blog-category",
            id: e,
        }).then((data) => {
            if (data.data.status) {
                toast.success("Kategori Silindi")
            }
        })
    }
    const Set_Category_Input_Clear = () => {
        setCategoryType(0)
        setCategoryTops(0)
        setCategoryName("")
    }

    const [BlogId, setBlogId] = useState<any>()
    const [BlogImage, setBlogImage] = useState<any>({ blob: "", file: "" })

    const [BlogTitle, setBlogTitle] = useState<string>("")
    const [BlogContent, setBlogContent] = useState<string>("")
    const [BlogKeyword, setBlogKeyword] = useState<string>("")
    const [BlogCategory, setBlogCategory] = useState<any>(0)


    const Get_Blog_Image = (e: any) => {
        e.preventDefault();
        const [file] = e.target.files;
        const url = URL.createObjectURL(file);
        const data = new FormData();
        data.append('file', file);
        setBlogImage({ blob: url, file: file })
    }
    const Get_Blog_List = () => {
        axios.get(`${Root({ type: "root" })}/api.php?params=list-blog`).then((data) => {
            if (data.data.status) {
                setBlogData(data.data.data)
            }
        })
    }
    const Get_Blog_Edit = (e: any) => {
        const result = BlogData.filter((f: any) => { return (f.id === e) })
        if (result.length > 0) {
            setBlogImage({ blob: result[0]["image"], file: "" })
            setBlogTitle(result[0]["title"])
            setBlogContent(result[0]["content"])
            setBlogKeyword(result[0]["keywords"])
            setBlogCategory(result[0]["category"])
            setBlogId(e)
        }

    }
    const Set_Blog_Insert = async () => {
        var image = "";
        const data = new FormData();
        data.append('file', BlogImage.file);
        var res = (await axios.post(`${Root({ type: "root" })}/file.php`, data)).data;
        image = `${Root({ type: "root" })}/upload/${res}`
        console.log(image, BlogTitle, BlogContent, BlogKeyword, BlogCategory)
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "insert-blog",
            title: BlogTitle,
            content: BlogContent,
            image: image,
            keywords: BlogKeyword,
            category: BlogCategory
        }).then((data) => {
            console.log(data)
            if (data.data.status) {
                toast.success("Yazı Eklendi");
                Get_Blog_List();
            }
        })
    }
    const Set_Blog_Update = async (e: any) => {
        var image = "";
        const data = new FormData();
        if (BlogImage.file === "") {
            image = BlogImage.blob;
        }
        else {
            data.append('file', BlogImage.file);
            var res = (await axios.post(`${Root({ type: "root" })}/file.php`, data)).data;
            image = `${Root({ type: "root" })}/upload/${res}`
        }
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "update-blog",
            title: BlogTitle,
            content: BlogContent,
            image: image,
            keywords: BlogKeyword,
            category: BlogCategory,
            id: e,
        }).then((data) => {
            if (data.data.status) {
                toast.success("Yazı Güncellendi");
                Get_Blog_List();
            }
        })
    }
    const Set_Blog_Delete = (e: any) => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "delete-blog",
            id: e,
        }).then((data) => {
            if (data.data.status) {
                toast.success("Yazı Silindi");
                setModal({ id: 0, status: "" })
                Get_Blog_List();
            }
        })
    }

    const Set_Blog_Input_Clear = () => {
        setBlogImage({ blob: "", file: "" })
        setBlogTitle("")
        setBlogContent("")
        setBlogKeyword("")
        setBlogCategory(0)
    }


    useEffect(() => {
        Get_Blog_List();
        Get_Category_List();
    }, [])
    return (
        <Layout>



            {/* Header */}
            <div className="row">
                <div className="col-lg-12 mb-4">
                    <div className="w-100 d-flex justify-content-end">
                        {
                            Process === "edit" || Process === "new" ?
                                <>
                                    <button className="btn h-40px w-150px ms-2" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { setProcess("list") }}>
                                        <i className="fa-solid fa-chevron-left me-2"></i>
                                        Listeye Dön
                                    </button>
                                </>
                                :
                                <>
                                    <button className="btn h-40px ms- me-4" style={{ backgroundColor: "#d7d7d7", color: "#555" }} onClick={() => { setDrawerOpen("category"); Set_Category_Input_Clear() }}>
                                        <i className="fa-solid fa-circle-plus me-2"></i>
                                        Kategori Ekle
                                    </button>
                                    <button className="btn h-40px ms-2" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { setProcess("new"); Set_Blog_Input_Clear() }}>
                                        <i className="fa-solid fa-circle-plus me-2"></i>
                                        Yazı Ekle
                                    </button>
                                </>
                        }
                    </div>
                </div>
            </div>

            {/* List */}
            <div style={{ overflowY: "auto", overflowX: "hidden", height: "600px" }} className="border p-3 rounded-1" hidden={Process === "list" ? false : true}>
                <div className="row mb-10">
                    {
                        (BlogData || []).map((d: any, x: number) => {
                            return (
                                <div className="col-lg-12 mb-5" key={`blog-${x}`}>
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
                                                    {Get_Category_Find(d.category)}
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
                                                <div className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px me-2 border" onClick={() => { setProcess(`edit`); Get_Blog_Edit(d.id) }}>
                                                    <i className="fa-solid fa-square-pen fs-3" style={{ color: "#99a1b7" }}></i>
                                                </div>
                                                <div className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px border me-2" onClick={() => { setModal({ id: d.id, status: "delete" }) }}>
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
                        BlogData.length === 0 &&
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

            {/* Edit Or New */}
            <div className="row" hidden={Process === "new" || Process === "edit" ? false : true}>
                <div className="card border rounded-1 shadow-sm">
                    <div className="card-body">
                        <div className="row">

                            <div className="col-lg-4 mb-2">
                                <div className="mb-10">
                                    <div className="slide-container" style={{ backgroundImage: `url(${BlogImage.blob})` }}>
                                        <div className="slide-inner" style={{ height: "300px" }}>
                                            <div className="text-center">
                                                <div className="d-flex justify-content-center mb-2 ms-2">
                                                    <div className="slide-menu shadow-sm cursor-pointer border" onClick={() => { document.getElementById(`id_Product`)?.click() }}>
                                                        <i className="fa-solid fa-cloud-arrow-up fs-1"></i>
                                                        <input type="file" id={`id_Product`} onChange={(e: any) => { Get_Blog_Image(e) }} hidden />
                                                    </div>
                                                </div>
                                                <div className="fs-5 fw-semibold">Blog Sekansı için resim</div>
                                                <div className="fs-6 fw-normal mt-1">Resim 2:1 Ratio (Dikdörgen Olmak Zorundadır)</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12"></div>
                            <div className="col-lg-4 mb-5">
                                <label className="mb-1 fs-6 fw-semibold">Kategori</label>
                                <select className="form-select" value={BlogCategory} onChange={(e: any) => { setBlogCategory(e.target.value) }}>
                                    <option>Kategori Seç</option>
                                    {(CategoryData || []).map((d: any, x: number) => { return (<option key={`cat3-${x}`} value={d.id}>{d.category}</option>) })}
                                </select>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-lg-12 mb-5">
                                <div>
                                    <label className="mb-1 fs-6 fw-semibold">Başlık</label>
                                    <input className="form-control" placeholder="Kategori Adı" value={BlogTitle} onChange={(e: any) => { setBlogTitle(e.target.value) }} />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-5">
                                <CKE_Module load={BlogContent} style={"400px"} response={(e: any) => { setBlogContent(e) }} />
                            </div>
                            <div className="col-lg-12">
                                <div>
                                    <label className="mb-1 fs-6 fw-semibold">Anahtar Kelimeler</label>
                                    <input className="form-control" placeholder="Kategori Adı" value={BlogKeyword} onChange={(e: any) => { setBlogKeyword(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BUTTON */}
            <div className="row">
                <div className="col-12 mb-20 mt-20" hidden={Process === "new" ? false : true}>
                    <div className="menu-container">
                        <div className="menu-sticky shadow-sm" style={{ width: "82.8%" }}>
                            <div className="w-100">
                            </div>
                            <div className="w-100 d-flex justify-content-end">
                                <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { Set_Blog_Insert() }}>Değişiklikleri Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mb-20 mt-20" hidden={Process === "edit" ? false : true}>
                    <div className="menu-container">
                        <div className="menu-sticky shadow-sm" style={{ width: "82.8%" }}>
                            <div className="w-100">
                            </div>
                            <div className="w-100 d-flex justify-content-end">
                                <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { Set_Blog_Update(BlogId) }}>Değişiklikleri Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* NODAL */}
            <div className={`modal fade ${Modal.status === "delete" ? "show" : ""}`} tabIndex={-1} style={{ display: Modal.status === "delete" ? "block" : "none" }}>
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
                                    <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { Set_Blog_Delete(Modal.id) }}>Sil</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {Modal.status === "delete" ? <div className="modal-backdrop fade show"></div> : ""}


            {/*DRAWER*/}
            <Drawer id={'category'} open={DrawerOpen} close={() => { setDrawerOpen("") }}>
                <div className="card-body hover-scroll-overlay-y">
                    <div className="row">
                        <div className="col-lg-12 mb-4">
                            <select className="form-select" value={CategoryType} onChange={(e: any) => {
                                setCategoryType(e.target.value);
                                setCategoryTops(0)
                                setCategoryName("")
                            }}>
                                <option value={0}>Kategori Türü</option>
                                <option value={1}>Üst Kategori</option>
                                <option value={2}>Üst Alt Kategori</option>
                            </select>
                        </div>

                        {
                            parseInt(CategoryType) === 1 &&
                            <div className="col-lg-12">
                                <input className="form-control" placeholder="Kategori Adı" value={CategoryName} onChange={(e: any) => { setCategoryName(e.target.value) }} />
                            </div>
                        }
                        {
                            parseInt(CategoryType) === 2 &&
                            <>
                                <div className="col-lg-12 mb-4">
                                    <select className="form-select" onChange={(e: any) => { setCategoryTops(e.target.value) }}>
                                        <option>Kategori Seç</option>
                                        {(CategoryData || []).map((d: any, x: number) => { return (<option key={`cat2-${x}`} value={d.id}>{d.category}</option>) })}
                                    </select>
                                </div>
                                <div className="col-lg-12">
                                    <input className="form-control" placeholder="Kategori Adı" value={CategoryName} onChange={(e: any) => { setCategoryName(e.target.value) }} />
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="card-footer d-flex">
                    <div className="w-100">
                        <button className="btn btn-sm" style={{ backgroundColor: "#e74c3c", color: "#fff" }} onClick={() => { setDrawerOpen("") }}>Kapat</button>
                    </div>
                    <div className="w-100 d-flex justify-content-end">
                        <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { Set_Category_Insert() }}>Değişiklikleri Kaydet</button>
                    </div>
                </div>
            </Drawer>

        </Layout>
    )
}
export default Index;