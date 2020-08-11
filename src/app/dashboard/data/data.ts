import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Widget } from '../models/widget.model';
import { Dashboard } from '../models/dashboard.model';
import { Preference } from 'src/app/shared/preference';

export class SeshatData implements InMemoryDbService {
    createDb() {
        const widgets: Widget[] = [
            {
                widgetId: 'bfa1a639-664b-42e3-844f-919a236fe66c',
                widgetName: 'Map Widget',
                description:
                    'Will display a map and any geo points defined in the data source',
                componentRef: 'here-map-widget',
                icon:
                    'assets/here.svg',
                minCols: 5,
                minRows: 2,
            },
        ];
        const dashboards: Dashboard[] = [
            {
                "dashboardId" : "a1063851-f7fb-4066-afef-9a85cde08c6d",
                "dashboardName" : "Default Dashboard",
                "isPublic" : true,
                "ownerId" : null,
                "widgets" : [
                    {
                        "cols" : 8,
                        "componentRef" : "here-map-widget",
                        "dataConfig" : {
                            "mapId" : "26670",
                            "type" : "venue",
                            "defaultZoom" : 20,
                            "mapKey" : "",
                            "venueKey" : ""
                        },
                        "rows" : 5,
                        "x" : 2,
                        "y" : 1,
                        "name" : "Luxoft Demo Maps"
                    }
                ]
            }
        ];
        const preferences: Preference[] = [
            {
                "preferenceId" : "f93200bd-8399-4c09-a239-4bc3bf682165",
                "ownerId" : {
                    "userId" : "alice@rct-sol.com",
                    "sectionName" : "dashboard"
                },
                "values" : [
                    {
                        "name" : "gridType",
                        "value" : "fixed"
                    },
                    {
                        "name" : "displayGrid",
                        "value" : "onDrag&Resize"
                    },
                    {
                        "name" : "maxCols",
                        "value" : 20
                    },
                    {
                        "name" : "maxRows",
                        "value" : 15
                    }
                ]
            }
        ];
        return {widgets, dashboards, preferences};
    }
}
