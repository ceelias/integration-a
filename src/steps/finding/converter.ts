import {
  createIntegrationEntity,
  createMappedRelationship,
  Entity,
  RelationshipClass,
  Relationship,
  RelationshipDirection,
  generateRelationshipType,
  TargetEntityProperties,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { AcmeFinding } from '../../types';

export const MAPPED_RELATIONSHIP_TYPE_FINDING_HOST = generateRelationshipType(
  RelationshipClass.SCANS,
  'acme_finding',
  'acme_host',
);

export function createFindingEntity(finding: AcmeFinding): Entity {
  return createIntegrationEntity({
    entityData: {
      source: finding,
      assign: {
        _type: Entities.FINDING._type,
        _class: Entities.FINDING._class,
        _key: 'acme_finding:' + finding.id,
        username: 'testusername',
        email: 'test@test.com',
        // This is a custom property that is not a part of the data model class
        // hierarchy. See: https://github.com/JupiterOne/data-model/blob/master/src/schemas/User.json
        firstName: finding.name,

        // FINDING
        category: 'category',
        severity: 'severity',
        numericSeverity: 4,
        open: true,

        // Host
        hostName: finding.host,
      },
    },
  });
}

export function createFindingScansHostRelationship(
  findingEntity: Entity,
  host: string,
): Relationship {
  return createMappedRelationship({
    _class: RelationshipClass.SCANS,
    // TODO require _type https://github.com/JupiterOne/sdk/issues/347
    _type: 'FINDING_SCANS_HOST',
    _mapping: {
      sourceEntityKey: findingEntity._key,
      relationshipDirection: RelationshipDirection.FORWARD,
      /**
       * The primary value of this mapped relationship is to contribute details
       * to the Host entity. The `targetFilterKeys` are designed to coordinate
       * with the integration's mapping rule that will:
       *
       * - Map Finding to Host using `Finding.fqdn`
       * - `CREATE_OR_UPDATE` the Host before or after this mapped relationship
       *   is processed
       */
      targetFilterKeys: [['_class', 'hostName']],
      targetEntity: createHostTargetEntity(host),
      skipTargetCreation: false,
    },
  });
}

export function createHostTargetEntity(host: string) {
  const hostEntity: TargetEntityProperties = {
    _class: ['Host'],
    _type: 'acme_host',
    _key: 'acme_host:' + host,
    id: host,
    hostName: host,
    acmeAProp: 'testing',
    acmeAProp2: 'testing',
    acmeProp: 'original',
  };

  return hostEntity;
}
