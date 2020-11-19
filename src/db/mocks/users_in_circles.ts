import { VALID_CIRCLES } from './circles';
import { VALID_USERS } from './users';


export const VALID_USERS_IN_CIRCLES = {
  Default: {
    uuid: 'c3139f32-e64c-4967-b1df-675e3ff85204',
    circle_uuid: VALID_CIRCLES.Default.uuid,
    user_uuid: VALID_USERS.Default.uuid,
  },
  AnotherUserInDefaultCircle: {
    uuid: 'fee76ab4-4e46-42a4-8f20-1b48842fd39a',
    circle_uuid: VALID_CIRCLES.Default.uuid,
    user_uuid: VALID_USERS.DanteAlighieri.uuid,
  },
  AnotherCircleInDefaultUser: {
    uuid: 'ed1011b3-c47e-448f-9a9b-50ba99b43def',
    circle_uuid: VALID_CIRCLES.Humans.uuid,
    user_uuid: VALID_USERS.Default.uuid,
  },
  OnlyWilliamDiPasquale: {
    uuid: 'dd413d8a-1254-4c2e-8237-d87e5b874c0f',
    circle_uuid: VALID_CIRCLES.OnlyWilliamDiPasquale.uuid,
    user_uuid: VALID_USERS.WilliamDiPasquale.uuid,
  },
};
