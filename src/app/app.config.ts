import {OpaqueToken} from '@angular/core';

export interface AppConfig {
  apiEndpoint: string;
}

export const MASTER_CLASS_DI_CONFIG: AppConfig = {
  apiEndpoint: 'http://localhost:4201/api'
}

export const APP_CONFIG_TOKEN = new OpaqueToken('APP_CONFIG');