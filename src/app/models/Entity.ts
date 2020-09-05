export interface Entity {
  id?: number;
  uuid?: string;
}

export interface OrderedEntity {
  id?: number;
  uuid?: string;
  order?: number;
}

export interface MultiTenancyEntity extends Entity {
  tenantId: number;
}

export interface WorkspaceEntity extends Entity {
  workspaceId: number;
  workspaces: Workspace[];
}

export interface Workspace extends Entity {
  name: string;
  userOwner: string;
}
