import axios from "axios";
import Layout from "../layout";
import { Drawer, Root } from "@/libs/module";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKE_Module from "@/libs/class.ckeditor";


function Index() {

    const [DrawerOpen, setDrawerOpen] = useState<string>("")
    const [Error, setError] = useState<number>(200)
    const [Modal, setModal] = useState<any>({ id: 0, status: "" })

    const [ProductCategoryType, setProductCategoryType] = useState<any>()
    const [ProductCategoryTops, setProductCategoryTops] = useState<number>(0)
    const [ProductCategoryName, setProductCategoryName] = useState<string>("")


    const [ProductNew, setProductNew] = useState<boolean>(false)
    const [ProductEdit, setProductEdit] = useState<any>({ id: 0, status: false })
    const [ProductCategory, setProductCategory] = useState<any>()
    const [ProductTitle, setProductTitle] = useState<any>()
    const [ProductContent, setProductContent] = useState<any>()
    const [ProductImage, setProductImage] = useState<any>({ blob: "", file: "" })


    const [ProductData, setProductData] = useState<any>([])
    const ListProduct = () => {
        axios.get(`${Root({ type: "root" })}/api.php?params=list-product`).then((data) => {
            if (data.data.status) {
                setProductData(data.data.data)
            }
        })
    }
    const [ProductCategoryData, setProductCategoryData] = useState<any>([])
    const ListProductCategory = () => {
        axios.get(`${Root({ type: "root" })}/api.php?params=list-product-category`).then((data) => {
            if (data.data.status) {
                setProductCategoryData(data.data.data)
            }
        })
    }
    const SelectProductImage = (e: any) => {
        e.preventDefault();
        const [file] = e.target.files;
        const url = URL.createObjectURL(file);
        const data = new FormData();
        data.append('file', file);
        setProductImage({ blob: url, file: file })
    }
    const FindProductCategory = (e: any) => {
        const result = ProductCategoryData.filter((f: any) => { return (f.id === e) })
        if (result.length > 0) {
            return result[0]["category"]
        }
        else {
            return ""
        }
    }
    const InsertProduct = async () => {
        const data = new FormData();
        data.append('file', ProductImage.file);
        var res = (await axios.post(`${Root({ type: "root" })}/file.php`, data)).data;
        var result = `${Root({ type: "root" })}/upload/${res}`
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "insert-product",
            title: ProductTitle,
            category: ProductCategory,
            content: ProductContent,
            image: result
        }).then((data) => {
            if (data.data.status) {
                ListProduct()
                toast.success("Ürün Eklendi")
            }
        })
    }
    const InsertProductCategory = () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "insert-product-category",
            pid: ProductCategoryTops,
            category: ProductCategoryName
        }).then((data) => {
            if (data.data.status) {
                ListProductCategory()
                toast.success("Ürün Kategorisi Eklendi")
            }
        })
    }
    const UpdateProduct = async (e: any) => {
        const data = new FormData();
        var result = "";
        if (ProductImage.file === "") {
            result = ProductImage.blob;
        }
        else {
            data.append('file', ProductImage.file);
            var res = (await axios.post(`${Root({ type: "root" })}/file.php`, data)).data;
            result = `${Root({ type: "root" })}/upload/${res}`
        }
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "update-product",
            id: e,
            title: ProductTitle,
            category: ProductCategory,
            content: ProductContent,
            image: result
        }).then((data) => {
            if (data.data.status) {
                ListProduct()
                toast.success("Ürün Güncellendi")
            }
        })
    }
    const DeleteProduct = (e: any) => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "delete-product",
            id: e,
        }).then((data) => {
            if (data.data.status) {
                ListProduct()
                toast.success("Ürün Silindi")
                setModal({ id: 0, status: "" })
            }
        })
    }
    const EditProduct = (e: any) => {
        const result = ProductData.filter((f: any) => { return (f.id === e) })
        if (result.length > 0) {
            setProductTitle(result[0]["title"])
            setProductCategory(result[0]["category"])
            setProductContent(result[0]["content"])
            setProductImage({ blob: result[0]["image"], file: "" })
        }
        else {

        }
    }
    const ClearProduct = () => {
        setProductTitle("")
        setProductCategory(0)
        setProductContent("")
        setProductImage({ blob: "", file: "" })
    }
    useEffect(() => {
        ListProduct()
        ListProductCategory()
    }, [])
    return (
        <Layout>

            {/* Header */}
            <div className="row">
                <div className="col-lg-12 mb-4">
                    <div className="w-100 d-flex justify-content-end">
                        {
                            ProductNew || ProductEdit.status ?
                                <>
                                    <button className="btn h-40px w-150px ms-2" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { setProductNew(false); setProductEdit({ id: 0, status: false }) }}>
                                        <i className="fa-solid fa-chevron-left me-2"></i>
                                        Listeye Dön
                                    </button>
                                </>
                                :
                                <>
                                    <button className="btn h-40px ms- me-4" style={{ backgroundColor: "#d7d7d7", color: "#555" }} onClick={() => {
                                        setProductCategoryType(0);
                                        setDrawerOpen("category");
                                        setProductCategoryTops(0);
                                        setProductCategoryName("");
                                    }}>
                                        <i className="fa-solid fa-circle-plus me-2"></i>
                                        Kategori Ekle
                                    </button>
                                    <button className="btn h-40px ms-2" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { setProductNew(true); ClearProduct() }}>
                                        <i className="fa-solid fa-circle-plus me-2"></i>
                                        Ürün Ekle
                                    </button>
                                </>
                        }
                    </div>
                </div>
            </div>
            {/* List */}
            <div style={{ overflowY: "auto", overflowX: "hidden", height: "600px" }} className="border p-3 rounded-1" hidden={ProductNew || ProductEdit.status ? true : false}>
                <div className="row mb-10" >
                    {
                        (ProductData || []).map((d: any, x: number) => {
                            return (
                                <div className="col-lg-12 mb-5" key={`product-${x}`}>
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
                                                    {FindProductCategory(d.category)}
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
                                                <div className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px me-2 border" onClick={() => { setProductEdit({ id: d.id, status: true }); EditProduct(d.id) }}>
                                                    <i className="fa-solid fa-square-pen fs-3" style={{ color: "#99a1b7" }}></i>
                                                </div>
                                                <div className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px border me-2" onClick={() => { setModal({ id: d.id, status: "delete_product" }) }}>
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
                        ProductData.length === 0 &&
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
            <div className="row mb-10" hidden={ProductNew || ProductEdit.status ? false : true}>
                <div className="col-lg-4 mb-2">
                    <div className="mb-10">
                        <div className="slide-container" style={{ backgroundImage: `url(${ProductImage.blob})` }}>
                            <div className="slide-inner" style={{ height: "340px", position: "relative", border: Error === 200 ? "dashed 1px #E8E8E8" : "dashed 2px #e74c3c", backgroundColor: Error === 200 ? "#e8e8e800" : "#e74c3c45" }}>
                                <div className="text-center">
                                    <div className="d-flex justify-content-center mb-2 ms-2">
                                        <div className="slide-menu shadow-sm cursor-pointer border" onClick={() => { document.getElementById(`id_Product`)?.click() }}>
                                            <i className="fa-solid fa-cloud-arrow-up fs-1"></i>
                                            <input type="file" id={`id_Product`} onChange={(e: any) => { SelectProductImage(e) }} hidden />
                                        </div>
                                    </div>
                                    <div className="fs-5 fw-semibold">Ürün Sekansı için resim</div>
                                    <div className="fs-6 fw-normal mt-1">Resim 1:1 Ratio (Kare Olmak Zorundadır)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 mb-2">
                    <div className="row">
                        <div className="col-lg-3 mb-4">
                            <select className="form-select" onChange={(e: any) => { setProductCategory(e.target.value) }}>
                                <option>Kategori Seç</option>
                                {(ProductCategoryData || []).map((d: any, x: number) => { return (<option key={`vat-${x}`} selected={ProductCategory === d.id ? true : false} value={d.id}>{d.category}</option>) })}
                            </select>
                        </div>
                        <div className="col-lg-12 mb-4">
                            <input className="form-control" placeholder="Hizmet Başlığı" value={ProductTitle} onChange={(e: any) => { setProductTitle(e.target.value) }} />
                        </div>
                        <div className="col-lg-12">
                            <CKE_Module load={ProductContent} style={"200px"} response={(e: any) => { setProductContent(e) }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* NODAL */}
            <div className={`modal fade ${Modal.status === "delete_product" ? "show" : ""}`} tabIndex={-1} style={{ display: Modal.status === "delete_product" ? "block" : "none" }}>
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
                                    <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { DeleteProduct(Modal.id) }}>Sil</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {Modal.status === "delete_product" ? <div className="modal-backdrop fade show"></div> : ""}

            {/*DRAWER*/}
            <Drawer id={'category'} open={DrawerOpen} close={() => { setDrawerOpen("") }}>
                <div className="card-body hover-scroll-overlay-y">
                    <div className="row">
                        <div className="col-lg-12 mb-4">
                            <select className="form-select" value={ProductCategoryType} onChange={(e: any) => { setProductCategoryType(e.target.value) }}>
                                <option value={0}>Kategori Türü</option>
                                <option value={1}>Üst Kategori</option>
                                <option value={2}>Üst Alt Kategori</option>
                            </select>
                        </div>

                        {
                            parseInt(ProductCategoryType) === 1 &&
                            <div className="col-lg-12">
                                <input className="form-control" placeholder="Kategori Adı" value={ProductCategoryName} onChange={(e: any) => { setProductCategoryName(e.target.value) }} />
                            </div>
                        }
                        {
                            parseInt(ProductCategoryType) === 2 &&
                            <>
                                <div className="col-lg-12 mb-4">
                                    <select className="form-select" onChange={(e: any) => { setProductCategoryTops(e.target.value) }}>
                                        <option>Üst Kategori Seç</option>
                                        {(ProductCategoryData || []).map((d: any, x: number) => { return (<option key={`cat2-${x}`} value={d.id}>{d.category}</option>) })}
                                    </select>
                                </div>
                                <div className="col-lg-12">
                                    <input className="form-control" placeholder="Kategori Adı" value={ProductCategoryName} onChange={(e: any) => { setProductCategoryName(e.target.value) }} />
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
                        <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { DeleteProduct(ProductEdit.id) }}>Değişiklikleri Kaydet</button>
                    </div>
                </div>
            </Drawer>

            {/* BUTTON */}
            <div className="row">
                <div className="col-12 mb-20 mt-20" hidden={ProductNew ? false : true}>
                    <div className="menu-container">
                        <div className="menu-sticky shadow-sm" style={{ width: "81.8%" }}>
                            <div className="w-100">
                            </div>
                            <div className="w-100 d-flex justify-content-end">
                                <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { InsertProduct() }}>Değişiklikleri Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-20 mt-20" hidden={ProductEdit.status ? false : true}>
                    <div className="menu-container">
                        <div className="menu-sticky shadow-sm" style={{ width: "81.8%" }}>
                            <div className="w-100">
                            </div>
                            <div className="w-100 d-flex justify-content-end">
                                <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { UpdateProduct(ProductEdit.id) }}>Değişiklikleri Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </Layout>
    )
}
export default Index;