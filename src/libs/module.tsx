import { useEffect, useRef, useState } from "react"

export function Root({ type }: { type: string }) {

    switch (type) {
        case "root": return "http://localhost"
        default: return ""
    }

}

export function Select({ data = [], icon, placeholder, selected, classname, onchange }: { data: any, icon: any, placeholder: string, selected: any, classname: string, onchange: any }) {
    const [Active, setActive] = useState<boolean>(false)
    return (
        <>
            <div className={`pi-select ${classname}`}>
                <div className="ms-2">{icon}</div>
                <div className={`pi-select-input ${classname}`} onClick={() => { Active ? setActive(false) : setActive(true) }}>
                    {placeholder}
                    <i className="fa-solid fa-angle-down fs-4"></i>
                </div>
                <div className={`pi-select-modal shadow-sm ${Active ? "active" : ""}`}>
                    {(data || []).map((d: any, x: number) => (
                        <div className="pi-select-item" key={x} onClick={() => { onchange(d.name) }}>
                            {d.name}
                        </div>
                    ))}
                </div>
            </div>
            {Active &&
                <div onClick={() => { setActive(false) }} style={{ backgroundColor: "transparent", position: "fixed", top: 0, left: 0, zIndex: 1040, height: "100%", width: "100%" }}></div>
            }


        </>
    )
}

export function Picker({ icon, placeholder, selected, classname }: { icon: any, placeholder: string, selected: any, classname: string }) {
    const pickerRef = useRef<any>(null)
    return (
        <>
            <div className={`pi-select ${classname}`} style={{ position: 'relative' }}>
                <div className="ms-2">{icon}</div>
                <div className={`pi-select-input ${classname}`} onClick={() => { pickerRef.current.click(); }}>
                    {placeholder}
                    <i className="fa-solid fa-angle-down fs-4"></i>
                </div>
                <input type="color" className="form-control" ref={pickerRef} style={{ position: 'absolute', top: 25, left: 0, opacity: 0, width: "100px", height: 0 }}
                />
            </div>
        </>
    )
}


export function Drawer({ id, open, close, children }: { id: any, open: any, close: any, children: any }) {


    return (
        <>
            <div className={`bg-white drawer drawer-end ${id === open ? "drawer-on" : ""} shadow-sm`} style={{ width: "500px" }} >
                <div className="card rounded-0 w-100">
                    <div className="card-header pe-5">
                        <div className="card-title">
                            <div className="d-flex justify-content-center flex-column me-3">
                                <a href="#" className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">Yeni Kategori</a>
                            </div>
                        </div>
                        <div className="card-toolbar">
                            <div className="btn btn-sm btn-icon btn-active-light-primary" onClick={() => { close() }}>
                                <i className="ki-duotone ki-cross fs-2">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </i>
                            </div>
                        </div>
                    </div>
                    {children}

                </div>
            </div>
            {id === open ? <div className="drawer-overlay" onClick={() => { close() }} style={{ zIndex: 109, backgroundColor: "#00000038" }}></div> : <></>}
        </>
    )
}