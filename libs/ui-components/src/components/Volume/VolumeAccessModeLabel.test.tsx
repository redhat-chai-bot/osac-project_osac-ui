import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { VolumeAccessMode } from '@osac/types';

import { VolumeAccessModeLabel } from './VolumeAccessModeLabel';

describe('VolumeAccessModeLabel', () => {
  it('renders ReadWriteOnce for READ_WRITE_ONCE', () => {
    render(<VolumeAccessModeLabel accessMode={VolumeAccessMode.READ_WRITE_ONCE} />);
    expect(screen.getByText('ReadWriteOnce')).toBeInTheDocument();
  });

  it('renders ReadOnlyMany for READ_ONLY_MANY', () => {
    render(<VolumeAccessModeLabel accessMode={VolumeAccessMode.READ_ONLY_MANY} />);
    expect(screen.getByText('ReadOnlyMany')).toBeInTheDocument();
  });

  it('renders ReadWriteMany for READ_WRITE_MANY', () => {
    render(<VolumeAccessModeLabel accessMode={VolumeAccessMode.READ_WRITE_MANY} />);
    expect(screen.getByText('ReadWriteMany')).toBeInTheDocument();
  });

  it('renders ReadWriteOncePod for READ_WRITE_ONCE_POD', () => {
    render(<VolumeAccessModeLabel accessMode={VolumeAccessMode.READ_WRITE_ONCE_POD} />);
    expect(screen.getByText('ReadWriteOncePod')).toBeInTheDocument();
  });

  it('renders Unspecified for UNSPECIFIED', () => {
    render(<VolumeAccessModeLabel accessMode={VolumeAccessMode.UNSPECIFIED} />);
    expect(screen.getByText('Unspecified')).toBeInTheDocument();
  });

  it('renders Unspecified for undefined', () => {
    render(<VolumeAccessModeLabel />);
    expect(screen.getByText('Unspecified')).toBeInTheDocument();
  });
});
