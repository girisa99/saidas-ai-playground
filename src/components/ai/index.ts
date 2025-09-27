export interface SelectedModelConfig {
  provider: 'openai' | 'claude' | 'gemini';
  model: string;
  category: 'llm' | 'small' | 'vision';
  role: 'primary' | 'secondary';
  name: string;
  weight: number;
}