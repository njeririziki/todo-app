
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CreateTodoItem from '../components/CreateTodoItem';
import apiInstance from '../utils/ApiInstance';
import { jwtDecode } from 'jwt-decode';
import '@testing-library/jest-dom';

// Mock the external dependencies
jest.mock('../../utils/ApiInstance');
jest.mock('jwt-decode');

describe('CreateTodoItem Component', () => {
  const mockClose = jest.fn();
  const queryClient = new QueryClient();
  const defaultProps = {
    status: 'TODO',
    close: mockClose
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock sessionStorage
    const mockToken = 'mock-token';
    Storage.prototype.getItem = jest.fn(() => mockToken);
    
    // Mock jwtDecode
    (jwtDecode as jest.Mock).mockReturnValue({ id: 1 });
    
    // Mock the API call
    (apiInstance.post as jest.Mock).mockResolvedValue({ data: {} });
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <CreateTodoItem {...defaultProps} />
      </QueryClientProvider>
    );
  };

  test('renders all form elements', () => {
    renderComponent();
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/deadline/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  test('initializes deadline with current date', () => {
    renderComponent();
    const today = new Date().toISOString().split('T')[0];
    const deadlineInput = screen.getByLabelText(/deadline/i) as HTMLInputElement;
    expect(deadlineInput.value).toBe(today);
  });

  test('updates form fields when user types', () => {
    renderComponent();
    
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const deadlineInput = screen.getByLabelText(/deadline/i);

    fireEvent.change(titleInput, { target: { value: 'Test Todo' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(deadlineInput, { target: { value: '2024-12-31' } });

    expect(titleInput).toHaveValue('Test Todo');
    expect(descriptionInput).toHaveValue('Test Description');
    expect(deadlineInput).toHaveValue('2024-12-31');
  });

  test('submits form with correct data', async () => {
    renderComponent();
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Todo' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/deadline/i), { target: { value: '2024-12-31' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(apiInstance.post).toHaveBeenCalledWith('/todos', {
        title: 'Test Todo',
        description: 'Test Description',
        deadline: expect.any(Date),
        status: 'TODO',
        ownerId: 1
      });
    });

    expect(mockClose).toHaveBeenCalled();
  });

  test('closes when clicking outside', () => {
    renderComponent();

    // Simulate a click outside the component
    fireEvent.mouseDown(document.body);

    expect(mockClose).toHaveBeenCalled();
  });

  test('does not close when clicking inside the component', () => {
    renderComponent();

    // Click inside the form
    fireEvent.mouseDown(screen.getByLabelText(/title/i));

    expect(mockClose).not.toHaveBeenCalled();
  });

  test('handles API error gracefully', async () => {
    // Mock API to reject
    (apiInstance.post as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    
    renderComponent();
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Todo' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(apiInstance.post).toHaveBeenCalled();
    });

    // The form should not close on error
    expect(mockClose).not.toHaveBeenCalled();
  });
});