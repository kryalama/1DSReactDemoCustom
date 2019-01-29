import * as React from 'react';
import { initializeIcons } from '@uifabric/icons';
import {
  ApplicationInsights, IExtendedConfiguration, IWebAnalyticsConfiguration
} from '@ms/1ds-analytics-web-js';
import Home from './Home';

class App extends React.Component {

  private appInsights: ApplicationInsights = new ApplicationInsights();

  constructor(props: any) {
    super(props);
    initializeIcons();
    this.initializeTelemetry();
  }

  public render() {
    return (
      <Home />
    );
  }

  private initializeTelemetry() {
    this.appInsights = new ApplicationInsights();
    // Configure ApplicationInsights
    var instrumentationKey = "YOUR_TENANT_KEY";
    var webAnalyticsConfig: IWebAnalyticsConfiguration = {
      autoCapture: {
        pageView: true,
        click: true,
        scroll: true,
        onUnload: true,
        jsError: true
      }
    };
    var config: IExtendedConfiguration = {
      instrumentationKey: instrumentationKey,
      // Extra extensions
      extensions: [],
      webAnalyticsConfiguration: webAnalyticsConfig
    };

    //Initialize SDK
    this.appInsights.initialize(config, []);

    // Add listener for events send
    this.appInsights.addNotificationListener({
      eventsSent: function (events) {
        events.forEach(event => {
          console.log("Event sent " + event.name);
        });
      },
      eventsDiscarded: function (events) {
        events.forEach(event => {
          console.log("Event discarded " + event.name);
        });
      }
    });
  }
}

export default App;

