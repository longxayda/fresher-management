import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RoleManagement from "../../../pages/RoleManagement"
import '@testing-library/jest-dom';
import DetailRole from "../DetailRole";

describe('Detail Role testing', () => {
    test('Show Detail Role modal when click button', () => {

        render(<RoleManagement />);

        const ShowDetailRoleButton = screen.getByTestId(/icondetail0/i)
        fireEvent.click(ShowDetailRoleButton)

        const DetailLabel = screen.getByText('Rights')
        expect(DetailLabel).toBeInTheDocument()
    })
    test('Click button cancel in modal detail', () => {
        render(<RoleManagement />);

        const ShowDetailRoleButton = screen.getByTestId(/icondetail0/i)
        fireEvent.click(ShowDetailRoleButton)
        const CancelDetailButton = screen.getByTestId(/cancel-detail-button/i)
        fireEvent.click(CancelDetailButton)

        const CancelDetailLabel = screen.getByText(/ACTION/i)
        expect(CancelDetailButton).toBeInTheDocument()

    })
});