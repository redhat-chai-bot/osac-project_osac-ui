import { type Client } from '@connectrpc/connect';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { IdentityProviderPhase, IdentityProviders } from '@osac/types';

import {
  IDP_SYNC_POLL_MAX_ATTEMPTS,
  IDP_SYNC_POLL_MS,
  pollIdentityProviderUntilSynced,
} from './identity-provider';

const idpWithPhase = (phase: IdentityProviderPhase, message?: string) => ({
  id: 'idp-1',
  status: { phase, message },
});

const createMockIdpClient = (getMock: ReturnType<typeof vi.fn>): Client<typeof IdentityProviders> =>
  ({
    get: getMock,
    create: vi.fn(),
    delete: vi.fn(),
    list: vi.fn(),
    update: vi.fn(),
  }) as unknown as Client<typeof IdentityProviders>;

describe('pollIdentityProviderUntilSynced', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves as soon as the Identity provider reaches READY', async () => {
    const getMock = vi.fn().mockResolvedValue({
      object: idpWithPhase(IdentityProviderPhase.READY),
    });
    const client = createMockIdpClient(getMock);

    const result = await pollIdentityProviderUntilSynced(client, 'idp-1');

    expect(result.status?.phase).toBe(IdentityProviderPhase.READY);
    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith({ id: 'idp-1' });
  });

  it('throws with the status message when the Identity provider reaches ERROR', async () => {
    const getMock = vi.fn().mockResolvedValue({
      object: idpWithPhase(IdentityProviderPhase.ERROR, 'OIDC configuration is invalid'),
    });
    const client = createMockIdpClient(getMock);

    await expect(pollIdentityProviderUntilSynced(client, 'idp-1')).rejects.toThrow(
      'OIDC configuration is invalid',
    );
  });

  it('throws a default message when the Identity provider reaches ERROR without a message', async () => {
    const getMock = vi.fn().mockResolvedValue({
      object: idpWithPhase(IdentityProviderPhase.ERROR),
    });
    const client = createMockIdpClient(getMock);

    await expect(pollIdentityProviderUntilSynced(client, 'idp-1')).rejects.toThrow(
      'Identity provider sync failed',
    );
  });

  it('throws a timeout error after exhausting all poll attempts', async () => {
    const getMock = vi.fn().mockResolvedValue({
      object: idpWithPhase(IdentityProviderPhase.UNSPECIFIED),
    });
    const client = createMockIdpClient(getMock);

    const resultPromise = pollIdentityProviderUntilSynced(client, 'idp-1');
    const assertion = expect(resultPromise).rejects.toThrow(
      'Timed out waiting for the identity provider to sync',
    );
    await vi.advanceTimersByTimeAsync(IDP_SYNC_POLL_MS * IDP_SYNC_POLL_MAX_ATTEMPTS);
    await assertion;
    expect(getMock).toHaveBeenCalledTimes(IDP_SYNC_POLL_MAX_ATTEMPTS);
  });

  it('throws when the response object is missing', async () => {
    const getMock = vi.fn().mockResolvedValue({ object: undefined });
    const client = createMockIdpClient(getMock);

    await expect(pollIdentityProviderUntilSynced(client, 'idp-1')).rejects.toThrow(
      'Identity provider not found in response',
    );
  });
});
