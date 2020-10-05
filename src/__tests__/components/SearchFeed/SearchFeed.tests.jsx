import React from 'react';
import { screen, cleanup, act } from '@testing-library/react';

import SearchFeed from '../../../components/SearchFeed';
import { customRender } from '../../../utils/testUtils';

jest.mock('../../../api/youtubeApi', () => {
  return {
    getVideoSearch: jest.fn(() => {
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

describe('Search Feed tests', () => {
  afterEach(cleanup);
  beforeEach(async () => {
    await act(async () => {
      customRender(<SearchFeed />);
    });
  });

  test('Component loads video in list', () => {
    expect(screen.getByText('video title')).toBeInTheDocument();
  });
});
