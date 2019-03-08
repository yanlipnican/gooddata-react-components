// (C) 2007-2019 GoodData Corporation
import React, { Component } from 'react';
import { PivotTable, Model } from '@gooddata/react-components';

import '@gooddata/react-components/styles/css/main.css';

import {
    projectId,
    quarterDateIdentifier,
    monthDateIdentifier,
    locationStateDisplayFormIdentifier,
    locationNameDisplayFormIdentifier,
    franchiseFeesIdentifier,
    franchiseFeesAdRoyaltyIdentifier,
    franchiseFeesInitialFranchiseFeeIdentifier,
    franchiseFeesIdentifierOngoingRoyalty,
    menuCategoryAttributeDFIdentifier
} from '../utils/fixtures';

export class PivotTableSubtotalsExample extends Component {
    render() {
        const measures = [
            {
                measure: {
                    localIdentifier: 'franchiseFeesIdentifier',
                    definition: {
                        measureDefinition: {
                            item: {
                                identifier: franchiseFeesIdentifier
                            }
                        }
                    }
                }
            }
        ];

        const attributes = [
            {
                visualizationAttribute: {
                    displayForm: {
                        identifier: locationStateDisplayFormIdentifier
                    },
                    localIdentifier: 'location'
                }
            },
            {
                visualizationAttribute: {
                    displayForm: {
                        identifier: menuCategoryAttributeDFIdentifier
                    },
                    localIdentifier: 'menu'
                }
            }
        ];

        const columns = [
            {
                visualizationAttribute: {
                    displayForm: {
                        identifier: monthDateIdentifier
                    },
                    localIdentifier: 'month'
                }
            }
        ];

        const totals = [
            {
                type: 'sum',
                measureIdentifier: 'franchiseFeesIdentifier',
                attributeIdentifier: 'location' // Grand total
            },
            {
                type: 'sum',
                measureIdentifier: 'franchiseFeesIdentifier',
                attributeIdentifier: 'menu' // Sub total
            }
        ];

        return (
            <div style={{ height: 500 }} className="s-pivot-table-row-grouping">
                <PivotTable
                    projectId={projectId}
                    measures={measures}
                    rows={attributes}
                    columns={columns}
                    totals={totals}
                    pageSize={20}
                    groupRows
                />
            </div>
        );
    }
}

export default PivotTableSubtotalsExample;
