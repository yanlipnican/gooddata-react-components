// (C) 2019 GoodData Corporation
import * as React from "react";

import { IBaseChartProps, IChartProps } from "../components/core/base/BaseChart";
import { ITableProps } from "../components/core/PureTable";
import { ICommonVisualizationProps } from "../components/core/base/VisualizationLoadingHOC";
import { IDataSourceProviderInjectedProps } from "../components/afm/DataSourceProvider";
import { IPivotTableProps } from "../components/core/PivotTable";

export interface ICoreComponents {
    BaseChart: React.ComponentType<IBaseChartProps>;
    Headline: React.ComponentType<ICommonVisualizationProps & IDataSourceProviderInjectedProps>;
    Table: React.ComponentType<ITableProps & IDataSourceProviderInjectedProps>;
    PivotTable: React.ComponentType<IPivotTableProps>;
    ScatterPlot: React.ComponentType<IChartProps>;
    FunnelChart: React.ComponentType<IChartProps>;
}
