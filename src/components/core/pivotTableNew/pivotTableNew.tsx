// (C) 2019 GoodData Corporation
import * as React from "react";
import { noop, omit } from "lodash";
import { VisualizationObject } from "@gooddata/typings";
import { convertBucketsToAFM } from "../../../helpers/conversion";
import { getResultSpec } from "../../../helpers/resultSpec";
import { getPivotTableDimensions } from "../../../helpers/dimensions";
import { hasDuplicateIdentifiers } from "../../../helpers/errorHandlers";
import { getBuckets, IPivotTableBucketProps, IPivotTableProps } from "../../PivotTable";
import PivotTableWrapper from "./pivotTableWrapper";

const PivotTableNew = (props: any) => {
    const { sortBy, filters, exportTitle } = props;

    const buckets: VisualizationObject.IBucket[] = getBuckets(props);

    const afm = convertBucketsToAFM(buckets, filters);

    const resultSpec = getResultSpec(buckets, sortBy, getPivotTableDimensions);

    hasDuplicateIdentifiers(buckets);

    const newProps: any = omit<IPivotTableProps, keyof IPivotTableBucketProps>(props, [
        "measures",
        "rows",
        "columns",
        "totals",
        "filters",
        "sortBy",
    ]);

    return (
        <PivotTableWrapper
            onLoadingChanged={noop}
            onExportReady={noop}
            onError={noop}
            pushData={noop}
            {...newProps}
            afm={afm}
            resultSpec={resultSpec}
            exportTitle={exportTitle}
        />
    );
};

export default PivotTableNew;
