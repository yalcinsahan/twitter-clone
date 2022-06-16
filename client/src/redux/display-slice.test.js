import displayReducer, { changeLeft, changeRight, changeBottom } from './display-slice'

describe('display slice', () => {

    test('should return the initial state', () => {
        expect(displayReducer(undefined, {})).toEqual({
            leftbar: false,
            rightbar: false,
            bottombar: false
        })
    })

    test('should leftbar value change', () => {
        const previousState = { leftbar: false, rightbar: false, bottombar: false }

        expect(displayReducer(previousState, changeLeft(true))).toEqual({
            leftbar: true,
            rightbar: false,
            bottombar: false
        })
    })

    test('should rightbar value change', () => {
        const previousState = { leftbar: false, rightbar: false, bottombar: false }

        expect(displayReducer(previousState, changeRight(true))).toEqual({
            leftbar: false,
            rightbar: true,
            bottombar: false
        })
    })

    test('should bottombar value change', () => {
        const previousState = { leftbar: false, rightbar: false, bottombar: false }

        expect(displayReducer(previousState, changeBottom(true))).toEqual({
            leftbar: false,
            rightbar: false,
            bottombar: true
        })
    })


})