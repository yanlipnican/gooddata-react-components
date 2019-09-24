// (C) 2019 GoodData Corporation
import * as React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { PAGE_LIMIT, ROW_HEIGHT } from "./constants";

const getLoadingRows = (count: number = 10) => {
    if (count <= 0) {
        return [];
    }

    return new Array(count).fill(null).map(() => ({
        isLoading: true,
    }));
};

const CellRenderer = (params: any) => {
    const { value, rowIndex, colDef, offset } = params;

    if (rowIndex > PAGE_LIMIT * offset - 1) {
        return colDef.index === 0 ? "LOADING" : "";
    }

    return `<span>${value}</span>`;
};

export interface IPivotTableVisual {
    columnDefs: any[];
    rowData: any[];
    onScroll: (e: any) => void;
    rowCount: number;
    offset: number;
    showLoadingOverlay: boolean;
    error: any;
    isAllLoaded: boolean;
}

const PivotTableVisual = (props: IPivotTableVisual) => {
    const { columnDefs, rowData, onScroll, rowCount, offset, showLoadingOverlay, error, isAllLoaded } = props;

    if (showLoadingOverlay) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log(error);
        return <div>Error</div>;
    }

    return (
        <div
            className="ag-theme-balham"
            style={{
                height: "300px",
                width: "100%",
            }}
        >
            <AgGridReact
                columnDefs={columnDefs.map(def => ({
                    ...def,
                    cellRenderer: CellRenderer,
                    cellRendererParams: { offset },
                }))}
                rowData={rowData.concat(isAllLoaded ? [] : getLoadingRows((rowCount || 0) - rowData.length))}
                rowHeight={ROW_HEIGHT}
                onBodyScroll={onScroll}
                suppressScrollOnNewData={true}
            />
        </div>
    );
};

export default PivotTableVisual;
