import { Contents } from '../config';
import { VALID_SQUIDS } from './squids';


export const VALID_CONTENTS = {
  Default: {
    uuid: '70f47111-9bc6-4ce5-8508-02d33c5c22ed',
    squid_uuid: VALID_SQUIDS.Default.uuid,
    type: Contents.TEXT,
    content: 'Hello World!',
  },
  Text: {
    uuid: 'aa892a01-f55c-486a-b7d6-ba6c2c32220c',
    squid_uuid: VALID_SQUIDS.WithLotsOfContent.uuid,
    type: Contents.TEXT,
    content: 'Hello World (Again)!',
  },
  Image: {
    uuid: '65660a21-020b-4db1-9df1-be3c46ea86ee',
    squid_uuid: VALID_SQUIDS.WithLotsOfContent.uuid,
    type: Contents.TEXT,
    content: 'https://assets.squidthat.com/images/image.jpeg',
  },
  Video: {
    uuid: '8e6389d1-2066-4868-bf4d-a0212e54d363',
    squid_uuid: VALID_SQUIDS.WithLotsOfContent.uuid,
    type: Contents.TEXT,
    content: 'https://assets.squidthat.com/videos/video.mp4',
  },
  Audio: {
    uuid: '260b9928-f55f-4867-a699-0769a2709b6c',
    squid_uuid: VALID_SQUIDS.WithLotsOfContent.uuid,
    type: Contents.TEXT,
    content: 'https://assets.squidthat.com/audios/audio.mp3',
  },
  Url: {
    uuid: 'd35a3836-561d-4fc1-a685-86f1da80ba1e',
    squid_uuid: VALID_SQUIDS.WithLotsOfContent.uuid,
    type: Contents.TEXT,
    content: 'https://another.app.squidthat.com/squids/b19dbe6a-8c97-45e8-9c25-067e9dee5481',
  },
  ForPrivateSquid: {
    uuid: 'b30d7530-470f-4bae-955c-c9578c3379c0',
    squid_uuid: VALID_SQUIDS.PrivateSquid.uuid,
    type: Contents.TEXT,
    content: 'For Private Squid',
  },
  ForAnotherPrivateSquid: {
    uuid: '14f76cc0-c0d8-4a72-8db6-265293fdfaa4',
    squid_uuid: VALID_SQUIDS.AnotherPrivateSquid.uuid,
    type: Contents.TEXT,
    content: 'For Another Private Squid',
  },
  ForSpammySquid: {
    uuid: '68a4bbb1-7deb-4a20-9595-77bc27cd3654',
    squid_uuid: VALID_SQUIDS.SpammySquid.uuid,
    type: Contents.TEXT,
    content: 'For Spammy Squid',
  },
};
