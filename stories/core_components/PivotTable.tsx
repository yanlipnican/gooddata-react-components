// (C) 2007-2018 GoodData Corporation
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { screenshotWrap } from '@gooddata/test-storybook';

import { PivotTable } from '../../src/index';
import { onErrorHandler } from '../mocks';
import {
    ATTRIBUTE_1,
    ATTRIBUTE_1_WITH_ALIAS,
    ATTRIBUTE_2,
    MEASURE_1,
    MEASURE_1_WITH_ALIAS,
    MEASURE_2
} from '../data/componentProps';

function logTotalsChange(data: any) {
    if (data.properties && data.properties.totals) {
        action('totals changed')(data.properties.totals);
    }
}

const wrapperStyle = { width: 600, height: 300 };

storiesOf('Core components/PivotTable', module)
    .add('two measures, one attribute', () => (
        screenshotWrap(
            <div style={wrapperStyle} className="s-table">
                <PivotTable
                    projectId="storybook"
                    measures={[MEASURE_1, MEASURE_2]}
                    rows={[ATTRIBUTE_1]}
                    onError={onErrorHandler}
                    LoadingComponent={null}
                    ErrorComponent={null}
                />
            </div>
        )
    ))
    .add('renamed measure and renamed attribute', () => (
        screenshotWrap(
            <div style={wrapperStyle} className="s-table">
                <PivotTable
                    projectId="storybook"
                    measures={[MEASURE_1_WITH_ALIAS]}
                    rows={[ATTRIBUTE_1_WITH_ALIAS]}
                    onError={onErrorHandler}
                    LoadingComponent={null}
                    ErrorComponent={null}
                />
            </div>
        )
    ))
    .add('only measures', () => (
        screenshotWrap(
            <div style={wrapperStyle} className="s-table">
                <PivotTable
                    projectId="storybook"
                    measures={[MEASURE_1, MEASURE_2]}
                    LoadingComponent={null}
                    ErrorComponent={null}
                />
            </div>
        )
    ))
    .add('two measures, 2 row attributes', () => (
        screenshotWrap(
            <div style={wrapperStyle} className="s-table">
                <PivotTable
                    projectId="storybook"
                    measures={[MEASURE_1, MEASURE_2]}
                    rows={[ATTRIBUTE_1, ATTRIBUTE_2]}
                    LoadingComponent={null}
                    ErrorComponent={null}
                />
            </div>
        )
    ))
    .add('two measures, 2 column attributes', () => (
        screenshotWrap(
            <div style={wrapperStyle} className="s-table">
                <PivotTable
                    projectId="storybook"
                    measures={[MEASURE_1, MEASURE_2]}
                    columns={[ATTRIBUTE_1, ATTRIBUTE_2]}
                    LoadingComponent={null}
                    ErrorComponent={null}
                />
            </div>
        )
    ))
    .add('two measures, 1 column attribute, 1 row attribute', () => (
        screenshotWrap(
            <div style={wrapperStyle} className="s-table">
                <PivotTable
                    projectId="storybook"
                    measures={[MEASURE_1, MEASURE_2]}
                    columns={[ATTRIBUTE_1]}
                    rows={[ATTRIBUTE_2]}
                    LoadingComponent={null}
                    ErrorComponent={null}
                />
            </div>
        )
    ))
    .add('table with resizing', () => (
        screenshotWrap(
            <div
                style={{
                    width: 800,
                    height: 400,
                    padding: 10,
                    border: 'solid 1px #000000',
                    resize: 'both',
                    overflow: 'auto'
                }}
                className="s-table"
            >
                <PivotTable
                    projectId="storybook"
                    measures={[MEASURE_1, MEASURE_2]}
                    rows={[ATTRIBUTE_2, ATTRIBUTE_1]}
                    onError={onErrorHandler}
                    pushData={logTotalsChange}
                    LoadingComponent={null}
                    ErrorComponent={null}
                />
            </div>
        )
    ));
