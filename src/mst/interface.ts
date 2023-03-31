import { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree'
import { todoModel } from './models/todoModel';
import { RootStore } from './store/RootStore';


export interface IRootStore extends Instance<typeof RootStore> {}
export interface IRootStoreSnapshotIn extends SnapshotIn<typeof RootStore> {}
export interface IRootStoreSnapshotOut extends SnapshotOut<typeof RootStore> {}


export interface IProductModel extends Instance<typeof todoModel> {}
export interface IProductModelSnapshotIn extends SnapshotIn<typeof todoModel> {}
export interface IProductModelSnapshotOut extends SnapshotOut<typeof todoModel> {}