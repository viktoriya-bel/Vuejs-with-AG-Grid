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
    for (let index = 0; index < this.dataStore.length; index++) {
      if (this.dataStore[index].parent === id) {
        childrenArray.push(this.dataStore[index])
      }
    }
    return childrenArray
  }

  /**
   * Возвращает массив элементов, являющихся  элементами глубокого уровня для элемента
   * @param id
   * @returns Data[]
   */
  public getAllChildren(id: string | number): Data[] {
    const childrenArray = []
    for (let index = 0; index < this.dataStore.length; index++) {
      if (this.dataStore[index].parent === id) {
        const deepChildren = this.getAllChildren(this.dataStore[index].id)
        if (deepChildren.length) {
          childrenArray.push(this.dataStore[index], ...deepChildren)
        } else {
          childrenArray.push(this.dataStore[index])
        }
      }
    }
    return childrenArray
  }

  /**
   * Возвращает цепочку родителей от самого элемента к корню дерева
   * @param id string | number
   * @returns Data[]
   */
  public getAllParents(id: string | number): Data[] {
    const parentsArray = []
    for (let index = 0; index < this.dataStore.length; index++) {
      if (this.dataStore[index].id === id) {
        const deepParents = this.getAllParents(this.dataStore[index].parent)
        if (deepParents.length) {
          parentsArray.push(this.dataStore[index], ...deepParents)
        } else {
          parentsArray.push(this.dataStore[index])
        }
      }
    }
    return parentsArray
  }

  /**
   * Добавляет новый элемент в общую структуру хранилища
   * @param newItem Data
   */
  public addItem(newItem: Data) {
    this.dataStore.push(newItem)
  }

  /**
   * Удаляет элемент
   * @param id string | number
   */
  public removeItem(id: string | number) {
    for (let index = 0; index < this.dataStore.length; index++) {
      if (this.dataStore[index].id === id) {
        this.dataStore.slice(index, 1)
        break
      }
    }
  }

  /**
   * Обновляет элемент
   * @param item Data
   */
  public updateItem(item: Data) {
    for (let index = 0; index < this.dataStore.length; index++) {
      if (this.dataStore[index].id === item.id) {
        this.dataStore[index] = item
        break
      }
    }
  }
}
