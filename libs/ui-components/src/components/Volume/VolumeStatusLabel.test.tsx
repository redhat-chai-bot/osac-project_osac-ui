import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { VolumeState } from '@osac/types';

import { VolumeStatusLabel } from './VolumeStatusLabel';

const getLabel = (text: string) => screen.getByText(text).closest('.pf-v6-c-label');

describe('VolumeStatusLabel', () => {
  it('maps CREATING to progressing/Creating', () => {
    render(<VolumeStatusLabel state={VolumeState.CREATING} />);
    expect(screen.getByText('Creating')).toBeInTheDocument();
    expect(getLabel('Creating')).toHaveClass('pf-m-blue');
  });

  it('maps AVAILABLE to ready/Available', () => {
    render(<VolumeStatusLabel state={VolumeState.AVAILABLE} />);
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(getLabel('Available')).toHaveClass('pf-m-green');
  });

  it('maps FAILED to failed/Failed', () => {
    render(<VolumeStatusLabel state={VolumeState.FAILED} />);
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(getLabel('Failed')).toHaveClass('pf-m-red');
  });

  it('maps DELETING to unspecified/Deleting', () => {
    render(<VolumeStatusLabel state={VolumeState.DELETING} />);
    expect(screen.getByText('Deleting')).toBeInTheDocument();
    const label = getLabel('Deleting');
    expect(label).not.toHaveClass('pf-m-green');
    expect(label).not.toHaveClass('pf-m-red');
    expect(label).not.toHaveClass('pf-m-blue');
  });

  it('maps DELETED to unspecified/Deleted', () => {
    render(<VolumeStatusLabel state={VolumeState.DELETED} />);
    expect(screen.getByText('Deleted')).toBeInTheDocument();
  });

  it('maps UNSPECIFIED to unspecified/Unknown', () => {
    render(<VolumeStatusLabel state={VolumeState.UNSPECIFIED} />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('maps undefined to unspecified/Unknown', () => {
    render(<VolumeStatusLabel />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});
