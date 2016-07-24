import { ISubscription, store } from './Store'
import * as electron from 'electron'
import * as React from 'react'

export class Application extends React.Component<any, any> {

  private subscription: ISubscription

  public render() {
    return <div>
      <h3>hello react typescript electron world</h3>
      <button onClick={this.handleLoadDataClick}>Press me to load data</button>
      <button onClick={this.handleOpenWindowClick}>Press me to open other window</button>
      {store.loading &&
        <div>Loading data from network (simulated) <img src='spinner.svg' /></div>
      }

      {store.items.map(item => <li key={item.title}>{item.title}</li>)}
    </div>
  }

  public componentDidMount() {
    this.subscription = store.subscribe(version => this.setState({ version }))
    store.loadItems()
  }

  public componentWillUnmount() {
    this.subscription.cancel()
  }

  private handleLoadDataClick() {
    store.loadItems()
  }

  private handleOpenWindowClick() {
    const window = new electron.remote.BrowserWindow({width: 300, height: 200, show: false})
    window.show()
  }

}
