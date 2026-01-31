'use client';

import { AnalyticsService } from '../services/AnalyticsService';

/**
 * Helper para rastrear uso de ferramentas/calculadoras
 *
 * @param toolName - Nome da ferramenta (ex: 'loan_calculator')
 * @param toolType - Tipo: 'calculator' | 'converter' | 'form' | 'other'
 * @param toolCategory - Categoria: 'finance' | 'general' | etc
 * @param toolLocation - Localização (opcional, usa pathname por padrão)
 */
export function trackToolUsed(
  toolName: string,
  toolType: 'calculator' | 'converter' | 'form' | 'other' = 'calculator',
  toolCategory: string = 'general',
  toolLocation?: string
): void {
  AnalyticsService.captureToolUsed(toolName, toolType, toolCategory, toolLocation);
}

/**
 * Hook que retorna a função de tracking (para uso em componentes)
 */
export function useToolTracking() {
  return {
    trackToolUsed,
  };
}
