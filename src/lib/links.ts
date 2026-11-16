import { CONTACT } from '../config';
import { isTodo, withBase } from '../i18n';

/** Odkazy odvozené z kontaktů v src/config.ts (placeholdery zůstávají "TODO: …"). */
export const links = {
  github: CONTACT.github,
  linkedin: CONTACT.linkedin,
  email: isTodo(CONTACT.email) ? CONTACT.email : `mailto:${CONTACT.email}`,
  emailAddress: isTodo(CONTACT.email) ? null : CONTACT.email,
  cv: CONTACT.cvAvailable
    ? withBase('/cv.pdf')
    : 'TODO: CV v PDF – soubor do public/cv.pdf, pak v src/config.ts nastav cvAvailable: true',
};
