import * as React from 'react';
import { initializeIcons } from '@uifabric/icons';
import { AppInsightsCore, IExtendedConfiguration } from '@ms/1ds-core-js';
import { ApplicationInsights, IWebAnalyticsConfiguration } from '@ms/1ds-wa-js';
import { PropertiesPlugin } from '@ms/1ds-properties-js';
import { PostChannel } from '@ms/1ds-post-js';
import { Sender } from '@microsoft/applicationinsights-channel-js';
import Home from './Home';

class App extends React.Component {

  private appInsightsCore: AppInsightsCore = new AppInsightsCore();
  private webAnalyticsPlugin: ApplicationInsights = new ApplicationInsights();
  private propertiesPlugin: PropertiesPlugin = new PropertiesPlugin();
  private breezeChannelPlugin: Sender = new Sender();
  private collectorChannelPlugin: PostChannel = new PostChannel();

  constructor(props: any) {
    super(props);
    initializeIcons();
    var useBreeze = true;
    this.initializeTelemetry(useBreeze);
  }

  public render() {
    return (
      <Home />
    );
  }

  private initializeTelemetry(useBreeze: boolean) {
    // Configure ApplicationInsights
    var instrumentationKey = "YOUR_TENANT_KEY";
    var endpoint = useBreeze ? 'https://dc.services.visualstudio.com/v2/track' : 'https://browser.events.data.microsoft.com/OneCollector/1.0/';
    var webAnalyticsConfig: IWebAnalyticsConfiguration = {
      autoCapture: {
        pageView: true,
        click: true,
        scroll: true,
        onUnload: true
      }
    };
    var config: IExtendedConfiguration = {
      instrumentationKey: instrumentationKey,
      endpointUrl: endpoint,
      extensions: [
        this.webAnalyticsPlugin,
        this.propertiesPlugin,
        useBreeze ? this.breezeChannelPlugin : this.breezeChannelPlugin
      ],
      extensionConfig: []
    };

    config.extensionConfig[this.webAnalyticsPlugin.identifier] = webAnalyticsConfig;

    //Initialize SDK
    this.appInsightsCore.initialize(config, []);
  }
}

export default App;

