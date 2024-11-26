import { InjectionToken } from '@angular/core';
import { AppEnvironmentInterface } from '@simra/common-models';

export const APP_CONFIG = new InjectionToken<AppEnvironmentInterface>('@simra/common/environment');