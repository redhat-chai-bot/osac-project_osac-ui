import { VolumeState } from '@osac/types';

import { ResourceStatusLabel, type StatusKind } from '../Resource/ResourceStatusLabel';

interface VolumeStatusLabelProps {
  state?: VolumeState;
}

const VOLUME_STATUS_MAP: Record<VolumeState, { status: StatusKind; text: string }> = {
  [VolumeState.UNSPECIFIED]: { status: 'unspecified', text: 'Unknown' },
  [VolumeState.CREATING]: { status: 'progressing', text: 'Creating' },
  [VolumeState.AVAILABLE]: { status: 'ready', text: 'Available' },
  [VolumeState.FAILED]: { status: 'failed', text: 'Failed' },
  [VolumeState.DELETING]: { status: 'unspecified', text: 'Deleting' },
  [VolumeState.DELETED]: { status: 'unspecified', text: 'Deleted' },
};

const resolveVolumeStatus = (state?: VolumeState): { status: StatusKind; text: string } => {
  if (state !== undefined && state in VOLUME_STATUS_MAP) {
    return VOLUME_STATUS_MAP[state];
  }
  return VOLUME_STATUS_MAP[VolumeState.UNSPECIFIED];
};

export const VolumeStatusLabel = ({ state }: VolumeStatusLabelProps) => {
  const { status, text } = resolveVolumeStatus(state);

  return <ResourceStatusLabel status={status} text={text} />;
};
