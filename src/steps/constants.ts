import { StepEntityMetadata } from '@jupiterone/integration-sdk-core';

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
