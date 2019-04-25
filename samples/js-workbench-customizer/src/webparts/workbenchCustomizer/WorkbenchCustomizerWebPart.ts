import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
import styles from './WorkbenchCustomizerWebPart.module.scss';

import * as strings from 'WorkbenchCustomizerWebPartStrings';

export interface IWorkbenchCustomizerWebPartProps {
  requiresPageRefresh: boolean;
  customWorkbenchStyles: boolean;
}

export default class WorkbenchCustomizerWebPart extends BaseClientSideWebPart<IWorkbenchCustomizerWebPartProps> {

  public onInit(): Promise<void> {
    this.properties.requiresPageRefresh = false;
    return Promise.resolve();
  }

  public async render(): Promise<void> {

    if (this.properties.customWorkbenchStyles) {
      await import('./styles/customWorkbenchStyles.module.scss');
    }

    this.domElement.innerHTML = `
    <div class="${styles.workbenchCustomizer}">
      ${this.properties.requiresPageRefresh
        ? `<div class="${styles.redMessage}">Please refresh the page to remove custom workbench styles</div>`
        : ''
      }
      *** Workbench Customizer web part ***
    </div>`;
  }

  public onPropertyPaneFieldChanged(path: string, oldValue: any, newValue: any): void {
    if (!newValue) {
      // request a page refresh if any of the options was disabled
      // no real smart logic implemented at this point
      this.properties.requiresPageRefresh = true;
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('customWorkbenchStyles', {
                  label: strings.CustomWorkbenchStylesFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
