import * as React from 'react';
import { initializeIcons } from '@uifabric/icons';
import { AppInsightsCore, IExtendedConfiguration } from '@ms/1ds-core-js';
import { ApplicationInsights, IWebAnalyticsConfiguration } from '@ms/1ds-wa-js';
import { PropertiesPlugin } from '@ms/1ds-properties-js';
import { PostChannel } from '@ms/1ds-post-js';
import { GetChannel } from '@ms/1ds-get-js';
import { CorrelationVectorManager } from '@ms/1ds-cv-js';
import { QosPlugin } from '@ms/1ds-qos-js';
import { LocalStorageChannel } from '@ms/1ds-localstorage-js';
import { Sender } from '@microsoft/applicationinsights-channel-js';
import Home from './Home';

class App extends React.Component {

  private appInsightsCore: AppInsightsCore = new AppInsightsCore();
  private webAnalyticsPlugin: ApplicationInsights = new ApplicationInsights();
  private propertiesPlugin: PropertiesPlugin = new PropertiesPlugin();
  private breezeChannelPlugin: Sender = new Sender();
  private collectorChannelPlugin: PostChannel = new PostChannel();
  private getChannel: GetChannel = new GetChannel();
  private localStorageChannel: LocalStorageChannel = new LocalStorageChannel();
  private correlationVectorPlugin: CorrelationVectorManager = new CorrelationVectorManager();
  private qosPlugin: QosPlugin = new QosPlugin();

  constructor(props: any) {
    super(props);
    initializeIcons();
    var useBreeze = false;
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
        this.collectorChannelPlugin,
        this.qosPlugin,
        this.correlationVectorPlugin,
        this.localStorageChannel,
        useBreeze ? this.breezeChannelPlugin : this.collectorChannelPlugin
      ],
      extensionConfig: []
    };
    if (!useBreeze) {
      // Add Get for OneCollector only
      config.extensions.push(this.getChannel);
    }

    // Add configurations
    config.extensionConfig[this.webAnalyticsPlugin.identifier] = webAnalyticsConfig;

    //Initialize SDK
    this.appInsightsCore.initialize(config, []);

    // Send telemetry
    this.appInsightsCore.track({ name: "ReactTelemetryEvent" });
  }
}

export default App;

