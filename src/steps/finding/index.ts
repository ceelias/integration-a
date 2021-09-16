import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import {
  createFindingScansHostRelationship,
  createFindingEntity,
} from './converter';

export async function fetchFindings({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateFindings(async (finding) => {
    const findingEntity = await jobState.addEntity(
      createFindingEntity(finding),
    );
    await jobState.addRelationship(
      createFindingScansHostRelationship(findingEntity, finding.host),
    );
  });
}

export const findingSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.FINDINGS,
    name: 'Fetch Findings',
    entities: [Entities.FINDING],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchFindings,
  },
];
