import React from 'react';
import { screen, cleanup, act } from '@testing-library/react';

import RecommendationFeed from '../../../components/RecommendationFeed';
import { customRender } from '../../../utils/testUtils';

jest.mock('../../../api/youtubeApi', () => {
  return {
    getRelatedVideos: jest.fn((categoryId) => {
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
            categoryId,
          },
        },
      ];
    }),
  };
});

describe('Recommendation Feed tests', () => {
  afterEach(cleanup);
  beforeEach(async () => {
    await act(async () => {
      customRender(<RecommendationFeed />);
    });
  });

  test('Component loads recommendations', () => {
    expect(screen.getByText('video title')).toBeInTheDocument();
  });
});
