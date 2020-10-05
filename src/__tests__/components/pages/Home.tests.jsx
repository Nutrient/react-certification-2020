import React from 'react';
import { screen, cleanup, act } from '@testing-library/react';

import Home from '../../../pages/Home';
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

describe('Recommendation Feed tests', () => {
  afterEach(cleanup);
  beforeEach(async () => {
    await act(async () => {
      customRender(<Home />);
    });
  });

  test('Component renders and loads 4 sections', () => {
    expect(screen.getAllByText('video title').length).toEqual(4);
  });
});
