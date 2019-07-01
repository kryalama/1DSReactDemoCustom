import {
  ITelemetryPlugin, ITelemetryItem, IExtendedConfiguration,
  IAppInsightsCore, IPlugin
} from '@ms/1ds-core-js';

export class CustomTelemetryPlugin implements ITelemetryPlugin {

  public identifier = 'CustomTelemetryPlugin';
  public priority = 400;
  private _nextPlugin: ITelemetryPlugin;
  private _customProperty = 'Default';

  initialize(coreConfig: IExtendedConfiguration, core: IAppInsightsCore, extensions: IPlugin[]) {
    // Initialize code for custom plugin
  }

  processTelemetry(event: ITelemetryItem) {
    // Enhance event
    event.data = event.data || {};
    event.data['customProperty'] = this._customProperty;
    // Call next plugin
    if (this._nextPlugin) {
      this._nextPlugin.processTelemetry(event);
    }
  }

  setNextPlugin(plugin: ITelemetryPlugin) {
    this._nextPlugin = plugin;
  }

}
