import * as React from "react";
import { Viewer, Worker } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import { printPlugin } from '@react-pdf-viewer/print';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/print/lib/styles/index.css';


function PrintReport (props){
    const printPluginInstance = printPlugin();
    const { PrintButton } = printPluginInstance;

    return(
        <React.Fragment>
            <div
                style={{
                    alignItems: 'center',
                    backgroundColor: '#eeeeee',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    padding: '4px',
                }}
            >
                <PrintButton />
            </div>

            <Worker
                workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
                <Viewer
                    plugins={[
                        // Register plugins
                        printPluginInstance
                    ]}
                    fileUrl={props.fileUrl} />
            </Worker>
        </React.Fragment>
    )
}

export default PrintReport;