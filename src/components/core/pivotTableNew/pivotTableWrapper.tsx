// (C) 2019 GoodData Corporation
import * as React from "react";
import { noop } from "lodash";
import {
    ICommonVisualizationProps,
    ILoadingInjectedProps,
    visualizationLoadingHOC,
} from "../base/VisualizationLoadingHOC";
import { IDataSourceProviderInjectedProps } from "../../..";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { executionToAGGridAdapter } from "../pivotTable/agGridDataSource";
import { PAGE_LIMIT, ROW_HEIGHT } from "./constants";
import { dataSourceProvider } from "../../afm/DataSourceProvider";
import PivotTableVisual from "./pivotTableVisual";

export type IPivotTableWrapperProps = ILoadingInjectedProps &
    ICommonVisualizationProps &
    IDataSourceProviderInjectedProps &
    InjectedIntlProps;

export interface IPivotTableWrapperState {
    offset: number;
    rowCount: number;
    rowData: any[];
    columnDefs: any[];
    isLoadingNextPage: boolean;
    scrollPositionBottom: number;
    isAllLoaded: boolean;
}

const shouldLoadNextPage = (scrollPositionBotton: number, offset: number) => {
    return scrollPositionBotton >= offset * PAGE_LIMIT * ROW_HEIGHT;
};

class PivotTableWrapper extends React.Component<IPivotTableWrapperProps> {
    public state: IPivotTableWrapperState = {
        offset: 0,
        rowCount: 0,
        rowData: [],
        columnDefs: [],
        isLoadingNextPage: false,
        scrollPositionBottom: 0,
        isAllLoaded: false,
    };

    public componentDidMount() {
        this.loadNextPage();
    }

    public render() {
        const { isLoading, error } = this.props;
        const { rowData, columnDefs, offset, rowCount, isAllLoaded } = this.state;

        return (
            <PivotTableVisual
                rowData={rowData}
                columnDefs={columnDefs}
                offset={offset}
                onScroll={this.onScroll}
                rowCount={rowCount}
                error={error}
                isAllLoaded={isAllLoaded}
                showLoadingOverlay={isLoading && columnDefs.length === 0}
            />
        );
    }

    private onScroll = ({ api }: any) => {
        const { offset } = this.state;
        const { bottom } = api.getVerticalPixelRange();

        this.setState({ scrollPositionBottom: bottom });

        if (shouldLoadNextPage(bottom, offset)) {
            this.loadNextPage();
        }
    };

    private async loadNextPage() {
        const { getPage, resultSpec, intl } = this.props;
        const { offset, rowCount, isLoadingNextPage } = this.state;

        if (isLoadingNextPage) {
            return;
        }

        if (rowCount !== 0 && rowCount === this.state.rowData.length) {
            return;
        }

        this.setState({ isLoadingNextPage: true });

        const execution = await getPage(
            resultSpec,
            [PAGE_LIMIT, undefined],
            [offset * PAGE_LIMIT, undefined],
        );

        if (!execution) {
            this.setState({ isLoadingNextPage: false });
            return;
        }

        const { columnDefs, rowData } = executionToAGGridAdapter(execution, resultSpec, intl);

        this.setState(
            {
                isLoadingNextPage: false,
                offset: offset + 1,
                columnDefs,
                rowData: this.state.rowData.concat(rowData),
                rowCount: execution.executionResult.paging.count[1],
                isAllLoaded: rowData.length < PAGE_LIMIT,
            },
            () => {
                const { scrollPositionBottom, offset } = this.state;
                if (shouldLoadNextPage(scrollPositionBottom, offset)) {
                    this.loadNextPage();
                }
            },
        );
    }
}

export default dataSourceProvider(
    visualizationLoadingHOC(injectIntl(PivotTableWrapper), false),
    noop as any,
    "PivotTable",
);
