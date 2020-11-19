import { VALID_CIRCLES } from './circles';
import { VALID_SQUIDS } from './squids';


export const VALID_SQUIDS_IN_CIRCLES = {
  Default: {
    uuid: 'e966e7db-cdd6-4eee-8d5d-d9784a814e91',
    circle_uuid: VALID_CIRCLES.Default.uuid,
    squid_uuid: VALID_SQUIDS.Default.uuid,
  },
  AnotherInDefaultCircle: {
    uuid: '652ae666-8a41-40bb-953e-b4a866c497bd',
    circle_uuid: VALID_CIRCLES.Default.uuid,
    squid_uuid: VALID_SQUIDS.PrivateSquid.uuid,
  },
  Humans: {
    uuid: 'd1e30f88-e7af-4e7d-8366-36b8f06ac339',
    circle_uuid: VALID_CIRCLES.Humans.uuid,
    squid_uuid: VALID_SQUIDS.Default.uuid,
  },
};
