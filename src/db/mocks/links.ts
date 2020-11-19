import { VALID_SQUIDS } from './squids';
import { VALID_USERS } from './users';

export const VALID_LINKS = {
  Default: {
    uuid: 'c52ff723-767a-4f40-bd81-0f701767ac0e',
    description: 'My first link',
    owner_uuid: VALID_USERS.Default.uuid,
    origin_uuid: VALID_SQUIDS.Default.uuid,
    destination_uuid: VALID_SQUIDS.Default.uuid,
    public: true,
  },
  PrivateLink: {
    uuid: '40817a4d-be1a-41f0-8498-c0334db9535a',
    description: 'Private Link',
    owner_uuid: VALID_USERS.DanteAlighieri.uuid,
    origin_uuid: VALID_SQUIDS.PrivateSquid.uuid,
    destination_uuid: VALID_SQUIDS.AnotherPrivateSquid.uuid,
    public: false,
  },
};
