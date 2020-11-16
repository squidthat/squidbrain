import { VALID_USERS } from './users';


export const VALID_SQUIDS = {
  Default: {
    uuid: 'b19dbe6a-8c97-45e8-9c25-067e9dee5481',
    owner_uuid: VALID_USERS.Default.uuid,
    title: 'Default Squid',
    layout: '[[70f47111-9bc6-4ce5-8508-02d33c5c22ed]]',
    public: true,
    allow_external_links: 'REQUIRE_APPROVAL',
  },
  NoContent: {
    uuid: 'cd1656a3-25df-42b4-bb29-764472933b33',
    owner_uuid: VALID_USERS.Default.uuid,
    title: 'Default Squid',
    layout: 'Hi! I don\'t have specific content.',
    public: true,
    allow_external_links: 'YES',
  },
  PrivateSquid: {
    uuid: '2dcb897a-ec8e-476d-9750-a52463aff468',
    owner_uuid: VALID_USERS.DanteAlighieri.uuid,
    title: 'Private Squid',
    layout: 'Some text:\n[[b30d7530-470f-4bae-955c-c9578c3379c0]]',
    public: false,
    allow_external_links: 'NO',
  },
  AnotherPrivateSquid: {
    uuid: '63948e9d-57db-4f67-9c12-47906df8fef1',
    owner_uuid: VALID_USERS.DanteAlighieri.uuid,
    title: 'Another Private Squid',
    layout: 'Some text:\n[[14f76cc0-c0d8-4a72-8db6-265293fdfaa4]]',
    public: false,
    allow_external_links: 'NO',
  },
  SpammySquid: {
    uuid: 'f42cf601-8a4c-4ffc-8641-a46a396dd72f',
    owner_uuid: VALID_USERS.TheSpamBot.uuid,
    title: 'Spammy Squid',
    layout: 'Spammy:\n[[68a4bbb1-7deb-4a20-9595-77bc27cd3654]]',
    public: true,
    allow_external_links: 'YES',
  },
  WithLotsOfContent: {
    uuid: 'b292418d-6e6c-4ddb-a0b2-75596e73f170',
    owner_uuid: VALID_USERS.TheSpamBot.uuid,
    title: 'Lots of content',
    layout: `
      This is a lot of content...
      [[aa892a01-f55c-486a-b7d6-ba6c2c32220c]]
      [[65660a21-020b-4db1-9df1-be3c46ea86ee]]
      [[8e6389d1-2066-4868-bf4d-a0212e54d363]]
      [[260b9928-f55f-4867-a699-0769a2709b6c]]
      [[d35a3836-561d-4fc1-a685-86f1da80ba1e]]
      [[b30d7530-470f-4bae-955c-c9578c3379c0]]
    `,
    public: true,
    allow_external_links: 'YES',
  },
};
