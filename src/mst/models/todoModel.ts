import { flow, toGenerator, types } from 'mobx-state-tree'
import axios from "axios";

export const todoModel = types.model("todoModel", {
    id: types.identifierNumber,
    title: types.optional(types.string, ""),
})
    .actions(self => ({
        setName: flow(function* (newTitle: string) {
            try {
                self.title = newTitle
                yield* toGenerator(axios.put(` http://localhost:3000/goods/${self.id}`, self))
            } catch (e) {
                console.log('>>e', e)
            }
        })
    }))
