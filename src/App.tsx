import * as React from 'react';
import { initializeIcons } from '@uifabric/icons';
import { AppInsightsCore, IExtendedConfiguration } from '@ms/1ds-core-js';
import { ApplicationInsights, IWebAnalyticsConfiguration } from '@ms/1ds-wa-js';
import { PropertiesPlugin, IPropertyConfiguration  } from '@ms/1ds-properties-js';
import { PostChannel } from '@ms/1ds-post-js';
import { GetChannel } from '@ms/1ds-get-js';
import { CorrelationVectorPlugin } from '@ms/1ds-cv-js';
import { QosPlugin } from '@ms/1ds-qos-js';
import { LocalStorageChannel } from '@ms/1ds-localstorage-js';
import { Sender } from '@microsoft/applicationinsights-channel-js';
import { CustomTelemetryPlugin } from './CustomTelemetryPlugin';
import Home from './Home';

class App extends React.Component {

  private appInsightsCore: AppInsightsCore = new AppInsightsCore();
  private webAnalyticsPlugin: ApplicationInsights = new ApplicationInsights();
  private propertiesPlugin: PropertiesPlugin = new PropertiesPlugin();
  private breezeChannelPlugin: Sender = new Sender();
  private collectorChannelPlugin: PostChannel = new PostChannel();
  private correlationVectorPlugin: CorrelationVectorPlugin = new CorrelationVectorPlugin();
  private qosPlugin: QosPlugin = new QosPlugin();
  //private customPlugin: CustomTelemetryPlugin = new CustomTelemetryPlugin();

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

    var instrumentationKey="YOUR IKEY";

    var collectorEndpoint = 'https://browser.events.data.microsoft.com/OneCollector/1.0/';
    var webAnalyticsConfig: IWebAnalyticsConfiguration = {
      autoCapture: {
        scroll: true,
        pageView: true,
        onLoad: true,
        onUnload: true,
        click: true,
        resize: true,
        jsError: true
      }
    };
 
    var propertiesPluginConfig: IPropertyConfiguration = {
      populateBrowserInfo: true,
      populateOperatingSystemInfo:true
    };
    var config: IExtendedConfiguration = {
      instrumentationKey: instrumentationKey,
      endpointUrl: collectorEndpoint,
      extensions: [
        this.webAnalyticsPlugin,
        this.propertiesPlugin,
        //this.qosPlugin,
        //this.correlationVectorPlugin,
        //this.customPlugin
      ],
      channels: [[
        this.breezeChannelPlugin,
        this.collectorChannelPlugin
      ]],
      extensionConfig: []
    };
    // Add configurations
    config.extensionConfig[this.webAnalyticsPlugin.identifier] = webAnalyticsConfig;
    config.extensionConfig[this.propertiesPlugin.identifier] = propertiesPluginConfig;
    //Breeze Configuration
    config.extensionConfig[this.breezeChannelPlugin.identifier] = {
      instrumentationKey: 'APPInsights-IKey',
      endpointUrl: 'https://dc.services.visualstudio.com/v2/track',
    };

    //Initialize SDK
    this.appInsightsCore.initialize(config, []);

    // Send telemetry
    this.appInsightsCore.track({ name: "ReactTelemetryEvent", baseData: {}, baseType: "TestBaseType" });
  }
}

export default App;

