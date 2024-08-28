import { useEffect, useRef, useState } from "react"

export default function CKE_Module({ load, response, style }: any) {
    const editorRef = useRef<any>()
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor }: any = editorRef.current || {}

    useEffect(() => {
        editorRef.current = {
            // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        }
        setEditorLoaded(true)
    }, [])

    return editorLoaded ? (
        <CKEditor
            editor={ClassicEditor}
            data={load}
            onChange={(event: any, editor: any) => { response(editor.getData()) }}
            onReady={(editor: any) => {
                editor.editing.view.change((writer: any) => {
                    writer.setStyle("min-height", style, editor.editing.view.document.getRoot());
                    writer.setStyle("font-size", "16px", editor.editing.view.document.getRoot())
                });
            }}
        />
    ) : (
        <div>Editor loading</div>
    )
}