import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../layout";
import { Drawer, Root } from "@/libs/module";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKE_Module from "@/libs/class.ckeditor";

interface Data {
    name: string
    params: string
}


function Index() {
    const router = useRouter();
    const { params }: any = router.query
    const Data: Data[] = [
        {
            name: 'Hakkımızda',
            params: '_about',
        },
        {
            name: 'Vizyon',
            params: '_vision',
        },
        {
            name: 'Misyon',
            params: '_mision',
        },
        {
            name: 'Gizlilik Politikası',
            params: '_privacy',
        },
        {
            name: 'Çerez Politikası',
            params: '_cookie',
        },
        {
            name: 'Kullanıcı Veri Politikası',
            params: '_userdata',
        },
        {
            name: 'Kişisel Verileri Koruma Kanunu',
            params: '_kvkk',
        },
        {
            name: 'Künye',
            params: '_tags',
        },


    ]
    useEffect(() => {
        if (!params) {
            router.push(`/piarts/belgeler?params=_about`)
        }
    }, [router])


    const [About, setAbout] = useState<string>("")
    const [Vision, setVision] = useState<string>("")
    const [Mision, setMision] = useState<string>("")
    const [Pravicy, setPravicy] = useState<string>("")
    const [Cookie, setCookie] = useState<string>("")
    const [Userdata, setUserdata] = useState<string>("")
    const [Kvkk, setKvkk] = useState<string>("")
    const [Tags, setTags] = useState<string>("")

    const GetData = () => {
        axios.get(`${Root({ type: "root" })}/api.php?params=list-document`).then((data) => {
            if (data.data.status) {
                setAbout(data.data.data[0]["content"])
                setVision(data.data.data[1]["content"])
                setMision(data.data.data[2]["content"])
                setPravicy(data.data.data[3]["content"])
                setCookie(data.data.data[4]["content"])
                setUserdata(data.data.data[5]["content"])
                setKvkk(data.data.data[6]["content"])
                setTags(data.data.data[7]["content"])
            }
        })
    }

    useEffect(() => {
        GetData();
    }, [])



    const UpdateAbout = () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "update-document",
            id: 1,
            content: About
        }).then((data) => {
            if (data.data.status) {
                toast.success("Servis Silindi")
            }
        })
    }
    const UpdateVision = () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "update-document",
            id: 2,
            content: Vision
        }).then((data) => {
            if (data.data.status) {
                toast.success("Servis Silindi")
            }
        })
    }
    const UpdateMision = () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "update-document",
            id: 3,
            content: Mision
        }).then((data) => {
            if (data.data.status) {
                toast.success("Servis Silindi")
            }
        })
    }
    const UpdatePravicy = () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "update-document",
            id: 4,
            content: Pravicy
        }).then((data) => {
            if (data.data.status) {
                toast.success("Servis Silindi")
            }
        })
    }
    const UpdateCookie = () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "update-document",
            id: 5,
            content: Cookie
        }).then((data) => {
            if (data.data.status) {
                toast.success("Servis Silindi")
            }
        })
    }
    const UpdateUserdata = () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "update-document",
            id: 6,
            content: Userdata
        }).then((data) => {
            if (data.data.status) {
                toast.success("Servis Silindi")
            }
        })
    }
    const UpdateKvkk = () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "update-document",
            id: 7,
            content: Kvkk
        }).then((data) => {
            if (data.data.status) {
                toast.success("Servis Silindi")
            }
        })
    }
    const UpdateTags = () => {
        axios.post(`${Root({ type: "root" })}/api.php`, {
            params: "update-document",
            id: 8,
            content: Tags
        }).then((data) => {
            if (data.data.status) {
                toast.success("Servis Silindi")
            }
        })
    }

    return (
        <Layout>
            <div className="row">
                <div className="col-2">
                    <div className="tabs-menu">
                        <div className="row">
                            {
                                (Data || []).map((d: any, x: number) => {
                                    return (
                                        <div key={`document-${x}`} className="col-12" onClick={() => { router.push(`/piarts/belgeler?params=${d.params}`) }}>
                                            <div className={`tabs-item fw-bold ${params === d.params ? "active" : ""}`}>{d.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className={`tabs-container ${params === "_about" ? "active" : ""}`}>
                        <CKE_Module load={About} style={"500px"} response={(e: any) => { setAbout(e) }} />
                        <div className="w-100 d-flex justify-content-end mt-3">
                            <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { UpdateAbout() }}>Değişiklikleri Kaydet</button>
                        </div>
                    </div>
                    <div className={`tabs-container ${params === "_mision" ? "active" : ""}`}>
                        <CKE_Module load={Mision} style={"500px"} response={(e: any) => { setMision(e) }} />
                        <div className="w-100 d-flex justify-content-end mt-3">
                            <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { UpdateMision() }}>Değişiklikleri Kaydet</button>
                        </div>
                    </div>
                    <div className={`tabs-container ${params === "_vision" ? "active" : ""}`}>
                        <CKE_Module load={Vision} style={"500px"} response={(e: any) => { setVision(e) }} />
                        <div className="w-100 d-flex justify-content-end mt-3">
                            <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { UpdateVision() }}>Değişiklikleri Kaydet</button>
                        </div>
                    </div>
                    <div className={`tabs-container ${params === "_privacy" ? "active" : ""}`}>
                        <CKE_Module load={Pravicy} style={"500px"} response={(e: any) => { setPravicy(e) }} />
                        <div className="w-100 d-flex justify-content-end mt-3">
                            <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { UpdatePravicy() }}>Değişiklikleri Kaydet</button>
                        </div>
                    </div>
                    <div className={`tabs-container ${params === "_cookie" ? "active" : ""}`}>
                        <CKE_Module load={Cookie} style={"500px"} response={(e: any) => { setCookie(e) }} />
                        <div className="w-100 d-flex justify-content-end mt-3">
                            <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { UpdateCookie() }}>Değişiklikleri Kaydet</button>
                        </div>
                    </div>
                    <div className={`tabs-container ${params === "_userdata" ? "active" : ""}`}>
                        <CKE_Module load={Userdata} style={"500px"} response={(e: any) => { setUserdata(e) }} />
                        <div className="w-100 d-flex justify-content-end mt-3">
                            <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { UpdateUserdata() }}>Değişiklikleri Kaydet</button>
                        </div>
                    </div>
                    <div className={`tabs-container ${params === "_kvkk" ? "active" : ""}`}>
                        <CKE_Module load={Kvkk} style={"500px"} response={(e: any) => { setKvkk(e) }} />
                        <div className="w-100 d-flex justify-content-end mt-3">
                            <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { UpdateKvkk() }}>Değişiklikleri Kaydet</button>
                        </div>
                    </div>
                    <div className={`tabs-container ${params === "_tags" ? "active" : ""}`}>
                        <CKE_Module load={Tags} style={"500px"} response={(e: any) => { setTags(e) }} />
                        <div className="w-100 d-flex justify-content-end mt-3">
                            <button className="btn btn-sm" style={{ backgroundColor: "#0053b4", color: "#fff" }} onClick={() => { UpdateTags() }}>Değişiklikleri Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Index;