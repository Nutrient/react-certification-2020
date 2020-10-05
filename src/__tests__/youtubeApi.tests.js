import { getCategoryFeed, getFavoriteVideos } from '../api/youtubeApi';
import { YOUTUBE_API_CATEGORY_VALUES } from '../utils/constants';

jest.mock('../api/youtubeApi', () => {
  return {
    getCategoryFeed: jest.fn((categoryId) => {
      return {
        kind: 'youtube#videoListResponse',
        etag: 'TbMZEaON3zCNvytXgpwW8ycWhCY',
        items: [
          {
            publishedAt: '2020-09-30T22:00:05Z',
            channelId: 'UCmS75G-98QihSusY7NfCZtw',
            title: 'video title',
            description: 'video description',
            thumbnails: {},
            categoryId,
          },
        ],
      };
    }),
    getFavoriteVideos: jest.fn(() => {
      return [
        {
          id: '',
          info: {
            publishedAt: '2020-09-30T22:00:05Z',
            channelId: 'UCmS75G-98QihSusY7NfCZtw',
            title: 'video title',
            description: 'video description',
            thumbnails: {},
          },
        },
      ];
    }),
  };
});

describe('Mock API calls', () => {
  it('Test home feed results', async () => {
    const categoryFeed = await getCategoryFeed(YOUTUBE_API_CATEGORY_VALUES.MUSIC);
    expect(Array.isArray(categoryFeed.items)).toBe(true);
  });

  it('Test home feed results', async () => {
    const favoriteVideos = await getFavoriteVideos();
    expect(Array.isArray(favoriteVideos)).toBe(true);
  });
});
