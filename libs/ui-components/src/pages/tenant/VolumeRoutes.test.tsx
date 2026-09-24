import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@osac/ui-components/components/Volume/VolumeWizardPage', () => ({
  default: () => <h1>Volume wizard</h1>,
}));

import { VolumeRoutes } from './VolumeRoutes';

const renderRoutes = (initialEntry: string) => (
  <MemoryRouter initialEntries={[initialEntry]}>
    <Routes>
      <Route path="/storage/volumes/*" element={<VolumeRoutes />} />
    </Routes>
  </MemoryRouter>
);

describe('VolumeRoutes', () => {
  it('renders the wizard on the create route', () => {
    render(renderRoutes('/storage/volumes/create'));

    expect(screen.getByRole('heading', { name: 'Volume wizard' })).toBeInTheDocument();
  });

  it('renders the wizard on the edit route', () => {
    render(renderRoutes('/storage/volumes/vol-123/edit'));

    expect(screen.getByRole('heading', { name: 'Volume wizard' })).toBeInTheDocument();
  });
});
