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

interface WelcomeEmailProps {
  subscriberEmail: string;
  unsubscribeUrl: string;
  siteUrl: string;
}

export const WelcomeEmail = ({
  subscriberEmail,
  unsubscribeUrl,
  siteUrl
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to GENIE AI Hub! Your Technology Navigator is here 🧞‍♂️</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with Logo */}
        <Section style={logoSection}>
          <Img
            src={`${siteUrl}/genie-logo-main.png`}
            width="100"
            height="100"
            alt="GENIE Logo"
            style={logo}
          />
          <Heading style={logoText}>GENIE</Heading>
          <Text style={tagline}>I am your Technology Navigator</Text>
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Heading style={h1}>Welcome to GENIE AI Hub! 🧞‍♂️</Heading>
          
          <Text style={text}>
            Thank you for joining our innovative community at <strong>GENIE AI Experimentation Hub</strong>! 
            You've taken the first step into exploring how personal AI experimentation builds professional expertise 
            and drives organizational transformation.
          </Text>

          {/* Purpose Section */}
          <Section style={section}>
            <Heading style={h2}>Our Purpose</Heading>
            <Text style={text}>
              Sharing my personal AI experimentation journey - demonstrating the <strong>Experiment → Validate → Lead to Deploy</strong> framework 
              through real implementations. I document learnings, proven outcomes, and practical insights to help others 
              build AI expertise and position themselves as AI-proficient professionals in their organizations.
            </Text>
          </Section>

          {/* Live Features Section */}
          <Section style={highlightBox}>
            <Heading style={h2}>🚀 2 Live Features Launched</Heading>
            
            <Text style={text}>
              <strong>1. GenieAI Experimentation Hub Platform</strong><br/>
              Full-stack platform built in 2 weeks, showcasing 80-90 days of development. Complete knowledge sharing, 
              case studies, and interactive features demonstrating modern AI-powered development.
            </Text>
            
            <Text style={text}>
              <strong>2. Genie Conversational AI</strong><br/>
              Critical user features proving enterprise-grade capability:<br/>
              • <strong>Dual Context System</strong> - Seamless Tech ↔ Healthcare switching<br/>
              • <strong>Split-Screen Interface</strong> - Multi-model comparison<br/>
              • <strong>Smart Session Management</strong> - Context-aware conversations<br/>
              • <strong>Performance</strong> - &lt;2.5s response, 1,000+ concurrent users, 99.9% reliability<br/>
              • <strong>Intelligence</strong> - 5 AI models, 80+ knowledge contexts, real-time streaming
            </Text>
            
            <Button
              href={siteUrl}
              style={featureButton}
            >
              Try Live Features Now
            </Button>
          </Section>

          {/* About Me Section */}
          <Section style={section}>
            <Heading style={h2}>About Sai Das - Your AI Guide</Heading>
            <Text style={text}>
              Building AI expertise through systematic personal experimentation. Sharing proven results, documented 
              learnings, and practical frameworks that transform curiosity into professional capability and organizational 
              influence. Connect with me to discuss your AI journey and exchange insights.
            </Text>
            
            <Button
              href="https://www.linkedin.com/in/saidas/"
              style={linkedinButton}
            >
              Connect on LinkedIn
            </Button>
          </Section>

          {/* What You'll Receive */}
          <Section style={section}>
            <Heading style={h2}>Your Journey Starts Here</Heading>
            <Text style={text}>
              Explore the hub at <Link href={siteUrl} style={linkStyle}>genieaiexperimentationhub.tech</Link>
            </Text>

          
          <Text style={text}>
            As a subscriber, you'll receive:
          </Text>
          <Text style={text}>
            ✨ Experiment insights and documented outcomes<br/>
            🚀 Updates on new live features and experiments<br/>
            🤝 Practical frameworks and proven methodologies<br/>
            📊 Real performance metrics and learnings<br/>
            🛠️ Technology recommendations and case studies<br/>
            💡 Personal AI expertise development strategies
          </Text>

          <Hr style={hr} />

          {/* Footer */}
          <Text style={footer}>
            Thank you for joining this AI experimentation journey!<br/>
            <strong>Sai Das - GenieAI Experimentation Hub</strong><br/>
            <Link href="https://www.linkedin.com/in/saidas/" style={linkStyle}>Connect on LinkedIn</Link> | 
            <Link href={siteUrl} style={linkStyle}> Visit Hub</Link>
          </Text>

          <Text style={unsubscribe}>
            You received this email because you subscribed to our newsletter at {subscriberEmail}.<br/>
            <Link href={unsubscribeUrl} style={unsubscribeLink}>
              Unsubscribe from future emails
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

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
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '16px 0 8px',
  letterSpacing: '2px',
};

const tagline = {
  color: '#7dd3fc',
  fontSize: '14px',
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
  margin: '32px 0 16px',
};

const text = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
};

const section = {
  margin: '32px 0',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '48px 0',
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
  margin: '0 auto',
  boxShadow: '0 4px 12px rgba(72, 163, 196, 0.3)',
};

const highlightBox = {
  backgroundColor: '#f0f9ff',
  padding: '24px',
  borderRadius: '8px',
  border: '2px solid #48a3c4',
  margin: '32px 0',
};

const featureButton = {
  backgroundColor: '#48a3c4',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '15px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  marginTop: '16px',
  boxShadow: '0 4px 12px rgba(72, 163, 196, 0.3)',
};

const linkedinButton = {
  backgroundColor: '#0077b5',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '15px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  marginTop: '16px',
  boxShadow: '0 4px 12px rgba(0, 119, 181, 0.3)',
};

const linkStyle = {
  color: '#48a3c4',
  textDecoration: 'underline',
  fontWeight: '500',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '32px 0',
};

const footer = {
  color: '#718096',
  fontSize: '14px',
  lineHeight: '1.5',
  textAlign: 'center' as const,
  margin: '32px 0 16px',
};

const unsubscribe = {
  color: '#a0aec0',
  fontSize: '12px',
  lineHeight: '1.4',
  textAlign: 'center' as const,
  margin: '16px 0 0',
};

const unsubscribeLink = {
  color: '#48a3c4',
  textDecoration: 'underline',
};