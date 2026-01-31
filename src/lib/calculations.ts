/**
 * Utility functions for financial calculations
 */

export interface CompoundInterestParams {
  principal: number;
  monthlyContribution: number;
  interestRate: number;
  period: number;
  isAnnualRate?: boolean;
}

export interface CompoundInterestResult {
  finalAmount: number;
  totalInvested: number;
  totalInterest: number;
  monthlyData: {
    month: number;
    balance: number;
    interest: number;
    contribution: number;
  }[];
}

/**
 * Calculate compound interest with monthly contributions
 */
export function calculateCompoundInterest(params: CompoundInterestParams): CompoundInterestResult {
  const { principal, monthlyContribution, interestRate, period, isAnnualRate = true } = params;
  
  // Convert annual rate to monthly rate
  const monthlyRate = isAnnualRate ? interestRate / 100 / 12 : interestRate / 100;
  
  let balance = principal;
  const monthlyData: CompoundInterestResult['monthlyData'] = [];
  
  for (let month = 1; month <= period; month++) {
    const interest = balance * monthlyRate;
    balance = balance + interest + monthlyContribution;
    
    monthlyData.push({
      month,
      balance,
      interest,
      contribution: monthlyContribution,
    });
  }
  
  const totalInvested = principal + (monthlyContribution * period);
  const totalInterest = balance - totalInvested;
  
  return {
    finalAmount: balance,
    totalInvested,
    totalInterest,
    monthlyData,
  };
}

/**
 * Format number as Brazilian currency
 */
export function formatMoney(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Format number as percentage
 */
export function formatPercent(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}
