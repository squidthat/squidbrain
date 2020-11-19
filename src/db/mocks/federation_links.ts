import { VALID_SQUIDS } from './squids';


export const VALID_FEDERATION_LINKS = {
  Default: {
    uuid: '8eb7f9e8-4846-4340-85ec-dcb9b11f4980',
    squid_uuid: VALID_SQUIDS.Default.uuid,
    host: 'another1.app.squidthat.com',
    target: '8ace0fb5-c39f-4550-b245-3954ef351e82',
    type: 'ORIGIN',
  },
  LocalIsOrigin: {
    uuid: '001f6940-133a-4744-8bc1-1cc590eceef9',
    squid_uuid: VALID_SQUIDS.Default.uuid,
    host: 'another2.app.squidthat.com',
    target: 'f4d194cd-9f39-456c-a9f2-da9618f50c5c',
    type: 'ORIGIN',
  },
  LocalIsDestination: {
    uuid: '56c9e7eb-02c8-4cd9-866d-36fe1901dffa',
    squid_uuid: VALID_SQUIDS.Default.uuid,
    host: 'another3.app.squidthat.com',
    target: 'f95dc00d-ef70-477d-9a7d-abee235f37b7',
    type: 'DESTINATION',
  },
};
