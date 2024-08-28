import { useEffect, useRef, useState } from "react";
import Layout from "../layout";
import Nestable from 'react-nestable';
import axios from "axios";
import { Picker, Root, Select } from "@/libs/module";
import { toast } from "react-toastify";

function Index() {

    const slide = useRef<any>(null)
    const [Error, setError] = useState<number>(200)
    const [SlideData, setSlideData] = useState<any>([])
    const GetDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0'dan başladığı için +1 ekliyoruz
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const GetData = () => {
        axios.get(`${Root({ type: "root" })}/api.php?params=list-brand`).then((data) => {
            if (data.data.status) {
                const result = data.data.data[0]
                setSlideData(JSON.parse(result.content))
            }
        })
    }
    const SelectImage = async (e: any, id: any) => {
        e.preventDefault();
        const [file] = e.target.files;
        const url = URL.createObjectURL(file);
        const data = new FormData();
        data.append('file', file);
        setSlideData((old: any) => old.map((slide: any) => parseInt(slide.id) === parseInt(id) ? { ...slide, logo: { blob: url, file: file }, } : slide));
        if (slide.current) {
            slide.current.value = ""
            slide.current.id = ""
        }
    }
    const [Edit, setEdit] = useState<number>(0)
    const [ListEditValue, setListEditValue] = useState<string>("")
    const ListSlideEdit = (e: any, slideId: any, field: any, subField?: any) => {
        const { value, checked }: any = e.target;
        const result = field === "isButtonActive" || field === "isSlideActive" ? checked : value;
        setSlideData((oldSlides: any) =>
            oldSlides.map((slide: any) => {
                if (slide.id === slideId) {
                    if (subField) {
                        return {
                            ...slide, [field]:
                            {
                                [subField]: result,
                                style: {
                                    ...slide[field].style,
                                    [subField]: result
                                }
                            }
                        };
                    } else {

                        return {
                            ...slide,
                            [field]: result
                        };
                    }
                }
                return slide;
            })
        );
    };
    const List = ({ item, index }: { item: any, index: number }) => (
        <div className="col-lg-12" key={`brands-${index}`}>
            <div className="card shadow-sm cursor-pointer" onMouseLeave={() => { setListEditValue(``) }}>
                <div className="card-body d-flex p-0">
                    <div className="h-70px d-flex align-items-center justify-content-center" style={{ borderRight: "solid 1px #e7e7e7" }}>
                        <div className="fs-3 w-40px d-flex align-items-center justify-content-center">{index + 1}</div>
                    </div>
                    <div className="w-100px h-70px d-flex align-items-center" style={{ borderRight: "solid 1px #e7e7e7" }}>
                        {
                            item.logo?.blob === "" ?
                                <div className="d-flex align-items-center justify-content-center" style={{ height: "70px", width: "70px" }}>
                                    <i className="fa-solid fa-image fs-2" ></i>
                                </div>
                                :
                                <div className="bg-image" style={{ backgroundImage: `url(${item.logo?.blob})` }}></div>
                        }
                    </div>
                    <div className="w-100 h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                        <div className="w-100 ms-2">
                            <div className="fw-bold">Başlık</div>
                            <div className="d-flex">
                                {
                                    ListEditValue === `title_edit_${index}` ?
                                        <div className="w-100 me-2">
                                            <input
                                                onBlur={() => { setListEditValue(``) }}
                                                value={item.name || ''}
                                                onChange={(e) => { }}
                                                className="form-control p-0 h-30px default-input"
                                            />
                                        </div>
                                        :
                                        <div className="w-100 h-30px pt-2" onClick={() => { setListEditValue(`title_edit_${index}`) }} style={{ height: "22px" }}>{item.name}</div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-100 h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                        <div className="w-100 ms-2">
                            <div className="fw-bold">Link</div>
                            <div className="d-flex">
                                {
                                    ListEditValue === `slogan_edit_${index}` ?
                                        <div className="w-100 me-2">
                                            <input
                                                onBlur={() => { setListEditValue(``) }}
                                                className="form-control p-0 h-30px default-input"
                                                value={item.link || ''}
                                                onChange={(e) => { ListSlideEdit(e, item.id, 'slogan', "value") }}
                                            />
                                        </div>
                                        :
                                        <div className="w-100 h-30px pt-2" onClick={() => { setListEditValue(`slogan_edit_${index}`) }} style={{ height: "22px" }}>{item.link}</div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="w-200px h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                        <div>
                            <div className="fw-bold">Button</div>
                            <div>
                                {
                                    item.link.status ?
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
                            <div>{item.date}</div>
                        </div>
                    </div>
                    <div className="w-200px h-70px d-flex align-items-center p-4" style={{ borderRight: "solid 1px #e7e7e7" }}>
                        <div
                            className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px me-2 border"
                            onClick={() => {
                                item.status ?
                                    setSlideData((old: any) => old.map((slide: any) => slide.id === parseInt(item.id) ? { ...slide, status: false, } : slide))
                                    :
                                    setSlideData((old: any) => old.map((slide: any) => slide.id === parseInt(item.id) ? { ...slide, status: true, } : slide))
                                item.status ?
                                    toast.error("Slide listede gizlendi")
                                    :
                                    toast.success("Slide listede gösriliyor.")
                            }}
                        >
                            {
                                item.status ?
                                    <i className="fa-solid fa-eye-slash fs-3" style={{ color: "#99a1b7" }}></i>
                                    :
                                    <i className="fa-solid fa-eye fs-3" style={{ color: "#99a1b7" }}></i>
                            }

                        </div>
                        <div className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px me-2 border" onClick={() => { setEdit(item.id) }}>
                            <i className="fa-solid fa-square-pen fs-3" style={{ color: "#99a1b7" }}></i>
                        </div>
                        <div className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px border me-2" onClick={() => { DeleteService(item.id) }}>
                            <i className="fa-solid fa-trash fs-3" style={{ color: "#99a1b7" }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    const Add = () => {
        const added = [{
            id: SlideData.length + 1,
            name: "",
            link: "",
            text: "",
            status: true,
            logo: {
                blob: "",
                file: null
            },

            date: GetDate()
        }, ...SlideData]
        setSlideData(added)

        setEdit(SlideData.length + 1)
    }
    const Save = async () => {
        const data = new FormData();
        var added = [];
        for (let i = 0; i < SlideData.length; i++) {
            if (SlideData[i]["logo"]["file"] === null) {
                added[i] = {
                    id: SlideData[i]["id"],
                    name: SlideData[i]["name"],
                    link: SlideData[i]["link"],
                    text: SlideData[i]["text"],
                    status: SlideData[i]["status"],
                    logo: {
                        blob: SlideData[i]["logo"]["blob"],
                        file: null
                    },
                    date: SlideData[i]["date"],
                }
            }
            else {
                data.append('file', SlideData[i]["logo"]["file"]);
                var result = (await axios.post(`${Root({ type: "root" })}/file.php`, data)).data;
                added[i] = {

                    id: SlideData[i]["id"],
                    name: SlideData[i]["name"],
                    link: SlideData[i]["link"],
                    text: SlideData[i]["text"],
                    status: SlideData[i]["status"],
                    logo: {
                        blob: `${Root({ type: "root" })}/upload/${result}`,
                        file: null
                    },
                    date: SlideData[i]["date"],
                }
            }
        }
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "insert-brand",
            content: added
        }).then((data) => {
            if (data.data.status) {
                toast.success("Marka Kayıt Edildi.")
            }
        })
    }
    const ImageInfo = (id: any) => {
        return (
            <div>
                {
                    Error === 200 &&
                    <div className="d-flex mb-2 ms-2">
                        <div className="slide-menu shadow-sm cursor-pointer border" onClick={() => { slide.current.click(); slide.current.id = id.id }}>
                            <i className="fa-solid fa-cloud-arrow-up fs-1"></i>
                            <input type="file" ref={slide} onChange={(e: any) => { SelectImage(e, slide.current.id) }} hidden />
                        </div>
                    </div>
                }
                {
                    Error === 201 &&
                    <div className="d-flex mb-2 ms-2">
                        <div className="slide-menu shadow-sm cursor-pointer me-2 border" onClick={() => { slide.current.click(); slide.current.id = id.id }}>
                            <i className="fa-solid fa-cloud-arrow-up fs-1"></i>
                            <input type="file" ref={slide} onChange={(e: any) => { SelectImage(e, slide.current.id) }} hidden />
                        </div>
                        <div className="slide-menu shadow-sm cursor-pointer me-2" onClick={() => { slide.current.id = ""; slide.current.value = ""; setError(200) }}>
                            <i className="fa-solid fa-circle-xmark fs-1"></i>
                        </div>
                        <div className="slide-menu shadow-sm cursor-pointer w-300px">
                            Resmin Pixel Boyutu <b className="ms-2 me-2">1805X847</b> olmalıdır.
                        </div>
                    </div>
                }
                {
                    Error === 404 &&
                    <div className="d-flex mb-2 ms-2">
                        <div className="slide-menu shadow-sm cursor-pointer me-2" onClick={() => { slide.current.click(); slide.current.id = id.id }}>
                            <i className="fa-solid fa-cloud-arrow-up fs-1"></i>
                            <input type="file" ref={slide} onChange={(e: any) => { SelectImage(e, slide.current.id) }} hidden />
                        </div>
                        <div className="slide-menu shadow-sm cursor-pointer me-2" onClick={() => { slide.current.id = ""; slide.current.value = ""; setError(200) }}>
                            <i className="fa-solid fa-circle-xmark fs-1"></i>
                        </div>
                        <div className="slide-menu shadow-sm cursor-pointer w-300px">
                            <b className="ms-2 me-2"> Geçersiz Resim Dosyası</b>
                        </div>
                    </div>
                }
                {
                    Error === 500 &&
                    <div className="d-flex mb-2 ms-2">
                        <div className="slide-menu shadow-sm cursor-pointer me-2" onClick={() => { slide.current.click(); slide.current.id = id.id }}>
                            <i className="fa-solid fa-cloud-arrow-up fs-1"></i>
                            <input type="file" ref={slide} onChange={(e: any) => { SelectImage(e, slide.current.id) }} hidden />
                        </div>
                        <div className="slide-menu shadow-sm cursor-pointer me-2" onClick={() => { slide.current.id = ""; slide.current.value = ""; setError(200) }}>
                            <i className="fa-solid fa-circle-xmark fs-1"></i>
                        </div>
                        <div className="slide-menu shadow-sm cursor-pointer w-300px">
                            <b className="ms-2 me-2"> Dosya Boyutu En Fazla 5MB Olabilir</b>
                        </div>
                    </div>
                }
            </div>
        )
    }
    const DeleteService = (e: any) => {
        setSlideData(SlideData.filter((f: any) => { return (f.id !== e) }))
    }
    useEffect(() => {
        GetData()
    }, [])


    return (
        <Layout>
            <div className="row" hidden={Edit === 0 ? false : true}>
                <div className="col-12 mb-3 d-flex justify-content-start align-items-center">
                    <div className="w-100 d-flex justify-content-end">
                        <button className="btn h-40px w-150px ms-2" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { Add() }}>
                            <i className="fa-solid fa-circle-plus me-2"></i>
                            Yeni Ekle
                        </button>
                    </div>
                </div>
                {
                    SlideData.length === 0 &&
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
                <Nestable
                    maxDepth={1}
                    onChange={(e: any) => { setSlideData(e.items) }}
                    items={SlideData}
                    renderItem={List}
                    disableDrag={ListEditValue === "" ? false : true}
                />
            </div>

            <div className="row" hidden={Edit === 0 ? true : false}>
                <div className="col-12 mb-3 d-flex justify-content-start">
                    <div className="w-100 ms-3">
                    </div>
                    <div className="w-100 d-flex justify-content-end">
                        <button className="btn h-40px w-200px ms-2" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { setEdit(0) }}>
                            <i className="fa-solid fa-chevron-left me-2"></i>
                            Listeye Dön
                        </button>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            {
                                (SlideData || []).filter((f: any, x: number) => { return (f.id === Edit) }).map((d: any, x: number) => {
                                    return (

                                        <div className="row" key={`SlideData-${x}`}>
                                            <div className="col-lg-3">
                                                <div className="mb-10">
                                                    <div className="slide-container" style={{ backgroundImage: `url(${d.logo?.blob})` }}>
                                                        <div className="slide-inner" style={{ height: "300px", position: "relative", border: Error === 200 ? "dashed 1px #E8E8E8" : "dashed 2px #e74c3c", backgroundColor: Error === 200 ? "#e8e8e800" : "#e74c3c45" }}>
                                                            <ImageInfo id={d.id} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-9">
                                                <div className="row">

                                                    { /*Başlık */}
                                                    <div className="col-lg-12">
                                                        <label className=" form-label">Başlık</label>
                                                        <div className="mb-2">
                                                            <input
                                                                className="form-control"
                                                                placeholder="Başlığı"
                                                                value={d.name || ''}
                                                                onChange={(e) => {
                                                                    setSlideData((old: any) => old.map((slide: any) => slide.id === parseInt(d.id) ? { ...slide, name: e.target.value, } : slide));
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    { /* Link */}
                                                    <div className="col-lg-12">
                                                        <div className="mb-2">
                                                            <label htmlFor="exampleFormControlInput1" className=" form-label">Bağlantı</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Bağlantı Url'si (Opsiyonel)"
                                                                value={d.link || ''}
                                                                onChange={(e) => {
                                                                    setSlideData((old: any) => old.map((slide: any) => slide.id === parseInt(d.id) ? { ...slide, link: e.target.value, } : slide));
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    { /* Text */}
                                                    <div className="col-lg-12">
                                                        <div className="mb-2">
                                                            <label htmlFor="exampleFormControlInput1" className=" form-label">Metin</label>
                                                            <textarea
                                                                rows={5}
                                                                className="form-control"
                                                                placeholder="Bağlantı Url'si (Opsiyonel)"
                                                                value={d.text || ''}
                                                                onChange={(e) => {
                                                                    setSlideData((old: any) => old.map((slide: any) => slide.id === parseInt(d.id) ? { ...slide, text: e.target.value, } : slide));
                                                                }}
                                                            />
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Button */}
            <div className="row">
                <div className="col-12 mb-20 mt-20">
                    <div className="menu-container">
                        <div className="menu-sticky shadow-sm" style={{ width: "82.5%" }}>
                            <div className="w-100">
                            </div>
                            <div className="w-100 d-flex justify-content-end">
                                <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { Save() }}>Değişiklikleri Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}
export default Index;
