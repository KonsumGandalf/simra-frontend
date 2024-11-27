import { InjectionToken } from '@angular/core';
import { AppEnvironmentInterface } from '../interfaces/app-environment.interface';

export const APP_CONFIG = new InjectionToken<AppEnvironmentInterface>('@simra/common/environment');
