import { AgentConfig } from './types';

export const AGENT_CONFIGS: AgentConfig[] = [
  {
    "id": "6fe83d52-563f-4ba8-865b-e494f927549d",
    "name": "Onboarding & Validation Agent",
    "description": "Assists rural users and field officers in the decentralized identity ecosystem with onboarding and validation.",
    "triggerEvents": [
      {
        "type": "async",
        "name": "user_onboarding_started",
        "description": "When a new user initiates the registration process, the agent prompts for identity documents and guides the user through DID creation."
      },
      {
        "type": "async",
        "name": "document_upload_completed",
        "description": "When a user uploads a document for a welfare scheme, the agent automatically analyzes the document for validity and cross-references it with scheme requirements."
      },
      {
        "type": "async",
        "name": "eligibility_status_change",
        "description": "When a user's profile data is updated or a new government scheme is added, the agent evaluates eligibility and proactively notifies the user to claim new credentials."
      }
    ],
    "config": {
      "appId": "fe7f2516-e9ac-404b-86a5-a64ccdeab817",
      "accountId": "c4645a23-bad6-43ab-ae8c-f772948aaf56",
      "widgetKey": "QLBO3jR4gu759jWK1H8uym1LQOGXhhdKrTFx72P4"
    }
  },
  {
    "id": "657cb613-4644-4143-b2a1-4d836117296d",
    "name": "WePay Assistant",
    "description": "A financial guardian for rural users, designed to automate government welfare fund management and provide an accessible voice-first interface.",
    "triggerEvents": [
      {
        "type": "async",
        "name": "dbt_deposit_detected",
        "description": "Triggered when a government welfare payment is credited to the account; the agent notifies the user and executes automated savings/investment rules."
      },
      {
        "type": "async",
        "name": "voice_assistance_request",
        "description": "Triggered when a user opens a transaction screen or starts a new process; the agent provides a verbal walkthrough of the steps in the user's native language."
      },
      {
        "type": "async",
        "name": "offline_lock_sync",
        "description": "Triggered when the app regains internet connectivity; the agent confirms and reconciles any fund locks or transfers made during the offline period."
      },
      {
        "type": "async",
        "name": "check_welfare_eligibility",
        "description": "Triggered when a user asks to check eligibility for a government welfare scheme."
      }
    ],
    "config": {
      "appId": "fe7f2516-e9ac-404b-86a5-a64ccdeab817",
      "accountId": "c4645a23-bad6-43ab-ae8c-f772948aaf56",
      "widgetKey": "QLBO3jR4gu759jWK1H8uym1LQOGXhhdKrTFx72P4"
    }
  }
];
