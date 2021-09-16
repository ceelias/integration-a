import {
  RelationshipClass,
  RelationshipDirection,
  StepEntityMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  FINDINGS: 'fetch-findings',
};

export const Entities: Record<'FINDING', StepEntityMetadata> = {
  FINDING: {
    resourceName: 'Finding',
    _type: 'acme_finding',
    _class: ['Finding'],
  },
};

export const TargetEntities = {
  HOST: {
    resourceName: 'Host',
    _type: 'acme_host',
    _class: ['Host'],
  },
};

export const MappedRelationships = {
  FINDING_SCANS_HOST: {
    _type: 'FINDING_SCANS_HOST',
    sourceType: Entities.FINDING._type,
    _class: RelationshipClass.SCANS,
    targetType: TargetEntities.HOST._type,
    direction: RelationshipDirection.FORWARD,
  },
};
