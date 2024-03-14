import { SetMetadata } from '@nestjs/common';
import * as CONSTANTS from './constants';

export const Public = () => SetMetadata(CONSTANTS.IS_PUBLIC_KEY, true);
