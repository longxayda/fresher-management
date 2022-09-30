import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RoleManagement from "../../../pages/RoleManagement"
import '@testing-library/jest-dom';
import EditRole from "../EditRole";
describe('Edit Testing', () => {
    test('Show Edit Role modal when click button', () => {
        // Arrange
        render(<RoleManagement />);
        // Action
        const ShowEditRoleButton = screen.getByTestId(/iconedit0/i)
        fireEvent.click(ShowEditRoleButton)
        // Assert
        const EditLabel = screen.getByText('Edit role')
        expect(EditLabel).toBeInTheDocument()
    })
    test('Edit role  when user enter value and click edit', () => {
        TestValue = "Admin"
        render(<RoleManagement />);

        const ShowEditRoleButton = screen.getByTestId(/iconedit0/i)
        fireEvent.click(ShowEditRoleButton)
        const RoleNameInput = screen.getByPlaceholderText(/Type role name/i)
        const EditButton = screen.getByTestId(/edit-role-button/i)
        fireEvent.change(RoleNameInput, { target: { value: TestValue } })
        fireEvent.click(EditButton)

        const EditLabel = screen.getByText(TestValue)
        expect(addLabel).toBeInTheDocument()
    });
    test('Click button cancel in modal Edit Role', () => {
        render(<RoleManagement />);

        const ShowEditRoleButton = screen.getByTestId(/iconedit0/i)
        fireEvent.click(ShowEditRoleButton)
        const CancelEditButton = screen.getByTestId(/cancel-edit-button/i)
        fireEvent.click(CancelEditButton)

        const CancelEditLabel = screen.getByText(/ACTION/i)
        expect(CancelEditButton).toBeInTheDocument()

    });
});