import React from 'react';
import {
  screen,
  cleanup,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { customRender } from '../../../utils/testUtils';

import App from '../../../components/App';

jest.mock('../../../api/youtubeApi', () => {
  return {
    getCategoryFeed: jest.fn((category) => {
      return {
        id: category.id,
        category: category.key,
        videos: [
          {
            id: 'dyRsYk0LyA8',
            info: {
              publishedAt: '2020-09-30T22:00:05Z',
              channelId: 'UCmS75G-98QihSusY7NfCZtw',
              title: 'video title',
              description: 'video description',
              thumbnails: {
                high: {
                  url: '',
                },
              },
            },
          },
        ],
      };
    }),
  };
});

describe('App basic testing', () => {
  afterEach(cleanup);
  beforeEach(async () => {
    await act(async () => {
      customRender(<App />);
    });
  });

  test('App loads and adds a favorite', async () => {
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
      await waitForElementToBeRemoved(screen.getAllByText('Login'));
    });

    let [icon] = screen.getAllByTitle('notFavorite');
    await act(async () => {
      fireEvent.click(icon);
    });
    expect(icon).not.toBeInTheDocument();

    [icon] = screen.getAllByTitle('Favorite');
    await act(async () => {
      fireEvent.click(icon);
    });
    expect(icon).not.toBeInTheDocument();
  });
});
