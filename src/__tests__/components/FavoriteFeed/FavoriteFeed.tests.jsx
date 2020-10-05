import React from 'react';
import { screen, cleanup, act, fireEvent } from '@testing-library/react';

import FavoriteFeed from '../../../components/FavoriteFeed';
import { customRender } from '../../../utils/testUtils';

jest.mock('../../../api/youtubeApi', () => {
  return {
    getFavoriteVideos: jest.fn(() => {
      return [
        {
          id: 'test-id',
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
      ];
    }),
  };
});

describe('Favorite Feed tests', () => {
  afterEach(cleanup);
  beforeEach(async () => {
    await act(async () => {
      customRender(<FavoriteFeed />);
    });
  });

  test('Component loads video in list', () => {
    expect(screen.getByText('video title')).toBeInTheDocument();
  });

  test('Feed adds favorite and removes it', async () => {
    await act(async () => {
      fireEvent.click(screen.getByTitle('notFavorite'));
    });
    expect(screen.queryByTitle('notFavorite')).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByTitle('Favorite'));
    });
    expect(screen.queryByTitle('Favorite')).not.toBeInTheDocument();
  });
});
