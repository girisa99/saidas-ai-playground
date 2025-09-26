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
    <Preview>You've been unsubscribed from Genie AI Experimentation Hub</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with Logo */}
        <Section style={logoSection}>
          <Img
            src={`${siteUrl}/genie-logo.png`}
            width="80"
            height="80"
            alt="Genie AI Logo"
            style={logo}
          />
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Heading style={h1}>You've Been Unsubscribed</Heading>
          
          <Text style={text}>
            We're sorry to see you go! You have been successfully unsubscribed from the 
            <strong> Genie AI Experimentation Hub</strong> newsletter.
          </Text>

          <Text style={text}>
            Your email address <strong>{subscriberEmail}</strong> will no longer receive our weekly updates, 
            AI insights, and community announcements.
          </Text>

          <Section style={section}>
            <Text style={text}>
              <strong>What you'll miss:</strong><br/>
              • Weekly AI experiment insights and breakthroughs<br/>
              • Early access to new platform features<br/>
              • Exclusive community events and workshops<br/>
              • Industry trends and expert analysis<br/>
              • Tool recommendations and tutorials
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={ctaSection}>
            <Text style={text}>
              Changed your mind? You can always resubscribe by visiting our website.
            </Text>
            <Button
              href={siteUrl}
              style={button}
            >
              Visit Genie AI Hub
            </Button>
          </Section>

          <Text style={feedback}>
            We'd love to hear why you unsubscribed. Your feedback helps us improve our content and community.
          </Text>

          <Hr style={hr} />

          {/* Footer */}
          <Text style={footer}>
            Thank you for being part of our AI community!<br/>
            <strong>The Genie AI Experimentation Hub Team</strong>
          </Text>

          <Text style={footerNote}>
            If you unsubscribed by mistake or have any questions, please contact us through our website.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default UnsubscribeConfirmationEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const logoSection = {
  padding: '32px 0',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const content = {
  padding: '0 48px',
};

const h1 = {
  color: '#1a365d',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '0 0 30px',
  lineHeight: '1.3',
};

const text = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
};

const section = {
  margin: '24px 0',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#3182ce',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
  margin: '16px 0',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '32px 0',
};

const feedback = {
  color: '#718096',
  fontSize: '14px',
  lineHeight: '1.5',
  textAlign: 'center' as const,
  margin: '24px 0',
  fontStyle: 'italic',
};

const footer = {
  color: '#718096',
  fontSize: '14px',
  lineHeight: '1.5',
  textAlign: 'center' as const,
  margin: '32px 0 16px',
};

const footerNote = {
  color: '#a0aec0',
  fontSize: '12px',
  lineHeight: '1.4',
  textAlign: 'center' as const,
  margin: '16px 0 0',
};