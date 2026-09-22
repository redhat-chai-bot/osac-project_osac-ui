import { VolumeAccessMode } from '@osac/types';

interface VolumeAccessModeLabelProps {
  accessMode?: VolumeAccessMode;
}

const VOLUME_ACCESS_MODE_MAP: Record<VolumeAccessMode, string> = {
  [VolumeAccessMode.UNSPECIFIED]: 'Unspecified',
  [VolumeAccessMode.READ_WRITE_ONCE]: 'ReadWriteOnce',
  [VolumeAccessMode.READ_ONLY_MANY]: 'ReadOnlyMany',
  [VolumeAccessMode.READ_WRITE_MANY]: 'ReadWriteMany',
  [VolumeAccessMode.READ_WRITE_ONCE_POD]: 'ReadWriteOncePod',
};

const resolveAccessModeLabel = (accessMode?: VolumeAccessMode): string => {
  if (accessMode !== undefined && accessMode in VOLUME_ACCESS_MODE_MAP) {
    return VOLUME_ACCESS_MODE_MAP[accessMode];
  }
  return VOLUME_ACCESS_MODE_MAP[VolumeAccessMode.UNSPECIFIED];
};

export const VolumeAccessModeLabel = ({ accessMode }: VolumeAccessModeLabelProps) => (
  <>{resolveAccessModeLabel(accessMode)}</>
);
