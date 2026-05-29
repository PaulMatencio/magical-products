export interface CancellationPolicyData {
    label?: string;
    policy_name: string;
    last_updated: string;
    version: string;
    sections: Section[];
}

interface Section {
    id: string;
    title: string;
    content: string;
    highlights?: string[];
    restrictions?: string;
    note?: string;
}


