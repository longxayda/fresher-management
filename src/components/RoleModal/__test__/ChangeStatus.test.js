import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RoleManagement from "../../../pages/RoleManagement"
import '@testing-library/jest-dom';
import ChangeStatusRole from "../ChangeStatusRole";

describe('ChangeStatus testing', () => {
    test('Test selected inactive modal when click delete button', () => {
        render(<RoleManagement />);
        // Action
        const Checkbox = screen.getAllByTestId(/icon-checkbox/i)
        fireEvent.click(Checkbox[0])
        fireEvent.click(Checkbox[1])
        const InActiveButton = screen.getByTestId(/inactive-selected-button/i)
        fireEvent.click(InActiveButton)


        // Assert
        const TitleInModal = screen.getByText('Do you really want to inactive these roles?')
        expect(TitleInModal).toBeInTheDocument()
    });
    test('Test selected active modal when click delete button', () => {
        render(<RoleManagement />);
        // Action
        const Checkbox = screen.getAllByTestId(/icon-checkbox/i)
        fireEvent.click(Checkbox[0])
        fireEvent.click(Checkbox[1])
        const ActiveButton = screen.getByTestId(/outactive-selected-button/i)
        fireEvent.click(ActiveButton)


        // Assert
        const TitleInModal = screen.getByText('Do you really want to active these roles?')
        expect(TitleInModal).toBeInTheDocument()
    });
    test('Click cancel in Active Role Modal', () => {
        render(<RoleManagement />);

        const Checkbox = screen.getAllByTestId(/icon-checkbox/i)
        fireEvent.click(Checkbox[0])
        fireEvent.click(Checkbox[1])
        const ActiveButton = screen.getByTestId(/outactive-selected-button/i)
        fireEvent.click(ActiveButton)
        const CancelActiveButton = screen.getByTestId(/cancel-active-role-button/i)
        fireEvent.click(CancelActiveButton)

        const CancelActiceLabel = screen.getByText(/ACTION/i)
        expect(CancelActiceLabel).toBeInTheDocument()
    });
    test('Click cancel in Active Role Modal', () => {
        render(<RoleManagement />);

        const Checkbox = screen.getAllByTestId(/icon-checkbox/i)
        fireEvent.click(Checkbox[0])
        fireEvent.click(Checkbox[1])
        const ActiveButton = screen.getByTestId(/inactive-selected-button/i)
        fireEvent.click(ActiveButton)
        const CancelActiveButton = screen.getByTestId(/cancel-inactive-role-button/i)
        fireEvent.click(CancelActiveButton)

        const CancelActiceLabel = screen.getByText(/ACTION/i)
        expect(CancelActiceLabel).toBeInTheDocument()
    });
});
