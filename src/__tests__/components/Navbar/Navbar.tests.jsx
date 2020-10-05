import React from 'react';
import {
  screen,
  cleanup,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';

import { act } from 'react-dom/test-utils';
import Navbar from '../../../components/Navbar';
import { customRender } from '../../../utils/testUtils';

const mockHistoryPush = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Navbar tests', () => {
  afterEach(cleanup);
  beforeEach(() => {
    customRender(<Navbar />);
  });

  test('Navbar contains app title', () => {
    expect(screen.getByText('WizeTube')).toBeInTheDocument();
  });

  test('Navbar failts login', async () => {
    fireEvent.click(screen.getByText('Login'));
    await act(async () => {
      fireEvent.click(screen.getAllByText('Login')[1]);
    });

    await waitFor(() =>
      expect(screen.getByText('Failed Login, please try again')).toBeInTheDocument()
    );
  });

  test('Navbar login button opens modal and logs in', async () => {
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Username'), {
        target: { value: 'wizeline' },
      });
      fireEvent.change(screen.getByPlaceholderText('Password'), {
        target: { value: 'Rocks!' },
      });
      fireEvent.click(screen.getAllByText('Login')[1]);
    });

    await waitForElementToBeRemoved(screen.getAllByText('Login'));
  });

  test('Navbar must search with enter', () => {
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'PON PON PON' } });

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockHistoryPush).toHaveBeenCalledWith('/search/PON PON PON');

    fireEvent.click(screen.getByTitle('search'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/search/PON PON PON');
  });
});
