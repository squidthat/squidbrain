import { VALID_USERS } from './users';

export const VALID_WIKIS = {
  Default: {
    uuid: '03a25644-9423-4354-8445-02a41decb5b5',
    owner_uuid: VALID_USERS.Default.uuid,
    description: 'My first wiki',
    public: true,
  },
  PrivateWiki: {
    uuid: '4d25f61a-6ae3-4c86-b84d-0be5eb867f90',
    owner_uuid: VALID_USERS.DanteAlighieri.uuid,
    description: 'My Private wiki',
    public: false,
  },
};
