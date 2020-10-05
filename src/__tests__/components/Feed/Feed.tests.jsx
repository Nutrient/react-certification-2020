import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Feed from '../../../components/Feed';
import { customRender } from '../../../utils/testUtils';

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

describe('Feed tests', () => {
  afterEach(cleanup);
  beforeEach(async () => {
    await act(async () => {
      customRender(<Feed />);
    });
  });

  test('Feed renders category feed', () => {
    expect(screen.getByText('Music')).toBeInTheDocument();
  });

  test('Feed favorite icon should not be present', () => {
    expect(screen.queryByTestId('favoriteIcon')).not.toBeInTheDocument();
  });
});
