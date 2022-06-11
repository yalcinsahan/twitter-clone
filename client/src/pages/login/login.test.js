import { screen, render, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from '../../redux/store'
import Login from "./Login"

const MockedLogin = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </Provider>
    )
}

describe('Login', () => {
    test('username input should be empty at first', () => {
        render(<MockedLogin />)

        const usernameInput = screen.getByPlaceholderText(/username/i)

        expect(usernameInput.value).toBe("")
    })

    test('password input should be empty at first', () => {
        render(<MockedLogin />)

        const passwordInput = screen.getByPlaceholderText(/password/i)

        expect(passwordInput.value).toBe("")
    })

    test('submit button should be disabled if at least one of the inputs is empty', () => {
        render(<MockedLogin />)

        const submitButton = screen.getByRole("button", { name: "Log In" })

        expect(submitButton).toBeDisabled()
    })

    test('username input should change', () => {
        render(<MockedLogin />)

        const usernameInput = screen.getByPlaceholderText(/username/i)

        fireEvent.change(usernameInput, { target: { value: "asdasf" } })

        expect(usernameInput.value).toBe("asdasf")
    })

    test('password input should change', () => {
        render(<MockedLogin />)

        const passwordInput = screen.getByPlaceholderText(/password/i)

        fireEvent.change(passwordInput, { target: { value: "asdasf23" } })

        expect(passwordInput.value).toBe("asdasf23")
    })
})