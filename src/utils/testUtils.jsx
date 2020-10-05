import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import AuthProvider from '../providers/Auth';
import SearchProvider from '../providers/Search';

export const customRender = (ui) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>{ui}</SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
