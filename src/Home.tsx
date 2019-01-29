import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { DetailsListDocumentsExample } from './DetailsListDocumentsExample';

class Home extends React.Component {

  public render() {
    return (
      <div>
        <div className="ms-Grid" dir="ltr">
          <div style={{ height: 60 }} className="ms-Grid-row ms-bgColor-themePrimary ">
            <div className="ms-Grid-col ms-md12 ms-font-xl ms-fontColor-neutralLighter">1DS Sample App</div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-md2">
              <Nav
                groups={this.getNavItems()}
                expandedStateText={'expanded'}
                collapsedStateText={'collapsed'}
                selectedKey={'key3'}
                expandButtonAriaLabel={'Expand or collapse'}
              />
            </div>
            <div className="ms-Grid-col ms-md10">
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-md12">
                    <CommandBar
                      items={this.getCommandBarItems()}
                      ariaLabel={'Use left and right arrow keys to navigate between commands'}
                    />
                  </div>
                </div>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-md12">
                    <DetailsListDocumentsExample />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }

  // Data for CommandBar
  private getCommandBarItems = () => {
    return [
      {
        key: 'newItem',
        name: 'New',
        iconProps: {
          iconName: 'Add'
        },
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        subMenuProps: {
          items: [
            {
              key: 'emailMessage',
              name: 'Email message',
              iconProps: {
                iconName: 'Mail'
              },
              ['data-automation-id']: 'newEmailButton'
            },
            {
              key: 'calendarEvent',
              name: 'Calendar event',
              iconProps: {
                iconName: 'Calendar'
              }
            }
          ]
        }
      },
      {
        key: 'upload',
        name: 'Upload',
        iconProps: {
          iconName: 'Upload'
        },
        href: '#',
        ['data-automation-id']: 'uploadButton'
      },
      {
        key: 'share',
        name: 'Share',
        iconProps: {
          iconName: 'Share'
        },
        onClick: () => console.log('Share')
      },
      {
        key: 'download',
        name: 'Download',
        iconProps: {
          iconName: 'Download'
        },
        onClick: () => console.log('Download')
      }
    ];
  };

  // Data for Nav
  private getNavItems = () => {
    return [
      {
        links: [
          {
            name: 'Test Menu 1',
            url: '#',
            links: [
              {
                name: 'SubMenu 1',
                url: '#',
                key: 'key1'
              },
              {
                name: 'SubMenu',
                url: '#',
                key: 'key2'
              }
            ],
            isExpanded: true
          },
          {
            name: 'News',
            icon: 'News',
            url: '#',
            key: 'key8',
            links: [
              {
                name: 'Activity',
                url: '#',
                key: 'key1'
              },
              {
                name: 'MSN',
                url: '#',
                key: 'key2'
              }
            ],
            isExpanded: true
          },
          {
            name: 'News',
            icon: 'News',
            url: '#',
            key: 'key9',
            links: [
              {
                name: 'Activity',
                url: '#',
                key: 'key1'
              },
              {
                name: 'MSN',
                url: '#',
                key: 'key2'
              }
            ],
            isExpanded: true
          }
        ]
      }
    ];
  };

}

export default Home;

