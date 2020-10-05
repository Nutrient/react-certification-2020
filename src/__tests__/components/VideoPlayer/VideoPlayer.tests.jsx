import React from 'react';
import { screen, cleanup, act } from '@testing-library/react';

import VideoPlayer from '../../../components/VideoPlayer';
import { customRender } from '../../../utils/testUtils';

jest.mock('../../../api/youtubeApi', () => {
  return {
    getVideo: jest.fn(() => {
      return {
        title: 'video title',
        description: 'video description',
      };
    }),
  };
});

describe('VideoPlayer tests', () => {
  afterEach(cleanup);
  beforeEach(async () => {
    await act(async () => {
      customRender(<VideoPlayer />);
    });
  });

  test('Component loads video', () => {
    expect(screen.getByText('video title')).toBeInTheDocument();
  });
});
