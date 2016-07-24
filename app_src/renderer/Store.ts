import { EventEmitter } from 'events'

export interface ISubscription {
  cancel: () => void
}

class StoreWithActions {

  public items: Array<{title: string}> = []
  public loading = false

  private emitter = new EventEmitter()
  private version = 0

  public async loadItems() {
    await this.dispatch({ loading: true, items: [] })
    await this.dispatch({ loading: false, items: await this.getItems() })
  }

  public subscribe(listener: (verion: number) => void): ISubscription {
    this.emitter.on('changed', listener)
    return { cancel: () => this.unsub(listener) }
  }

  private async getItems() {
    // simulate network call with some results
    return new Promise( (resolve, reject) => {
      setTimeout(() => resolve([{ title: 'War and Peace'}, { title: 'From dusk till down'}]), 1500)
    })
  }

  private unsub(listener) {
    this.emitter.removeListener('changed', listener)
  }

  private async dispatch(data) {
    Object.assign(this, data)
    return new Promise((resolve, reject) => {
      this.emitter.emit('changed', this.version++)
      setTimeout(resolve)
    })
  }
}

export const store = new StoreWithActions()
