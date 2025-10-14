import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    const claudeApiKey = Deno.env.get('CLAUDE_API_KEY');
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

    const results = {
      openai: { configured: !!openaiApiKey, working: false, error: null as string | null },
      claude: { configured: !!claudeApiKey, working: false, error: null as string | null },
      gemini: { configured: !!geminiApiKey, working: false, error: null as string | null },
      lovable: { configured: !!lovableApiKey, working: false, error: null as string | null },
    };

    // Test OpenAI (GPT models)
    if (openaiApiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: 'Say "OpenAI working"' }],
            max_tokens: 10,
          }),
        });

        const data = await response.json();
        
        if (response.ok && data.choices?.[0]?.message?.content) {
          results.openai.working = true;
          console.log('✅ OpenAI API: Working -', data.choices[0].message.content);
        } else {
          results.openai.error = data.error?.message || 'Invalid response format';
          console.error('❌ OpenAI API error:', data);
        }
      } catch (error) {
        results.openai.error = error instanceof Error ? error.message : 'Unknown error';
        console.error('❌ OpenAI API exception:', error);
      }
    }

    // Test Claude (Anthropic)
    if (claudeApiKey) {
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': claudeApiKey,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 10,
            messages: [{ role: 'user', content: 'Say "Claude working"' }],
          }),
        });

        const data = await response.json();
        
        if (response.ok && data.content?.[0]?.text) {
          results.claude.working = true;
          console.log('✅ Claude API: Working -', data.content[0].text);
        } else {
          results.claude.error = data.error?.message || 'Invalid response format';
          console.error('❌ Claude API error:', data);
        }
      } catch (error) {
        results.claude.error = error instanceof Error ? error.message : 'Unknown error';
        console.error('❌ Claude API exception:', error);
      }
    }

    // Test Gemini (Google)
    if (geminiApiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: 'Say "Gemini working"' }] }],
            }),
          }
        );

        const data = await response.json();
        
        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          results.gemini.working = true;
          console.log('✅ Gemini API: Working -', data.candidates[0].content.parts[0].text);
        } else {
          results.gemini.error = data.error?.message || 'Invalid response format';
          console.error('❌ Gemini API error:', data);
        }
      } catch (error) {
        results.gemini.error = error instanceof Error ? error.message : 'Unknown error';
        console.error('❌ Gemini API exception:', error);
      }
    }

    // Test Lovable AI Gateway (SLMs and vision models)
    if (lovableApiKey) {
      try {
        const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${lovableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [{ role: 'user', content: 'Say "Lovable AI working"' }],
            max_tokens: 10,
          }),
        });

        const data = await response.json();
        
        if (response.ok && data.choices?.[0]?.message?.content) {
          results.lovable.working = true;
          console.log('✅ Lovable AI Gateway: Working -', data.choices[0].message.content);
        } else {
          results.lovable.error = data.error?.message || 'Invalid response format';
          console.error('❌ Lovable AI error:', data);
        }
      } catch (error) {
        results.lovable.error = error instanceof Error ? error.message : 'Unknown error';
        console.error('❌ Lovable AI exception:', error);
      }
    }

    // Generate summary
    const summary = {
      total_providers: 4,
      configured: Object.values(results).filter(r => r.configured).length,
      working: Object.values(results).filter(r => r.working).length,
      results,
      recommendations: [] as string[],
    };

    // Add recommendations
    if (!results.openai.configured) {
      summary.recommendations.push('Add OPENAI_API_KEY for ChatGPT/GPT models');
    } else if (!results.openai.working) {
      summary.recommendations.push(`OpenAI error: ${results.openai.error}`);
    }

    if (!results.claude.configured) {
      summary.recommendations.push('Add CLAUDE_API_KEY for Claude models');
    } else if (!results.claude.working) {
      summary.recommendations.push(`Claude error: ${results.claude.error}`);
    }

    if (!results.gemini.configured) {
      summary.recommendations.push('Add GEMINI_API_KEY for Gemini models');
    } else if (!results.gemini.working) {
      summary.recommendations.push(`Gemini error: ${results.gemini.error}`);
    }

    if (!results.lovable.configured) {
      summary.recommendations.push('LOVABLE_API_KEY is auto-configured by Lovable');
    } else if (!results.lovable.working) {
      summary.recommendations.push(`Lovable AI error: ${results.lovable.error}`);
    }

    return new Response(JSON.stringify(summary, null, 2), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Test function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: 'Failed to test AI providers'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
