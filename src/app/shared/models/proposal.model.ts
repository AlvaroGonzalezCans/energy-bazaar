import { TradeKind } from "./trade.model";

export type ProposalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ProposalApproval {
  by: string;
  at: string;
}

export interface Proposal {
  id: string;
  planet: string;
  type: TradeKind;
  amount: number;
  createdAt: string;
  createdBy: string;
  status: ProposalStatus;
  approvals: ProposalApproval[];
  requiredApprovals: number;
}
