import { type Data } from './type'

export class TreeStore {
  private dataStore: Data[]

  constructor(data: Data[]) {
    this.dataStore = data
  }

  /**
   * Возвращает изначальный массив элементов
   * @returns Data[]
   */
  public getAll(): Data[] {
    return this.dataStore
  }

  /**
   * Возвращает сам объект элемента
   * @param id string | number
   * @returns Data
   */
  public getItem(id: string | number): Data {
    for (const item of this.dataStore) {
      if (item.id === id) {
        return item
      }
    }
  }

  /**
   * Возвращает массив элементов, являющихся дочерними для элемента
   * @param id string | number
   * @returns Data[]
   */
  public getChildren(id: string | number): Data[] {
    const childrenArray = []
    for (const item of this.dataStore) {
      if (item.parent === id) {
        childrenArray.push(item)
      }
    }
    return childrenArray
  }

  /**
   * Возвращает массив элементов, являющихся  элементами глубокого уровня для элемента
   * @param id
   * @returns
   */
  public getAllChildren(id: string | number): Data[] {
    const childrenArray = []
    for (const item of this.dataStore) {
      if (item.parent === id) {
        childrenArray.push(item)
      }
    }
    return childrenArray
  }
}
