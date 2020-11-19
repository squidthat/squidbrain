
/**
 * Actual names for each db table
 */
export enum Table {
  CIRCLES = 'circles',
  CONTENTS = 'contents',
  FEDERATION_LINKS = 'federation_links',
  LINKS = 'links',
  SQUIDS = 'squids',
  USERS = 'users',
  WIKIS = 'wikis',

  // Many to Many tables
  USERS_IN_CIRCLES = 'users_in_circles',
  SQUIDS_IN_CIRCLES = 'squids_in_circles',
}

export enum Contents {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  URL = 'url',
}
