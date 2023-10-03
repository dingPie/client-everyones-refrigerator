export type RefrigeratorStatusType = 'operation' | 'wait_for_deletion';

export type RefrigeratorUserAuthorityType =
  | 'admin'
  | 'manager'
  | 'normal'
  | 'waiting';

export type RefrigeratorSpacePurposeTypeType =
  | 'refrigeration'
  | 'freeze'
  | 'kimchi';

export type RefrigeratorSpaceShapeTypeType = 'shelf' | 'drawer' | 'door';

export type ItemStatusType = 'storage' | 'used' | 'discarded';
