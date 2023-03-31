import axios from "axios";
import { applySnapshot, flow, toGenerator, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { IProductModelSnapshotIn, IRootStore } from "../interface";
import { todoModel } from "../models/todoModel";

export const RootStore = types.model('RootStore', {

    todos: types.array(todoModel),

}).actions((self) => ({

    addTodo: flow(function* (title: string) {
        try {
            const todo = { id: Math.random(), title, }
            yield* toGenerator(axios.post(' http://localhost:3000/goods', todo))
            self.todos.push(todo)
        } catch (e) {
            console.log('>>e', e)
        }
    }),

    removeTodoById: flow(function* (id: number) {
        try {
            yield* toGenerator(axios.delete(`http://localhost:3000/goods/${id}`))
            const todo = self.todos.filter((product) => product.id !== id)
            applySnapshot(self.todos, todo)
        } catch (e) {
            console.log('>>e', e)
        }
    }),


    fetchProducts: flow(function* () {
        try {
            const goods: IProductModelSnapshotIn[] = yield* toGenerator(axios.get(' http://localhost:3000/goods').then((res) => res.data))
            applySnapshot(self.todos, goods)

        } catch (e) {
            console.log('>>e', e)
        }
    }),

}))


export const store = RootStore.create({})

export const ContextRootStore = createContext<IRootStore>(store)

export const useRootStore = () => useContext(ContextRootStore)