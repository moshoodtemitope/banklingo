import * as React from "react";
import { Viewer, Worker } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import { printPlugin, RenderPrintProps } from '@react-pdf-viewer/print';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/print/lib/styles/index.css';
import PrintBtn from '../../assets/img/print-2.svg';

function PrintReport (props){
    const printPluginInstance = printPlugin();
    const { Print } = printPluginInstance;

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
                
                <Print>
                    {
                        (props= RenderPrintProps) => (
                            <button
                                style={{
                                    // backgroundColor: '#357edd',
                                    border: 'none',
                                    borderRadius: '4px',
                                    // color: '#ffffff',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    width:"40px",
                                    height:"40px",
                                }}
                                onClick={props.onClick}
                            >
                                <img src={PrintBtn} alt="" />
                            </button>
                        )
                    
                    }
                </Print>
            </div>

            <Worker
                workerUrl="https://unpkg.com/pdfjs-dist@2.7.570/build/pdf.worker.min.js">
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