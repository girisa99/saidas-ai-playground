import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from 'npm:@react-email/components@0.0.22';
import * as React from 'npm:react@18.3.1';

interface UnsubscribeConfirmationEmailProps {
  subscriberEmail: string;
  siteUrl: string;
}

export const UnsubscribeConfirmationEmail = ({
  subscriberEmail,
  siteUrl
}: UnsubscribeConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>You've been unsubscribed from GENIE AI Hub</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with Logo */}
        <Section style={logoSection}>
          <Img
            src={`${siteUrl}/genie-logo-main.png`}
            width="80"
            height="80"
            alt="GENIE Logo"
            style={logo}
          />
          <Heading style={logoText}>GENIE</Heading>
          <Text style={tagline}>Technology Navigator</Text>
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Heading style={h1}>We're Sorry to See You Go</Heading>
          
          <Text style={text}>
            Dear Friend,
          </Text>

          <Text style={text}>
            You have been successfully unsubscribed from the <strong>GENIE AI Experimentation Hub</strong> newsletter. 
            Your email address <strong>{subscriberEmail}</strong> will no longer receive our updates.
          </Text>

          <Text style={text}>
            While we're sad to see you leave, we completely understand. Sometimes our inboxes need a little breathing room!
          </Text>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>About Our Journey</Heading>
            <Text style={text}>
              GENIE AI was born from a passion for experimentation and knowledge sharing. Created by <strong>Sai Dasika</strong>, 
              a healthcare technology innovator, this platform represents a personal journey of exploring AI's potential 
              to transform how we learn, communicate, and solve complex problems.
            </Text>
            <Text style={text}>
              What started as educational experiments has evolved into an advanced AI platform featuring:
            </Text>
            <Text style={featuresList}>
              <strong>🤖 Multi-Model AI Intelligence</strong> - GPT-4, Claude, Gemini working together<br/>
              <strong>👁️ Advanced Vision Analysis</strong> - Including medical image processing<br/>
              <strong>🎯 Dual Context Switching</strong> - Technology & Healthcare expertise<br/>
              <strong>📊 Split-Screen Comparisons</strong> - Compare AI model responses side-by-side<br/>
              <strong>🏢 Gartner Framework Integration</strong> - Enterprise decision-making support<br/>
              <strong>🔒 Enterprise-Grade Security</strong> - Built for real-world applications
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>What You'll Miss</Heading>
            <Text style={featuresList}>
              • <strong>Weekly AI Experiment Insights</strong> - Real discoveries from ongoing experiments<br/>
              • <strong>Early Access to Features</strong> - Be the first to try new capabilities<br/>
              • <strong>Educational Resources</strong> - Deep dives into AI, healthcare tech, and innovation<br/>
              • <strong>Use Case Spotlights</strong> - Practical applications in healthcare and business<br/>
              • <strong>Technology Trends</strong> - Expert analysis on emerging AI developments<br/>
              • <strong>Community Learning</strong> - Shared experiences and collaborative growth
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={ctaSection}>
            <Heading style={h2}>The Door Is Always Open</Heading>
            <Text style={text}>
              This isn't goodbye—it's "see you later." Whenever you're ready to explore AI experimentation, 
              continue your learning journey, or just curious about what's new, you're always welcome back.
            </Text>
            <Text style={text}>
              <strong>You can return anytime to:</strong>
            </Text>
            <Text style={featuresList}>
              ✨ Experience GENIE AI's conversational intelligence<br/>
              📚 Explore our comprehensive knowledge base<br/>
              🎓 Learn from real-world use cases and experiments<br/>
              🚀 Discover the latest in AI and healthcare technology
            </Text>
            <Button
              href={siteUrl}
              style={button}
            >
              Visit GENIE AI Experimentation Hub
            </Button>
            <Text style={smallText}>
              Or interact with GENIE AI directly at {siteUrl}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={messageSection}>
            <Text style={personalMessage}>
              "Every experiment, every conversation, every insight shared brings us closer to understanding 
              how AI can truly serve humanity. Thank you for being part of this journey, even if just for a while."
            </Text>
            <Text style={signature}>
              — Sai Dasika<br/>
              <span style={signatureTitle}>Creator, GENIE AI Experimentation Hub</span><br/>
              <span style={signatureTitle}>Healthcare Technology Innovator</span>
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={feedback}>
            💭 We'd genuinely love to hear your feedback. What could we do better? What topics interest you most? 
            Your insights help shape our experiments and content.
          </Text>

          {/* Footer */}
          <Text style={footer}>
            <strong>GENIE - Your Technology Navigator</strong><br/>
            Exploring AI • Sharing Knowledge • Building Together
          </Text>

          <Text style={footerNote}>
            If you unsubscribed by mistake, simply visit our website to resubscribe.<br/>
            Questions? Reach out through our contact form at {siteUrl}
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default UnsubscribeConfirmationEmail;

const main = {
  backgroundColor: '#f0f7ff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(45, 84, 126, 0.1)',
};

const logoSection = {
  padding: '32px 0',
  textAlign: 'center' as const,
  background: 'linear-gradient(135deg, #2d547e 0%, #48a3c4 50%, #7dd3fc 100%)',
  borderRadius: '12px 12px 0 0',
};

const logo = {
  margin: '0 auto',
  borderRadius: '50%',
  border: '3px solid #7dd3fc',
};

const logoText = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '16px 0 8px',
  letterSpacing: '2px',
};

const tagline = {
  color: '#7dd3fc',
  fontSize: '12px',
  fontStyle: 'italic',
  textAlign: 'center' as const,
  margin: '0 0 16px',
  fontWeight: '500',
};

const content = {
  padding: '0 48px',
};

const h1 = {
  color: '#2d547e',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '0 0 30px',
  lineHeight: '1.3',
};

const h2 = {
  color: '#2d547e',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '24px 0 16px',
  lineHeight: '1.4',
};

const text = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
};

const featuresList = {
  color: '#4a5568',
  fontSize: '15px',
  lineHeight: '1.8',
  margin: '12px 0',
  paddingLeft: '8px',
};

const section = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
};

const messageSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f0f7ff',
  borderLeft: '4px solid #48a3c4',
  borderRadius: '8px',
};

const personalMessage = {
  color: '#2d547e',
  fontSize: '16px',
  lineHeight: '1.7',
  fontStyle: 'italic',
  margin: '0 0 20px',
};

const signature = {
  color: '#2d547e',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.5',
  margin: '20px 0 0',
  textAlign: 'right' as const,
};

const signatureTitle = {
  fontSize: '14px',
  fontWeight: '400',
  color: '#718096',
  fontStyle: 'normal',
};

const smallText = {
  color: '#718096',
  fontSize: '14px',
  textAlign: 'center' as const,
  margin: '12px 0 0',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#48a3c4',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  margin: '20px 0',
  boxShadow: '0 4px 16px rgba(72, 163, 196, 0.3)',
  transition: 'all 0.3s ease',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '32px 0',
};

const feedback = {
  color: '#718096',
  fontSize: '15px',
  lineHeight: '1.6',
  textAlign: 'center' as const,
  margin: '24px 0',
  padding: '20px',
  backgroundColor: '#fffbeb',
  borderRadius: '8px',
  border: '1px solid #fef3c7',
};

const footer = {
  color: '#2d547e',
  fontSize: '15px',
  lineHeight: '1.6',
  textAlign: 'center' as const,
  margin: '40px 0 16px',
  fontWeight: '500',
};

const footerNote = {
  color: '#a0aec0',
  fontSize: '13px',
  lineHeight: '1.5',
  textAlign: 'center' as const,
  margin: '16px 0 0',
};