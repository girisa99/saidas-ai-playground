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
          <Heading style={h1}>You've Been Unsubscribed</Heading>
          
          <Text style={text}>
            We're sorry to see you go! You have been successfully unsubscribed from the 
            <strong> GENIE AI Hub</strong> newsletter.
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
              Visit GENIE AI Hub
            </Button>
          </Section>

          <Text style={feedback}>
            We'd love to hear why you unsubscribed. Your feedback helps us improve our content and community.
          </Text>

          <Hr style={hr} />

          {/* Footer */}
          <Text style={footer}>
            Thank you for being part of our AI community!<br/>
            <strong>GENIE - Your Technology Navigator</strong>
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
  backgroundColor: '#48a3c4',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
  margin: '16px 0',
  boxShadow: '0 4px 12px rgba(72, 163, 196, 0.3)',
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