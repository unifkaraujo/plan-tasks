import {library} from '@fortawesome/fontawesome-svg-core';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {faSave} from '@fortawesome/free-solid-svg-icons/faSave';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';

export const registrarIcones = () =>
  library.add(faBars, faCheck, faEye, faEyeSlash, faPlus, faSave, faTrash);
