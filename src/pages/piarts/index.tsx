import Layout from "./layout";

function Index() {


    return (
        <Layout>
            <div className="p-5">
                <div className="card shadow-sm border h-300px">
                    <div className="card-body d-flex justify-content-center align-items-center">
                        <div className="text-center">
                            <div className="mt-3" style={{ fontSize: "38px", fontWeight: "700", color: "#888" }}>PiArts Dash</div>
                            <div className="fs-3 fw-normal">version 0.1.0</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Index;


